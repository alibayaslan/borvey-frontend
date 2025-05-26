// redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import userReducer from './slices/userSlice';
import otpReducer from "./slices/otpSlice";
import orderReducer from "./slices/orderSlice";
import demandReducer from "./slices/demandSlice";
import commentReducer from "./slices/commentSlice";
import messageReducer from "./slices/messageSlice";
import chatReducer from "./slices/chatSlice";
const store = configureStore({  
  reducer: {
    auth: authReducer,
    users: userReducer,
    otp: otpReducer,
    demand: demandReducer,
    order: orderReducer,
    comment: commentReducer,
    message: messageReducer,
    chat: chatReducer
  },
});

export default store;