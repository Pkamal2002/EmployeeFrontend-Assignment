import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { api } from '../App';

function EmployeeList() {
  // State to keep track of the current page
  const [page, setPage] = useState(1);
  const limit = 5; // Number of employees per page
  const navigate = useNavigate(); // Use navigate for navigation

  const { data, error, isLoading } = useQuery({
    queryKey: ['employees', page],
    queryFn: async () => {
      const response = await api.get(`/employees?page=${page}&limit=${limit}`);
      return response.data;
    },
    keepPreviousData: true, // Keep previous data while fetching new data
  });

  if (isLoading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-center text-red-500">Error fetching data</div>;

  const employees = data?.data || [];
  const totalEmployees = data?.total || 0; // Assuming your API response includes the total number of employees
  const totalPages = Math.ceil(totalEmployees / limit);

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">All Employees</h1>

      <ul className="space-y-4">
        {employees.map((employee) => (
          <li key={employee._id} className="flex justify-between items-center p-4 border rounded-lg shadow hover:bg-gray-100 transition duration-300">
            <div>
              <h2 className="text-lg font-semibold">{employee.name}</h2>
              <p className="text-gray-600">{employee.email}</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => navigate(`/employee/edit/${employee._id}`)}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition duration-300"
              >
                Edit
              </button>
              <button 
              onClick={() => navigate(`/employee/${employee._id}`)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300">
                View Details
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400 transition duration-300 disabled:bg-gray-200 disabled:cursor-not-allowed"
        >
          Previous
        </button>

        <span className="text-lg">
          Page {page} of {totalPages}
        </span>

        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400 transition duration-300 disabled:bg-gray-200 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>

      {/* Back to Dashboard Button */}
      <div className="mt-6 text-center">
        <button
          onClick={() => navigate('/dashboard')}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}

export default EmployeeList;
