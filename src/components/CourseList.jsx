import React from "react";
import { FaPen } from "react-icons/fa";
import { IoTrashBin } from "react-icons/io5";
import { Link, useNavigate } from "react-router";
import useAxios from "../hooks/useAxios";
import Swal from "sweetalert2";

const CourseList = ({course}) => {
  
  const axiosInstance = useAxios()
  const navigate = useNavigate()

  const handleDeleteCourse = () => {
    
    // delete confirmation
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true, // Display a cancel button alongside the confirm button
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!" // Customize the confirm button text
    }).then((result) => {
        if (result.isConfirmed) {
            // User clicked the confirm button
            axiosInstance.delete(`/courses/${course._id}`)
            .then(data  => {

                navigate('/my-added-courses')

            })

            .catch(err => {
                Swal.fire({
                title: `Failed!. ${err}`,
                position: "top-end",
                icon: "failed",
                showConfirmButton: false,
                timer: 1500
                });
            })
            
            Swal.fire(
                "Deleted!",
                "Your imaginary file has been deleted.",
                "success"
            );
            // Perform the action associated with confirmation (e.g., delete data)
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            // User clicked the cancel button or dismissed the alert
            Swal.fire(
                "Cancelled",
                "Your imaginary file is safe :)",
                "error"
            );
        }
    });

  }
  return (
    
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
          
   
  );
};

export default CourseList;
