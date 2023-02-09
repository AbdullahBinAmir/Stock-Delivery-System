import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { interpolate } from 'react-native-reanimated';
import {globalAPI} from '../../global/API_Source_URL';

const initialState = {
  cartItems:[],
  total:0,
};

//const {userInfo} = useSelector(state=>state.user)

export const placeOrder = createAsyncThunk('place_order', async data => {
  await fetch(globalAPI + `/UserOrder/PLaceAnOrder`, {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body:JSON.stringify(data)
  })
    .then(function (json) {
      console.log(data);
      if (json.status === 200) alert('Order Placed Sucessfully');
      else {
        console.log(JSON.stringify(json))
        alert('Error Occurs! Please Try Later')
      }
    })
    .catch(function (error) {
      console.log(
        'There has been a problem with your fetch operation: ' + error.message,
      );
    });
});

const orderSlice = createSlice({
  name: 'order_manager',
  initialState,
  reducers: {
    addCartItem:(state, action)=>{
        let id=0
        if(state.cartItems.length>0){
          state.cartItems.forEach((item)=>{
            if(action.payload.id===item.id){
              id=item.id
            }
            else{
              console.log('data pehly sy cart mein ha.')
            }
          })
        }
        //state.cartItems.find()
        if(id!==action.payload.id){
          state.cartItems.push(action.payload)
          let total = 0;
          state.cartItems.forEach((item) => {
            total += item.qtyOrdered * item.Saleprice;
          });
          state.total = total;
        }
    },
    addQuantity: (state, action) => {
      const itemInCart = state.cartItems.find((item) => item.id === action.payload.id);
      if (itemInCart) {
        itemInCart.qtyOrdered=parseInt(itemInCart.qtyOrdered)+parseInt(action.payload.qty);
        let t=action.payload.qty*itemInCart.Saleprice
        state.total+=t
      }
    },
    removeItem: (state, action) => {
        const itemId = action.payload;
        state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
        if(state.cartItems.length>0){
          let total = 0;
          state.cartItems.forEach((item) => {
            total += item.qtyOrdered * item.Saleprice;
          });
          state.total = parseInt(state.total) + parseInt(total);
        }
        else{
          state.total=0
        }
    },
    clearCart:(state,action)=>{
      state.cartItems=[]
    }
  },
  extraReducers: {
    
  },
});

export const {addCartItem,removeItem,clearCart,addQuantity} = orderSlice.actions
export default orderSlice.reducer;