import React, { useState, useEffect } from 'react'
import '../assets/styles/css/profilePage.css'
import bg from '../assets/img/bg1.jpg'
import userImg from '../assets/img/user.jpg'
import Api from '../Api'
const ProfilePage = () => {
    const accountType = localStorage.getItem('AccountType').replace(/"/g, '') || false
    const token = localStorage.getItem('token') || false
    const [user, setUser] = useState('')
    const [error, setError] = useState('')

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
                        <button>Edit Profile</button>
                        <div className="user-profile-data">
                            <h1>{user.name}</h1>
                            <p>{user.account_type}</p>
                        </div>
                        <div className="description-profile">
                            dedicated physician specializing in [Your Specialty]. With over [X] years of experience in the medical field, I am committed to providing comprehensive and compassionate care to all my patients. I believe in a patient-centered approach, ensuring that each individual receives personalized treatment tailored to their unique needs.

                            I stay updated with the latest advancements in medical science and continuously strive to enhance my skills through ongoing education and training. My goal is to improve the health and well-being of my patients by delivering high-quality, evidence-based medical care.</div>
                        <div className="description-profile">
                            <p>City:</p>
                            <p>Age:</p>
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
                        <button>Edit Profile</button>
                        <div className="user-profile-data">
                            <h1>{user.name}</h1>
                            <p>{user.account_type}</p>
                        </div>
                        <div className="description-profile">
                            <p>City:</p>
                            <p>Age:</p>
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