import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const carritoApi = createApi({
    reducerPath: "carritoApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://reactnativecoder-d3ff9-default-rtdb.firebaseio.com/" }),
    tagTypes: ["Carrito"],
    endpoints: (builder) => ({
        agregarProducto: builder.mutation({
            query: ({ localId, productos, total }) => ({
                url: `/carritos/${localId}.json`,
                method: "PATCH",
                body: JSON.stringify({
                    productos: productos,
                    total: total
                }),
            }),
            invalidatesTags: ["Carrito"],
        }),
                
        getCarrito: builder.query({
            query: (localId) => `/carritos/${localId}.json`,
            transformResponse: (response) => {
                if (!response || typeof response !== 'object') {
                    return [];
                }
                const productos = [];
                let total = 0;
                Object.entries(response).forEach(([key, value]) => {
                    if (key === "total") {
                        total = value;
                    } else {
                        productos.push({
                            id: key,
                            ...value
                        });
                    }
                });
                return {
                    productos: productos,
                    total: total
                };
            },
            providesTags: ["Carrito"],
        }),
        

        deleteCarrito: builder.mutation({
            query: (localId) => ({
                url: `/carritos/${localId}.json`,
                method: "DELETE",
            }),
            invalidatesTags: ["Carrito"],
        }),

        deleteProducto: builder.mutation({
            query: ({ localId, productId }) => ({
                url: `/carritos/${localId}/productos/${productId}.json`,
                method: "DELETE",
            }),
            invalidatesTags: ["Carrito"],
        }),
    }),
});

export const { useAgregarProductoMutation, useAgregarCantidadProductoMutation, useGetCarritoQuery, useDeleteCarritoMutation, useDeleteProductoMutation } = carritoApi;
