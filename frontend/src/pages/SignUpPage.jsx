import React from 'react'
import { useState, useContext } from 'react'
import { GoogleLogin } from '@react-oauth/google'
import AuthContext from '../context/AuthContext'

const SignUpPage = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [accountType, setAccountType] = useState('')
  const { registerUser, handleGoogleAuth, error } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await registerUser(name, email, password, accountType);
  }

  return (
    <div>
      <div className='container'>
        <div style={{ textAlign: "center" }}>
          <h1> Join us</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="exampleInputName">Full name</label>
            <input type="text" className="form-control" id="exampleInputName" aria-describedby="emailHelp" placeholder="Full Name"
              onChange={e => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"
              onChange={e => setEmail(e.target.value)}
              required
            />
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div>
            <label htmlFor="account">Select acccount type</label>
            <select className="form-control form-control-lg" id='account'
              onChange={e => setAccountType(e.target.value)}>
              <option value={""}>Select Account type</option>
              <option value={"Doctor"}>Doctor</option>
              <option value={"Patient"}>Patient</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"
              onChange={e => setPassword(e.target.value)}
              required
              />
          
          </div>
          <div style={{ textAlign: "center" }} className='pt-3' >
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>

          <div className='pt-3'>
            {error && <div className='text-center' style={{ color: 'red' }}>{error}</div>}
          </div>
        </form>
        <hr />
        <div className='pt-3 text-center'>
          <p className='text-center font-bold' style={{color:"blue"}}>Or Sign up with</p>

          <div className='pb-2'>
            <label htmlFor="account">Select acccount type</label>
            <select className="form-control form-control-sm" id='account'
              onChange={e => setAccountType(e.target.value)}>
              <option value={"Doctor"}>Doctor</option>
              <option value={"Patient"}>Patient</option>
            </select>
          </div>

          <div className='pb-3 text-center'>
            <GoogleLogin onSuccess={credentialResponse => {
              handleGoogleAuth(credentialResponse.credential, accountType)
            }} />
          </div>

          <br />
          <small>Already have an account? <span><a href="/login" className='text-blue-600'>Login here :)</a></span></small>
        </div>
      </div>
    </div>
  )
}

export default SignUpPage