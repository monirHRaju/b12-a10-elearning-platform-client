import React, { use, useEffect, useState } from 'react';
import { Link } from 'react-router';
import { AuthContext } from '../../context/AuthContext';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Loading from '../../components/Loading';
import { BookOpen } from 'lucide-react';

const StudentDashboard = () => {
  const { user } = use(AuthContext);
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (!user?.email) return;
    axiosSecure
      .get(`/my-enrolls?email=${user.email}`)
      .then((res) => setEnrollments(res.data))
      .catch(() => setEnrollments([]))
      .finally(() => setLoading(false));
  }, [user?.email, axiosSecure]);

  if (loading) return <Loading />;

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold text-accent mb-6">
        My Learning
      </h1>
      <div className="stats shadow mb-6 w-full max-w-xs">
        <div className="stat">
          <div className="stat-title">Enrolled Courses</div>
          <div className="stat-value text-primary">{enrollments.length}</div>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {enrollments.slice(0, 6).map((e) => (
          <Link
            key={e._id}
            to="/my-enrolled-courses"
            className="card bg-base-200 shadow hover:shadow-lg transition"
          >
            <div className="card-body flex-row items-center gap-4">
              <div className="avatar">
                <div className="w-16 rounded-lg">
                  <img
                    src={e.image || 'https://placehold.co/200'}
                    alt={e.title}
                  />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-accent">{e.title}</h3>
                <p className="text-sm text-accent/70">{e.category}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {enrollments.length > 6 && (
        <Link
          to="/my-enrolled-courses"
          className="btn btn-primary mt-4"
        >
          View all {enrollments.length} courses
        </Link>
      )}
      {enrollments.length === 0 && (
        <div className="text-center py-12 bg-base-200 rounded-lg">
          <BookOpen className="w-16 h-16 mx-auto text-accent/50 mb-4" />
          <p className="text-accent/70 mb-4">No enrolled courses yet.</p>
          <Link to="/courses" className="btn btn-primary">
            Browse Courses
          </Link>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;
