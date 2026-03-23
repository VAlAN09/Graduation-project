import React, { useState, useEffect } from 'react';
import { Layers, DollarSign, Search, User, CreditCard, ChevronRight } from 'lucide-react';
import { api } from '../api/api';

const Payroll = () => {
    const [payrolls, setPayrolls] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchPayroll = async () => {
        setIsLoading(true);
        try {
            const data = await api.get('/admin/payroll');
            setPayrolls(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Failed to fetch payroll data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPayroll();
    }, []);

    const filteredPayrolls = payrolls.filter(p => {
        const userName = `${p.user?.first_name || ''} ${p.user?.last_name || ''}`.toLowerCase();
        return userName.includes(searchTerm.toLowerCase());
    });

    return (
        <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Payroll Management</h1>
                    <p className="text-gray-500 mt-1">Process salaries and manage compensation across the organization.</p>
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search employee..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        />
                    </div>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors shadow-md">
                        <DollarSign size={18} />
                        Run Payroll
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    {isLoading ? (
                        <div className="p-12 text-center text-gray-500">Loading payroll data...</div>
                    ) : filteredPayrolls.length === 0 ? (
                        <div className="p-16 text-center text-gray-500">
                            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Layers className="text-green-500" size={32} />
                            </div>
                            <h3 className="text-xl font-medium text-gray-900 mb-2">No payroll records found</h3>
                            <p className="max-w-md mx-auto">Start processing salaries to see them listed here.</p>
                        </div>
                    ) : (
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="text-xs font-bold text-gray-400 uppercase border-b border-gray-100 bg-gray-50/50">
                                    <th className="p-4">Employee</th>
                                    <th className="p-4">Period</th>
                                    <th className="p-4">Base Salary</th>
                                    <th className="p-4">Bonuses</th>
                                    <th className="p-4">Deductions</th>
                                    <th className="p-4">Net Salary</th>
                                    <th className="p-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {filteredPayrolls.map((p) => (
                                    <tr key={p.payroll_id} className="hover:bg-gray-50 transition-colors">
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                                                    {p.user?.first_name?.charAt(0) || 'U'}
                                                </div>
                                                <div>
                                                    <div className="font-medium text-gray-900">
                                                        {p.user?.first_name || 'Unknown'} {p.user?.last_name || ''}
                                                    </div>
                                                    <div className="text-xs text-gray-500">{p.user?.job_title || 'Employee'}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4 text-sm text-gray-600">
                                            {p.period_start} - {p.period_end}
                                        </td>
                                        <td className="p-4 text-sm font-medium text-gray-900">EGP {Number(p.base_salary).toLocaleString()}</td>
                                        <td className="p-4 text-sm text-green-600 font-medium">+EGP {Number(p.bonuses).toLocaleString()}</td>
                                        <td className="p-4 text-sm text-red-600 font-medium">-EGP {Number(p.deductions).toLocaleString()}</td>
                                        <td className="p-4">
                                            <div className="text-sm font-bold text-blue-600 flex items-center gap-1.5">
                                                <CreditCard size={14} />
                                                EGP {(Number(p.base_salary) + Number(p.bonuses) - Number(p.deductions)).toLocaleString()}
                                            </div>
                                        </td>
                                        <td className="p-4 text-right">
                                            <button className="text-gray-400 hover:text-blue-600 transition-colors">
                                                <ChevronRight size={20} />
                                            </button>
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

export default Payroll;
