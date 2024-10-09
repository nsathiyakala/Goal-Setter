import axios from "axios"


const API_URL=process.env.REACT_APP_API_URL

const register=async(Userdata)=>{
   const response = await axios.post(API_URL+"/newUser",Userdata)
   if(response.data){
    localStorage.setItem("user",JSON.stringify(response.data))
   }
   return response.data;
}

const login = async(Userdata)=>{
   const response = await axios.post(API_URL+"/loginUser", Userdata)
//    .then((response)=>{
    if(response.data){
        localStorage.setItem("user",JSON.stringify(response.data))
    }
//    })
   return response.data

}

const authService={
    register,
    login
}

export default authService