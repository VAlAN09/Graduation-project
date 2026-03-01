import React from 'react';
import { Users, Calendar, Briefcase, TrendingUp } from 'lucide-react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    LineChart, Line
} from 'recharts';
import StatCard from '../components/StatCard';
import ChartCard from '../components/ChartCard';

const dataAttendance = [
    { name: 'Mon', present: 0 },
    { name: 'Tue', present: 0 },
    { name: 'Wed', present: 0 },
    { name: 'Thu', present: 0 },
    { name: 'Fri', present: 0 },
];

const dataGrowth = [
    { name: 'Jan', employees: 0 },
    { name: 'Feb', employees: 0 },
    { name: 'Mar', employees: 0 },
    { name: 'Apr', employees: 0 },
    { name: 'May', employees: 0 },
    { name: 'Jun', employees: 0 },
];

const Dashboard = () => {
    return (
        <>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Dashboard Overview</h1>
                <p className="text-gray-500 mt-1">Welcome back, Administrator. Here's what's happening today.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard
                    title="Total Employees"
                    value="0"
                    change="0%"
                    trend="up"
                    icon={Users}
                    color="blue"
                />
                <StatCard
                    title="On Leave Today"
                    value="0"
                    change="0%"
                    trend="down"
                    icon={Calendar}
                    color="orange"
                />
                <StatCard
                    title="Open Positions"
                    value="0"
                    change="0%"
                    trend="up"
                    icon={Briefcase}
                    color="purple"
                />
                <StatCard
                    title="Performance Avg"
                    value="0%"
                    change="0%"
                    trend="up"
                    icon={TrendingUp}
                    color="green"
                />
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <ChartCard
                    title="Attendance Trends"
                    action={
                        <select className="bg-gray-50 border border-gray-200 text-gray-600 text-sm rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-100 cursor-pointer">
                            <option>Last 7 Days</option>
                            <option>Last Month</option>
                        </select>
                    }
                >
                    <div className="h-[300px] w-full mt-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={dataAttendance} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#9CA3AF', fontSize: 12 }}
                                    dy={10}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#9CA3AF', fontSize: 12 }}
                                />
                                <Tooltip
                                    cursor={{ fill: '#F9FAFB' }}
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Bar dataKey="present" fill="#3B82F6" radius={[4, 4, 0, 0]} barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </ChartCard>

                <ChartCard
                    title="Department Growth"
                    action={
                        <a href="#" className="text-blue-600 text-sm font-medium hover:text-blue-700">View Report</a>
                    }
                >
                    <div className="h-[300px] w-full mt-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={dataGrowth} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#9CA3AF', fontSize: 12 }}
                                    dy={10}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#9CA3AF', fontSize: 12 }}
                                />
                                <Tooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="employees"
                                    stroke="#10B981"
                                    strokeWidth={3}
                                    dot={{ fill: '#10B981', r: 4, strokeWidth: 2, stroke: '#fff' }}
                                    activeDot={{ r: 6 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </ChartCard>
            </div>

            <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-bold text-gray-800">Recent Employee Activity</h2>
                    <a href="#" className="text-blue-600 text-sm font-medium hover:text-blue-700">See all</a>
                </div>

                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="p-8 text-center text-sm text-gray-500">
                        No recent activity to display.
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
