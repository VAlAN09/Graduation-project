import React, { useState } from 'react';
import { 
    Search, 
    Filter, 
    ChevronDown, 
    MoreVertical, 
    UserPlus, 
    Users, 
    CheckCircle, 
    Clock, 
    Calendar,
    Eye,
    Mail,
    UserX,
    UserCheck,
    Briefcase
} from 'lucide-react';

const Recruitment = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All Statuses');
    const [sortBy, setSortBy] = useState('Newest First');

    const stats = [
        { label: 'Total Applicants', count: 8, icon: Users, color: 'text-blue-500', bg: 'bg-blue-50' },
        { label: 'Shortlisted', count: 2, icon: CheckCircle, color: 'text-purple-500', bg: 'bg-purple-50' },
        { label: 'In Interview', count: 2, icon: Clock, color: 'text-orange-500', bg: 'bg-orange-50' },
        { label: 'Hired', count: 1, icon: UserCheck, color: 'text-green-500', bg: 'bg-green-50' },
    ];

    const applicants = [
        { id: 1, name: 'William Taylor', role: 'QA Engineer', status: 'Interview', date: '2024-04-20' },
        { id: 2, name: 'Olivia Martinez', role: 'DevOps Engineer', status: 'Under Review', date: '2024-04-18' },
        { id: 3, name: 'James Wilson', role: 'Marketing Specialist', status: 'Shortlisted', date: '2024-04-15' },
        { id: 4, name: 'Jessica Brown', role: 'Project Manager', status: 'Rejected', date: '2024-04-12' },
        { id: 5, name: 'Daniel Lee', role: 'Data Analyst', status: 'Hired', date: '2024-04-10' },
        { id: 6, name: 'Emily Davis', role: 'UI/UX Designer', status: 'Interview', date: '2024-04-08' },
        { id: 7, name: 'Michael Smith', role: 'Backend Developer', status: 'Under Review', date: '2024-04-05' },
        { id: 8, name: 'Sarah Johnson', role: 'Frontend Developer', status: 'Shortlisted', date: '2024-04-01' },
    ];

    const getStatusStyles = (status) => {
        switch (status) {
            case 'Interview':
                return 'bg-purple-50 text-purple-600';
            case 'Under Review':
                return 'bg-orange-50 text-orange-600';
            case 'Shortlisted':
                return 'bg-blue-50 text-blue-600';
            case 'Rejected':
                return 'bg-red-50 text-red-600';
            case 'Hired':
                return 'bg-green-50 text-green-600';
            default:
                return 'bg-gray-50 text-gray-600';
        }
    };

    const filteredApplicants = applicants.filter(app => {
        const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                             app.role.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'All Statuses' || app.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Applicant Management</h1>
                    <p className="text-gray-500 mt-1">Track and manage all job applicants in one place.</p>
                </div>
                <button className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm">
                    <UserPlus size={18} className="mr-2" />
                    Add Applicant
                </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
                        <div className={`${stat.bg} ${stat.color} p-3 rounded-lg`}>
                            <stat.icon size={24} />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-900">{stat.count}</p>
                            <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Filters and Search */}
            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                        type="text" 
                        placeholder="Search applicants..." 
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                    <div className="relative flex-1 md:w-40">
                        <select 
                            className="w-full appearance-none bg-white border border-gray-200 px-4 py-2 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option>All Statuses</option>
                            <option>Interview</option>
                            <option>Under Review</option>
                            <option>Shortlisted</option>
                            <option>Hired</option>
                            <option>Rejected</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                    </div>
                    <div className="relative flex-1 md:w-40">
                        <select 
                            className="w-full appearance-none bg-white border border-gray-200 px-4 py-2 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            <option>Newest First</option>
                            <option>Oldest First</option>
                            <option>Name A-Z</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                    </div>
                </div>
            </div>

            {/* Applicant List */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <tbody className="divide-y divide-gray-100">
                            {filteredApplicants.map((applicant) => (
                                <tr key={applicant.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${getStatusStyles(applicant.status).replace('text-', 'bg-').replace('600', '100')} ${getStatusStyles(applicant.status).split(' ')[1]}`}>
                                                {applicant.name.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-semibold text-gray-900">{applicant.name}</h4>
                                                <p className="text-xs text-gray-500 font-medium">{applicant.role}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusStyles(applicant.status)}`}>
                                            {applicant.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 justify-end">
                                            <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all flex items-center gap-1 text-xs font-medium">
                                                <Eye size={16} />
                                                View
                                            </button>
                                            <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all flex items-center gap-1 text-xs font-medium">
                                                <Mail size={16} />
                                                Message
                                            </button>
                                            <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all flex items-center gap-1 text-xs font-medium">
                                                <UserX size={16} />
                                                Reject
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {filteredApplicants.length === 0 && (
                    <div className="p-12 text-center">
                        <Briefcase className="mx-auto text-gray-300 mb-4" size={48} />
                        <h3 className="text-lg font-medium text-gray-900">No applicants found</h3>
                        <p className="text-gray-500">Try adjusting your search or filters.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Recruitment;
