import { useState } from 'react';
import { api } from '../App';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'; // Import Toast components
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for Toast notifications

function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await api.post('/users/login', form);
      const { token } = response.data.data;

      // Debug: Ensure the response has the required data
      console.log('Login successful:', response.data.data.user.fullname);

      localStorage.setItem('token', token);
      localStorage.setItem('username', response.data.data.user.fullname);

      // Show success toast
      toast.success('Login successful! Redirecting to dashboard...');

      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      setError(error.response?.data?.message || 'An error occurred during login');

      // Show error toast
      toast.error(error.response?.data?.message || 'An error occurred during login');
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-600 to-blue-500">
      {/* Background Image Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1498050108023-c5249f4df085)' }}
      ></div>

      {/* Login Form Card */}
      <div className="relative bg-white/80 backdrop-blur-lg shadow-2xl rounded-xl max-w-lg w-full p-8 space-y-8">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">Sign In</h2>
        <p className="text-center text-gray-500">Please enter your details to login</p>

        {error && (
          <div className="text-center text-red-500 mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              className="peer w-full p-4 h-12 text-gray-900 placeholder-transparent border-b-2 border-gray-300 focus:outline-none focus:border-purple-600 bg-transparent"
              placeholder="Username"
              required
            />
            <label
              htmlFor="username"
              className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2.5 peer-focus:-top-3.5 peer-focus:text-purple-600"
            >
              Username
            </label>
          </div>

          <div className="relative">
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="peer w-full p-4 h-12 text-gray-900 placeholder-transparent border-b-2 border-gray-300 focus:outline-none focus:border-purple-600 bg-transparent"
              placeholder="Password"
              required
            />
            <label
              htmlFor="password"
              className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2.5 peer-focus:-top-3.5 peer-focus:text-purple-600"
            >
              Password
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-300 transition-transform transform hover:scale-105"
          >
            Login
          </button>
        </form>

        <div className="text-center text-gray-500">
          Don&apos;t have an account?{' '}
          <a href="/register" className="text-purple-600 hover:underline">
            Sign up
          </a>
        </div>
      </div>

      <ToastContainer /> {/* Render ToastContainer for notifications */}
    </div>
  );
}

export default Login;
