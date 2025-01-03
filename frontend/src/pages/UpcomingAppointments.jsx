import React, { useState, useEffect } from 'react'
import Api from '../Api'
import Navbar from '../components/Navbar'
import { ArrowLeft, Calendar, Clock, User, AlertCircle, CalendarIcon, AlertTriangle } from 'lucide-react'

const UpcomingAppointments = () => {
  const accountType = localStorage.getItem('AccountType')?.replace(/"/g, '') || false
  const [upcomingAppointments, setUpcomingAppointments] = useState([])
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const token = localStorage.getItem('token') || false

  useEffect(() => {
    getUpcomingAppointments()
  }, [])

  const getUpcomingAppointments = async () => {
    try {
      setIsLoading(true)
      let apiEndpoint = accountType === 'Patient' 
        ? "api/get-upcoming-appointments-patient"
        : "api/get-upcoming-appointments-doctor"

      const response = await Api.get(apiEndpoint, {
        headers: {
          Authorization: `Bearer ${token.replace(/"/g, '')}`
        }
      })

      if (response.status === 200) {
        setUpcomingAppointments(response.data)
      }
    } catch (error) {
      setError("error occurred, please try again")
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'confirmed':
        return 'bg-green-100 text-green-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <a 
          href="/dashboard" 
          className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </a>

        {/* Error Message */}
        {error && (
          <div className="mb-6 flex items-center gap-2 p-4 text-red-700 bg-red-50 rounded-lg">
            {error === "unauthorized user" ? (
              <>
                <AlertTriangle className="h-5 w-5 flex-shrink-0" />
                <p>
                  Please upgrade your account to use this feature.{' '}
                  <a href="/pricing" className="font-medium underline hover:text-red-800">
                    Upgrade now
                  </a>
                </p>
              </>
            ) : (
              <>
                <AlertCircle className="h-5 w-5 flex-shrink-0" />
                <p>{error}</p>
              </>
            )}
          </div>
        )}

        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">
              Upcoming Appointments
            </h1>
            <CalendarIcon className="h-5 w-5 text-gray-400" />
          </div>
        </div>

        {/* Appointments List */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : upcomingAppointments.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {upcomingAppointments.map((appointment, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 transition-all duration-200 hover:shadow-md"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-gray-400" />
                        <p className="text-sm font-medium text-gray-900">
                          Dr. {appointment.doctor_id.name}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-gray-400" />
                        <p className="text-sm text-gray-600">
                          Patient: {appointment.user_id.name}
                        </p>
                      </div>
                    </div>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                      {appointment.status}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <p className="text-sm text-gray-600">
                        {new Date(appointment.schedule_id.date).toLocaleDateString('en-US', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                        })}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <p className="text-sm text-gray-600">
                        {new Date(appointment.schedule_id.startTime).toLocaleTimeString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit',
                          hour12: true,
                        })}
                        {' '}-{' '}
                        {new Date(appointment.schedule_id.endTime).toLocaleTimeString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit',
                          hour12: true,
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <Calendar className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-4 text-lg font-medium text-gray-900">No upcoming appointments</h3>
            <p className="mt-2 text-sm text-gray-500">
              When you schedule appointments, they will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default UpcomingAppointments

