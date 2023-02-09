import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {globalAPI} from '../../global/API_Source_URL';

const initialState = {
  vendorInfo: [],
  distributorInfo:[],
  vendorList:[],
  isLoading: false
};

export const addVendorDistributor = createAsyncThunk('regiser_vdistributor', async data => {
  await fetch(globalAPI + '/VendorDistributors/AddDistributorsForVendor', {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: data,
  })
    .then(function (json) {
      console.log(data);
      if (json.status === 200) alert('Application Submitted Sucessfully');
      else console.log(JSON.stringify(json));
    })
    .catch(function (error) {
      console.log(
        'There has been a problem with your fetch operation: ' + error.message,
      );
    });
});

export const UpdateVendorDistrubutor = createAsyncThunk('update_vdistributor', async data => {
  await fetch(globalAPI + '/VendorDistributors/UpdateDistributorStatus', {
    method: 'put',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: data,
  })
    .then(function (json) {
      console.log(data);
      if (json.status === 200) alert('Updated Sucessfully');
      else console.log(JSON.stringify(json));
    })
    .catch(function (error) {
      console.log(
        'There has been a problem with your fetch operation: ' + error.message,
      );
    });
});


export const getDistributors = createAsyncThunk('getDistributors', (params) => {
  return  fetch(globalAPI + `/VendorDistributors/GetDistributors?vid=${params.id}`)
  .then((resp) => resp.json())
  .catch((err) => console.log(err));
});

export const getVendors = createAsyncThunk('getVendor', (params) => {
    return  fetch(globalAPI + `/VendorDistributors/GetVendors?did=${params.id}`)
    .then((resp) => resp.json())
    .catch((err) => console.log(err));
  });

  export const getVendorsList = createAsyncThunk('getVendorList', () => {
    return  fetch(globalAPI + `/VendorDistributors/GetVendorList`)
    .then((resp) => resp.json())
    .catch((err) => console.log(err));
  });

const VendorDistributorSlice = createSlice({
  name: 'vendor_distributor',
  initialState,
  reducers: {},
  extraReducers: {
    //Get Vendors
    [getDistributors.pending]: (state, action) => {
      state.distributorInfo = [];
      state.isLoading = true;
    },
    [getDistributors.fulfilled]: (state, action) => {
      state.distributorInfo = action.payload;
      state.isLoading = false;
      //console.log(action.payload)
    },
    [getDistributors.rejected]: (state, action) => {
      state.isLoading = true;
    },
    [getVendors.pending]: (state, action) => {
        state.vendorInfo = [];
        state.isLoading = true;
      },
      [getVendors.fulfilled]: (state, action) => {
        state.vendorInfo = action.payload;
        state.isLoading = false;
        //console.log(action.payload)
      },
      [getVendors.rejected]: (state, action) => {
        state.isLoading = true;
      },
      [getVendorsList.pending]: (state, action) => {
        state.vendorList = [];
        state.isLoading = true;
      },
      [getVendorsList.fulfilled]: (state, action) => {
        state.vendorList = action.payload;
        state.isLoading = false;
          //console.log(action.payload)
      },
      [getVendorsList.rejected]: (state, action) => {
        state.isLoading = true;
      }
  },
});

export default VendorDistributorSlice.reducer;
