import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logOut } from '../Features/Auth/authSlice'
import { useNavigate } from 'react-router-dom'
import { CreateGoal } from '../Features/Goals/goalslice'

const Dashboard = () => {

  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate("/")
    }
  }, [user])

  const [goal, setGoal] = useState("")


  const handlelogOut = () => {
    localStorage.removeItem("user")
    dispatch(logOut())
    navigate("/")
  }
  const onSubmit = (e) => {
    e.preventDefault()
    
    const text ={
      text: goal
    }
    dispatch(CreateGoal(text))
   }

  return (
    <>
      <nav className="navbar sticky-top bg-body-tertiary" data-bs-theme="dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="Assign Master">Assign Master </a>
          <button className="navbar-brand btn btn-light text-dark" onClick={handlelogOut}>Log Out</button>
        </div>

      </nav>
      <section className='container d-flex flex-column justify-content-center  text-center' style={{ marginTop: "60px" }}>
        <div>
          <div>
            <h6>Welcome Again {user.name}</h6>
            <h4>Dashboard</h4>
          </div>
          <form className='p-5 mt-3' action="submit" onSubmit={onSubmit} >
            <div className='text-start d-flex flex-row justify-content-between goal'>
              {/* <label className="form-label" htmlFor="text">Goal</label> */}
              <input className="form-control " type="text" name='text' id='name' placeholder='Create Goal' value={goal} onChange={(e) => setGoal(e.target.value)} />
              <button className='btn btn-dark px-5' style={{ border: "none" }}>AddGoal</button>
            </div>

          </form>
        </div>

        <div>
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">Sl.No</th>
                <th scope="col">Goals</th>
                <th scope="col">Created At</th>
                <th scope="col">Handle</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Place Job</td>
                <td>4/10/24</td>
                <td >
                  <button className="btn btn-dark ">Edit</button>
                  <button className="btn btn-dark mx-2">Delete</button>
                </td>
              </tr>
             
            </tbody>
          </table>
        </div>


      </section>
    </>


  )
}

export default Dashboard