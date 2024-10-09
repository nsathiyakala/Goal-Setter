import {createSlice, createAsyncThunk, isRejectedWithValue} from '@reduxjs/toolkit'
import GoalService from './goalservice'


const initialState={
    isSuccess: false,
    isError: false,
    isLoading: false,
    message: "",
    goals:[]
}

export  const CreateGoal= createAsyncThunk("goal/create", async(text,thunkAPI)=>{
    try {
        return await GoalService.createGoal(text)
        
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message ||
        error.toString()
        return thunkAPI.rejectWithValue(message)
        
    }
})

const GoalSlice= createSlice({
    name:"goal",
    initialState,
    reducers: {
        createGoal:(state)=>{
            state.isSuccess= true,
            state.isError=false,
            state.isLoading=false,
            state.message=""
        }
    },
    extraReducers: (builder)=>{
        builder
        .addCase(createGoal.isFulfilled, (state)=>{
            state.isSuccess= true,
            state.isError=false,
            state.isLoading=false,
            state.message=""
        })

        
    }
})

export const {createGoal} = GoalSlice.actions
export default  GoalSlice.reducer