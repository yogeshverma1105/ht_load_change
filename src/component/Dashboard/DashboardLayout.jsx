import React from 'react';
import Sidebar from './Layout/SideBar'
import Header from './Layout/Header';
import Footer from './layout/Footer';
import MainContent from './layout/MainContent';
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  return (
    <div className="flex h-screen overflow-y-hidden bg-white">
      <Sidebar />
      <div className="flex flex-col flex-1 h-full overflow-hidden lg:w-75">
        <Header />
        <Outlet></Outlet>
        <Footer />
      </div>
    </div>
  );
};

export default DashboardLayout;