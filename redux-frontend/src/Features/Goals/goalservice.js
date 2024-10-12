import axios from "axios"

const API_URL= process.env.REACT_APP_API_URL

const createGoal=async(Goal,tokens)=>{
  const config ={
    headers:{
      authorization: `Bearer ${tokens}`
    }
  }
  const response =  await axios.post(API_URL, {text:Goal}, config)

  return response.data

}

const getGoal=async(tokens)=>{
  const config ={
    headers:{
      authorization: `Bearer ${tokens}`
    }
  }
  const response =  await axios.get(API_URL, config)

  return response.data

}

const GoalService={
    createGoal,
    getGoal
}

export default GoalService