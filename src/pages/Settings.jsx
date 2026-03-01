import React from 'react';
import { Settings as SettingsIcon } from 'lucide-react';

const Settings = () => {
    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Settings</h1>
                    <p className="text-gray-500 mt-1">Configure your workspace and system preferences.</p>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden mb-6">
                <div className="p-16 text-center text-gray-500">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <SettingsIcon className="text-gray-500" size={32} />
                    </div>
                    <h3 className="text-xl font-medium text-gray-900 mb-2">System Settings</h3>
                    <p className="max-w-md mx-auto">Configure your organization details, roles, permissions, and other system settings.</p>
                </div>
            </div>
        </div>
    );
};

export default Settings;
