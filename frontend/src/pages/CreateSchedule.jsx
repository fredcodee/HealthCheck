import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Api from '../Api'
import ScheduleForm from '../components/ScheduleForm'
import Navbar from '../components/Navbar'
import { ArrowLeft, Clock, Calendar, Trash2, AlertCircle, CheckCircle } from 'lucide-react'

const CreateSchedule = () => {
    const accountType = localStorage.getItem('AccountType')?.replace(/"/g, '') || false
    const token = localStorage.getItem('token') || false
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [schedules, setSchedules] = useState([])
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        if (accountType != 'Doctor') {
            navigate('/dashboard')
        }
        getSchedules()
    }, [])

    const getSchedules = async () => {
        try {
            const schedules = await Api.get('api/get-schedules', {
                headers: {
                    Authorization: `Bearer ${token.replace(/"/g, '')}`
                }
            })
            setSchedules(Object.entries(schedules.data))
        } catch (error) {
            setError(`An error occurred while trying to get schedules`)
        }
    }

    const deleteSchedule = async (id) => {
        try {
            setError('')
            setSuccess('')
            setLoading(true)
            await Api.delete(`api/delete-schedule/${id}`, {
                headers: {
                    Authorization: `Bearer ${token.replace(/"/g, '')}`
                }
            })
            setSuccess(`Schedule deleted successfully`)
            await getSchedules()
            setLoading(false)
        } catch (error) {
            setLoading(false)
            setError(`An error occurred while trying to delete schedule`)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Back Button */}
                <a 
                    href="/dashboard" 
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6"
                >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Dashboard
                </a>

                {/* Notifications */}
                {error && (
                    <div className="mb-6 flex items-center gap-2 p-4 text-red-700 bg-red-50 rounded-lg">
                        <AlertCircle className="h-5 w-5" />
                        <p>{error}</p>
                    </div>
                )}
                {success && (
                    <div className="mb-6 flex items-center gap-2 p-4 text-green-700 bg-green-50 rounded-lg">
                        <CheckCircle className="h-5 w-5" />
                        <p>{success}</p>
                    </div>
                )}

                {/* Create Schedule Section */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
                    <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                        Create Your Schedule
                    </h1>
                    <ScheduleForm onSuccess={getSchedules} />
                </div>

                {/* Current Schedules Section */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">
                        Your Current Schedules
                    </h2>
                    
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {schedules.map(([date, events], index) => (
                            <div 
                                key={index} 
                                className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                            >
                                <div className="flex items-center gap-2 mb-4">
                                    <Calendar className="h-5 w-5 text-blue-600" />
                                    <h3 className="font-semibold text-gray-900">
                                        {date}
                                    </h3>
                                </div>
                                
                                <div className="space-y-4">
                                    {events.map(event => (
                                        <div 
                                            key={event._id}
                                            className="bg-white p-4 rounded-md border border-gray-200"
                                        >
                                            <div className="flex items-start justify-between">
                                                <div className="flex items-center gap-2">
                                                    <Clock className="h-4 w-4 text-gray-500" />
                                                    <span className="text-sm text-gray-600">
                                                        {new Date(event.startTime).toLocaleTimeString('en-US', {
                                                            hour: '2-digit',
                                                            minute: '2-digit',
                                                            hour12: true,
                                                        })}
                                                        {' '}-{' '}
                                                        {new Date(event.endTime).toLocaleTimeString('en-US', {
                                                            hour: '2-digit',
                                                            minute: '2-digit',
                                                            hour12: true,
                                                        })}
                                                    </span>
                                                </div>
                                                {loading ?
                                                <button
                                                    onClick={() => deleteSchedule(event._id)}
                                                    className="text-gray-600  p-1 rounded-md transition-colors"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>:
                                                <button
                                                onClick={() => deleteSchedule(event._id)}
                                                className="text-red-600 hover:text-red-700 p-1 rounded-md hover:bg-red-50 transition-colors"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>}

                                            </div>
                                            <div className="mt-2 flex items-center gap-2">
                                                <span className="text-sm font-medium text-gray-700">
                                                    Status:
                                                </span>
                                                <span className={`text-sm ${
                                                    event.taken 
                                                        ? 'text-orange-600 bg-orange-50' 
                                                        : 'text-green-600 bg-green-50'
                                                } px-2 py-0.5 rounded-full`}>
                                                    {event.taken ? 'Taken' : 'Available'}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateSchedule

