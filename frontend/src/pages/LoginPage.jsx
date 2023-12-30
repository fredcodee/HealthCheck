import React from 'react'

const LoginPage = () => {
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
                  <input type="email" className="form-control" placeholder="Email" />
                </div>
              </div>
              <div className="form-group">
                <div className="input-group">
                  <span className="input-group-addon">
                    <span className="glyphicon glyphicon-lock"></span>
                  </span>
                  <input type="password" className="form-control" placeholder="Password" />

                </div>

              </div>

              <div className="form-group text-center" style={{ paddingTop: '2rem' }}>
                <button type="submit" className="btn btn-success btn-lg">Login</button>
                <a href="#" className="btn btn-link">forget Password</a>
              </div>

            </form>
          </div>
        </div>
      </div>

    </div>
  )
}

export default LoginPage