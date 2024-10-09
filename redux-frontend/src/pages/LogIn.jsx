import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {useDispatch,useSelector} from "react-redux"
import {useNavigate} from "react-router-dom"
import { reset,login } from '../Features/Auth/authSlice'
import Spinner from "../Components/spinner"


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
  const [Errmessage, setErrMessage] = useState("")

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {user,isLoading,isError, isSuccess,message } =useSelector((state)=>state.auth)

  useEffect(()=>{

    if(isError){
      notSuccess(false)
      setErrMessage(message)
    }
    if(isSuccess){
      navigate("/dashboard")
    }
    return ()=>{
      dispatch(reset())
    }
  },[isError,isSuccess,user,message,dispatch,navigate])

  const fromSubmit = (e) => {
    e.preventDefault()

        const Userdata= {
          Email: Email,
          Password: Password
        }

        dispatch(login(Userdata))
 
  }

  if(isLoading){
    return <Spinner/>
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
              <p style={{color:"red"}}>{Errmessage}</p>
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