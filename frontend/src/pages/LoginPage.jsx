import React from 'react'
import { useState, useContext } from 'react'
import { GoogleLogin } from '@react-oauth/google'
import AuthContext from '../context/AuthContext';


const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { loginUser, handleGoogleAuth, error } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await loginUser(email, password);
  }




  return (
    <div>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-heading">
            <h2 className="text-center">Login</h2>
          </div>
          <hr />
          <div className="modal-body">
            <form action="" role="form" onSubmit={handleSubmit}>
              <div className="form-group">
                <div className="input-group">
                  <span className="input-group-addon">
                    <span className="glyphicon glyphicon-user"></span>
                  </span>
                  <input type="email" className="form-control" placeholder="Email" onChange={e => setEmail(e.target.value)} />
                </div>
              </div>
              <div className="form-group">
                <div className="input-group">
                  <span className="input-group-addon">
                    <span className="glyphicon glyphicon-lock"></span>
                  </span>
                  <input type="password" className="form-control" placeholder="Password" onChange={e => setPassword(e.target.value)} />

                </div>

              </div>

              <div className="form-group text-center" style={{ paddingTop: '2rem' }}>
                <button type="submit" className="btn btn-success btn-lg">Login</button>
              </div>
              <div className='pt-3'>
                {error && <div className='text-center' style={{ color: 'red' }}>{error}</div>}
              </div>

            </form>
          </div>
          <hr />
          <div className='pt-3 text-center'>
            <p className='text-center font-bold'>or Login with</p>
            <div className='pb-3 text-center'>
              <GoogleLogin onSuccess={credentialResponse => {
                handleGoogleAuth(credentialResponse.credential)
              }} />
            </div>

            <br />
            <small>Don't have an account yet  <span><a href="/register" className='text-blue-600'>Register here :)</a></span></small>
          </div>

        </div>
      </div>

    </div>
  )
}

export default LoginPage