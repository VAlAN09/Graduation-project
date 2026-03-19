import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Clock } from 'lucide-react';

const EmployeeAttendance = () => {
    const [recentDays, setRecentDays] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Fetch attendance data here
        // setIsLoading(true);
        // fetch('/api/attendance').then(...).finally(() => setIsLoading(false));
    }, []);

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div className="bg-blue-100 p-3 rounded-xl text-blue-600">
                        <CalendarIcon className="w-6 h-6" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900">Current Month</h1>
                </div>

                {/* Legend */}
                <div className="flex items-center space-x-4 text-sm font-medium bg-white px-4 py-2 rounded-lg shadow-sm">
                    <div className="flex items-center space-x-2">
                        <div className="w-3 h-1 bg-green-500 rounded-full"></div>
                        <span className="text-gray-600">Present</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className="w-3 h-1 bg-red-500 rounded-full"></div>
                        <span className="text-gray-600">Absent</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className="w-3 h-1 bg-orange-500 rounded-full"></div>
                        <span className="text-gray-600">Leave</span>
                    </div>
                </div>
            </div>

            {/* List View */}
            <div className="bg-white shadow-md rounded-xl overflow-hidden min-h-[200px]">
                {isLoading ? (
                    <div className="p-8 text-center text-gray-500">Loading attendance data...</div>
                ) : recentDays.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">No attendance records found.</div>
                ) : (
                    <div className="divide-y divide-gray-100">
                        {recentDays.map((record, idx) => (
                            <div key={idx} className="p-5 flex flex-col md:flex-row md:items-center justify-between hover:bg-gray-50 transition-colors">
                                <div className="flex items-center space-x-4 mb-4 md:mb-0 w-full md:w-1/3">
                                    <div className="text-center w-14 bg-gray-50 py-2 rounded-lg border border-gray-100">
                                        <span className="block text-xs text-gray-500 uppercase font-medium">{record.day}</span>
                                        <span className="block text-lg font-bold text-gray-900">{record.date.split(' ')[0]}</span>
                                    </div>
                                    <div className="font-medium text-gray-800">
                                        {record.date}
                                    </div>
                                </div>

                                <div className="flex flex-1 items-center justify-between lg:justify-end lg:space-x-12">
                                    <div className="flex space-x-8 text-sm">
                                        <div>
                                            <p className="text-gray-500 mb-1 flex items-center gap-1.5"><Clock className="w-3.5 h-3.5"/> In</p>
                                            <p className="font-semibold text-gray-900">{record.in}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-500 mb-1 flex items-center gap-1.5"><Clock className="w-3.5 h-3.5"/> Out</p>
                                            <p className="font-semibold text-gray-900">{record.out}</p>
                                        </div>
                                        <div className="hidden sm:block">
                                            <p className="text-gray-500 mb-1">Duration</p>
                                            <p className="font-semibold text-gray-900">{record.duration}</p>
                                        </div>
                                    </div>

                                    <div className="min-w-[100px] text-right">
                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold
                                            ${record.status === 'Present' ? 'bg-green-100 text-green-700' : ''}
                                            ${record.status === 'Absent' ? 'bg-red-100 text-red-700' : ''}
                                            ${record.status === 'Leave' ? 'bg-orange-100 text-orange-700' : ''}
                                        `}>
                                            {record.status}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

        </div>
    );
};

export default EmployeeAttendance;
