import React, { useState, useEffect } from 'react';
import { CalendarCheck, Download, Search, User, Clock, AlertCircle } from 'lucide-react';
import { api } from '../api/api';

const Attendance = () => {
    const [logs, setLogs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchAttendance = async () => {
        setIsLoading(true);
        try {
            const data = await api.get('/admin/attendance');
            setLogs(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Failed to fetch attendance logs:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchAttendance();
    }, []);

    const filteredLogs = logs.filter(log => {
        const userName = `${log.user?.first_name || ''} ${log.user?.last_name || ''}`.toLowerCase();
        return userName.includes(searchTerm.toLowerCase()) || 
               (log.status || '').toLowerCase().includes(searchTerm.toLowerCase());
    });

    const getStatusStyle = (status) => {
        switch (status?.toLowerCase()) {
            case 'present': return 'bg-green-50 text-green-700 border-green-100';
            case 'late': return 'bg-orange-50 text-orange-700 border-orange-100';
            case 'absent': return 'bg-red-50 text-red-700 border-red-100';
            default: return 'bg-gray-50 text-gray-700 border-gray-100';
        }
    };

    return (
        <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Attendance Logs</h1>
                    <p className="text-gray-500 mt-1">Monitor daily attendance and working hours across the company.</p>
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search employee..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        />
                    </div>
                    <button className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors shadow-sm whitespace-nowrap">
                        <Download size={18} />
                        Export
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    {isLoading ? (
                        <div className="p-12 text-center text-gray-500">Loading attendance data...</div>
                    ) : filteredLogs.length === 0 ? (
                        <div className="p-12 text-center text-gray-500">
                            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CalendarCheck className="text-blue-500" size={28} />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-1">No attendance records found</h3>
                            <p className="text-sm">Try adjusting your search or check again later.</p>
                        </div>
                    ) : (
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="text-xs font-bold text-gray-400 uppercase border-b border-gray-100 bg-gray-50/50">
                                    <th className="p-4">Employee</th>
                                    <th className="p-4">Date</th>
                                    <th className="p-4">Check In</th>
                                    <th className="p-4">Check Out</th>
                                    <th className="p-4">Status</th>
                                    <th className="p-4">Late (min)</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {filteredLogs.map((log) => (
                                    <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                                                    <User size={16} className="text-gray-400" />
                                                </div>
                                                <div className="font-medium text-gray-900">
                                                    {log.user?.first_name || 'Unknown'} {log.user?.last_name || ''}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4 text-sm text-gray-600 font-medium">{log.date}</td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-2 text-sm text-gray-900">
                                                <Clock size={14} className="text-green-500" />
                                                {log.time_in || '--:--'}
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-2 text-sm text-gray-900">
                                                <Clock size={14} className="text-orange-500" />
                                                {log.time_out || '--:--'}
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${getStatusStyle(log.status)} capitalize`}>
                                                {log.status || 'N/A'}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            {log.late_minutes > 0 ? (
                                                <div className="flex items-center gap-1.5 text-sm text-orange-600 font-medium">
                                                    <AlertCircle size={14} />
                                                    {log.late_minutes} min
                                                </div>
                                            ) : (
                                                <span className="text-sm text-gray-400">---</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Attendance;
