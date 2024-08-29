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
        signOutSuccess: (state)=>{
            state.currentUser = '';
            state.error = null;
            state.loading = false
        },
        signOutFailure: (state , action)=>{
            state.error = action.payload;
            state.loading = false
        },
        upDate: (state , action) =>{
            state.currentUser = action.payload
            state.loading = false;
            state.error = null
        },
        deleteAccountSuccess:(state)=>{
            state.currentUser = '',
            state.error = null,
            state.loading = false
        },
        deleteAccountFailuer: (state , action)=>{
            state.error = action.payload;
            state.loading = false
        },
        deleteAccountStart: (state)=>{
            state.error = null;
            state.loading = true
        }
    }
}
)

export const {signInStart , signInSuccess , signInFailure , signOutSuccess, signOutFailure , upDate , deleteAccountSuccess , deleteAccountFailuer, deleteAccountStart} = userSlice.actions;
export default userSlice.reducer;