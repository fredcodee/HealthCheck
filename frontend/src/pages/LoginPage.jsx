import React from 'react'
import { useState, useContext } from 'react'
import { GoogleLogin } from '@react-oauth/google'
import AuthContext from '../context/AuthContext';
import Navbar from '../components/Navbar';


const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { loginUser, handleGoogleAuthLogin, error } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await loginUser(email, password);
  }



  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <div className='pt-3'>
            {error && <div className='alert alert-danger text-center' style={{ color: 'red' }}>{error}</div>}
          </div>
          <h1 className="text-2xl font-bold mb-6 text-center text-blue-600">Login</h1>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="you@example.com"
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="••••••••"
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Sign in
              </button>
            </div>
          </form>
          <div className="mt-4 flex justify-center">
            <GoogleLogin onSuccess={credentialResponse => {
              handleGoogleAuthLogin(credentialResponse.credential)
            }} />
          </div>
          <div>
            <p className="mt-4 text-center text-sm text-gray-600">
              Don't have an account? <a href="/register" className="text-blue-600 hover:underline">Sign up</a>
            </p>
          </div>
        </div>
      </div>
    </div>

  )
}

export default LoginPage