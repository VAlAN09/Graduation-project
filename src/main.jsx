import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Login from './pages/Login.tsx'
import EmployeeLayout from './layouts/EmployeeLayout'
import EmployeeDashboard from './pages/employee/Dashboard'
import EmployeeAttendance from './pages/employee/Attendance'
import EmployeeLeaves from './pages/employee/Leaves'
import EmployeeTasks from './pages/employee/Tasks'
import EmployeeProfile from './pages/employee/Profile'
import EmployeePayslips from './pages/employee/Payslips'

// Wrapper to check auth briefly
const ProtectedRoute = ({ children }) => {
  return localStorage.getItem('isAuthenticated') === 'true' ? children : <Navigate to="/login" replace />;
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        {/* Employee Routes */}
        <Route path="/employee" element={<ProtectedRoute><EmployeeLayout /></ProtectedRoute>}>
          <Route path="home" element={<EmployeeDashboard />} />
          <Route path="attendance" element={<EmployeeAttendance />} />
          <Route path="leaves" element={<EmployeeLeaves />} />
          <Route path="tasks" element={<EmployeeTasks />} />
          <Route path="profile" element={<EmployeeProfile />} />
          <Route path="payslips" element={<EmployeePayslips />} />
        </Route>

        {/* Existing Admin/Supervisor Routes */}
        <Route path="/*" element={
          <ProtectedRoute><App /></ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
