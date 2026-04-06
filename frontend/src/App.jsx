import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from '@/components/theme-provider'
import { AuthProvider } from '@/context/AuthContext'
import ProtectedRoute from '@/components/ProtectedRoute'

// Public Pages
import Landing from '@/pages/Landing'
import Login from '@/pages/auth/Login'
import Register from '@/pages/auth/Register'

// Layouts
import StudentLayout from '@/layouts/StudentLayout'
import StaffLayout from '@/layouts/StaffLayout'
import AdminLayout from '@/layouts/AdminLayout'

// Student Pages
import StudentDashboard from '@/pages/student/Dashboard'
import StudentFees from '@/pages/student/Fees'
import StudentComplaints from '@/pages/student/Complaints'
import StudentProfile from '@/pages/student/Profile'
import LeaveApplication from '@/pages/student/LeaveApplication'
import StudentNotifications from '@/pages/student/Notifications'

// Staff Pages
import StaffDashboard from '@/pages/staff/Dashboard'
import StaffTasks from '@/pages/staff/Tasks'
import StaffComplaints from '@/pages/staff/Complaints'
import StaffRooms from '@/pages/staff/Rooms'
import StaffNotifications from '@/pages/staff/Notifications'

// Admin Pages
import AdminDashboard from '@/pages/admin/Dashboard'
import AdminStudents from '@/pages/admin/Students'
import AdminStaff from '@/pages/admin/Staff'
import AdminRooms from '@/pages/admin/Rooms'
import AdminPayments from '@/pages/admin/Payments'
import AdminNotifications from '@/pages/admin/Notifications'
import AdminSettings from '@/pages/admin/Settings'

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="hostellite-theme">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Student Routes */}
            <Route element={<ProtectedRoute allowedRoles={['STUDENT']} />}>
              <Route path="/student" element={<StudentLayout />}>
                <Route index element={<Navigate to="/student/dashboard" replace />} />
                <Route path="dashboard" element={<StudentDashboard />} />
                <Route path="fees" element={<StudentFees />} />
                <Route path="complaints" element={<StudentComplaints />} />
                <Route path="profile" element={<StudentProfile />} />
                <Route path="leave" element={<LeaveApplication />} />
                <Route path="notifications" element={<StudentNotifications />} />
              </Route>
            </Route>

            {/* Staff Routes */}
            <Route element={<ProtectedRoute allowedRoles={['STAFF']} />}>
              <Route path="/staff" element={<StaffLayout />}>
                <Route index element={<Navigate to="/staff/dashboard" replace />} />
                <Route path="dashboard" element={<StaffDashboard />} />
                <Route path="tasks" element={<StaffTasks />} />
                <Route path="complaints" element={<StaffComplaints />} />
                <Route path="rooms" element={<StaffRooms />} />
                <Route path="notifications" element={<StaffNotifications />} />
              </Route>
            </Route>

            {/* Admin Routes */}
            <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Navigate to="/admin/dashboard" replace />} />
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="students" element={<AdminStudents />} />
                <Route path="staff" element={<AdminStaff />} />
                <Route path="rooms" element={<AdminRooms />} />
                <Route path="payments" element={<AdminPayments />} />
                <Route path="notifications" element={<AdminNotifications />} />
                <Route path="settings" element={<AdminSettings />} />
              </Route>
            </Route>

            {/* Catch all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
