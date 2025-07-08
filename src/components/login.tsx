import React, { useState } from 'react';
import { 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider,
  AuthError
} from 'firebase/auth';
import { motion } from 'framer-motion';
import { auth } from '../firebase';
import Couple from '../assets/couple.png';
import { FcGoogle } from 'react-icons/fc';

interface Props {
  onSwitchToRegister: () => void;
}

const Login: React.FC<Props> = ({ onSwitchToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      const error = err as AuthError;
      setError(getErrorMessage(error.code));
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError('');
    try {
      const provider = new GoogleAuthProvider();
      // Add additional scopes if needed
      provider.addScope('profile');
      provider.addScope('email');
      // Enable account selection
      provider.setCustomParameters({
        prompt: 'select_account'
      });
      await signInWithPopup(auth, provider);
    } catch (err) {
      const error = err as AuthError;
      console.error('Google sign-in error:', error);
      setError(getErrorMessage(error.code));
    } finally {
      setIsLoading(false);
    }
  };

  const getErrorMessage = (code: string) => {
    switch (code) {
      case 'auth/operation-not-allowed':
        return 'This authentication method is not enabled. Please contact support.';
      case 'auth/popup-closed-by-user':
        return 'Sign in was cancelled. Please try again.';
      case 'auth/account-exists-with-different-credential':
        return 'An account already exists with this email. Try another method.';
      case 'auth/popup-blocked':
        return 'Popup was blocked by your browser. Please allow popups for this site.';
      case 'auth/cancelled-popup-request':
        return 'Only one popup request is allowed at a time.';
      case 'auth/network-request-failed':
        return 'Network error occurred. Please check your connection.';
      default:
        return 'Login failed. Please try again.';
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-orange-100 via-yellow-50 to-blue-100 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-4xl flex flex-col md:flex-row items-center gap-8"
      >
        {/* Left cartoon and branding */}
        <div className="flex flex-col items-center text-center md:text-left md:items-start w-full md:w-1/2 space-y-4">
          <motion.img
            src={Couple}
            alt="Old Man Cartoon"
            className="w-40 h-40"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 100 }}
          />
          <h1 className="text-4xl font-bold text-blue-600">Sahyog AI</h1>
          <p className="text-gray-600 text-lg">Your Caring Companion for Every Step of Life</p>
        </div>

        {/* Right login form */}
        <div className="w-full md:w-1/2">
          <h2 className="text-2xl font-semibold text-center text-blue-500 mb-4">Welcome Back!</h2>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>

            <div className="flex justify-center">
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full py-2 bg-white text-gray-700 font-semibold rounded-lg border border-gray-300 hover:bg-gray-50 transition flex items-center justify-center space-x-2 disabled:opacity-50"
                disabled={isLoading}
              >
                <FcGoogle className="h-5 w-5" />
                <span>Continue with Google</span>
              </button>
            </div>
          </form>

          <p className="mt-6 text-sm text-center text-gray-600">
            Don't have an account?{' '}
            <button 
              onClick={onSwitchToRegister} 
              className="text-blue-500 hover:underline"
              disabled={isLoading}
            >
              Register here
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;