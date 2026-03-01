import React from 'react';
import { CalendarCheck, Download } from 'lucide-react';

const Attendance = () => {
    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Attendance</h1>
                    <p className="text-gray-500 mt-1">Monitor daily attendance and working hours.</p>
                </div>
                <button className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors shadow-sm">
                    <Download size={18} />
                    Export Report
                </button>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden mb-6">
                <div className="grid grid-cols-4 border-b border-gray-100 text-sm font-medium text-gray-500 bg-gray-50 p-4">
                    <div>Employee Name</div>
                    <div>Date</div>
                    <div>Check In</div>
                    <div>Check Out</div>
                </div>
                <div className="p-12 text-center text-gray-500">
                    <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CalendarCheck className="text-blue-500" size={28} />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-1">No attendance records today</h3>
                    <p className="text-sm">Employees haven't clocked in yet.</p>
                </div>
            </div>
        </div>
    );
};

export default Attendance;
