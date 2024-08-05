import React from 'react'
import { useState, useEffect } from 'react'
import { useParams, useNavigate} from 'react-router-dom'
import Api from '../Api'

function DoctorPageAppointment() {
    const { id } = useParams();
    const token = localStorage.getItem('token') || false
    const [profile, setProfile] = useState([])
    const [error, setError] = useState('')

    useEffect(() => {
        getDoctorProfile()
    }, [])

    const getDoctorProfile = async () => {
        try {
            const data = {
                doctorId: id
            }
            await Api.post('api/doctor/profile', data, {
                headers: {
                    Authorization: `Bearer ${token.replace(/"/g, '')}`
                }
            })
                .then((response) => {
                    if (response.status == 200) {
                        setProfile(response.data)
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

  return (
    <div>
      
    </div>
  )
}

export default DoctorPageAppointment
