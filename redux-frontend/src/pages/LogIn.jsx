import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const LogIn = () => {

  const [formdata, setFormdata] = useState({
    Email: "",
    Password: ""
  })

  const { Email, Password } = formdata

  const handleInput = ((e) => {
    setFormdata((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  })

  const [success, notSuccess] = useState(true)
  const [message, setMessage] = useState("")

  const fromSubmit = (e) => {
    e.preventDefault()
    fetch(process.env.REACT_APP_URL + "/loginUser", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formdata)
    })
      .then((response) => response.json())

      .then((data) => {
        console.log(data);

        if (data.status === false) {
          notSuccess(false)
          setMessage(data.message)
        }

        setFormdata({
          Email: "",
          Password: ""
        })
      })
  }


  return (
    <div>
      <form className="d-flex justify-content-center p-5 mt-5" onSubmit={fromSubmit}>
        <div className="box p-5"  >

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" placeholder="mail id" name='Email' value={Email} onChange={handleInput} required />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" placeholder="password" name='Password' value={Password} onChange={handleInput} required />
          </div>

          {!success &&
            <div>
              <p style={{color:"red"}}>{message}</p>
            </div>
          }
          <div>
            <div className="d-flex justify-content-center" >
              <button type='submit' className="btn btn-primary " id="logbtn">Log In</button>
            </div>
            <div className='text-center mt-2'>
              Don't Have an Account <Link to={"/signIn"} href="">Sign Up</Link>
            </div>
          </div>


        </div>
      </form>
    </div>
  )
}

export default LogIn