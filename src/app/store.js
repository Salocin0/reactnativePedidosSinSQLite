import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
import carritoReducer from '../features/carrito/carritoSlice'
import authReducer from '../features/auth/authSlice'
import { authApi } from './services/Auth'
import { productoApi } from './services/ProductosApi'
import { carritoApi } from './services/CarritoApi'
import { pedidoApi } from './services/PedidosApi'

export default configureStore({
  reducer: {
    counter: counterReducer,
    carrito: carritoReducer,
    auth:authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [productoApi.reducerPath]: productoApi.reducer,
    [carritoApi.reducerPath]: carritoApi.reducer,
    [pedidoApi.reducerPath]: pedidoApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productoApi.middleware,carritoApi.middleware,pedidoApi.middleware),

})