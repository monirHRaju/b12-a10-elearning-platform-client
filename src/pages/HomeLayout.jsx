import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router';
import Footer from '../components/Footer';

const HomeLayout = () => {
    return (
        <>
            <Navbar></Navbar>
            <main><Outlet></Outlet></main>
            <Footer></Footer>
        </>
    );
};

export default HomeLayout;