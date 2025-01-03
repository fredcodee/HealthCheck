import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { XCircle, ArrowLeft } from 'lucide-react'

const CancelPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <XCircle className="mx-auto h-24 w-24 text-red-500" />
          <h1 className="mt-4 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Payment Cancelled
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Your payment was not processed. Please try again or contact support if you continue to experience issues.
          </p>
          <div className="mt-8">
            <Link
              to="/dashboard"
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back to Dashboard
            </Link>
          </div>
          <div className="mt-4">
            <Link
              to="/pricing"
              className="text-sm font-medium text-blue-600 hover:text-blue-500"
            >
              View pricing options
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}

export default CancelPage

