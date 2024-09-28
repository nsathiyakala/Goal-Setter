import React, { useState } from 'react'
import { Link } from 'react-router-dom'



const SignIn = () => {

    const [formdata, setFormdata] = useState({
        Name: "",
        Email: "",
        Password: "",
        ConfirmPassword: ""
    })
    const { Name, Email, Password, ConfirmPassword } = formdata

    const handleInput = (e) => {
        console.log(`${e.target.name} : ${e.target.value}`);

        setFormdata((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const [success, notSuccess] = useState(true)
    const [message, setMessage] = useState("")
    const [password, checkPassword]= useState(true)



    const fromSubmit = (e) => {
        e.preventDefault()


        if (Password===ConfirmPassword) {
            fetch(process.env.REACT_APP_URL + "/newUser", {
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
                        Name: "",
                        Email: "",
                        Password: "",
                        ConfirmPassword: ""
                    })
                })
                .catch(error => console.error(error))
        }
        else{
            checkPassword(false)
        }

       
       
    }


    return (

        <div>
            <form className="d-flex justify-content-center p-5 mt-5" onSubmit={fromSubmit}>
                <div className="box p-5"  >
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">UserName</label>
                        <input type="type" className="form-control" id="username" placeholder="UserName" name='Name' value={Name} onChange={handleInput} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" placeholder="mail id" name='Email' value={Email} onChange={handleInput} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" placeholder="password" name='Password' value={Password} onChange={handleInput} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password2" className="form-label">Confirm Password</label>
                        <input type="password" className="form-control" id="password2" placeholder="Confrim password" name='ConfirmPassword' value={ConfirmPassword} onChange={handleInput} required/>
                    </div>

                    { !password &&
                        <div className="mb-3">
                            <p style={{ color: "red" }}>Password doesn't match !</p>
                        </div>
                    }

                    {!success &&
                        <div className="mb-3">
                            <p style={{ color: "red" }}>{message} !</p>
                        </div>
                    }

                    <div>
                        <div className="d-flex justify-content-center" >
                            <button type='submit' className="btn btn-primary " id="logbtn">Sign Up</button>
                        </div>
                        <div className='text-center mt-2'>
                            Already have an account <Link to={"/"}> Log In</Link>
                        </div>
                    </div>

                    {/* <div>
                <div className="d-flex justify-content-center" >
                    <button type='submit' className="btn btn-primary " id="logbtn">Log In</button> 
                </div>
                <div className='text-center mt-2'>
                    Don't Have an Account <a href="">Sign Up</a>
                </div>
                </div> */}


                </div>
            </form>
        </div>
    )
}

export default SignIn