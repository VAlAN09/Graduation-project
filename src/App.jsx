import { useState } from 'react';
import { Users, Calendar, Briefcase, TrendingUp } from 'lucide-react';
import Sidebar from './components/Sidebar';
import TopHeader from './components/TopHeader';

// Pages
import Dashboard from './pages/Dashboard';
import Employees from './pages/Employees';
import Attendance from './pages/Attendance';
import LeaveManagement from './pages/LeaveManagement';
import Payroll from './pages/Payroll';
import Performance from './pages/Performance';
import Recruitment from './pages/Recruitment';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import Tasks from './pages/Tasks';

const pageComponents = {
  'Dashboard': Dashboard,
  'Employees': Employees,
  'Attendance': Attendance,
  'Leave Management': LeaveManagement,
  'Payroll': Payroll,
  'Performance': Performance,
  'Recruitment': Recruitment,
  'Reports': Reports,
  'Tasks': Tasks,
  'Settings': Settings,
};

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [userProfilePicture, setUserProfilePicture] = useState('https://ui-avatars.com/api/?name=Admin+User&background=0D8ABC&color=fff');

  const ActivePage = pageComponents[activeTab] || Dashboard;

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans">
      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen transition-all duration-300">
        <TopHeader setMobileOpen={setMobileOpen} setActiveTab={setActiveTab} userProfilePicture={userProfilePicture} />

        <main className="flex-1 p-6 lg:p-8 overflow-y-auto w-full">
          <ActivePage userProfilePicture={userProfilePicture} setUserProfilePicture={setUserProfilePicture} />
        </main>
      </div>
    </div>
  );
}

export default App;
