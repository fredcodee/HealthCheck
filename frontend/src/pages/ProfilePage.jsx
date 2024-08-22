import React, { useState, useEffect } from 'react'
import '../assets/styles/css/profilePage.css'
import bg from '../assets/img/bg1.jpg'
import userImg from '../assets/img/user.jpg'
import PopUp from '../components/Popup'
import Api from '../Api'

const ProfilePage = () => {
    const accountType = localStorage.getItem('AccountType').replace(/"/g, '') || false
    const token = localStorage.getItem('token') || false
    const [user, setUser] = useState('')
    const [name, setName] = useState('')
    const [bio, setBio] = useState('')
    const [age, setAge] = useState('')
    const [gender, setGender] = useState('')
    const [phone, setPhone] = useState('')
    const [country, setCountry] = useState('')
    const [city, setCity] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [showPopUpForEditProfile, setShowPopUpForEditProfile] = useState(false)
    const [selectedImage, setSelectedImage] = useState(null);
    const [numOfAppointments, setNumOfAppointments] = useState('')
    const [reviews, setReviews] = useState([])
    const [rating, setRating] = useState('')
    const imageSrc = import.meta.env.VITE_MODE == 'Production' ? import.meta.env.VITE_API_BASE_URL_PROD : import.meta.env.VITE_API_BASE_URL_DEV
    const togglePopUpForEditprofile = () => {
        setShowPopUpForEditProfile(!showPopUpForEditProfile)
    }


    useEffect(() => {
        getUserProfile()
    }, [])

    useEffect(() => {
        if (user) {
            getDoctorStats()
            getDoctorReviews()
        }
    }, [user])

    const getUserProfile = async () => {
        try {
            await Api.get('api/user/profile', {
                headers: {
                    Authorization: `Bearer ${token.replace(/"/g, '')}`
                }
            })
                .then((response) => {
                    if (response.status == 200) {
                        setUser(response.data)
                        setName(response.data.name)
                        setBio(response.data.bio)
                        setAge(response.data.age)
                        setGender(response.data.gender)
                        setPhone(response.data.phone)
                        setCountry(response.data.country)
                        setCity(response.data.city)
                    } else {
                        setError("An error occured while trying to get profile details")
                    }
                })
        }
        catch (error) {
            setError("An error occured while trying to get profile details")
        }
    }
    const getDoctorStats = async () => {
        try{
            await Api.get(`api/doctor-stats/${user._id}`, {
                headers: {
                    Authorization: `Bearer ${token.replace(/"/g, '')}`
                }
            })
                .then((response) => {
                    if (response.status == 200) {
                        setNumOfAppointments(response.data.numOfAppointments)
                        setRating(response.data.avgRating)
                    } else {
                        setError("error occured, please try again")
                    }
                })
        }
        catch (error) {
            setError("error occured, please try again")
            console.error(error)
        }
    }

    const getDoctorReviews = async () => {
        try{
            const data = {
                doctorId: user._id
            }
            await Api.post('api/get-doctor-reviews',data, {
                headers: {
                    Authorization: `Bearer ${token.replace(/"/g, '')}`
                }
            }).then((response) => {
                    if (response.status == 200) {
                        setReviews(response.data)
                    } else {
                        setError("error occured, please try again")
                    }
                })
        }
        catch (error) {
            setError("error occured, please try again")
            console.error(error)
        }
    }
    const editProfile = async (data) => {
        try {
            const data = {
                name: name,
                bio: bio,
                age: age,
                gender: gender,
                phone: phone,
                country: country,
                city: city
            }

            await Api.post('api/user/edit-profile', data, {
                headers: {
                    Authorization: `Bearer ${token.replace(/"/g, '')}`
                }
            })
                .then(async(response) => {
                    if (response.status == 200) {
                        if(selectedImage){
                            const formData = new FormData();
                            formData.append('image', selectedImage);
                            await Api.post('/api/user/profile/image/upload', formData, {
                                headers: {
                                  'Content-Type': 'multipart/form-data',
                                  Authorization: `Bearer ${token.replace(/"/g, '')}`
                                }
                              })
                        }
                        getUserProfile()
                        setSuccess("Profile updated successfully")
                        togglePopUpForEditprofile()
                    } else {
                        setError(response.data.message)
                    }
                })

        }
        catch (error) {
            setError(error.response.data.message)
        }
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
    
        if (file) {
          setSelectedImage(file);
        }
      };

    return (
        <div>
            <div className='text-center'>
                {error && <div className="alert alert-danger">{error}</div>}
                {success && <div className="alert alert-success">{success}</div>}
            </div>
            {/* view for doctors */}
            {user && user.account_type == 'Doctor' ? (
                <div className="content-profile-page">
                    <div className="profile-user-page card">
                        <div className="img-user-profile">
                            <img className="profile-bgHome" src={bg} />
                            <img className="avatar" src={`${imageSrc}/images/${user.profile_image_name}` || userImg} alt="jofpin" />
                        </div>
                        <button onClick={togglePopUpForEditprofile} >Edit Profile</button>
                        {/* for popup for editing profile*/}
                        {showPopUpForEditProfile && <PopUp
                            content={<>
                                <div id="staticModal" data-modal-backdrop="static" tabIndex="-1" aria-hidden="true" className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                                    <div className="relative w-full max-w-2xl max-h-full" style={{ margin: "auto" }}>
                                        <div className="relative bg-gray-300 rounded-lg shadow dark:bg-gray-700 ">

                                            <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600 text-center">
                                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                                    Edit Your Profile
                                                </h3>
                                            </div>
                                            <div className="p-6 space-y-6">
                                                <div>
                                                    <div className='pb-3'>
                                                        <label htmlFor="name">
                                                            Name
                                                        </label>
                                                        <input type="text"
                                                            value={name} onChange={(e) => setName(e.target.value)}
                                                            id="name"
                                                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm" />
                                                    </div>
                                                    <div className='pb-3'>
                                                        <label htmlFor="bio">
                                                            Bio
                                                        </label>
                                                        <textarea
                                                            id="age"
                                                            rows="3"
                                                            value={bio} onChange={(e) => setBio(e.target.value)}
                                                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm" ></textarea>
                                                    </div>
                                                    <div className='pb-3'>
                                                        <label htmlFor="Picture">
                                                            Change Profile Picture
                                                        </label>
                                                        <input
                                                            type="file"
                                                            id="Picture"
                                                            accept=".jpg, .jpeg, .png"
                                                            onChange={handleImageChange}
                                                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm" />
                                                    </div>
                                                    <div className='pb-3'>
                                                        <label htmlFor="gender">
                                                            Gender
                                                        </label>
                                                        <select id="gender" name="gender" className="options form-select block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm" value={gender} onChange={(e) => setGender(e.target.value)}>
                                                            <option>Select Gender</option>
                                                            <option value="Male">Male</option>
                                                            <option value="Female">Female</option>
                                                            <option value="Others">Others</option>

                                                        </select>
                                                       </div>
                                                    <div className='pb-3'>
                                                        <label htmlFor="age">
                                                            Age
                                                        </label>
                                                        <input type="number"
                                                            value={age} onChange={(e) => setAge(e.target.value)}
                                                            id="age"
                                                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm" />
                                                    </div>
                                                    <div className='pb-3'>
                                                        <label htmlFor="Phone">
                                                            Phone
                                                        </label>
                                                        <input type="text"
                                                            value={phone} onChange={(e) => setPhone(e.target.value)}
                                                            id="Phone"
                                                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm" />
                                                    </div>
                                                    <div className='pb-3'>
                                                        <label htmlFor="Country">
                                                            Country
                                                        </label>
                                                        <select id="Country" name="country" class=" options form-control" value={country} onChange={(e) => setCountry(e.target.value)}>
                                                            <option>Select Country</option>
                                                            <option value="US">US</option>
                                                            <option value="Canada">Canada</option>
                                                            <option value="UK">UK</option>
                                                        </select>

                                                    </div>
                                                    <div className='pb-3'>
                                                        <label htmlFor="city">
                                                            City
                                                        </label>


                                                        {user.country == "US" || country == "US" ? (
                                                            <select id="City" name="city" className="options form-select block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm" value={city} onChange={(e) => setCity(e.target.value)}>
                                                                <option>Select City</option>
                                                                <option value="NY">New York</option>
                                                                <option value="LA">Los Angeles</option>
                                                                <option value="SE">Seattle</option>
                                                            </select>
                                                        ) : user.country == "CA" || country == "CA" ? (
                                                            <select id="City" name="city" className="options form-select block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm" value={city} onChange={(e) => setCity(e.target.value)}>
                                                                <option>Select City</option>
                                                                <option value="TR">Toronto</option>
                                                                <option value="VA">Vancouver</option>
                                                            </select>
                                                        ) : user.country == "UK" || country == "UK" ? (
                                                            <select id="City" name="city" className="options form-select block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm" value={city} onChange={(e) => setCity(e.target.value)}>
                                                                <option>Select City</option>
                                                                <option value="LDN">London</option>
                                                                <option value="MAN">Manchester</option>
                                                            </select>
                                                        ) : (
                                                            <></>
                                                        )}

                                                    </div>
                                                    <div className='text-center'>
                                                        <button type="button" id='submitButton' onClick={editProfile} className="text-white text-xl bg-green-500 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg  px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Save Changes</button>
                                                        <button type="button" id='submitButton' style={{ backgroundColor: '#927927', marginLeft: '1rem' }} onClick={togglePopUpForEditprofile} className="text-white text-xl bg-green-500 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg  px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Cancel</button>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>}
                        />}

                        <div className="user-profile-data">
                            <h1>{user.name}</h1>
                            <p className='account-type-text'>{user.account_type}</p>
                        </div>
                        <div className="description-profile" style={{ paddingBottom: '2rem', fontSize: '15px' }}>{user.bio}</div>
                        <div className="description-profile">
                            <p>Country: {user.country}</p>
                            <p>City: {user.city}</p>
                            <p>Age: {user.age}</p>
                            <p>Phone: {user.phone}</p>
                            <p>Gender: {user.gender}</p>
                        </div>
                        <ul className="data-user">
                            <li style={{ color: 'black' }}><a href='/appointments/status'><strong>{numOfAppointments}</strong><span>Appointments</span></a></li>
                            <li style={{ color: 'black' }}><strong>{rating === null ? "no ratings yet " : rating}/5</strong><span>Ratings</span></li>
                            <li><a href= {`/doctor-reviews/${user._id}`}><strong>{reviews.length}</strong><span>Reviews</span></a></li>

                        </ul>
                    </div>
                </div>

            ) : (
                <div className="content-profile-page">
                    {/* view for patients */}
                    <div className="profile-user-page card">
                        <div className="img-user-profile">
                            <img className="profile-bgHome" src={bg} />
                            <img className="avatar" src={userImg} alt="jofpin" />
                        </div>
                        <button onClick={togglePopUpForEditprofile}>Edit Profile</button>
                        {showPopUpForEditProfile && <PopUp
                            content={<>
                                <div id="staticModal" data-modal-backdrop="static" tabIndex="-1" aria-hidden="true" className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                                    <div className="relative w-full max-w-2xl max-h-full" style={{ margin: "auto" }}>
                                        <div className="relative bg-gray-300 rounded-lg shadow dark:bg-gray-700 ">

                                            <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600 text-center">
                                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                                    Edit Your Profile
                                                </h3>
                                            </div>
                                            <div className="p-6 space-y-6">
                                                <div>
                                                    <div className='pb-3'>
                                                        <label htmlFor="name">
                                                            Name
                                                        </label>
                                                        <input type="text"
                                                            value={name} onChange={(e) => setName(e.target.value)}
                                                            id="name"
                                                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm" />
                                                    </div>
                                                    <div className='pb-3'>
                                                        <label htmlFor="gender">
                                                            Gender
                                                        </label>
                                                        <select id="gender" name="gender" className="options form-select block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm" value={gender} onChange={(e) => setGender(e.target.value)}>
                                                            <option>Select Gender</option>
                                                            <option value="Male">Male</option>
                                                            <option value="Female">Female</option>
                                                            <option value="Others">Others</option>
                                                        </select>
                                                       </div>
                                                    <div className='pb-3'>
                                                        <label htmlFor="age">
                                                            Age
                                                        </label>
                                                        <input type="number"
                                                            value={age} onChange={(e) => setAge(e.target.value)}
                                                            id="age"
                                                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm" />
                                                    </div>
                                                    <div className='pb-3'>
                                                        <label htmlFor="Phone">
                                                            Phone
                                                        </label>
                                                        <input type="text"
                                                            value={phone} onChange={(e) => setPhone(e.target.value)}
                                                            id="Phone"
                                                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm" />
                                                    </div>
                                                    <div className='pb-3'>
                                                        <label htmlFor="Country">
                                                            Country
                                                        </label>
                                                        <select id="Country" name="country" className="options form-select block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm" value={country} onChange={(e) => setCountry(e.target.value)}>
                                                            <option>Select Country</option>
                                                            <option value="US">US</option>
                                                            <option value="CA">Canada</option>
                                                            <option value="UK">UK</option>
                                                        </select>

                                                    </div>
                                                    <div className='pb-3'>
                                                        <label htmlFor="city">
                                                            City
                                                        </label>


                                                        {user.country == "US" || country == "US" ? (
                                                            <select id="City" name="city" className="options form-select block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm" value={city} onChange={(e) => setCity(e.target.value)}>
                                                                <option>Select City</option>
                                                                <option value="NY">New York</option>
                                                                <option value="LA">Los Angeles</option>
                                                                <option value="SE">Seattle</option>
                                                            </select>
                                                        ) : user.country == "CA" || country == "CA" ? (
                                                            <select id="City" name="city" className="options form-select block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm" value={city} onChange={(e) => setCity(e.target.value)}>
                                                                <option>Select City</option>
                                                                <option value="TR">Toronto</option>
                                                                <option value="VA">Vancouver</option>
                                                            </select>
                                                        ) : user.country == "UK" || country == "UK" ? (
                                                            <select id="City" name="city" className="options form-select block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm" value={city} onChange={(e) => setCity(e.target.value)}>
                                                                <option>Select City</option>
                                                                <option value="LDN">London</option>
                                                                <option value="MAN">Manchester</option>
                                                            </select>
                                                        ) : (
                                                            <></>
                                                        )}

                                                    </div>
                                                    <div className='text-center'>
                                                        <button type="button" id='submitButton' onClick={editProfile} className="text-white text-xl bg-green-500 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg  px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Save Changes</button>
                                                        <button type="button" id='submitButton' style={{ backgroundColor: '#927927', marginLeft: '1rem' }} onClick={togglePopUpForEditprofile} className="text-white text-xl bg-green-500 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg  px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Cancel</button>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>}
                        />}
                        <div className="user-profile-data">
                            <h1>{user.name}</h1>
                            <p style={{ color: "#3498db" }}>{user.account_type}</p>
                        </div>
                        <div className="description-profile">
                            <p>Country: <span>{user.country}</span> </p>
                            <p>City: <span>{user.city}</span> </p>
                            <p>Age: <span>{user.age}</span> </p>
                            <p>Phone: <span>{user.phone}</span> </p>
                            <p>Gender:<span>{user.gender}</span>  </p>
                        </div>
                        <ul className="data-user">
                            <li><a href='/completed-appointments'><strong>{user.numOfAppointments? user.numOfAppointments : 0}</strong><span>Appointments</span></a></li>
                        </ul>
                    </div>
                </div>
            )

            }




            <footer>
                <h4>Design by <a href="https://twitter.com/jofpin" target="_blank" title="José Pino">@fredcode</a></h4>
            </footer>
        </div>
    )
}

export default ProfilePage




