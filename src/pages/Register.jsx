import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { api } from '../App';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [form, setForm] = useState({
    username: '', fullname: '', email: '', password: '', confirmPassword: '',
  });

  const navigate = useNavigate();

  const mutation = useMutation(newUser => {
    return api.post('/users/register', newUser);
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(form, {
      onSuccess: () => {
        navigate('/login');
      },
      onError: (error) => {
        console.error('Error registering:', error);
      },
    });
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-600 to-blue-500">
      {/* Background Image Overlay */}
      <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7)' }}></div>

      {/* Register Form Card */}
      <div className="relative bg-white/80 backdrop-blur-lg shadow-2xl rounded-xl max-w-lg w-full p-8 space-y-8">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">Create Account</h2>
        <p className="text-center text-gray-500">Fill in your details to register</p>

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
              type="text"
              name="fullname"
              value={form.fullname}
              onChange={handleChange}
              className="peer w-full p-4 h-12 text-gray-900 placeholder-transparent border-b-2 border-gray-300 focus:outline-none focus:border-purple-600 bg-transparent"
              placeholder="Full Name"
              required
            />
            <label
              htmlFor="fullname"
              className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2.5 peer-focus:-top-3.5 peer-focus:text-purple-600"
            >
              Full Name
            </label>
          </div>

          <div className="relative">
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="peer w-full p-4 h-12 text-gray-900 placeholder-transparent border-b-2 border-gray-300 focus:outline-none focus:border-purple-600 bg-transparent"
              placeholder="Email"
              required
            />
            <label
              htmlFor="email"
              className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2.5 peer-focus:-top-3.5 peer-focus:text-purple-600"
            >
              Email
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

          <div className="relative">
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              className="peer w-full p-4 h-12 text-gray-900 placeholder-transparent border-b-2 border-gray-300 focus:outline-none focus:border-purple-600 bg-transparent"
              placeholder="Confirm Password"
              required
            />
            <label
              htmlFor="confirmPassword"
              className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2.5 peer-focus:-top-3.5 peer-focus:text-purple-600"
            >
              Confirm Password
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-300 transition-transform transform hover:scale-105"
          >
            Register
          </button>
        </form>

        <div className="text-center text-gray-500">
          Already have an account?{' '}
          <a href="/login" className="text-purple-600 hover:underline">
            Sign in
          </a>
        </div>
      </div>
    </div>
  );
}

export default Register;
