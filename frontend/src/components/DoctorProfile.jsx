import React from 'react'
import { User, MapPin, Phone, Calendar, Star } from 'lucide-react'
import userImg from '../assets/img/user.jpg'

const DoctorProfile= ({ doctor, numOfReviews, rating}) => {
    const imageSrc = import.meta.env.VITE_MODE === 'Production' 
        ? import.meta.env.VITE_API_BASE_URL_PROD 
        : import.meta.env.VITE_API_BASE_URL_DEV

    return (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
                <img 
                    className="h-32 w-32 rounded-full mx-auto"
                    src={doctor.profile_image_name ? `${imageSrc}/images/${doctor.profile_image_name}` : userImg}
                    alt={doctor.name}
                />
                <h3 className="text-lg leading-6 font-medium text-gray-900 text-center mt-4">
                    Dr. {doctor.name}
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500 text-center">
                    {doctor.account_type}
                </p>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                <dl className="sm:divide-y sm:divide-gray-200">
                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500 flex items-center">
                            <User className="mr-2 h-5 w-5" />
                            Bio
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {doctor.bio}
                        </dd>
                    </div>
                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500 flex items-center">
                            <MapPin className="mr-2 h-5 w-5" />
                            Location
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {doctor.city}, {doctor.country}
                        </dd>
                    </div>
                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500 flex items-center">
                            <Phone className="mr-2 h-5 w-5" />
                            Phone
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {doctor.phone || 'Not available'}
                        </dd>
                    </div>
                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500 flex items-center">
                            <Star className="mr-2 h-5 w-5" />
                            Rating
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {rating != null ? `${rating}/5` : 'No ratings yet'}
                        </dd>
                    </div>
                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500 flex items-center">
                            <Star className="mr-2 h-5 w-5" />
                            Reviews
                        </dt>
                        <a href={`/doctor-reviews/${doctor._id}`}>
                        <dd className="mt-1 text-sm text-blue-500 sm:mt-0 sm:col-span-2">
                            {numOfReviews > 0 ? `${numOfReviews}/5` : 'No reviews yet'}
                        </dd></a>
                    </div>

                </dl>
            </div>
        </div>
    )
}

export default DoctorProfile

