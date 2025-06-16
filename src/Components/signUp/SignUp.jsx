import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();


    if (!fullName || !email || !password || !confirmPassword) {
      alert('Please fill all the fields');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }


    const validEmail = 'admin@example.com';
    const validPassword = '123456';

    if (email === validEmail && password === validPassword) {
      navigate('/dashboard');
    } else {
      alert('Invalid signup credentials');
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
            <h2 className="text-3xl font-bold text-gray-800">Create Account</h2>
            <p className="text-gray-500">Get started with us</p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Full Name</label>
              <input
                type="text"
                placeholder="Your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none placeholder-gray-400"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none placeholder-gray-400"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Password</label>
              <input
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none placeholder-gray-400"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Confirm Password</label>
              <input
                type="password"
                placeholder="Re-enter password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none placeholder-gray-400"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-200"
            >
              Sign up
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
            Already have an account?{' '}
            <span
              onClick={() => navigate('/')}
              className="text-blue-600 hover:underline cursor-pointer"
            >
              Log In
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
