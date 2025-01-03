import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Api from '../Api'
import Navbar from '../components/Navbar'
import AppointmentInfo from '../components/AppointmentInfo'
import StatusUpdate from '../components/StatusUpdate'
import RatingForm from '../components/RatingForm'
import ReviewForm from '../components/ReviewForm'
import { ArrowLeft, AlertCircle, CheckCircle } from 'lucide-react'

const AppointmentDetails = () => {
    const { id } = useParams()
    const [appointment, setAppointment] = useState(null)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [loading, setLoading] = useState(true)
    const accountType = localStorage.getItem('AccountType')?.replace(/"/g, '') || ''
    const token = localStorage.getItem('token') || ''

    useEffect(() => {
        getAppointmentDetail()
    }, [id])

    const getAppointmentDetail = async () => {
        try {
            const response = await Api.get(`api/get-appointment-details/${id}`, {
                headers: {
                    Authorization: `Bearer ${token.replace(/"/g, '')}`
                }
            })
            if (response.status === 200) {
                setAppointment(response.data)
            } else {
                setError("An error occurred while trying to get appointment details")
            }
        } catch (error) {
            setError(`An error occurred while trying to get appointment details`)
        } finally {
            setLoading(false)
        }
    }

    const updateAppointmentStatus = async (status) => {
        try {
            const response = await Api.post('api/update-appointment', {
                appointmentId: appointment._id,
                scheduleId: appointment.schedule_id._id,
                status
            }, {
                headers: {
                    Authorization: `Bearer ${token.replace(/"/g, '')}`
                }
            })
            if (response.status === 200) {
                setSuccess('Appointment status updated successfully')
                getAppointmentDetail()
            } else {
                setError('An error occurred while trying to update appointment status')
            }
        } catch (error) {
            if (error.response?.status === 401) {
                setError('Unauthorized user')
            } else {
                setError(`An error occurred while trying to update appointment status`)
            }
        }
    }

    const submitRating = async (rating) => {
        try {
            const response = await Api.post('api/rate-appointment', {
                appointmentId: appointment._id,
                rating
            }, {
                headers: {
                    Authorization: `Bearer ${token.replace(/"/g, '')}`
                }
            })
            if (response.status === 200) {
                setSuccess('Rating added successfully')
                getAppointmentDetail()
            } else {
                setError('An error occurred while trying to add rating')
            }
        } catch (error) {
            if (error.response?.status === 401) {
                setError('Unauthorized user')
            } else {
                setError(`An error occurred while trying to add rating`)
            }
        }
    }

    const submitReview = async (review) => {
        try {
            const response = await Api.post('api/review-doctor', {
                doctorId: appointment.doctor_id._id,
                comments: review
            }, {
                headers: {
                    Authorization: `Bearer ${token.replace(/"/g, '')}`
                }
            })
            if (response.status === 200) {
                setSuccess('Review added successfully')
                getAppointmentDetail()
            } else {
                setError('An error occurred while trying to add review')
            }
        } catch (error) {
            if (error.response?.status === 401) {
                setError('Unauthorized user')
            } else {
                setError(`An error occurred while trying to add review`)
            }
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <Link to="/appointments/status" className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Appointment page
                    </Link>
                </div>

                {error && (
                    <div className="mb-8 bg-red-50 border-l-4 border-red-400 p-4" role="alert">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <AlertCircle className="h-5 w-5 text-red-400" />
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-red-700">
                                    {error === "Unauthorized user" ? (
                                        <>
                                            Please upgrade your account to use this feature. 
                                            <Link to="/pricing" className="font-medium underline">Upgrade</Link>
                                        </>
                                    ) : error}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {success && (
                    <div className="mb-8 bg-green-50 border-l-4 border-green-400 p-4" role="alert">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <CheckCircle className="h-5 w-5 text-green-400" />
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-green-700">{success}</p>
                            </div>
                        </div>
                    </div>
                )}

                {loading ? (
                    <p className="text-center text-gray-500">Loading appointment details...</p>
                ) : appointment ? (
                    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                        <div className="px-4 py-5 sm:px-6">
                            <h1 className="text-2xl font-bold text-gray-900">Appointment Details</h1>
                        </div>
                        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                            <AppointmentInfo appointment={appointment} />
                            
                            {accountType === 'Doctor' && appointment.status !== 'completed' && (
                                <StatusUpdate 
                                    currentStatus={appointment.status} 
                                    onUpdateStatus={updateAppointmentStatus} 
                                />
                            )}

                            {accountType === 'Patient' && appointment.status === 'completed' && !appointment.rating && (
                                <RatingForm onSubmitRating={submitRating} />
                            )}

                            {accountType === 'Patient' && appointment.status === 'completed' && !appointment.has_review && (
                                <ReviewForm 
                                    doctorName={appointment.doctor_id.name} 
                                    onSubmitReview={submitReview} 
                                />
                            )}
                        </div>
                    </div>
                ) : null}
            </main>
        </div>
    )
}

export default AppointmentDetails

