import React, { useEffect, useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router';
import { use } from 'react';
import { AuthContext } from '../context/AuthContext';
import { DashboardContext } from '../context/DashboardContext';
import useAxiosSecure from '../hooks/useAxiosSecure';
import Loading from '../components/Loading';
import {
  LayoutDashboard,
  Users,
  CreditCard,
  BookOpen,
  GraduationCap,
  Menu,
} from 'lucide-react';

const DashboardLayout = () => {
  const { user } = use(AuthContext);
  const [dbUser, setDbUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (!user?.email) return;
    const fetchUser = () =>
      axiosSecure.get(`/users/me?email=${encodeURIComponent(user.email)}`);

    fetchUser()
      .then((res) => {
        setDbUser(res.data);
        setLoading(false);
      })
      .catch(async () => {
        // Sync user to DB if missing (e.g. legacy Firebase-only users)
        try {
          await axiosSecure.post('/users', {
            name: user.displayName || user.email?.split('@')[0],
            email: user.email,
            image: user.photoURL || 'https://placehold.co/150',
            role: 'student',
          });
          const res2 = await fetchUser();
          setDbUser(res2.data);
        } catch {
          setDbUser({ role: 'student' });
        }
        setLoading(false);
      });
  }, [user?.email, user?.displayName, user?.photoURL, axiosSecure]);

  if (loading || !dbUser) return <Loading />;

  const role = dbUser.role || 'student';

  const adminLinks = [
    { to: '/dashboard/admin/users', label: 'Manage Users', icon: Users },
    { to: '/dashboard/admin/payments', label: 'View Payments', icon: CreditCard },
    { to: '/dashboard/tutor/courses', label: 'Manage Courses', icon: BookOpen },
    { to: '/dashboard/tutor/students', label: 'Students', icon: GraduationCap },
    { to: '/dashboard/tutor/payments', label: 'Payments', icon: CreditCard },
  ];

  const tutorLinks = [
    { to: '/dashboard/tutor/courses', label: 'My Courses', icon: BookOpen },
    { to: '/dashboard/tutor/students', label: 'My Students', icon: GraduationCap },
    { to: '/dashboard/tutor/payments', label: 'Payments', icon: CreditCard },
  ];

  const studentLinks = [
    { to: '/dashboard/student', label: 'My Learning', icon: LayoutDashboard },
  ];

  const links =
    role === 'admin' ? adminLinks : role === 'tutor' ? tutorLinks : studentLinks;

  const navList = (
    <ul className="menu p-4 w-64 min-h-full bg-base-200 gap-1">
      <li className="menu-title text-accent font-semibold">Dashboard</li>
      {links.map(({ to, label, icon: Icon }) => (
        <li key={to}>
          <NavLink
            to={to}
            className={({ isActive }) => (isActive ? 'active' : '')}
            onClick={() => setSidebarOpen(false)}
          >
            <Icon className="w-5 h-5" />
            {label}
          </NavLink>
        </li>
      ))}
    </ul>
  );

  return (
    <DashboardContext.Provider value={{ dbUser, role }}>
      <div className="drawer lg:drawer-open">
        <input
          id="dashboard-drawer"
          type="checkbox"
          className="drawer-toggle"
          checked={sidebarOpen}
          onChange={(e) => setSidebarOpen(e.target.checked)}
        />
        <div className="drawer-content flex flex-col">
          <div className="navbar bg-base-200 lg:hidden sticky top-0 z-40">
            <div className="flex-none">
              <label
                htmlFor="dashboard-drawer"
                className="btn btn-ghost btn-square"
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6" />
              </label>
            </div>
            <div className="flex-1 justify-center">
              <Link to="/dashboard" className="text-xl font-bold text-accent">
                Dashboard
              </Link>
            </div>
          </div>
          <main className="flex-1 p-4 md:p-6">
            <Outlet />
          </main>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="dashboard-drawer"
            className="drawer-overlay"
            aria-label="Close sidebar"
          />
          <aside className="bg-base-200">{navList}</aside>
        </div>
      </div>
    </DashboardContext.Provider>
  );
};

export default DashboardLayout;
