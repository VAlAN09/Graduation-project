import React, { useState, useEffect } from 'react';
import { Wallet, Banknote, MinusCircle, FileText } from 'lucide-react';
import { api } from '../../api/api';


const EmployeePayslips = () => {
    const [payslipData, setPayslipData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPayslips = async () => {
            try {
                const data = await api.get('/payslips');
                if (data.length > 0) {
                    const latest = data[0];
                    setPayslipData({
                        basicSalary: parseFloat(latest.baseSalary.replace('EGP ', '').replace(',', '')),
                        netSalary: parseFloat(latest.amount.replace('EGP ', '').replace(',', '')),
                        totalDeductions: parseFloat(latest.deductions.replace('EGP ', '').replace(',', '')),
                        deductions: [
                            { id: 1, type: 'General Deductions', amount: parseFloat(latest.deductions.replace('EGP ', '').replace(',', '')), date: latest.month }
                        ]
                    });
                }
            } catch (error) {
                console.error("Failed to fetch payslips:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPayslips();
    }, []);


    if (isLoading) {
        return <div className="text-center mt-20 text-gray-500">Loading payslip details...</div>;
    }

    // No early return for null payslipData so we can show the structure

    return (
        <div className="max-w-4xl mx-auto space-y-6 pb-12">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Payslip</h1>
                <p className="text-gray-500 mt-1 pl-1">check your balance</p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
                    <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center mb-6">
                        <Wallet className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-400 font-medium mb-1">Basic Salary</p>
                        <p className="text-2xl font-bold text-blue-600">EGP {payslipData ? payslipData.basicSalary.toFixed(2) : '0.00'}</p>

                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
                    <div className="w-12 h-12 bg-emerald-50 text-emerald-500 rounded-xl flex items-center justify-center mb-6">
                        <Banknote className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-400 font-medium mb-1">Net Salary</p>
                        <p className="text-2xl font-bold text-emerald-500">EGP {payslipData ? payslipData.netSalary.toFixed(2) : '0.00'}</p>

                    </div>
                </div>

                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 md:col-span-2 flex items-center justify-between mt-2">
                    <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-red-50 text-red-500 rounded-full flex items-center justify-center shrink-0">
                            <MinusCircle className="w-6 h-6" />
                        </div>
                        <span className="font-bold text-gray-800 text-lg">Total Deductions</span>
                    </div>
                    <span className="font-bold text-red-500 text-lg">- EGP {payslipData ? payslipData.totalDeductions.toFixed(2) : '0.00'}</span>

                </div>
            </div>

            {/* Deductions Section */}
            <div className="pt-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Deductions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {!payslipData || !payslipData.deductions || payslipData.deductions.length === 0 ? (
                        <div className="col-span-1 md:col-span-2 p-6 bg-white rounded-2xl shadow-sm border border-gray-100 text-center text-gray-500">
                            No deductions found.
                        </div>
                    ) : (
                        payslipData.deductions.map(deduction => (
                            <div key={deduction.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                <div className="w-12 h-12 bg-red-50 text-red-400 rounded-xl flex items-center justify-center mb-6">
                                    <FileText className="w-5 h-5" />
                                </div>
                                <div className="space-y-1">
                                    <h3 className="font-bold text-gray-900">{deduction.type}</h3>
                                    <p className="text-sm text-gray-400">{deduction.date}</p>
                                </div>
                                <div className="mt-4">
                                    <span className="font-bold text-red-500">- EGP {deduction.amount.toFixed(2)}</span>

                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

        </div>
    );
};

export default EmployeePayslips;
