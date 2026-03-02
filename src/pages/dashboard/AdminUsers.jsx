import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Loading from '../../components/Loading';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editRole, setEditRole] = useState('');
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure
      .get('/users')
      .then((res) => setUsers(res.data))
      .catch(() => setUsers([]))
      .finally(() => setLoading(false));
  }, [axiosSecure]);

  const handleUpdateRole = (id) => {
    if (!editRole) return;
    axiosSecure
      .patch(`/users/${id}`, { role: editRole })
      .then(() => {
        setUsers((prev) =>
          prev.map((u) => (u._id === id ? { ...u, role: editRole } : u))
        );
        setEditingId(null);
      })
      .catch(() => {});
  };

  if (loading) return <Loading />;

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold text-accent mb-6">
        Manage Users
      </h1>
      <div className="overflow-x-auto bg-base-200 rounded-lg">
        <table className="table">
          <thead>
            <tr>
              <th>Avatar</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                <td>
                  <div className="avatar">
                    <div className="w-10 rounded-full">
                      <img
                        src={u.image || 'https://placehold.co/80'}
                        alt={u.name}
                      />
                    </div>
                  </div>
                </td>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>
                  {editingId === u._id ? (
                    <select
                      className="select select-bordered select-sm"
                      value={editRole}
                      onChange={(e) => setEditRole(e.target.value)}
                    >
                      <option value="student">Student</option>
                      <option value="tutor">Tutor</option>
                      <option value="admin">Admin</option>
                    </select>
                  ) : (
                    <span className="badge badge-outline">{u.role || 'student'}</span>
                  )}
                </td>
                <th>
                  {editingId === u._id ? (
                    <div className="flex gap-1">
                      <button
                        className="btn btn-xs btn-primary"
                        onClick={() => handleUpdateRole(u._id)}
                      >
                        Save
                      </button>
                      <button
                        className="btn btn-xs btn-ghost"
                        onClick={() => setEditingId(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      className="btn btn-xs btn-ghost"
                      onClick={() => {
                        setEditingId(u._id);
                        setEditRole(u.role || 'student');
                      }}
                    >
                      Edit
                    </button>
                  )}
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;
