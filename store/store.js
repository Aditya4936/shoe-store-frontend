import { configureStore } from '@reduxjs/toolkit'
import  cartSlice  from './cartSlice'
// import counterReducer from "./counter";
export default configureStore({
 reducer: {
    cart:cartSlice,
  },
})