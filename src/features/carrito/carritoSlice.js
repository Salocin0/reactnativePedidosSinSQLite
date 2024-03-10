import { createSlice } from "@reduxjs/toolkit";

export const carritoSlice = createSlice({
  name: "carrito",
  initialState: {
    productos: [],
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      const index = state.productos.findIndex((producto) => producto.id === action.payload.id);
      if(action.payload.cantidad>0){
        if (index === -1) {
          state.productos = [...state.productos, action.payload];
          state.total += action.payload.precio * action.payload.cantidad;
        } else {
          state.productos[index].cantidad += action.payload.cantidad;
          state.total += action.payload.precio * action.payload.cantidad;
        }
      }else{
        if (index === -1) {
          state.productos = [...state.productos, action.payload];
          state.total += action.payload.precio * action.payload.cantidad;
        } else {
          state.productos[index].cantidad += action.payload.cantidad;
          state.total += action.payload.precio * action.payload.cantidad;
        }
      }
    },
    removeProduct: (state, action) => {
      state.productos = state.productos.filter((producto) => producto.id !== action.payload.id);
      state.total -= action.payload.precio * action.payload.cantidad;
    },
    removeAll: (state) => {
      state.productos = [];
    }
  },
});

export const { addProduct, removeProduct,removeAll } = carritoSlice.actions;

export default carritoSlice.reducer;
