import React, { useState, useEffect } from 'react'
import Api from '../Api'
import Navbar from '../components/Navbar'
import { ArrowLeft, Star, Loader2 } from 'lucide-react'
import ReviewItem from '../components/ReviewItem'


const ReviewsPage = () => {
    const [error, setError] = useState('')
    const [reviews, setReviews] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getReviews()
    }, [])

    const getReviews = async () => {
        const token = localStorage.getItem('token')
        if (!token) {
            setError('Authentication token not found')
            setLoading(false)
            return
        }

        try {
            const response = await Api.get('api/user/my-reviews', {
                headers: {
                    Authorization: `Bearer ${JSON.parse(token)}`
                }
            })
            if (response.status === 200) {
                setReviews(response.data)
                setError('')
            }
        } catch (error) {
            setError('An error occurred while fetching reviews. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <a href="/dashboard" className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Dashboard
                    </a>
                </div>

                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Your Reviews</h1>
                    <p className="mt-2 text-gray-600">
                        View and manage your feedback for doctors
                    </p>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6" role="alert">
                        {error}
                    </div>
                )}

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                    </div>
                ) : reviews.length > 0 ? (
                    <div className="bg-white shadow overflow-hidden sm:rounded-md">
                        <ul className="divide-y divide-gray-200">
                            {reviews.map((review, index) => (
                                <ReviewItem key={index} review={review} />
                            ))}
                        </ul>
                    </div>
                ) : (
                    <div className="text-center py-12 bg-white shadow overflow-hidden sm:rounded-md">
                        <Star className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No reviews yet</h3>
                        <p className="mt-1 text-sm text-gray-500">Get started by writing a review for your recent consultation.</p>
                    </div>
                )}
            </main>
        </div>
    )
}

export default ReviewsPage

