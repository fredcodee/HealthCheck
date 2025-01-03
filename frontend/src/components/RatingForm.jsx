import React, { useState } from 'react'
import { Star } from 'lucide-react'


const RatingForm = ({ onSubmitRating }) => {
    const [rating, setRating] = useState<number>(0)

    return (
        <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Rate your Session</h3>
            <div className="mt-4">
                <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                            key={star}
                            className={`h-8 w-8 cursor-pointer ${
                                star <= rating ? 'text-yellow-400' : 'text-gray-300'
                            }`}
                            onClick={() => setRating(star)}
                            fill={star <= rating ? 'currentColor' : 'none'}
                        />
                    ))}
                </div>
                <button
                    onClick={() => onSubmitRating(rating)}
                    className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    disabled={rating === 0}
                >
                    Submit Rating
                </button>
            </div>
        </div>
    )
}

export default RatingForm

