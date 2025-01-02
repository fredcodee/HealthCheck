import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Api from '../Api'
import Narbar from '../components/Navbar'
const DoctorReviewsPage = () => {
    const { id } = useParams()
    const token = localStorage.getItem('token') || false
    const [error, setError] = useState('')
    const [reviews, setReviews] = useState([])

    useEffect(() => {
        getDoctorReviews()
    }, [])

    const getDoctorReviews = async () => {
        try {
            const data = {
                doctorId: id
            }
            await Api.post('api/get-doctor-reviews', data, {
                headers: {
                    Authorization: `Bearer ${token.replace(/"/g, '')}`
                }
            }).then((response) => {
                if (response.status == 200) {
                    setReviews(response.data)
                }
            })
        }
        catch (error) {
            setError('error occured, please try again')
        }
    }
    return (
        <div>
            <Narbar />
        <div className='container'>
            <div className='pt-3'>
                <a href="/dashboard" style={{ color: 'green' }}>Back to Dashboard</a>
            </div>
            <div className='text-center'>
                <h3>Your Reviews</h3>
            </div>
            <div>
                <ul className="list-group">
                    {reviews.length > 0 ? <>{
                        reviews.map((review, index) => {
                            return (
                                <li className="list-group-item" key={index}>
                                    {review.content}
                                    <span style={{fontFamily:"cursive"}}>.... by {review.user_id.name}</span>
                                </li>
                            )
                        })
                    }</> : <li className="list-group-item">No reviews yet</li>}
                     </ul>
            </div>

        </div>
        </div>
    )
}

export default DoctorReviewsPage