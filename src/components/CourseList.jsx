import React from "react";
import { FaPen } from "react-icons/fa";
import { IoTrashBin } from "react-icons/io5";
import { Link } from "react-router";

const CourseList = ({course}) => {
  const handleDeleteCourse = () => {

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
