import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Clock } from 'lucide-react';
import { api } from '../../api/api';

const EmployeeAttendance = () => {
    const [records, setRecords] = useState([]);
    const [summary, setSummary] = useState({ present_days: 0, absent_days: 0, leave_days: 0 });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAttendance = async () => {
            try {
                const data = await api.get('/attendance-history');
                console.log('Attendance API data:', data); // هنا نشوف الداتا

                setRecords(data.records);
                setSummary(data.summary);
            } catch (error) {
                console.error("Failed to fetch attendance:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAttendance();
    }, []);

    const formatTime = (time) => time ? time.substring(0,5) : '--:--';
    const capitalize = (s) => s ? s.charAt(0).toUpperCase() + s.slice(1) : '--';
    
    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div className="bg-blue-100 p-3 rounded-xl text-blue-600">
                        <CalendarIcon className="w-6 h-6" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900">Current Month</h1>
                </div>

                <div className="flex items-center space-x-4 text-sm font-medium bg-white px-4 py-2 rounded-lg shadow-sm">
                    <div className="flex items-center space-x-2">
                        <div className="w-3 h-1 bg-green-500 rounded-full"></div>
                        <span className="text-gray-600">Present ({summary.present_days})</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className="w-3 h-1 bg-red-500 rounded-full"></div>
                        <span className="text-gray-600">Absent ({summary.absent_days})</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className="w-3 h-1 bg-orange-500 rounded-full"></div>
                        <span className="text-gray-600">Leave ({summary.leave_days})</span>
                    </div>
                </div>
            </div>

            <div className="bg-white shadow-md rounded-xl overflow-hidden min-h-[200px]">
                {isLoading ? (
                    <div className="p-8 text-center text-gray-500">Loading attendance data...</div>
                ) : records.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">No attendance records found.</div>
                ) : (
                    <table className="min-w-full text-left">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="px-4 py-2">Day</th>
                                <th className="px-4 py-2">Date</th>
                                <th className="px-4 py-2">In</th>
                                <th className="px-4 py-2">Out</th>
                                <th className="px-4 py-2">Duration</th>
                                <th className="px-4 py-2">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {records.map((rec, idx) => {
                                const inTime = formatTime(rec.in_time);
                                const outTime = formatTime(rec.out_time);
                                const duration = (rec.in_time && rec.out_time)
                                    ? `${Math.floor((new Date(`2000-01-01T${outTime}`) - new Date(`2000-01-01T${inTime}`))/60000/60)}h ${Math.floor((new Date(`2000-01-01T${outTime}`) - new Date(`2000-01-01T${inTime}`))/60000%60)}m`
                                    : '--';
                                const status = capitalize(rec.status);

                                return (
                                    <tr key={idx} className="hover:bg-gray-50">
                                        <td className="px-4 py-2">{rec.day.substring(0,3)}</td>
                                        <td className="px-4 py-2">{new Date(rec.date).toLocaleDateString('en-GB', {day:'2-digit', month:'short'})}</td>
                                        <td className="px-4 py-2">{inTime}</td>
                                        <td className="px-4 py-2">{outTime}</td>
                                        <td className="px-4 py-2">{duration}</td>
                                        <td className="px-4 py-2">
                                            <span className={`px-2 py-1 rounded-full text-xs font-bold 
                                                ${status === 'Present' ? 'bg-green-100 text-green-700' : ''}
                                                ${status === 'Absent' ? 'bg-red-100 text-red-700' : ''}
                                                ${status === 'Leave' ? 'bg-orange-100 text-orange-700' : ''}`}>
                                                {status}
                                            </span>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default EmployeeAttendance;