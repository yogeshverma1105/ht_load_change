
import React, { useState, useEffect } from 'react';

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    const savedState = localStorage.getItem('isSidebarOpen');
    if (savedState !== null) setIsSidebarOpen(JSON.parse(savedState));
  }, []);

  const toggleSidebar = () => {
    const newState = !isSidebarOpen;
    setIsSidebarOpen(newState);
    localStorage.setItem('isSidebarOpen', JSON.stringify(newState));
  };

  return (
    <>
      {/* {isSidebarOpen && (
        <div className="fixed inset-0 z-10 bg-black bg-opacity-20 lg:hidden"></div>
      )} */}
      <aside
        className={`fixed inset-y-0 z-10 flex flex-col w-64 max-h-screen overflow-hidden bg-white border-r shadow-lg transition-all transform lg:static lg:z-auto lg:shadow-none ${
          !isSidebarOpen ? '-translate-x-full lg:translate-x-0 lg:w-20' : ''
        }`}
      >
        <div className={`flex items-center justify-between p-2 ${!isSidebarOpen ? 'lg:justify-center' : ''}`}>
          <span className="p-2 text-xl font-semibold leading-8 tracking-wider uppercase whitespace-nowrap">
            K<span className={!isSidebarOpen ? 'lg:hidden' : ''}>-WD</span>
          </span>
          <button onClick={toggleSidebar} className="p-2 rounded-md lg:hidden">
            <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav className="flex-1 overflow-hidden hover:overflow-y-auto">
          <ul className="p-2">
            <li>
              <a href="#" className={`flex items-center p-2 space-x-2 rounded-md hover:bg-gray-100 ${!isSidebarOpen ? 'justify-center' : ''}`}>
                <span>
                  <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </span>
                {isSidebarOpen && <span>Dashboard</span>}
              </a>
            </li>
            <li>
              <a href="#" className={`flex items-center p-2 space-x-2 rounded-md hover:bg-gray-100 ${!isSidebarOpen ? 'justify-center' : ''}`}>
                <span>
                  <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </span>
                {isSidebarOpen && <span>Download PDF</span>}
              </a>
            </li>
          </ul>
        </nav>
        <div className="flex-shrink-0 p-2 border-t max-h-14">
          <button className="flex items-center justify-center w-full px-4 py-2 space-x-1 font-medium tracking-wider uppercase bg-gray-100 border rounded-md">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            {isSidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;