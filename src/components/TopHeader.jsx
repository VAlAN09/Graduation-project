import React from 'react';
import { Search, Bell, ChevronDown, Menu } from 'lucide-react';

const TopHeader = ({ setMobileOpen }) => {
    return (
        <header className="sticky top-0 z-10 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <button
                    onClick={() => setMobileOpen(true)}
                    className="p-2 -ml-2 text-gray-500 hover:bg-gray-50 rounded-lg lg:hidden"
                >
                    <Menu size={24} />
                </button>

                <div className="relative hidden sm:block">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search for employees, documents, tasks..."
                        className="pl-10 pr-4 py-2.5 w-[320px] bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200 transition-all text-sm placeholder:text-gray-400"
                    />
                </div>
            </div>

            <div className="flex items-center gap-4">
                <button className="relative p-2 text-gray-500 hover:bg-gray-50 rounded-xl transition-colors">
                    <Bell size={20} />
                    <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                </button>

                <div className="h-8 w-px bg-gray-100 mx-1 hidden sm:block"></div>

                <div className="flex items-center gap-3 pl-2 cursor-pointer hover:bg-gray-50 p-1.5 rounded-xl transition-colors">
                    <div className="text-right hidden sm:block">
                        <div className="text-sm font-semibold text-gray-800">Admin</div>

                        <div className="text-xs text-gray-500 font-medium">Admin Manager</div>
                    </div>
                    <img
                        src="https://pixabay.com/images/search/user%20icon/"
                        alt="User"
                        className="w-10 h-10 rounded-full object-cover border-2 border-gray-50"
                    />
                    <ChevronDown size={16} className="text-gray-400 hidden sm:block" />
                </div>
            </div>
        </header>
    );
};

export default TopHeader;
