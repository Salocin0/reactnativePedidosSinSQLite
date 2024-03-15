import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const usuarioApi = createApi({
    reducerPath: "usuarioApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://reactnativecoder-d3ff9-default-rtdb.firebaseio.com/" }),
    tagTypes: ["Usuarios"],
    endpoints: (builder) => ({
        postUsuario: builder.mutation({
            query: ({ localId, usuario }) => ({
                url: `/usuarios/${localId}.json`,
                method: "POST",
                body: usuario
            }),
            invalidatesTags: ["Usuarios"]
        }),
        deleteUsuario: builder.mutation({
            query: (localId) => ({
                url: `/usuarios/${localId}.json`,
                method: "DELETE"
            }),
            invalidatesTags: ["Usuarios"]
        }),
        getUsuario: builder.query({
            query: (localId) => `/usuarios/${localId}.json`,
            transformResponse: (response) => {
                if (!response) {
                    return [];
                }
                const data = Object.entries(response).map(([key, value]) => ({
                    id: key,
                    ...value
                }));
                return data;
            },
            providesTags: ["Usuarios"]
        })
    })
});

export const { usePostUsuarioMutation, useGetUsuarioQuery,useDeleteUsuarioMutation } = usuarioApi;
