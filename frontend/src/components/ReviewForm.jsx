import React, { useState } from 'react'


const ReviewForm = ({ doctorName, onSubmitReview }) => {
    const [review, setReview] = useState('')

    return (
        <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Write a review about Dr. {doctorName}</h3>
            <div className="mt-4">
                <textarea
                    rows={3}
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                    placeholder="Write your review here..."
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                ></textarea>
                <button
                    onClick={() => onSubmitReview(review)}
                    className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    disabled={review.trim() === ''}
                >
                    Submit Review
                </button>
            </div>
        </div>
    )
}

export default ReviewForm

