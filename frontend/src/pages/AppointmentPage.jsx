import React, { useEffect, useState } from 'react'
import Api from '../Api'


const AppointmentPage = () => {
  const token = localStorage.getItem('token') || false
  const [search, setSearch] = useState('')
  const [city, setCity] = useState('')
  const [error, setError] = useState('')
  const [doctors, setDoctors] = useState([])

  const handleSearch = async () => {
    try {
      const data = {
        name: search,
        city: city
      }
      const response = await Api.post(`api/search-doctor`, data, {
        headers: {
          Authorization: `Bearer ${token.replace(/"/g, '')}`
        }
      })

      console.log(response)

      if (response.data.length > 0) {
        return setDoctors(response.data)
      }
      return setDoctors(["No doctor found"])


    } catch (error) {
      setError("error occured, please try again")
      console.error(error)
    }
  }

  return (
    <div className='container'>
      <div className='pt-3'>
        <a href="/dashboard" style={{ color: 'green' }}>Back to Home</a>
      </div>
      <div className='pt-3'>
        {error ? <div className='alert alert-danger'>{error}</div> : null}
      </div>
      <div className='text-center'>
        <h1>Find Doctors in your area</h1>
        <div className='text-center'>
          <input className="form-control mr-sm-2" type="search" placeholder="Name" aria-label="Search" onChange={(e) => setSearch(e.target.value)} style={{ width: '50%', margin: 'auto' }} />
          <div className='pt-2 pb-2'>
            <select id="city" name="city" className=" options form-control" onChange={(e) => setCity(e.target.value)} style={{ margin: 'auto' }}>
              <option>Select city</option>
              <option value="NY">New York</option>
              <option value="LA">Los Angeles</option>
              <option value="SE">Seattle</option>
              <option value="TR">Toronto</option>
              <option value="VA">Vancouver</option>
              <option value="LDN">London</option>
              <option value="MAN">Manchester</option>
            </select>
          </div>
          <button className="btn btn-outline-success my-2 my-sm-0" onClick={handleSearch}>Search</button>
        </div>
      </div>
      <hr />
      <div className='text-center'>
        {doctors?.map((doctor, index) => (
          <a href={`/doctor/${doctor._id}`} key={index}>
            <div key={index} className="card w-50">
              <div className="card-body">
                <h4 className="card-title">{doctor.name}</h4>
                <div>
                  <p className="card-text">Location : {doctor.country}, {doctor.city}</p>
                  <p className="card-text">Gender: {doctor.gender}</p>
                  <p className="card-text">Phone: {doctor.phone}</p>
                </div>
              </div>
            </div>
          </a>
        ))}

      </div>
    </div>
  )
}

export default AppointmentPage