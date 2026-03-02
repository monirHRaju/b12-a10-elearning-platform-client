import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Loading from '../../components/Loading';

const TutorPayments = () => {
  const { user } = use(AuthContext);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (!user?.email) return;
    axiosSecure
      .get('/payments')
      .then((res) => setPayments(res.data))
      .catch(() => setPayments([]))
      .finally(() => setLoading(false));
  }, [user?.email, axiosSecure]);

  if (loading) return <Loading />;

  const total = payments.reduce((s, p) => s + (p.amount || 0), 0);

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold text-accent mb-6">
        Payments
      </h1>
      <div className="stats shadow mb-6 w-full max-w-xs">
        <div className="stat">
          <div className="stat-title">Total Earnings</div>
          <div className="stat-value text-primary">${total.toFixed(2)}</div>
        </div>
      </div>
      <div className="overflow-x-auto bg-base-200 rounded-lg">
        <table className="table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Course</th>
              <th>Student</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p) => (
              <tr key={p._id}>
                <td>
                  {p.createdAt
                    ? new Date(p.createdAt).toLocaleDateString()
                    : '-'}
                </td>
                <td>{p.courseTitle || '-'}</td>
                <td>{p.studentEmail}</td>
                <td>${(p.amount || 0).toFixed(2)}</td>
                <td>
                  <span
                    className={`badge ${
                      p.status === 'completed'
                        ? 'badge-success'
                        : p.status === 'pending'
                          ? 'badge-warning'
                          : 'badge-ghost'
                    }`}
                  >
                    {p.status || '-'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {payments.length === 0 && (
        <p className="text-accent/70 text-center py-8">No payments yet.</p>
      )}
    </div>
  );
};

export default TutorPayments;
