import React, { useEffect, useState } from 'react'
import Api from '../Api'
import Navbar from '../components/Navbar'
import { Calendar, Clock, FileText, Plus, Users, Star, CalendarIcon } from 'lucide-react'

const DashBoard = () => {
  const token = localStorage.getItem('token') || false
  const type = localStorage.getItem('type') || false
  const accountType = localStorage.getItem('AccountType') ? localStorage.getItem('AccountType').replace(/"/g, '') : null;
  const [user, setUser] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    getProfile()
  }, [accountType])

  const getProfile = async () => {
    try {
      await Api.get('api/user/profile', {
        headers: {
          Authorization: `Bearer ${token.replace(/"/g, '')}`
        }
      }).then((response) => {
        if (response.status == 200) {
          setUser(response.data)
        }
      })
    }
    catch (error) {
      setError("An error occurred while trying to get profile details")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Trial Notice Banner */}
        {type && type.replace(/"/g, '') === 'Free' && (
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-4 rounded-lg shadow-md mb-8">
            <div className="flex items-center justify-between">
              <p className="text-sm md:text-base">
                You're currently using a free trial. 
                <a href="/pricing" className="underline ml-2 font-medium hover:text-blue-100">
                  Upgrade your plan to remove restrictions →
                </a>
              </p>
            </div>
          </div>
        )}

        {/* Dashboard Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Welcome back, manage your {accountType === 'Doctor' ? 'practice' : 'appointments'} here
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {accountType === 'Doctor' ? (
            // Doctor's Dashboard Cards
            <>
              <DashboardCard
                href="/create-schedule"
                icon={<Calendar className="h-6 w-6" />}
                title="Create Schedule"
                description="Set up your availability and working hours"
              />
              
              <DashboardCard
                href="/appointments/status"
                icon={<Clock className="h-6 w-6" />}
                title="Appointments & Status"
                description="Manage and track your patient appointments"
              />
              
              <DashboardCard
                href={`/doctor-reviews/${user._id}`}
                icon={<Star className="h-6 w-6" />}
                title="Reports & Reviews"
                description="View patient feedback and performance metrics"
              />
              
              <DashboardCard
                href="/upcoming-appointments"
                icon={<CalendarIcon className="h-6 w-6" />}
                title="Upcoming Appointments"
                description="See your schedule for upcoming consultations"
              />
            </>
          ) : (
            // Patient's Dashboard Cards
            <>
              <DashboardCard
                href="/appointment"
                icon={<Plus className="h-6 w-6" />}
                title="Book Appointment"
                description="Schedule a new consultation"
              />
              
              <DashboardCard
                href="/appointments/status"
                icon={<Clock className="h-6 w-6" />}
                title="View Appointments"
                description="Check your appointment status and history"
              />
              
              <DashboardCard
                href="/reviews"
                icon={<FileText className="h-6 w-6" />}
                title="Reviews & Comments"
                description="Manage your feedback and ratings"
              />
              
              <DashboardCard
                href="/upcoming-appointments"
                icon={<CalendarIcon className="h-6 w-6" />}
                title="Upcoming Appointments"
                description="View your scheduled consultations"
              />
            </>
          )}
        </div>
      </div>
    </div>
  )
}

// Dashboard Card Component
const DashboardCard = ({ href, icon, title, description }) => {
  return (
    <a
      href={href}
      className="block group"
    >
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 transition-all duration-200 hover:shadow-md hover:border-blue-500">
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <div className="p-3 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors duration-200">
              {icon}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600">
              {title}
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {description}
            </p>
          </div>
        </div>
      </div>
    </a>
  )
}

export default DashBoard

