import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { HiOutlineMenu, HiOutlineX, HiOutlineSearch, HiOutlineBell } from 'react-icons/hi';

export default function Layout({ sidebar: Sidebar }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f6f7f8] flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      {Sidebar && (
        <>
          {/* Mobile sidebar */}
          <aside
            className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out lg:hidden ${
              sidebarOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            <div className="absolute top-4 right-4">
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 cursor-pointer"
              >
                <HiOutlineX className="w-5 h-5" />
              </button>
            </div>
            <Sidebar />
          </aside>

          {/* Desktop sidebar */}
          <aside className="hidden lg:flex w-64 shrink-0 border-r border-gray-200 bg-white flex-col fixed inset-y-0 left-0 z-30">
            <Sidebar />
          </aside>
        </>
      )}

      {/* Main content */}
      <div className={`flex-1 flex flex-col min-w-0 overflow-hidden ${Sidebar ? 'lg:ml-64' : ''}`}>
        {/* Top bar */}
        <header className="h-16 border-b border-gray-200 bg-white flex items-center justify-between px-4 md:px-8 shrink-0">
          <div className="flex items-center gap-3">
            {/* Mobile menu button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 cursor-pointer"
            >
              <HiOutlineMenu className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            {/* Search (hidden on small screens) */}
            <div className="relative hidden md:block">
              <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                className="pl-10 pr-4 py-2 bg-gray-100 border-none rounded-lg text-sm w-48 lg:w-72 focus:ring-2 focus:ring-[#137fec] transition-all"
                placeholder="Search..."
                type="text"
              />
            </div>
            <button className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center text-gray-500 hover:bg-gray-100 rounded-full relative cursor-pointer">
              <HiOutlineBell className="w-5 h-5 md:w-6 md:h-6" />
              <span className="absolute top-1.5 md:top-2 right-1.5 md:right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
