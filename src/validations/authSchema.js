import {object,string,ref} from "yup"

export const registerSchema = object().shape({
    password:string().required("La contraseña es requerida").min(8,"Minimo 8 caracteres"),
    email:string().required("El email es requerido").email("No es un mail valido")
})

export const loginSchema = object().shape({
    password:string().required("La contraseña es requerida").min(8,"Minimo 8 caracteres"),
    email:string().required("El email es requerido").email("No es un mail valido")
})