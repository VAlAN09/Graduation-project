import React, { useState, useEffect } from 'react';
import { Clock, Filter, Check, X, Calendar, User } from 'lucide-react';

import { api } from '../api/api';

const LeaveManagement = () => {
    const [requests, setRequests] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [stats, setStats] = useState({ pending: 0, approved: 0 });

    const fetchRequests = async () => {
        setIsLoading(true);
        try {
            const data = await api.get('/supervisor/leave-requests');
            const safeData = Array.isArray(data) ? data : [];
            setRequests(safeData);
            
            // Calculate simple stats
            const pending = safeData.filter(r => r?.status === 'pending').length;
            const approved = safeData.filter(r => r?.status === 'approved').length;
            setStats({ pending, approved });

        } catch (error) {
            console.error("Failed to fetch leave requests:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    const handleAction = async (id, action) => {
        try {
            await api.put(`/leave/${id}/${action}`);
            fetchRequests(); // Refresh data
        } catch (error) {
            alert(`Failed to ${action} request: ` + error.message);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'approved': return 'bg-green-50 text-green-600 border-green-100';
            case 'rejected': return 'bg-red-50 text-red-600 border-red-100';
            default: return 'bg-orange-50 text-orange-600 border-orange-100';
        }
    };

    return (
        <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Leave Management</h1>
                    <p className="text-gray-500 mt-1">Review and approve employee time off requests.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center">
                        <Clock size={24} />
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-gray-900">{stats.pending}</div>
                        <div className="text-sm text-gray-500">Pending Requests</div>
                    </div>
                </div>
                <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center">
                        <Check size={24} />
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-gray-900">{stats?.approved || 0}</div>
                        <div className="text-sm text-gray-500">Approved This Month</div>
                    </div>
                </div>

            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 font-medium flex justify-between items-center bg-gray-50/50">
                    <span>Recent Requests</span>
                    <button onClick={fetchRequests} className="text-sm text-blue-600 font-medium hover:underline">Refresh</button>
                </div>
                
                <div className="overflow-x-auto">
                    {isLoading ? (
                        <div className="p-12 text-center text-gray-500">Loading requests...</div>
                    ) : requests.length === 0 ? (
                        <div className="p-12 text-center text-gray-500">
                             <Calendar className="w-12 h-12 text-gray-200 mx-auto mb-3" />
                             <p className="text-sm">There are no leave requests pending review.</p>
                        </div>
                    ) : (
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="text-xs font-bold text-gray-400 uppercase border-b border-gray-100">
                                    <th className="p-4">Employee</th>
                                    <th className="p-4">Type</th>
                                    <th className="p-4">Duration</th>
                                    <th className="p-4">Reason</th>
                                    <th className="p-4">Status</th>
                                    <th className="p-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {requests.filter(Boolean).map((r) => (

                                    <tr key={r.leave_id} className="hover:bg-gray-50 transition-colors">
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                                                    <User size={16} className="text-gray-400" />
                                                </div>
                                                <div className="font-medium text-gray-900">
                                                    {r.user?.first_name} {r.user?.last_name}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4 capitalize text-sm text-gray-600">{r.leave_type}</td>
                                        <td className="p-4">
                                            <div className="text-sm text-gray-900">{r.start_date}</div>
                                            <div className="text-[10px] text-gray-400">to {r.end_date}</div>
                                        </td>
                                        <td className="p-4">
                                            <p className="text-sm text-gray-600 max-w-xs truncate" title={r.reason}>
                                                {r.reason || 'No reason provided'}
                                            </p>
                                        </td>
                                        <td className="p-4">
                                            <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${getStatusColor(r.status)} capitalize`}>
                                                {r.status}
                                            </span>
                                        </td>
                                        <td className="p-4 text-right">
                                            {r?.status === 'pending' && (
                                                <div className="flex justify-end gap-2">
                                                    <button 
                                                        onClick={() => handleAction(r.leave_id, 'approve')}
                                                        className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                                        title="Approve"
                                                    >
                                                        <Check size={20} />
                                                    </button>
                                                    <button 
                                                        onClick={() => handleAction(r.leave_id, 'reject')}
                                                        className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                        title="Reject"
                                                    >
                                                        <X size={20} />
                                                    </button>
                                                </div>
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

export default LeaveManagement;
