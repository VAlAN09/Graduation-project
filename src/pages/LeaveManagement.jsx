import React from 'react';
import { Clock, Filter } from 'lucide-react';

const LeaveManagement = () => {
    return (
        <div>
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
                        <div className="text-2xl font-bold text-gray-900">0</div>
                        <div className="text-sm text-gray-500">Pending Requests</div>
                    </div>
                </div>
                <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center">
                        <Filter size={24} />
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-gray-900">0</div>
                        <div className="text-sm text-gray-500">Approved This Month</div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 font-medium">Recent Requests</div>
                <div className="p-12 text-center text-gray-500">
                    <p className="text-sm">There are no leave requests pending review.</p>
                </div>
            </div>
        </div>
    );
};

export default LeaveManagement;
