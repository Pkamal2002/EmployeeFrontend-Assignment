import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import EmployeeForm from './pages/EmployeeForm';
import EmployeeList from './pages/EmployeeList';
import Dashboard from './pages/Dashboard';
import HomePage from './pages/HomePage';
import EmployeeEdit from './pages/EmployeeEdit';
import EmployeeDetails from './pages/EmployeeDetails';


const queryClient = new QueryClient();
const axiosInstance = axios.create({ baseURL: 'http://localhost:8000/api/v1' });

export const api = axiosInstance;

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/employee-form" element={<EmployeeForm />} />
          <Route path="/employee-view" element={<EmployeeList />} />
          <Route path="/employee/edit/:id" element={<EmployeeEdit />} />
          <Route path="/employee/:id" element={<EmployeeDetails />} />

        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
