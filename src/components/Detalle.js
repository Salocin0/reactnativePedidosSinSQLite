import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import { useRoute } from "@react-navigation/native";
import styles from "./../Styles/Styles";
import { Counter } from "../features/counter/Counter";
import { useSelector, useDispatch } from 'react-redux';
import { addProduct } from "../features/carrito/carritoSlice";
import { useAgregarProductoMutation } from "../app/services/CarritoApi";

const Detalle = () => {
  const route = useRoute();
  const producto = route.params.producto;
  const dispatch = useDispatch();
  const count = useSelector(state => state.counter.value);
  const localId = useSelector((state) => state.auth.localId)
  const [agregarProductoMutation] = useAgregarProductoMutation();
  const carrito = useSelector((state) => state.carrito);

  const handleAddProduct = () => {
    dispatch(addProduct({ ...producto, cantidad: count }));
  };

  useEffect(() => {
    if (carrito.productos.length > 0) {
      agregarProductoMutation({ 
        localId, 
        productos: carrito.productos, 
        total: carrito.total
      });
    }
  }, [carrito]);
  
  return (
    <View style={styles.container}>
      <Image source={{ uri: producto.img }} style={styles.imagenProducto} />
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
