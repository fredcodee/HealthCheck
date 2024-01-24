import React from 'react'
import {useState } from 'react'
import Api from '../Api'


const LoginPage = () => {
  const [email, setEmail] = useState('')
  const[password, setPassword] = useState('')
  const[error, setError] = useState(null)


  const handleSubmit = async(e) =>{
    try{
      e.preventDefault();
      const response = await Api.post('/api/account/login', {
        email,
        password,
      });

      const data = await response.data;
      if (response.status === 200) {
        localStorage.setItem('authTokens', JSON.stringify(data.token));
        setError("worked")
        //window.location.href = '/dashboard';

      } else {
        setError('Wrong credentials or Try Again later');
      }
    }
    catch(err){
      setError('Wrong credentials or Try Again later')
    }
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
            <form action="" role="form">
              <div className="form-group">
                <div className="input-group">
                  <span className="input-group-addon">
                    <span className="glyphicon glyphicon-user"></span>
                  </span>
                  <input type="email" className="form-control" placeholder="Email"  onChange={e => setEmail(e.target.value)} />
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
                <button type="submit"  onClick={handleSubmit} className="btn btn-success btn-lg">Login</button>
              </div>

            </form>
          </div>
          <div>
              {error && <div className='text-center' style={{color:'red'}}>{error}</div>}
          </div>
        </div>
      </div>

    </div>
  )
}

export default LoginPage