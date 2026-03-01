import React from 'react';
import { UserPlus } from 'lucide-react';

const Recruitment = () => {
    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Recruitment</h1>
                    <p className="text-gray-500 mt-1">Manage job postings and applicant tracking.</p>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden mb-6">
                <div className="p-16 text-center text-gray-500">
                    <div className="w-20 h-20 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <UserPlus className="text-purple-500" size={32} />
                    </div>
                    <h3 className="text-xl font-medium text-gray-900 mb-2">No Active Job Postings</h3>
                    <p className="max-w-md mx-auto">Create a new job posting to start receiving applications.</p>
                </div>
            </div>
        </div>
    );
};

export default Recruitment;
