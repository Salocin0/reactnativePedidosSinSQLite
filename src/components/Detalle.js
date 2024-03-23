import React, { useState, useEffect, useCallback } from "react";
import { Text, View, TouchableOpacity, Image, Alert, ToastAndroid, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import { Counter } from "../features/counter/Counter";
import { useSelector, useDispatch } from 'react-redux';
import { addProduct } from "../features/carrito/carritoSlice";
import { useAgregarProductoMutation } from "../app/services/CarritoApi";
import styles from "./../Styles/Styles";
import imgdefault from "../../assets/productoDefault.jpg"

const Detalle = () => {
  const route = useRoute();
  const producto = route.params.producto;
  const dispatch = useDispatch();
  const count = useSelector(state => state.counter.value);
  const userId = useSelector((state) => state.auth.localId);
  const [agregarProductoMutation] = useAgregarProductoMutation();
  const carrito = useSelector((state) => state.carrito);

  const handleAddProduct = useCallback(() => {
    Alert.alert(
      `¿Seguro que quieres agregar ${count} x ${producto.nombre} al carrito?`,
      "",
      [
        {
          text: "No",
          style: "cancel"
        },
        {
          text: "Sí",
          onPress: () => {
            dispatch(addProduct({ ...producto, cantidad: count }));
            ToastAndroid.show('Productos agregados!', ToastAndroid.SHORT);
          }
        }
      ],
    );
  }, [count, producto, dispatch]);

  useEffect(() => {
    if (carrito.productos.length > 0) {
      try {
        agregarProductoMutation({ 
          localId: userId, 
          productos: carrito.productos, 
          total: carrito.total
        });
      } catch (error) {
        console.error('Error adding product to cart:', error);
      }
    }
  }, [carrito, userId, agregarProductoMutation]);

  return (
    <View style={styles.container}>
      <Image source={ imgdefault } style={styles.imagenProducto} />
      <Text style={styles.nombreProducto}>{producto.nombre}</Text>
      <Text style={styles.descripcionProducto}>{producto.descripcion}</Text>
      <Text style={styles.precioProducto}>
        Precio Unitario: ${producto.precio}
      </Text>
      <View style={styles.centerVertically}>
        <Text style={styles.tituloCantidad}>Cantidad: </Text>
        <View style={styles.tituloCantidad}>
          <Counter />
        </View>
      </View>
      <TouchableOpacity style={styles.botonCompra} onPress={handleAddProduct}>
        <Text style={styles.textoBoton}>Comprar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Detalle;
