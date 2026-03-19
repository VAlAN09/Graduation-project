import React, { useState, useEffect } from 'react';
import { Search, Filter, PlayCircle, Clock } from 'lucide-react';

const EmployeeTasks = () => {
    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Fetch tasks data here
        // setIsLoading(true);
        // fetch('/api/tasks').then(...).finally(() => setIsLoading(false));
    }, []);

    return (
        <div className="max-w-6xl mx-auto space-y-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Tasks</h1>

            {/* Top Bar: Search & Filter */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white"
                        placeholder="Search tasks..."
                    />
                </div>
                <button className="flex items-center space-x-2 bg-white border border-gray-300 text-gray-700 px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                    <Filter className="w-4 h-4" />
                    <span>All Filters</span>
                </button>
            </div>

            {/* Tasks Grid */}
            <div className="min-h-[200px]">
                {isLoading ? (
                    <div className="text-center text-gray-500 py-12 bg-white rounded-xl shadow-sm border border-gray-100">
                        Loading tasks...
                    </div>
                ) : tasks.length === 0 ? (
                    <div className="text-center text-gray-500 py-12 bg-white rounded-xl shadow-sm border border-gray-100">
                        No tasks assigned to you.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {tasks.map((task) => (
                            <div key={task.id} className="bg-white rounded-xl shadow-md p-6 border border-gray-100 flex flex-col hover:shadow-lg transition-shadow">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-lg font-bold text-gray-900 leading-tight">{task.title}</h3>
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold
                                        ${task.status === 'Pending' ? 'bg-orange-100 text-orange-700 border border-orange-200' : ''}
                                        ${task.status === 'In Progress' ? 'bg-blue-100 text-blue-700 border border-blue-200' : ''}
                                        ${task.status === 'Completed' ? 'bg-green-100 text-green-700 border border-green-200' : ''}
                                    `}>
                                        {task.status}
                                    </span>
                                </div>

                                <div className="space-y-3 mb-6 flex-1 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Assigned By:</span>
                                        <span className="text-gray-900 font-medium">{task.assignedBy}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Deadline:</span>
                                        <span className="text-gray-900 font-medium flex items-center gap-1.5">
                                            <Clock className="w-3.5 h-3.5 text-gray-400" />
                                            {task.deadline}
                                        </span>
                                    </div>
                                </div>

                                <button className={`w-full flex items-center justify-center space-x-2 px-4 py-2.5 rounded-lg text-sm font-bold transition-colors border
                                    ${task.status === 'Pending' ? 'bg-blue-50 hover:bg-blue-600 text-blue-600 hover:text-white border-blue-100 hover:border-blue-600' : 
                                    'bg-gray-100 text-gray-400 border-transparent cursor-not-allowed'}
                                `}>
                                    {task.status === 'Pending' && <PlayCircle className="w-4 h-4" />}
                                    <span>{task.status === 'Pending' ? 'Accept Task' : 'Continue Task'}</span>
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default EmployeeTasks;
