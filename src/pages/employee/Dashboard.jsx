import React, { useState, useEffect } from 'react';
import { CheckCircle, Clock, Calendar, FileText, List, ChevronRight, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { api } from '../../api/api';

const Card = ({ children, className = "" }) => (
    <div className={`bg-white rounded-xl shadow-md overflow-hidden ${className}`}>
        {children}
    </div>
);


const EmployeeDashboard = () => {
    const navigate = useNavigate();
    const [statusData, setStatusData] = useState(null);

    const [leaveBalances, setLeaveBalances] = useState(null);
    const [latestPayslip, setLatestPayslip] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const data = await api.get('/dashboard');
                setStatusData(data.statusData);
                setLeaveBalances(data.leaveBalances);
                setLatestPayslip(data.latestPayslip);
            } catch (error) {
                console.error("Failed to fetch dashboard data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDashboardData();
    }, []);


    if (isLoading) {
        return <div className="text-center mt-20 text-gray-500">Loading dashboard...</div>;
    }

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Home</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Main Left Column (2/3 width) */}
                <div className="lg:col-span-2 space-y-6">
                    
                    {/* Today's Status */}
                    <Card>
                        <div className="p-5 border-b border-gray-100">
                            <h2 className="text-lg font-semibold text-gray-800">Today's Status</h2>
                        </div>
                        <div className="p-6 flex flex-col sm:flex-row items-center justify-between">
                            {statusData ? (
                                <>
                                    <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                                        <CheckCircle className="w-12 h-12 text-green-500" />
                                        <div>
                                            <p className="text-xl font-bold text-gray-900">Checked In</p>
                                            <p className="text-sm text-green-600 font-medium">On Time</p>
                                        </div>
                                    </div>
                                    <div className="flex space-x-8">
                                        <div className="flex flex-col">
                                            <div className="flex items-center space-x-2 text-gray-500 mb-1">
                                                <Clock className="w-4 h-4 text-green-600" />
                                                <span className="text-sm">Check-in Time</span>
                                            </div>
                                            <span className="text-lg font-semibold text-gray-900">{statusData?.checkIn || '--:--'}</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <div className="flex items-center space-x-2 text-gray-500 mb-1">
                                                <Clock className="w-4 h-4 text-orange-500" />
                                                <span className="text-sm">Check-out Time</span>
                                            </div>
                                            <span className="text-lg font-semibold text-gray-900">{statusData?.checkOut || '--:--'}</span>
                                        </div>

                                    </div>
                                </>
                            ) : (
                                <div className="flex items-center space-x-3 text-gray-500 py-2">
                                    <AlertCircle className="w-6 h-6" />
                                    <span>No status data available for today.</span>
                                </div>
                            )}
                        </div>
                    </Card>

                    {/* Quick Actions */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <button 
                            onClick={() => navigate('/employee/leaves')}
                            className="flex flex-col items-center justify-center p-6 bg-blue-50 hover:bg-blue-100/80 rounded-xl transition-colors group"
                        >

                            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                <Calendar className="w-6 h-6" />
                            </div>
                            <span className="font-medium text-blue-900">Request Leave</span>
                        </button>
                        <button 
                            onClick={() => navigate('/employee/payslips')}
                            className="flex flex-col items-center justify-center p-6 bg-blue-50 hover:bg-blue-100/80 rounded-xl transition-colors group"
                        >

                            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                <FileText className="w-6 h-6" />
                            </div>
                            <span className="font-medium text-blue-900">View Payslips</span>
                        </button>
                        <button 
                            onClick={() => navigate('/employee/tasks')}
                            className="flex flex-col items-center justify-center p-6 bg-blue-50 hover:bg-blue-100/80 rounded-xl transition-colors group"
                        >

                            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                <List className="w-6 h-6" />
                            </div>
                            <span className="font-medium text-blue-900">Tasks</span>
                        </button>
                    </div>

                </div>

                {/* Right Side Column (1/3 width) */}
                <div className="space-y-6">
                    
                    {/* Leave Balances */}
                    <Card>
                        <div className="p-5 border-b border-gray-100 flex justify-between items-center">
                            <h2 className="text-lg font-semibold text-gray-800">Leave Balances</h2>
                            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">Details</button>
                        </div>
                        <div className="p-5 space-y-5">
                            {leaveBalances ? (
                                <>
                                    <div>
                                        <div className="flex justify-between text-sm mb-1.5">
                                            <span className="text-gray-600 font-medium">Casual Leave</span>
                                            <span className="text-gray-900 font-semibold">{leaveBalances?.casual?.used || 0} / {leaveBalances?.casual?.total || 0}</span>
                                        </div>
                                        <div className="w-full bg-gray-100 rounded-full h-2">
                                            <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${((leaveBalances?.casual?.used || 0) / (leaveBalances?.casual?.total || 1)) * 100}%` }}></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-sm mb-1.5">
                                            <span className="text-gray-600 font-medium">Sick Leave</span>
                                            <span className="text-gray-900 font-semibold">{leaveBalances?.sick?.used || 0} / {leaveBalances?.sick?.total || 0}</span>
                                        </div>
                                        <div className="w-full bg-gray-100 rounded-full h-2">
                                            <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${((leaveBalances?.sick?.used || 0) / (leaveBalances?.sick?.total || 1)) * 100}%` }}></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-sm mb-1.5">
                                            <span className="text-gray-600 font-medium">Vacation</span>
                                            <span className="text-gray-900 font-semibold">{leaveBalances?.vacation?.used || 0} / {leaveBalances?.vacation?.total || 0}</span>
                                        </div>
                                        <div className="w-full bg-gray-100 rounded-full h-2">
                                            <div className="bg-purple-500 h-2 rounded-full" style={{ width: `${((leaveBalances?.vacation?.used || 0) / (leaveBalances?.vacation?.total || 1)) * 100}%` }}></div>
                                        </div>
                                    </div>

                                </>
                            ) : (
                                <div className="text-sm text-gray-500 py-2">No leave balance data to display.</div>
                            )}
                        </div>
                    </Card>

                    {/* Latest Payslip */}
                    <Card>
                        <div className="p-5 border-b border-gray-100">
                            <h2 className="text-lg font-semibold text-gray-800">Latest Payslip</h2>
                        </div>
                        <div className="p-5">
                            {latestPayslip ? (
                                <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg cursor-pointer hover:bg-blue-50 transition-colors">
                                    <div>
                                        <p className="text-sm text-gray-500 font-medium">{latestPayslip.month}</p>
                                        <p className="text-gray-900 font-semibold">{latestPayslip.type}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-lg font-bold text-gray-900">{latestPayslip.amount}</p>
                                    </div>
                                    <ChevronRight className="text-gray-400 w-5 h-5" />
                                </div>
                            ) : (
                                <div className="text-sm text-gray-500 py-2">No recent payslips found.</div>
                            )}
                        </div>
                    </Card>

                </div>
            </div>
        </div>
    );
};

export default EmployeeDashboard;
