import { useQuery, useMutation } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../App';

function EmployeeDetails() {
  const { id } = useParams(); // Get the employee ID from the URL
  const navigate = useNavigate();

  const { data, error, isLoading } = useQuery({
    queryKey: ['employee', id],
    queryFn: async () => {
      const response = await api.get(`/employees/${id}`); // Fetch the employee data
      return response.data; // Return the employee data
    },
  });

  const deleteEmployee = useMutation({
    mutationFn: async () => {
      await api.delete(`/employees/${id}`);
    },
    onSuccess: () => {
      // Navigate back to employee list after successful deletion
      navigate('/employee-view');
    },
    onError: () => {
      // Handle error if needed
      alert("Failed to delete the employee.");
    },
  });

  if (isLoading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-center text-red-500">Error fetching employee data</div>;

  const employee = data.data; // Directly use the fetched employee data

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-800">Employee Details</h2>
        
        <div>
          <h3 className="text-lg font-semibold">Name:</h3>
          <p className="text-gray-700">{employee.name}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Email:</h3>
          <p className="text-gray-700">{employee.email}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Phone:</h3>
          <p className="text-gray-700">{employee.phone}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Gender:</h3>
          <p className="text-gray-700">{employee.gender}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Designation:</h3>
          <p className="text-gray-700">{employee.designation}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Courses:</h3>
          <p className="text-gray-700">{(employee.course || []).join(', ')}</p>
        </div>
        {/* Avatar Display */}
        {employee.avatar && <img src={employee.avatar} alt="Avatar" className="mb-4" />}

        <div className="flex justify-between mt-4">
          <button
            onClick={() => navigate('/employee-view')}
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition duration-300"
          >
            Back to Employee List
          </button>
          <button
            onClick={() => {
              if (window.confirm("Are you sure you want to delete this employee?")) {
                deleteEmployee.mutate();
              }
            }}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition duration-300"
          >
            Delete Employee
          </button>
        </div>
      </div>
    </div>
  );
}

export default EmployeeDetails;
