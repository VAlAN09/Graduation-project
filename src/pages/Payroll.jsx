import React from 'react';
import { Layers, DollarSign } from 'lucide-react';

const Payroll = () => {
    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Payroll</h1>
                    <p className="text-gray-500 mt-1">Process salaries and manage compensation.</p>
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors">
                    <DollarSign size={18} />
                    Run Payroll
                </button>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden mb-6">
                <div className="p-16 text-center text-gray-500">
                    <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Layers className="text-green-500" size={32} />
                    </div>
                    <h3 className="text-xl font-medium text-gray-900 mb-2">Payroll System Ready</h3>
                    <p className="max-w-md mx-auto">Set up your employees' compensation details and bank information to start running payroll.</p>
                </div>
            </div>
        </div>
    );
};

export default Payroll;
