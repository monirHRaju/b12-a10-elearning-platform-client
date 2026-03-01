import React, { useState } from "react";
import { FaPen } from "react-icons/fa";
import { IoTrashBin } from "react-icons/io5";
import { Link, useNavigate } from "react-router";
import useAxios from "../hooks/useAxios";
import toast from "react-hot-toast";
import ConfirmModal from "./ConfirmModal";

const CourseList = ({course}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const axiosInstance = useAxios();
  const navigate = useNavigate();

  const handleDeleteCourse = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    axiosInstance.delete(`/courses/${course._id}`)
      .then(() => {
        toast.success("Course deleted");
        navigate('/my-added-courses');
      })
      .catch(err => {
        toast.error(err?.message || "Failed to delete");
      });
  };
  return (
    <>
      <ConfirmModal
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
        title="Delete course?"
        message="You won't be able to revert this!"
        confirmText="Yes, delete it"
        cancelText="Cancel"
        variant="error"
      />
      <tr>
              
              <td>
               {course.title}
              </td>
              <td>
                $ {course.price}
              </td>
              <td>{course.difficulty_level}</td>
              <th>
                <Link to={`/update-course/${course._id}`}  className="btn btn-ghost btn-xs"><FaPen></FaPen></Link>
                <button onClick={handleDeleteCourse}  className="btn btn-ghost btn-xs"><IoTrashBin /></button>
              </th>
            </tr>
    </>
  );
};

export default CourseList;
