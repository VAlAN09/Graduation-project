import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Database, Users, CalendarCheck, Clock, Layers, Star, UserPlus, FileText, Settings, LogOut } from 'lucide-react';
import clsx from 'clsx';

const Sidebar = ({ mobileOpen, setMobileOpen, activeTab, setActiveTab }) => {
  const navigate = useNavigate();
  const menuItems = [
    { icon: Database, label: 'Dashboard' },
    { icon: Users, label: 'Employees' },
    { icon: CalendarCheck, label: 'Attendance' },
    { icon: Clock, label: 'Leave Management' },
    { icon: Layers, label: 'Payroll' },
    { icon: Star, label: 'Performance' },
    { icon: UserPlus, label: 'Recruitment' },
    { icon: FileText, label: 'Reports' },
    { icon: Settings, label: 'Settings' },
  ];

  return (
    <>
      <div
        className={clsx(
          "fixed inset-0 z-20 bg-black/50 transition-opacity lg:hidden",
          mobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setMobileOpen(false)}
      />

      <aside className={clsx(
        "fixed top-0 left-0 z-30 h-screen w-64 bg-white border-r border-gray-100 transition-transform duration-300 lg:translate-x-0",
        mobileOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="h-full flex flex-col p-6">
          <div className="mb-10 flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold shadow-sm">M</div>
            <h1 className="text-xl font-bold text-gray-800">Managly</h1>
          </div>

          <nav className="flex-1 space-y-1">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (setActiveTab) {
                    setActiveTab(item.label);
                  }
                  if (setMobileOpen) {
                    setMobileOpen(false);
                  }
                }}
                className={clsx(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium",
                  activeTab === item.label
                    ? "bg-blue-50 text-blue-600 shadow-sm"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                <item.icon size={20} />
                {item.label}
              </a>
            ))}
          </nav>

          <div className="pt-6 border-t border-gray-50">
            <button 
              onClick={() => {
                localStorage.removeItem('isAuthenticated');
                navigate('/login');
              }}
              className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-gray-500 hover:bg-red-50 hover:text-red-600 transition-colors text-sm font-medium"
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
