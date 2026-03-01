import React from 'react';
import { Star } from 'lucide-react';

const Performance = () => {
    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Performance</h1>
                    <p className="text-gray-500 mt-1">Track and evaluate employee goals and reviews.</p>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden mb-6">
                <div className="p-16 text-center text-gray-500">
                    <div className="w-20 h-20 bg-yellow-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Star className="text-yellow-500" size={32} />
                    </div>
                    <h3 className="text-xl font-medium text-gray-900 mb-2">No Active Review Cycles</h3>
                    <p className="max-w-md mx-auto">Start a new performance review cycle to evaluate your team members.</p>
                </div>
            </div>
        </div>
    );
};

export default Performance;
