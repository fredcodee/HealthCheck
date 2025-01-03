import React, { useState, useEffect } from 'react'
import Api from '../Api'
import userImg from '../assets/img/user.jpg'
import Navbar from '../components/Navbar'
import EditProfileModal from '../components/EditProfileModal'
import { ArrowLeft, MapPin, Phone, User, Star, Calendar, MessageCircle, AlertCircle, CheckCircle } from 'lucide-react'

const ProfilePage = () => {
    const accountType = localStorage.getItem('AccountType')?.replace(/"/g, '') || false
    const token = localStorage.getItem('token') || false
    const [user, setUser] = useState(null)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [showEditModal, setShowEditModal] = useState(false)
    const [selectedImage, setSelectedImage] = useState(null)
    const [numOfAppointments, setNumOfAppointments] = useState('')
    const [reviews, setReviews] = useState([])
    const [rating, setRating] = useState('')
    const [formData, setFormData] = useState({
        name: '',
        bio: '',
        age: '',
        gender: '',
        phone: '',
        country: '',
        city: '',
    })

    const imageSrc = import.meta.env.VITE_MODE === 'Production' 
        ? import.meta.env.VITE_API_BASE_URL_PROD 
        : import.meta.env.VITE_API_BASE_URL_DEV

    useEffect(() => {
        getUserProfile()
    }, [])

    useEffect(() => {
        if (user?._id) {
            getDoctorStats()
            getDoctorReviews()
        }
    }, [user])

    const getUserProfile = async () => {
        try {
            const response = await Api.get('api/user/profile', {
                headers: {
                    Authorization: `Bearer ${token.replace(/"/g, '')}`
                }
            })
            
            if (response.status === 200) {
                setUser(response.data)
                setFormData({
                    name: response.data.name,
                    bio: response.data.bio,
                    age: response.data.age,
                    gender: response.data.gender,
                    phone: response.data.phone,
                    country: response.data.country,
                    city: response.data.city,
                })
            }
        } catch (error) {
            setError("An error occurred while fetching profile details")
        }
    }

    const getDoctorStats = async () => {
        if (accountType !== 'Doctor') return
        
        try {
            const response = await Api.get(`api/doctor-stats/${user._id}`, {
                headers: {
                    Authorization: `Bearer ${token.replace(/"/g, '')}`
                }
            })
            
            if (response.status === 200) {
                setNumOfAppointments(response.data.numOfAppointments)
                setRating(response.data.avgRating)
            }
        } catch (error) {
            setError("Error fetching doctor stats")
        }
    }

    const getDoctorReviews = async () => {
        if (accountType !== 'Doctor') return
        
        try {
            const response = await Api.post('api/get-doctor-reviews', 
                { doctorId: user._id },
                {
                    headers: {
                        Authorization: `Bearer ${token.replace(/"/g, '')}`
                    }
                }
            )
            
            if (response.status === 200) {
                setReviews(response.data)
            }
        } catch (error) {
            setError("Error fetching reviews")
        }
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setSelectedImage(file)
        }
    }

    const handleSaveProfile = async () => {
        try {
            const response = await Api.post('api/user/edit-profile', formData, {
                headers: {
                    Authorization: `Bearer ${token.replace(/"/g, '')}`
                }
            })

            if (response.status === 200) {
                if (selectedImage) {
                    const formData = new FormData()
                    formData.append('image', selectedImage)
                    await Api.post('/api/user/profile/image/upload', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            Authorization: `Bearer ${token.replace(/"/g, '')}`
                        }
                    })
                }
                
                await getUserProfile()
                setSuccess("Profile updated successfully")
                setShowEditModal(false)
            }
        } catch (error) {
            setError(error.response?.data?.message || "Error updating profile")
        }
    }

    if (!user) return null

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

                {/* Profile Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    {/* Cover Image */}
                    <div className="h-32 bg-gradient-to-r from-blue-500 to-blue-600" />

                    <div className="relative px-6 pb-6">
                        {/* Avatar */}
                        <div className="-mt-16 mb-6">
                            <img
                                src={user.profile_image_name ? `${imageSrc}/images/${user.profile_image_name}` : userImg}
                                alt={user.name}
                                className="h-32 w-32 rounded-full border-4 border-white shadow-md"
                            />
                        </div>

                        {/* Edit Button */}
                        <button
                            onClick={() => setShowEditModal(true)}
                            className="absolute top-4 right-6 rounded-lg bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Edit Profile
                        </button>

                        {/* Profile Info */}
                        <div className="space-y-6">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
                                <p className="text-blue-600 font-medium">{user.account_type}</p>
                                {user.bio && (
                                    <p className="mt-4 text-gray-500">{user.bio}</p>
                                )}
                            </div>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                                <div className="flex items-center gap-2">
                                    <MapPin className="h-5 w-5 text-gray-400" />
                                    <span className="text-gray-600">{user.city || 'N/A'}, {user.country || 'N/A'}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <User className="h-5 w-5 text-gray-400" />
                                    <span className="text-gray-600">{user.gender || 'N/A'}, {user.age || 'N/A'} years</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Phone className="h-5 w-5 text-gray-400" />
                                    <span className="text-gray-600">{user.phone || 'N/A'}</span>
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                <a
                                    href="/appointments/status"
                                    className="flex items-center gap-4 rounded-lg border border-gray-200 p-4 hover:border-blue-500"
                                >
                                    <Calendar className="h-8 w-8 text-blue-600" />
                                    <div>
                                        <div className="text-2xl font-bold text-gray-900">
                                            {numOfAppointments || 0}
                                        </div>
                                        <div className="text-sm text-gray-500">Appointments</div>
                                    </div>
                                </a>

                                {accountType === 'Doctor' && (
                                    <>
                                        <div className="flex items-center gap-4 rounded-lg border border-gray-200 p-4">
                                            <Star className="h-8 w-8 text-yellow-500" />
                                            <div>
                                                <div className="text-2xl font-bold text-gray-900">
                                                    {rating || 'N/A'}
                                                </div>
                                                <div className="text-sm text-gray-500">Average Rating</div>
                                            </div>
                                        </div>

                                        <a
                                            href={`/doctor-reviews/${user._id}`}
                                            className="flex items-center gap-4 rounded-lg border border-gray-200 p-4 hover:border-blue-500"
                                        >
                                            <MessageCircle className="h-8 w-8 text-green-600" />
                                            <div>
                                                <div className="text-2xl font-bold text-gray-900">
                                                    {reviews.length}
                                                </div>
                                                <div className="text-sm text-gray-500">Reviews</div>
                                            </div>
                                        </a>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Edit Profile Modal */}
            {showEditModal && (
                <EditProfileModal
                    isDoctor={accountType === 'Doctor'}
                    formData={formData}
                    setFormData={setFormData}
                    onSave={handleSaveProfile}
                    onClose={() => setShowEditModal(false)}
                    handleImageChange={handleImageChange}
                />
            )}
        </div>
    )
}

export default ProfilePage

