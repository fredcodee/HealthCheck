import React, { useState } from 'react'
import Api from '../Api'
import Navbar from '../components/Navbar'
import { ArrowLeft, Search, MapPin, Phone, User, Building, AlertCircle } from 'lucide-react'

const AppointmentPage = () => {
  const token = localStorage.getItem('token') || false
  const [search, setSearch] = useState('')
  const [city, setCity] = useState('')
  const [error, setError] = useState('')
  const [doctors, setDoctors] = useState([])
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = async () => {
    try {
      setIsSearching(true)
      setError('')
      const data = {
        name: search,
        city: city
      }
      const response = await Api.post(`api/search-doctor`, data, {
        headers: {
          Authorization: `Bearer ${token.replace(/"/g, '')}`
        }
      })

      if (response.data.length > 0) {
        setDoctors(response.data)
      } else {
        setDoctors(["No doctor found"])
      }
    } catch (error) {
      setError("An error occurred, please try again")
    } finally {
      setIsSearching(false)
    }
  }

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

        {/* Error Message */}
        {error && (
          <div className="mb-6 flex items-center gap-2 p-4 text-red-700 bg-red-50 rounded-lg">
            <AlertCircle className="h-5 w-5" />
            <p>{error}</p>
          </div>
        )}

        {/* Search Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <h1 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Find Doctors in your area
          </h1>
          
          <div className="max-w-2xl mx-auto space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="search"
                placeholder="Doctor's name"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="relative">
              <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <select
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                onChange={(e) => setCity(e.target.value)}
                defaultValue=""
              >
                <option value="" disabled>Select city</option>
                <option value="NY">New York</option>
                <option value="LA">Los Angeles</option>
                <option value="SE">Seattle</option>
                <option value="TR">Toronto</option>
                <option value="VA">Vancouver</option>
                <option value="LDN">London</option>
                <option value="MAN">Manchester</option>
              </select>
            </div>

            <button
              onClick={handleSearch}
              disabled={isSearching}
              className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSearching ? 'Searching...' : 'Search Doctors'}
            </button>
          </div>
        </div>

        {/* Results Section */}
        {doctors.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {doctors.map((doctor, index) => (
              doctor === "No doctor found" ? (
                <div key={index} className="col-span-full text-center text-gray-500 py-8">
                  No doctors found matching your criteria
                </div>
              ) : (
                <a
                  key={index}
                  href={`/doctor-appointment/${doctor._id}`}
                  className="block group"
                >
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 transition-all duration-200 hover:shadow-md hover:border-blue-500">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 mb-4">
                      {doctor.name}
                    </h3>
                    
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span>{doctor.country}, {doctor.city}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-gray-400" />
                        <span>{doctor.gender}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <span>{doctor.phone}</span>
                      </div>
                    </div>
                  </div>
                </a>
              )
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default AppointmentPage

