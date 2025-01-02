import React from 'react'
import { useState, useContext } from 'react'
import { GoogleLogin } from '@react-oauth/google'
import AuthContext from '../context/AuthContext'

const SignUpPage = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [accountType, setAccountType] = useState('')
  const { registerUser, handleGoogleAuth, error } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await registerUser(name, email, password, accountType);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className='pt-3'>
          {error && <div className='alert alert-danger text-center' style={{ color: 'red' }}>{error}</div>}
        </div>
        <h1 className="text-2xl font-bold mb-6 text-center text-blue-600">Register</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="John Doe"
              onChange={e => setName(e.target.value)}
            />
          </div>
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
            <label htmlFor="account" className="block text-sm font-medium text-gray-700" >Select acccount type</label>
            <select className="form-control form-control-lg text-sm" id='account'
              onChange={e => setAccountType(e.target.value)}>
              <option value={""} className='text-center'>Select Account type</option>
              <option value={"Doctor"}>Doctor</option>
              <option value={"Patient"}>Patient</option>
            </select>
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Register
            </button>
          </div>
        </form>
        <div className="mt-4 flex justify-center">
          <GoogleLogin onSuccess={credentialResponse => {
            handleGoogleAuth(credentialResponse.credential)
          }} />
        </div>
        <div>
          <p className="mt-4 text-center text-sm text-gray-600">
            Already have an account? <a href="/login" className="text-blue-600 hover:underline">Sign in</a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignUpPage