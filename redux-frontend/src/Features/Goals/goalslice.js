import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
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
        const token= thunkAPI.getState().auth.user.data.token
        return await GoalService.createGoal(text,token)
        
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message ||
        error.toString()
        return thunkAPI.rejectWithValue(message)
        
    }
})
export  const getGoal= createAsyncThunk("goal/get", async(_,thunkAPI)=>{
    try {
        const token= thunkAPI.getState().auth.user.data.token
        return await GoalService.getGoal(token)
        
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
        reset:(state)=> initialState,
    },
    extraReducers: (builder)=>{
        builder
        .addCase(CreateGoal.pending, (state)=>{
            state.isLoading=true;
        })
        .addCase(CreateGoal.fulfilled, (state,action)=>{
            console.log(action.payload); 
            state.isSuccess= true;
            state.isLoading=false;
            state.goals.push(...state.goals, action.payload.message);
        })
        .addCase(CreateGoal.rejected, (state,action)=>{
            state.isError=true;
            state.message=action.payload;
        })
        .addCase(getGoal.pending,(state)=>{
            state.isLoading=true;
        })
        .addCase(getGoal.fulfilled,(state,action)=>{
            state.isSuccess=true;
            state.isLoading=false;
            state.goals=action.payload
        })
        .addCase(getGoal.rejected, (state,action)=>{
            state.isError=true;
            state.message=action.payload;
        })

        
    }
})

export const {reset} = GoalSlice.actions
export default  GoalSlice.reducer