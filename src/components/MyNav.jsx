import React from 'react';
import { NavLink } from 'react-router';

const MyNav = ({to, className, children}) => {
    return (
        <NavLink
            to={to}
            className={({isActive})=> isActive ? 'font-semibold underline text-accent mr-4' : `${className} text-accent mr-4`}
        >
            {children}
        </NavLink>
    );
};

export default MyNav;