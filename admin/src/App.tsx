import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Exams from './pages/Exams';
import Sites from './pages/Sites';
import Tasks from './pages/Tasks';
import Incidents from './pages/Incidents';
import Reports from './pages/Reports';
import SourceSchools from './pages/SourceSchools';
import Staffs from './pages/Staffs';
import SiteStandards from './pages/SiteStandards';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
};

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="exams" element={<Exams />} />
        <Route path="sites" element={<Sites />} />
        <Route path="tasks" element={<Tasks />} />
        <Route path="incidents" element={<Incidents />} />
        <Route path="reports" element={<Reports />} />
        <Route path="source-schools" element={<SourceSchools />} />
        <Route path="staffs" element={<Staffs />} />
        <Route path="site-standards" element={<SiteStandards />} />
      </Route>
    </Routes>
  );
};

export default App;