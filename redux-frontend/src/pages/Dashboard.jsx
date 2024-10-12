import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logOut } from '../Features/Auth/authSlice'
import { useNavigate } from 'react-router-dom'
import { CreateGoal, getGoal, reset } from '../Features/Goals/goalslice'
import Spinner from '../Components/spinner'


const Dashboard = () => {

  const { user } = useSelector((state) => state.auth)
  const { goals, isError, message, isloading } = useSelector((state) => state.goals)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate("/")
    }
    // if (isSuccess){
    //   console.log("success")
    // }
    if (isError) {
      console.log(message)
    }

    dispatch(getGoal())

    return () => dispatch(reset())

  }, [user, isError, message, dispatch])

  const [goal, setGoal] = useState("")


  const handlelogOut = () => {
    localStorage.removeItem("user")
    dispatch(logOut())
    navigate("/")
  }
  const onSubmit = (e) => {
    e.preventDefault()


    console.log(goal);

    dispatch(CreateGoal(goal))
    setGoal("")
  }

  if (isloading) {
    return <Spinner />
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
            <h6>Welcome Again {user && user.data.name}</h6>
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
              { goals.message && goals.message.length === 0 ?
                (<tr>
                  <th scope='row' colSpan="4">No Goals Available</th>
                </tr>) :
                  (goals.message && goals.message.map((goal, index) => 
                    
                  (<tr key={goal._id}>
                    <th scope="row">{index+1}</th>
                    <td>{goal.text}</td>
                    <td>{new Date(goal.createdAt).toLocaleDateString()}</td>
                    <td >
                      <button className="btn btn-dark ">Edit</button>
                      <button className="btn btn-dark mx-2">Delete</button>
                    </td>
                  </tr>)
                )

                )

              }



            </tbody>
          </table>
        </div>


      </section>
    </>


  )
}

export default Dashboard