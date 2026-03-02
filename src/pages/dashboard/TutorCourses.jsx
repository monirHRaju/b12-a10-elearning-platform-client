import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import CourseList from '../../components/CourseList';
import Loading from '../../components/Loading';
import { Link } from 'react-router';

const TutorCourses = () => {
  const { user } = use(AuthContext);
  const [myCourses, setMyCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (!user?.email) return;
    axiosSecure
      .get(`/my-courses?email=${user.email}`)
      .then((data) => {
        setMyCourses(data.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [user?.email, axiosSecure]);

  if (loading) return <Loading />;

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-accent">
          My Courses
        </h1>
        <Link to="/create-course" className="btn btn-primary">
          Create Course
        </Link>
      </div>
      <div className="overflow-x-auto bg-base-200 rounded-lg">
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Price</th>
              <th>Level</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {myCourses.map((course) => (
              <CourseList
                key={course._id}
                course={course}
                onDeleteSuccess={(id) => setMyCourses((prev) => prev.filter((c) => c._id !== id))}
              />
            ))}
          </tbody>
        </table>
      </div>
      {myCourses.length === 0 && (
        <p className="text-accent/70 text-center py-8">No courses yet.</p>
      )}
    </div>
  );
};

export default TutorCourses;
