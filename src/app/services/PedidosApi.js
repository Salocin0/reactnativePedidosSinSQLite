import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const pedidoApi = createApi({
    reducerPath: "pedidoApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://reactnativecoder-d3ff9-default-rtdb.firebaseio.com/" }),
    tagTypes: ["Pedidos"],
    endpoints: (builder) => ({
        postPedido: builder.mutation({
            query: ({ localId, pedido }) => ({
                url: `/pedidos/${localId}.json`,
                method: "POST",
                body: pedido
            }),
            invalidatesTags: ["Pedidos"]
        }),
        getPedidos: builder.query({
            query: (localId) => `/pedidos/${localId}.json`,
            transformResponse: (response) => {
                if (!response) {
                    return [];
                }
                const data = Object.entries(response).map((item) => ({
                    id: item[0],
                    ...item[1]
                }));
                return data;
            },
            providesTags: ["Pedidos"]
        })
    })
});

export const { usePostPedidoMutation, useGetPedidosQuery } = pedidoApi;
