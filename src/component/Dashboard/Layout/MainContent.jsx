import React, { useRef, useEffect } from 'react';

const MainContent = () => {
  const loadingRef = useRef();

  useEffect(() => {
    if (loadingRef.current) {
      loadingRef.current.classList.add('hidden');
    }
  }, []);

  return (
    <main className="flex-1 max-h-full p-5 overflow-y-auto">
      <div
        ref={loadingRef}
        className="fixed inset-0 z-50 flex items-center justify-center text-white bg-black bg-opacity-50"
        style={{ backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)' }}
      >
        Loading.....
      </div>
      <h1 className="text-2xl font-semibold whitespace-nowrap">Dashboard</h1>
      {/* Example cards and table can go here, or <Outlet /> if nested routes */}
       <div className="grid grid-cols-1 mt-6 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="p-4 border rounded-lg shadow-sm hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-gray-400">Total Users</span>
                    <div className="text-lg font-semibold">100,221</div>
                  </div>
                  <div className="w-10 h-10 bg-gray-200 rounded" />
                </div>
                <div className="mt-2">
                  <span className="px-2 py-1 text-sm text-white bg-green-300 rounded">14%</span>{' '}
                  <span>from 2019</span>
                </div>
              </div>
            ))}
          </div>
    </main>
  );
};

export default MainContent;
