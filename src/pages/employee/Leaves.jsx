import React, { useState, useEffect } from 'react';
import { Calendar, Plus } from 'lucide-react';

const EmployeeLeaves = () => {
    const [balances, setBalances] = useState(null);
    const [requestHistory, setRequestHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Fetch leaves data here
        // Promise.all([fetchBalances(), fetchHistory()]).then(...).finally(() => setIsLoading(false));
        setIsLoading(false);
    }, []);

    if (isLoading) {
        return <div className="text-center mt-20 text-gray-500">Loading leave information...</div>;
    }

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Leaves</h1>
                <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm">
                    <Plus className="w-4 h-4" />
                    <span>New Leave Request</span>
                </button>
            </div>

            {/* Balances Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-3">
                        <span className="text-gray-600 font-medium">Casual Leave</span>
                        <span className="px-2 py-1 bg-gray-100 text-xs font-bold rounded text-gray-700">
                            {balances ? `${balances.casual.used} / ${balances.casual.total}` : '-- / --'}
                        </span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: balances ? `${(balances.casual.used / balances.casual.total)*100}%` : '0%' }}></div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-3">
                        <span className="text-gray-600 font-medium">Sick Leave</span>
                        <span className="px-2 py-1 bg-gray-100 text-xs font-bold rounded text-gray-700">
                            {balances ? `${balances.sick.used} / ${balances.sick.total}` : '-- / --'}
                        </span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                        <div className="bg-emerald-500 h-2 rounded-full" style={{ width: balances ? `${(balances.sick.used / balances.sick.total)*100}%` : '0%' }}></div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-3">
                        <span className="text-gray-600 font-medium">Vacation</span>
                        <span className="px-2 py-1 bg-gray-100 text-xs font-bold rounded text-gray-700">
                            {balances ? `${balances.vacation.used} / ${balances.vacation.total}` : '-- / --'}
                        </span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                        <div className="bg-purple-500 h-2 rounded-full" style={{ width: balances ? `${(balances.vacation.used / balances.vacation.total)*100}%` : '0%' }}></div>
                    </div>
                </div>
            </div>

            {/* Request History */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden mt-8 min-h-[200px]">
                <div className="p-5 border-b border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-800">Request History</h2>
                </div>
                <div className="p-0">
                    {requestHistory.length === 0 ? (
                        <div className="p-8 text-center text-gray-500">No leave requests found.</div>
                    ) : (
                        requestHistory.map((req) => (
                            <div key={req.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 hover:bg-gray-50 border-b last:border-0 border-gray-100 transition-colors">
                                <div className="flex items-center space-x-4 w-full sm:w-auto">
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0
                                        ${req.type === 'Sick Leave' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'}
                                    `}>
                                        <Calendar className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-base font-semibold text-gray-900">{req.type}</h3>
                                        <p className="text-sm text-gray-500 mt-1">{req.dateRange}</p>
                                    </div>
                                </div>

                                <div className="flex items-center w-full sm:w-auto justify-between sm:justify-end mt-4 sm:mt-0 sm:space-x-8 pl-16 sm:pl-0">
                                    <div className="text-sm text-gray-600">
                                        <span className="font-semibold text-gray-900">{req.days}</span> day(s)
                                    </div>
                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border
                                        ${req.status === 'Pending' ? 'bg-orange-100 text-orange-700 border-orange-200' : ''}
                                        ${req.status === 'Approved' ? 'bg-green-100 text-green-700 border-green-200' : ''}
                                        ${req.status === 'Rejected' ? 'bg-red-100 text-red-700 border-red-200' : ''}
                                    `}>
                                        {req.status}
                                    </span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

        </div>
    );
};

export default EmployeeLeaves;
