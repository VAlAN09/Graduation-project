import React from 'react';
import { FileText } from 'lucide-react';

const Reports = () => {
    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Reports</h1>
                    <p className="text-gray-500 mt-1">Generate and view analytics and reports.</p>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden mb-6">
                <div className="p-16 text-center text-gray-500">
                    <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FileText className="text-blue-500" size={32} />
                    </div>
                    <h3 className="text-xl font-medium text-gray-900 mb-2">Reports Dashboard</h3>
                    <p className="max-w-md mx-auto">Select a report type to generate detailed analytics for your organization.</p>
                </div>
            </div>
        </div>
    );
};

export default Reports;
