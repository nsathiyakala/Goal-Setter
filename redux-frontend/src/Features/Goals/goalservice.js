import axios from "axios"

const API_URL= process.env.REACT_APP_API_URL

const createGoal=async(Goal)=>{
  const response=  await axios.post(API_URL+"/" , Goal)
  if(response.data){

  }
  return response.data

}

const GoalService={
    createGoal
}

export default GoalService