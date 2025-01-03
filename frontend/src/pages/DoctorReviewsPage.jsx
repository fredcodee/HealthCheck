import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Api from '../Api'
import Navbar from '../components/Navbar'
import { ArrowLeft, Star, MessageCircle, User, AlertCircle } from 'lucide-react'

const DoctorReviewsPage = () => {
    const { id } = useParams()
    const token = localStorage.getItem('token') || false
    const [error, setError] = useState('')
    const [reviews, setReviews] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        getDoctorReviews()
    }, [])

    const getDoctorReviews = async () => {
        try {
            setIsLoading(true)
            const data = { doctorId: id }
            const response = await Api.post('api/get-doctor-reviews', data, {
                headers: {
                    Authorization: `Bearer ${token.replace(/"/g, '')}`
                }
            })

            if (response.status === 200) {
                setReviews(response.data)
            }
        } catch (error) {
            setError('An error occurred while fetching reviews. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div>
            <Navbar />
            <div className="min-h-screen bg-gray-50">

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

                    {/* Header */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                        <div className="flex items-center justify-between">
                            <h1 className="text-2xl font-bold text-gray-900">
                                Your Reviews
                            </h1>
                            <div className="flex items-center gap-2 text-gray-500">
                                <MessageCircle className="h-5 w-5" />
                                <span className="text-sm font-medium">
                                    {reviews.length} {reviews.length === 1 ? 'Review' : 'Reviews'}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Reviews Section */}
                    <div className="space-y-4">
                        {isLoading ? (
                            // Loading State
                            <div className="flex items-center justify-center py-12">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                            </div>
                        ) : reviews.length > 0 ? (
                            // Reviews List
                            reviews.map((review, index) => (
                                <div
                                    key={index}
                                    className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 transition-all duration-200 hover:shadow-md"
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-start gap-3">
                                                <div className="flex-shrink-0">
                                                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                                                        <User className="h-5 w-5 text-blue-600" />
                                                    </div>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium text-gray-900">
                                                        {review.user_id.name}
                                                    </p>
                                                    <div className="mt-1 text-sm text-gray-700">
                                                        {review.content}
                                                    </div>
                                                    {review.rating && (
                                                        <div className="mt-2 flex items-center gap-1">
                                                            {[...Array(5)].map((_, i) => (
                                                                <Star
                                                                    key={i}
                                                                    className={`h-4 w-4 ${i < review.rating
                                                                            ? 'text-yellow-400 fill-current'
                                                                            : 'text-gray-300'
                                                                        }`}
                                                                />
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            // Empty State
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                                <MessageCircle className="mx-auto h-12 w-12 text-gray-400" />
                                <h3 className="mt-4 text-lg font-medium text-gray-900">No reviews yet</h3>
                                <p className="mt-2 text-sm text-gray-500">
                                    When patients leave reviews, they will appear here.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>

    )
}

export default DoctorReviewsPage

