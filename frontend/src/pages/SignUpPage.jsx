import React from 'react'

const SignUpPage = () => {
  return (
    <div>
      <div class='container'>
        <div style={{ textAlign: "center" }}>
          <h1> Join us</h1>
        </div>
        <form>
          <div class="form-group">
            <label for="exampleInputName">Full name</label>
            <input type="text" class="form-control" id="exampleInputName" aria-describedby="emailHelp" placeholder="Full Name" />
          </div>
          <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div>
            <label htmlFor="account">Select acccount type</label>
            <select class="form-control form-control-lg" id='account'>
              <option>Doctor</option>
              <option>Patient</option>
            </select>
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" />
          </div>
          <div style={{ textAlign: "center" }}>
             <button type="submit" class="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUpPage