import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../component/Navbar/Navbar';
import Footer from '../component/Footer/Footer';

function Layout() {
  return (
    <div>
      <Navbar/>
      <main>
        <Outlet />
      </main>
      <Footer/>
    </div>
  );
}

export default Layout;
