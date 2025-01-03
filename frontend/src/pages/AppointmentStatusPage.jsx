import React, { useEffect, useState } from 'react'
import Api from '../Api'
import Navbar from '../components/Navbar'
import { ArrowLeft, Calendar, Clock, User, AlertCircle } from 'lucide-react'

const AppointmentStatusPage = () => {
    const [account_type, setAccountType] = useState('')
    const [activeTab, setActiveTab] = useState('pending')
    const [isLoading, setIsLoading] = useState(false)
    const [pendingAppointments, setPendingAppointments] = useState([])
    const [upcomingAppointments, setUpcomingAppointments] = useState([])
    const [pastAppointments, setPastAppointments] = useState([])
    const token = localStorage.getItem('token') || false
    const [error, setError] = useState(null)

    useEffect(() => {
        getUserProfile()
    }, [])

    useEffect(() => {
        if (account_type) {
            if (activeTab === 'pending') getPendingAppointments()
            if (activeTab === 'upcoming') getUpcomingAppointments()
            if (activeTab === 'past') getPastAppointments()
        }
    }, [activeTab, account_type])

    const getUserProfile = async () => {
        try {
            const response = await Api.get('api/user/profile', {
                headers: {
                    Authorization: `Bearer ${token.replace(/"/g, '')}`
                }
            })
            if (response.status === 200) {
                setAccountType(response.data.account_type)
            } else {
                setError(response.data.message)
            }
        } catch (error) {
            setError(error.response.data.message)
        }
    }

    const getPendingAppointments = async () => {
        try {
            setIsLoading(true)
            const response = await Api.get(`api/appointments/${account_type}/pending`, {
                headers: {
                    Authorization: `Bearer ${token.replace(/"/g, '')}`
                }
            })
            setPendingAppointments(response.data)
        } catch (error) {
            setError(error.response.data.message)
        } finally {
            setIsLoading(false)
        }
    }

    const getUpcomingAppointments = async () => {
        try {
            setIsLoading(true)
            const response = await Api.get(`api/appointments/${account_type}/accepted`, {
                headers: {
                    Authorization: `Bearer ${token.replace(/"/g, '')}`
                }
            })
            setUpcomingAppointments(response.data)
        } catch (error) {
            setError(error.response.data.message)
        } finally {
            setIsLoading(false)
        }
    }

    const getPastAppointments = async () => {
        try {
            setIsLoading(true)
            const response = await Api.get(`api/appointments/${account_type}/completed`, {
                headers: {
                    Authorization: `Bearer ${token.replace(/"/g, '')}`
                }
            })
            setPastAppointments(response.data)
        } catch (error) {
            setError(error.response.data.message)
        } finally {
            setIsLoading(false)
        }
    }

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800'
            case 'accepted':
                return 'bg-blue-100 text-blue-800'
            case 'completed':
                return 'bg-gray-100 text-gray-800'
            default:
                return 'bg-gray-100 text-gray-800'
        }
    }

    const renderAppointments = (appointments) => {
        if (isLoading) {
            return (
                <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
            )
        }

        if (!appointments?.length) {
            return (
                <div className="text-center py-12">
                    <p className="text-gray-500">No appointments found</p>
                </div>
            )
        }

        return (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {appointments.map((appointment, index) => (
                    <a
                        key={index}
                        href={`/appointment-details/${appointment._id}`}
                        className="block group"
                    >
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 transition-all duration-200 hover:shadow-md hover:border-blue-500">
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
                    </a>
                ))}
            </div>
        )
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
                        <AlertCircle className="h-5 w-5" />
                        <p>{error}</p>
                    </div>
                )}

                {/* Tabs */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                    <div className="border-b border-gray-200">
                        <nav className="flex -mb-px">
                            <button
                                onClick={() => setActiveTab('pending')}
                                className={`px-6 py-4 text-sm font-medium ${
                                    activeTab === 'pending'
                                        ? 'border-b-2 border-blue-500 text-blue-600'
                                        : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                            >
                                Pending
                            </button>
                            <button
                                onClick={() => setActiveTab('upcoming')}
                                className={`px-6 py-4 text-sm font-medium ${
                                    activeTab === 'upcoming'
                                        ? 'border-b-2 border-blue-500 text-blue-600'
                                        : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                            >
                                Upcoming
                            </button>
                            <button
                                onClick={() => setActiveTab('past')}
                                className={`px-6 py-4 text-sm font-medium ${
                                    activeTab === 'past'
                                        ? 'border-b-2 border-blue-500 text-blue-600'
                                        : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                            >
                                Past
                            </button>
                        </nav>
                    </div>

                    <div className="p-6">
                        {activeTab === 'pending' && renderAppointments(pendingAppointments)}
                        {activeTab === 'upcoming' && renderAppointments(upcomingAppointments)}
                        {activeTab === 'past' && renderAppointments(pastAppointments)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AppointmentStatusPage

