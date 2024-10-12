import {configureStore} from "@reduxjs/toolkit"
import authSlice from "../Features/Auth/authSlice"
import GoalSlice from "../Features/Goals/goalslice"

const store = configureStore({
     reducer:{
       auth : authSlice,
       goals : GoalSlice
    }
})

export default store