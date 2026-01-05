import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router';
import Footer from '../components/Footer';

const HomeLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <main><Outlet></Outlet></main>
            <Footer></Footer>
        </div>
    );
};

export default HomeLayout;