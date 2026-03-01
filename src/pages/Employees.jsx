import React from 'react';
import { Search, Plus } from 'lucide-react';

const Employees = () => {
    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Employees</h1>
                    <p className="text-gray-500 mt-1">Manage your team members and their information.</p>
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors">
                    <Plus size={18} />
                    Add Employee
                </button>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden mb-6">
                <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                    <div className="relative w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input type="text" placeholder="Search employees..." className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100" />
                    </div>
                </div>
                <div className="p-10 text-center text-gray-500">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Users className="text-gray-400" size={24} />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-1">No employees found</h3>
                    <p className="text-sm">Get started by adding a new employee to the system.</p>
                </div>
            </div>
        </div>
    );
};

import { Users } from 'lucide-react';

export default Employees;
