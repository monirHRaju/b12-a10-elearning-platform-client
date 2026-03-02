import React, { use } from 'react';
import { Navigate } from 'react-router';
import { DashboardContext } from '../context/DashboardContext';

const RoleRoute = ({ children, allowedRoles }) => {
  const { role } = use(DashboardContext);

  if (!allowedRoles.includes(role)) {
    const defaultPath =
      role === 'admin'
        ? '/dashboard/admin/users'
        : role === 'tutor'
          ? '/dashboard/tutor/courses'
          : '/dashboard/student';
    return <Navigate to={defaultPath} replace />;
  }

  return children;
};

export default RoleRoute;
