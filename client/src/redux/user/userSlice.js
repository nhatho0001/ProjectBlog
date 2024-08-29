import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentUser : '',
  error : null,
  loading : false
}

const userSlice = createSlice({
    name : 'user',
    initialState,
    reducers : {
        signInStart: (state)=>{
            state.loading = true;
            state.error = null;
        } ,
        signInSuccess: (state , action)=>{
            state.currentUser = action.payload
            state.loading = false;
            state.error = null
        },
        signInFailure : (state , action)=>{
            state.loading = false;
            state.error = action.payload;
        },
        signOut: (state)=>{
            state.currentUser = '',
            state.error = null,
            state.loading = false
        },
        upDate: (state , action) =>{
            state.currentUser = action.payload
            state.loading = false;
            state.error = null
        }
    }
}
)

export const {signInStart , signInSuccess , signInFailure , signOut , upDate} = userSlice.actions;
export default userSlice.reducer;