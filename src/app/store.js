import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
import carritoReducer from '../features/carrito/carritoSlice'
import authReducer from '../features/auth/authSlice'
import { authApi } from './services/Auth'


export default configureStore({
  reducer: {
    counter: counterReducer,
    carrito: carritoReducer,
    auth:authReducer,
    [authApi.reducerPath]: authApi.reducer,
  }
})