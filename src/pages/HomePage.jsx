import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate

function HomePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Simple auth state for demo
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogin = () => {
    // Redirect to login page
    navigate('/login'); // This will take the user to the /login route
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-purple-600 text-white px-4 py-3">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">MyWebsite</h1>
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="hover:text-gray-300">Home</Link>
            </li>
            <li>
              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-500 rounded hover:bg-red-600 transition duration-300"
                >
                  Logout
                </button>
              ) : (
                <button
                  onClick={handleLogin}
                  className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600 transition duration-300"
                >
                  Login
                </button>
              )}
            </li>
          </ul>
        </div>
      </nav>

      {/* Home Page Content */}
      <main className="container mx-auto mt-10 px-4">
        <h2 className="text-4xl font-bold text-center mb-8">Welcome to MyWebsite</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Content Section */}
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-4">What We Offer</h3>
            <p className="text-gray-700 mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. 
              Cras venenatis euismod malesuada.
            </p>
            <Link to="/learn-more" className="text-purple-600 hover:text-purple-700 font-semibold">
              Learn More &rarr;
            </Link>
          </section>

          {/* Image Section */}
          <section>
            <img
              src="https://via.placeholder.com/500"
              alt="Sample"
              className="rounded-lg shadow-md"
            />
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-purple-600 text-white py-4 mt-10">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 MyWebsite. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
