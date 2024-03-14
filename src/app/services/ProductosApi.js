import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const productoApi = createApi({
    reducerPath:"productoApi",
    baseQuery:fetchBaseQuery({baseUrl:"https://reactnativecoder-d3ff9-default-rtdb.firebaseio.com/"}),
    endpoints:(builder)=>({
        getProductsByPuesto:builder.query({
            query: (category) => `/products.json?orderBy="category"&equalTo="${category}"`,
            transformResponse:(response)=>{
                const data = Object.values(response)
                return data
            }
        }),
        getPuestos: builder.query({
            query: () => "/puestos.json"
        }),
        getProduct:builder.query({
            query:(id) => `/products/${id}.json`
        })
    })
})

export const {useGetPuestosQuery,useGetProductsByPuestoQuery,useGetProductQuery} = productoApi