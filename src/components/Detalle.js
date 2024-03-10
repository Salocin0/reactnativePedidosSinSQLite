import React from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import { useRoute } from "@react-navigation/native";
import styles from "./../Styles/Styles";
import { Counter } from "../features/counter/Counter";
import { useSelector, useDispatch } from 'react-redux';
import { addProduct,removeProduct,removeAllProducts } from "../features/carrito/carritoSlice";

const Detalle = () => {
  const route = useRoute();
  const producto = route.params.producto;
  const dispatch = useDispatch();
  const count = useSelector(state => state.counter.value);

  const handleAddProduct = () => {
    dispatch(addProduct({ ...producto, cantidad: count }));
  };

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
