# E-Commerce App - React Native

Una aplicación de pedidos desarrollada con React Native que ofrece una experiencia de compra completa y fácil de usar.

## Funcionalidades Principales

### Pantalla de Cuenta

- **Acceso seguro:** Solo los usuarios autenticados pueden acceder a la pantalla de perfil y realizar compras.
- **Información del usuario:** Muestra detalles del usuario, como nombre y dirección.

<img src="" width="300" >
<img src="" width="300" >

### Autenticación con Firebase

- Utiliza el sistema de autenticación de Firebase para gestionar el acceso de usuarios.
- Permite a los usuarios iniciar sesión y registrarse de manera segura.

### Pantalla de Puestos

- Muestra una selección de puestos en tarjetas.
- Al hacer clic en un puesto, se navega a la pantalla de productos de este.

### Pantalla de Productos

- Lista todos los productos en tarjetas con nombre y descripcion.
- Al hacer clic en un producto, se navega a la pantalla de detalles del producto.

### Pantalla de Detalles del Producto

- Proporciona una descripción detallada del producto.
- Muestra el precio.
- Permite agregar el producto al carrito.

<img src="" width="300" >
<img src="" width="300" >
<img src="" width="300" >

### Navegación Inferior

- **Pestaña 1 - Productos:** Puestos y productos.
- **Pestaña 2 - Carrito:** Detalles del carrito de compras con resumen y botón para finalizar el pedido.
- **Pestaña 3 - Pedidos:** Historial de pedidos realizadas.
- **Pestaña 4 - Perfil:** Información del usuario y ubicación.

<img src="" width="300" >
<img src="" width="300" >

## Tecnologías Utilizadas

- **Firebase Authentication:** Implementa el sistema de autenticación de Firebase para gestionar la seguridad de la aplicación.
- **React Native Navigation Stack:** Gestiona la navegación entre pantallas.
- **React Native Navigation Buttom tap:** Gestiona la navegación entre pestañas.
- **Expo-Location:** Permite acceder y gestionar la ubicación del usuario.
- **Redux:** Centraliza y gestiona el estado de la aplicación.
- **RTK Query y Firebase:** Realiza operaciones de lectura/escritura en la base de datos.

## Instalación

1. Clona el repositorio: `git clone `
2. Instala las dependencias: `npm install`
5. Ejecuta la aplicación: `npm start`
