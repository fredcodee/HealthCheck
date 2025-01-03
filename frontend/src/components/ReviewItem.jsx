import React from 'react'
import { Star } from 'lucide-react'
const ReviewItem = ({ review }) => {
    return (
        <li>
            <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-blue-600 truncate">
                        Dr. {review.doctor_id.name}
                    </p>
                    <div className="ml-2 flex-shrink-0 flex">
                        {review.rating && (
                            <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`h-5 w-5 ${
                                            i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                                        }`}
                                        fill="currentColor"
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                        <p className="text-sm text-gray-500">
                            {review.content}
                        </p>
                    </div>
                </div>
            </div>
        </li>
    )
}

export default ReviewItem

