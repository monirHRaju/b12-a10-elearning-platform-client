import React, { use } from 'react';
import { Navigate } from 'react-router';
import { DashboardContext } from '../../context/DashboardContext';

const DashboardIndex = () => {
  const { role } = use(DashboardContext);

  const path =
    role === 'admin'
      ? '/dashboard/admin/users'
      : role === 'tutor'
        ? '/dashboard/tutor/courses'
        : '/dashboard/student';

  return <Navigate to={path} replace />;
};

export default DashboardIndex;
