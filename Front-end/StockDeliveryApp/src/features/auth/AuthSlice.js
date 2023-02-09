import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {globalAPI} from '../../global/API_Source_URL';

const initialState = {
  userInfo: [],
};

export const userRegistration = createAsyncThunk('regiser_user', async data => {
  await fetch(globalAPI + '/Users/UserRegistration', {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
    body: data,
  })
    .then(function (json) {
      console.log(data);
      if (json.status === 200) alert('Registered Sucessfully');
      else console.log(JSON.stringify(json));
    })
    .catch(function (error) {
      console.log(
        'There has been a problem with your fetch operation: ' + error.message,
      );
    });
});

/* export const userLogin = createAsyncThunk('login_user', async (params) => {
    const response = await fetch(globalAPI + `/users/getusers?uemail=${params.emailAddress}&password=${params.password}`)
    const data=await response.json()
   // console.log(JSON.stringify(data))
    return JSON.stringify(data)
}); */

export const userLogin = createAsyncThunk('login_user', async (params) => {
  console.log(JSON.stringify(params))
  const response=
   await  fetch(globalAPI + `/users/getusers?uemail=${params.emailAddress}&password=${params.password}`)
   const data=await response.json()
   return data
});

const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    Logout:(state,action)=>{
      state.userInfo=[]
    }
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.userInfo=action.payload
    })
  },
    //SIGNUP
    /*         [userRegistration.pending]:(state,action)=>{
            state.isLoading=true
        },
        [userRegistration.fulfilled]:(state,action)=>{
            state.isLoading=false
            state.msg=action.payload
        },
        [userRegistration.rejected]:(state,action)=>{
            state.isLoading=true
        }, */
    //SIGNIN
    // [userLogin.pending]: (state, action) => {
    //   //state.userInfo = [];
    //   state.isLoading = true;
    // },
    // [userLogin.fulfilled]: (state, action) => {
    //   state.userInfo = action.payload;
    //   state.isLoading = false;
    //   //console.log(action.payload)
    // },
    // [userLogin.rejected]: (state, action) => {
    //   state.isLoading = true;
    // },
});

export const {addUsers,Logout} = authSlice.actions
export default authSlice.reducer;
