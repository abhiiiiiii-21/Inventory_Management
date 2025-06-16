import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LogIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === 'admin@example.com' && password === '123456') {
      navigate('/dashboard');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="flex flex-col md:flex-row bg-white shadow-2xl rounded-3xl overflow-hidden w-full max-w-5xl">
        <div className="md:w-1/2 flex items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-700 p-8">
          <img src="/White_Full_Logo.png" alt="Countrees Logo" className="w-48 md:w-64" />
        </div>

        <div className="md:w-1/2 p-8 md:p-12 bg-white">
          <div className="mb-8 text-center">
            <img src="/Half.png" alt="Half Logo" className="h-20 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
            <p className="text-gray-500">Please log in to your account</p>
          </div>

          <form className="space-y-5" onSubmit={handleLogin}>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none placeholder-gray-400"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none placeholder-gray-400"
                required
              />
            </div>

            <div className="flex items-center justify-between text-sm text-gray-600">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-blue-600" />
                Remember me
              </label>
              <a href="#" className="text-blue-600 hover:underline">Forgot password?</a>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-200"
            >
              Sign in
            </button>

            <button
              type="button"
              className="w-full py-3 border border-gray-300 flex items-center justify-center gap-3 rounded-lg hover:bg-gray-50 transition duration-200"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="h-5 w-5"
              />
              Continue with Google
            </button>
          </form>

          <p className="text-sm text-center text-gray-600 mt-6">
            Don't have an account?{" "}
            <span
              onClick={() => navigate('/signup')}
              className="text-blue-600 hover:underline cursor-pointer"
            >
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
