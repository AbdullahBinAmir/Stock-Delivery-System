import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {globalAPI} from '../../global/API_Source_URL';

const initialState = {
  productInfo: null,
  isLoading: false
};

export const AddProduct = createAsyncThunk('regiser_product', async data => {
  await fetch(globalAPI + '/VendorProduct/AddProducts', {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
    body: data,
  })
    .then(function (json) {
      console.log(data);
      if (json.status === 200) alert('Product Saved Sucessfully');
      else console.log(JSON.stringify(json));
    })
    .catch(function (error) {
      console.log(
        'There has been a problem with your fetch operation: ' + error.message,
      );
    });
});

export const UpdateProduct = createAsyncThunk('update_product', async data => {
  await fetch(globalAPI + '/VendorProduct/UpdateVendorProduct', {
    method: 'put',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
    body: data,
  }) 
    .then(function (json) {
      console.log(data);
      if (json.status === 200) alert('Product Updated Sucessfully');
      else console.log(JSON.stringify(json));
    })
    .catch(function (error) {
      console.log(
        'There has been a problem with your fetch operation: ' + error.message,
      );
    });
});

export const SaveStock = createAsyncThunk('save_stock', async data => {
  await fetch(globalAPI + '/VendorProduct/AddStock', {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: data,
  })
    .then(function (json) {
      console.log(data);
      if (json.status === 200) alert('Stock Added Sucessfully');
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

export const getProduct = createAsyncThunk('getProduct', (params) => {
  return  fetch(globalAPI + `/VendorProduct/GetProducts?id=${params.id}`)
  .then((resp) => resp.json())
  .catch((err) => console.log(err));
});

const AddProductSlice = createSlice({
  name: 'add_product',
  initialState,
  reducers: {},
  extraReducers: {
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
    [getProduct.pending]: (state, action) => {
      state.productInfo = [];
      state.isLoading = true;
    },
    [getProduct.fulfilled]: (state, action) => {
      state.productInfo = action.payload;
      state.isLoading = false;
      //console.log(action.payload)
    },
    [getProduct.rejected]: (state, action) => {
      state.isLoading = true;
    },
  },
});

export default AddProductSlice.reducer;
