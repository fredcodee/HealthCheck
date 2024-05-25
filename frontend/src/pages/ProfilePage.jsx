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
    const [showPopUpForEditProfile, setShowPopUpForEditProfile] =useState(false)

    const togglePopUpForEditprofile= () =>{
        setShowPopUpForEditProfile(!showPopUpForEditProfile)
    }


    useEffect(() => {
        getUserProfile()
    }, [])

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
                    } else {
                        setError(response.data.message)
                    }
                })
        }
        catch (error) {
            setError(error.response.data.message)
        }
    }

    const editProfile = async (data) => {

    }

    const handleImageChange = async (e) => {

    }

    return (
        <div>
            {/* view for doctors */}
            {user && user.account_type == 'Doctor' ? (
                <div className="content-profile-page">
                    <div className="profile-user-page card">
                        <div className="img-user-profile">
                            <img className="profile-bgHome" src={bg} />
                            <img className="avatar" src="http://gravatar.com/avatar/288ce55a011c709f4e17aef7e3c86c64?s=200" alt="jofpin" />
                        </div>
                        <button onClick={togglePopUpForEditprofile} >Edit Profile</button>
                        {/* for popup for editing profile*/}
                        {showPopUpForEditProfile&& <PopUp
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
                                                value={user.name} onChange={(e) => setName(e.target.value)} 
                                                id="name" 
                                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"/>
                                        </div>
                                        <div className='pb-3'> 
                                            <label htmlFor="bio">
                                             Bio
                                            </label>
                                            <textarea 
                                                id="age" 
                                                rows="3" 
                                                value={user.bio} onChange={(e) => setBio(e.target.value)} 
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
                                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"/>
                                        </div>
                                        <div className='pb-3'> 
                                            <label htmlFor="gender">
                                            Gender
                                            </label>
                                            {/* change to option ------------------------------ */}
                                            <input type="text"  
                                                value={user.gender} onChange={(e) => setGender(e.target.value)} 
                                                id="gender" 
                                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"/>
                                            </div>
                                        <div className='pb-3'> 
                                            <label htmlFor="age">
                                            Age
                                            </label>
                                            <input type="text"  
                                                value={user.age} onChange={(e) => setName(e.target.value)} 
                                                id="age" 
                                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"/>
                                            </div>
                                        <div className='pb-3'> 
                                            <label htmlFor="Phone">
                                            Phone
                                            </label>
                                            <input type="text"  
                                                value={user.phone} onChange={(e) => setPhone(e.target.value)} 
                                                id="Phone" 
                                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"/>
                                            </div>
                                        <div className='pb-3'> 
                                            <label htmlFor="Country">
                                            Country
                                            </label>
                                            <input type="text"  
                                                value={user.country} onChange={(e) => setCountry(e.target.value)} 
                                                id="Country" 
                                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"/>
                                            </div>
                                        <div className='pb-3'> 
                                            <label htmlFor="city">
                                            City
                                            </label>
                                            <input type="text"  
                                                value={user.city} onChange={(e) => setCity(e.target.value)} 
                                                id="city" 
                                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"/>
                                            </div>
                                        <div className='text-center'>
                                          <button type="button" id='submitButton' onClick={editProfile} className="text-white text-xl bg-green-500 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg  px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Save Changes</button> 
                                          <button type="button" id='submitButton' style={{backgroundColor: '#927927', marginLeft:'1rem'}} onClick={togglePopUpForEditprofile}  className="text-white text-xl bg-green-500 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg  px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Cancel</button>
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
                        <div className="description-profile">
                            dedicated physician specializing in [Your Specialty]. With over [X] years of experience in the medical field, I am committed to providing comprehensive and compassionate care to all my patients. I believe in a patient-centered approach, ensuring that each individual receives personalized treatment tailored to their unique needs.

                            I stay updated with the latest advancements in medical science and continuously strive to enhance my skills through ongoing education and training. My goal is to improve the health and well-being of my patients by delivering high-quality, evidence-based medical care.</div>
                        <div className="description-profile">
                            <p>Country: {user.country}</p>
                            <p>City: {user.city}</p>
                            <p>Age: {user.age}</p>
                            <p>Phone: {user.phone}</p>
                            <p>Gender: {user.gender}</p>
                        </div>
                        <ul className="data-user">
                        <li><a><strong>3390</strong><span>Appointments</span></a></li>
                            <li><a><strong>499</strong><span>cancelled</span></a></li>
                            <li><a><strong>9.0/10</strong><span>Ratings</span></a></li>
                            <li><a><strong>444</strong><span>Reviews</span></a></li>

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
                        {showPopUpForEditProfile&& <PopUp
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
                                                value={user.name} onChange={(e) => setName(e.target.value)} 
                                                id="name" 
                                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"/>
                                        </div>
                                        <div className='pb-3'> 
                                            <label htmlFor="gender">
                                            Gender
                                            </label>
                                            {/* change to option ------------------------------ */}
                                            <input type="text"  
                                                value={user.gender} onChange={(e) => setGender(e.target.value)} 
                                                id="gender" 
                                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"/>
                                            </div>
                                        <div className='pb-3'> 
                                            <label htmlFor="age">
                                            Age
                                            </label>
                                            <input type="text"  
                                                value={user.age} onChange={(e) => setName(e.target.value)} 
                                                id="age" 
                                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"/>
                                            </div>
                                        <div className='pb-3'> 
                                            <label htmlFor="Phone">
                                            Phone
                                            </label>
                                            <input type="text"  
                                                value={user.phone} onChange={(e) => setPhone(e.target.value)} 
                                                id="Phone" 
                                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"/>
                                            </div>
                                        <div className='pb-3'> 
                                            <label htmlFor="Country">
                                            Country
                                            </label>
                                            <input type="text"  
                                                value={user.country} onChange={(e) => setCountry(e.target.value)} 
                                                id="Country" 
                                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"/>
                                            </div>
                                        <div className='pb-3'> 
                                            <label htmlFor="city">
                                            City
                                            </label>
                                            <input type="text"  
                                                value={user.city} onChange={(e) => setCity(e.target.value)} 
                                                id="city" 
                                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"/>
                                            </div>
                                        <div className='text-center'>
                                          <button type="button" id='submitButton' onClick={editProfile} className="text-white text-xl bg-green-500 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg  px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Save Changes</button> 
                                          <button type="button" id='submitButton' style={{backgroundColor: '#927927', marginLeft:'1rem'}} onClick={togglePopUpForEditprofile}  className="text-white text-xl bg-green-500 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg  px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Cancel</button>
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
                            <p style={{color: "#3498db"}}>{user.account_type}</p>
                        </div>
                        <div className="description-profile">
                            <p>Country: <span>{user.country}</span> </p>
                            <p>City: <span>{user.city}</span> </p>
                            <p>Age: <span>{user.age}</span> </p>
                            <p>Phone: <span>{user.phone}</span> </p>
                            <p>Gender:<span>{user.gender}</span>  </p>
                        </div>
                        <ul className="data-user">
                            <li><a><strong>3390</strong><span>Appointments</span></a></li>
                            <li><a><strong>718</strong><span>cancelled</span></a></li>
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




