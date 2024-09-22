import { Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { api } from '../App';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Dashboard() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('username');
    if (user) {
      setLoggedInUser(user);
      toast.success(`Welcome, ${user}!`, { position: "top-center" });
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const { data, error, isLoading } = useQuery({
    queryKey: ['employees'],
    queryFn: async () => {
      const response = await api.get('/employees');
      return response.data.data;
    },
  });

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/login');
  };

  if (isLoading) return <div className="text-center p-4">Loading...</div>;
  if (error) {
    console.error('Error fetching employees:', error);
    return <div className="text-center text-red-500">Error fetching data</div>;
  }

  const employees = data || [];
  if (!Array.isArray(employees)) {
    console.error('Expected employees to be an array but got:', employees);
    return <div>Error: Employees data is not an array.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-purple-600 text-white px-4 py-3 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Admin Panel</h1>
        <div className="flex space-x-4">
          <Link to="/" className="hover:text-gray-300">Home</Link>
          <span className="font-semibold">Welcome, {loggedInUser}</span>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 rounded hover:bg-red-600 transition duration-300"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Welcome to the Admin Panel</h1>

        {/* Add Buttons for Employee Actions */}
        <div className="flex justify-around mb-8">
          <Link
            to="/employee-form"
            className="bg-green-500 text-white font-semibold py-2 px-4 rounded hover:bg-green-600 transition duration-300"
          >
            Add Employee
          </Link>
          <Link
            to="/employee-view"
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
          >
            View All Employees
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold">Total Employees</h2>
            <p className="text-2xl">{employees.length}</p>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Recent Employees</h2>
          <ul className="bg-white rounded-lg shadow">
            {employees.slice(0, 5).map((employee) => (
              <li key={employee._id} className="flex justify-between items-center p-4 border-b">
                <div>
                  <h3 className="font-semibold">{employee.name}</h3>
                  <p className="text-gray-600">{employee.email}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
}

export default Dashboard;
