import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import authService from "../services/authService";

const RegistrationPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser && loggedInUser.email) {
      setEmail(loggedInUser.email);
    }
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const userDetails = {
      email,
      password,
    };

    // Redirect to the dashboard page after successful registration
    try {
      const response = await authService.register(email, password);
      alert(response.data.message);
      navigate("/login");
    } catch (error) {
      alert("User already exists");
    }

    navigate("/sdashboard");
  };

  const handleGoToLogin = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      {/* Container for logo and form */}
      <div className="flex items-center justify-between bg-white shadow-md rounded-lg p-6 space-x-4">
        {/* Image section */}
        <div className="flex flex-col items-center justify-center p-4">
          <img
            src="/src/assets/logo.png"
            alt="Logo"
            className="w-full h-auto max-w-xs md:max-w-md"
          />
          <p className="mt-4 text-center text-lg font-bold">
            Vasantdada Patil College of Engineering & Visual Arts
          </p>
        </div>

        {/* Registration form */}
        <div className="max-w-lg w-full space-y-4">
          <h2 className="text-2xl font-bold text-center text-blue-900">
            REGISTRATION FORM
          </h2>
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email-ID
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                required
              />
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="new-password"
                required
              />
            </div>
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="w-1/2 mt-2 font-bold items-center py-2 px-2 border border-transparent text-md rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Register
              </button>
            </div>
          </form>
          <div className="mt-6 text-center">
            <p className="text-orange-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-black font-bold hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
