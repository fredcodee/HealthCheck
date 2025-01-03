import React from 'react'
import { Link } from 'react-router-dom'
import { AlertTriangle, Home } from 'lucide-react'

const Error = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <AlertTriangle className="mx-auto h-24 w-24 text-yellow-500" />
          <h1 className="mt-6 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Oops! Something went wrong
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            We apologize for the inconvenience. An unexpected error has occurred.
          </p>
        </div>
        <div className="mt-8 space-y-4">
          <p className="text-sm text-gray-500">
            Please try refreshing the page or going back to the dashboard. If the problem persists, please contact our support team.
          </p>
          <Link
            to="/dashboard"
            className="inline-flex items-center justify-center w-full px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Home className="mr-2 h-5 w-5" />
            Return to Dashboard
          </Link>
          <p className="text-sm">
            <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Error

