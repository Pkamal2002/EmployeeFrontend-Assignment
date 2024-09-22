import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom'; 
import { api } from '../App';
import { ToastContainer, toast } from 'react-toastify'; // Import Toast components
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for Toast notifications

function EmployeeForm() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', gender: '', designation: '', course: [], avatar: null,
  });

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (newEmployee) => {
      const formData = new FormData();
      Object.keys(newEmployee).forEach(key => {
        if (key === 'course') {
          newEmployee[key].forEach(course => formData.append('course', course));
        } else if (key === 'avatar' && newEmployee[key]) {
          formData.append('avatar', newEmployee[key]);
        } else {
          formData.append(key, newEmployee[key]);
        }
      });

      return api.post('/employees/create', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    },
    onSuccess: () => {
      toast.success('Form submitted successfully!'); // Show success toast
      setForm({
        name: '', email: '', phone: '', gender: '', designation: '', course: [], avatar: null,
      });
    },
    onError: (error) => {
      console.error('Error submitting form:', error);
      toast.error('Error submitting form. Please try again.'); // Show error toast
    }
  });

  const handleChange = (e) => {
    const { name, value, type, files, checked } = e.target;

    if (type === 'checkbox') {
      const updatedCourses = checked
        ? [...form.course, value]
        : form.course.filter(course => course !== value);
      setForm({ ...form, course: updatedCourses });
    } else if (type === 'file') {
      setForm({ ...form, avatar: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(form);
  };

  return (
    <div className="min-h-screen p-2 flex flex-col items-center justify-center bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
      <form onSubmit={handleSubmit} className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-800">Employee Registration</h2>
        
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          className="input w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="input w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        />
        <input
          type="text"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone"
          className="input w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        />

        {/* Gender Radio Buttons */}
        <div className="my-4">
          <label className="block text-gray-700">Gender</label>
          <div className="flex space-x-4">
            <label className="text-gray-700">
              <input
                type="radio"
                name="gender"
                value="Male"
                onChange={handleChange}
                checked={form.gender === 'Male'}
              /> Male
            </label>
            <label className="text-gray-700">
              <input
                type="radio"
                name="gender"
                value="Female"
                onChange={handleChange}
                checked={form.gender === 'Female'}
              /> Female
            </label>
          </div>
        </div>

        {/* Designation Dropdown */}
        <select
          name="designation"
          value={form.designation}
          onChange={handleChange}
          className="input w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        >
          <option value="">Select Designation</option>
          <option value="Manager">Manager</option>
          <option value="Developer">Developer</option>
          <option value="Tester">Tester</option>
          <option value="Designer">Designer</option>
        </select>

        {/* Courses Checkbox */}
        <div>
          <label className="block text-gray-700">Courses</label>
          <div className="flex space-x-4">
            <label className="text-gray-700">
              <input
                type="checkbox"
                name="course"
                value="MCA"
                onChange={handleChange}
                checked={form.course.includes('MCA')}
              /> MCA
            </label>
            <label className="text-gray-700">
              <input
                type="checkbox"
                name="course"
                value="BCA"
                onChange={handleChange}
                checked={form.course.includes('BCA')}
              /> BCA
            </label>
            <label className="text-gray-700">
              <input
                type="checkbox"
                name="course"
                value="BSC"
                onChange={handleChange}
                checked={form.course.includes('BSC')}
              /> BSC
            </label>
          </div>
        </div>

        {/* Avatar Upload */}
        <input
          type="file"
          name="avatar"
          onChange={handleChange}
          className="input w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        <button
          type="submit"
          className="btn w-full py-3 bg-purple-600 text-white rounded hover:bg-purple-700 transition duration-300"
        >
          Submit
        </button>
      </form>

      {/* Back to Dashboard Button */}
      <div className="mt-6 text-center">
        <button
          onClick={() => navigate('/dashboard')}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300"
        >
          Back to Dashboard
        </button>
      </div>

      <ToastContainer /> {/* Render ToastContainer for notifications */}
    </div>
  );
}

export default EmployeeForm;
