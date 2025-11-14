import React from "react";
import { FaPen } from "react-icons/fa";
import { IoTrashBin } from "react-icons/io5";
import { Link } from "react-router";

const MyEnrolledList = ({course}) => {

  return (
    
      <tr>
              
              <td>
               {course.title}
              </td>
              <td>
                $ {course.price}
              </td>
              <td>{course.difficulty_level}</td>
              
            </tr>
          
   
  );
};

export default MyEnrolledList;
