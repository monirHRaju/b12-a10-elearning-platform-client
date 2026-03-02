import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Loading from '../../components/Loading';

const TutorStudents = () => {
  const { user } = use(AuthContext);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (!user?.email) return;
    axiosSecure
      .get(`/students?email=${user.email}`)
      .then((res) => setStudents(res.data))
      .catch(() => setStudents([]))
      .finally(() => setLoading(false));
  }, [user?.email, axiosSecure]);

  if (loading) return <Loading />;

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold text-accent mb-6">
        My Students
      </h1>
      <div className="overflow-x-auto bg-base-200 rounded-lg">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s, i) => (
              <tr key={s.email}>
                <th>{i + 1}</th>
                <td>{s.name}</td>
                <td>{s.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {students.length === 0 && (
        <p className="text-accent/70 text-center py-8">No students enrolled yet.</p>
      )}
    </div>
  );
};

export default TutorStudents;
