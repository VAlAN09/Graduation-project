import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, ChevronDown, Menu, User, Settings as SettingsIcon, LogOut } from 'lucide-react';

const TopHeader = ({ setMobileOpen, setActiveTab, userProfilePicture }) => {
    const [profileOpen, setProfileOpen] = useState(false);
    const [notificationsOpen, setNotificationsOpen] = useState(false);
    const profileRef = useRef(null);
    const notificationsRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) setProfileOpen(false);
            if (notificationsRef.current && !notificationsRef.current.contains(event.target)) setNotificationsOpen(false);
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const navigateToSettings = (sectionId) => {
        if (setActiveTab) setActiveTab('Settings');
        setProfileOpen(false);
        setNotificationsOpen(false);

        if (sectionId) {
            let attempts = 0;
            const checkExist = setInterval(() => {
                const el = document.getElementById(sectionId);
                if (el) {
                    clearInterval(checkExist);
                    setTimeout(() => {
                        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }, 50);
                }
                attempts++;
                if (attempts > 20) {
                    clearInterval(checkExist);
                }
            }, 50);
        }
    };

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
                <div className="relative" ref={notificationsRef}>
                    <button
                        onClick={() => { setNotificationsOpen(!notificationsOpen); setProfileOpen(false); }}
                        className="relative p-2 text-gray-500 hover:bg-gray-50 rounded-xl transition-colors"
                    >
                        <Bell size={20} />
                    </button>

                    {notificationsOpen && (
                        <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                            <div className="px-4 py-2 border-b border-gray-50">
                                <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
                            </div>
                            <div className="px-4 py-3 text-sm text-gray-500 text-center">
                                No new notifications
                            </div>
                            <div className="px-2 pt-2 border-t border-gray-50">
                                <button
                                    onClick={() => navigateToSettings('notification-settings')}
                                    className="w-full text-center px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium"
                                >
                                    Notification Center
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                <div className="h-8 w-px bg-gray-100 mx-1 hidden sm:block"></div>

                <div className="relative" ref={profileRef}>
                    <div
                        onClick={() => { setProfileOpen(!profileOpen); setNotificationsOpen(false); }}
                        className="flex items-center gap-3 pl-2 cursor-pointer hover:bg-gray-50 p-1.5 rounded-xl transition-colors"
                    >
                        <div className="text-right hidden sm:block">
                            <div className="text-sm font-semibold text-gray-800">Admin</div>
                            <div className="text-xs text-gray-500 font-medium">Admin Manager</div>
                        </div>
                        <img
                            src={userProfilePicture}
                            alt="User"
                            className="w-10 h-10 rounded-full object-cover border-2 border-gray-50 cursor-pointer"
                        />
                        <ChevronDown size={16} className={`text-gray-400 hidden sm:block transition-transform duration-200 ${profileOpen ? 'rotate-180' : ''}`} />
                    </div>

                    {profileOpen && (
                        <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                            <button
                                onClick={() => navigateToSettings('account-settings')}
                                className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                                <User size={16} className="mr-3 text-gray-400" />
                                My Profile
                            </button>
                            <button
                                onClick={() => navigateToSettings('account-settings')}
                                className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                                <SettingsIcon size={16} className="mr-3 text-gray-400" />
                                Account Settings
                            </button>
                            <div className="h-px bg-gray-100 my-2"></div>
                            <button
                                onClick={() => {
                                    setProfileOpen(false);
                                    localStorage.removeItem('isAuthenticated');
                                    navigate('/login');
                                }}
                                className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                            >
                                <LogOut size={16} className="mr-3 text-red-500" />
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default TopHeader;
