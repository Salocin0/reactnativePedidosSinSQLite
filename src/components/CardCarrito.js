import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { Colors } from "../Styles/Colors";
import { useSelector, useDispatch } from "react-redux";
import {
  addProduct,
  removeProduct,
  removeAll,
} from "../features/carrito/carritoSlice";

const CardCarrito = ({ producto }) => {
  const dispatch = useDispatch();

  const handleAddOne = () => {
    dispatch(addProduct({ ...producto, cantidad: 1 }));
  };

  const handleRemoveOne = () => {
    dispatch(addProduct({ ...producto, cantidad: -1 }));
  };

  const handleRemoveAll = () => {
    dispatch(removeProduct({ ...producto }));
  }

  return (
    <View style={styles.card}>
      <TouchableOpacity style={styles.removeButton} onPress={handleRemoveAll}>
        <Text style={styles.removeButtonText}>x</Text>
      </TouchableOpacity>
      <View style={styles.content}>
        <Text style={styles.title}>{producto.nombre}</Text>
        <Text style={styles.description}>{producto.descripcion}</Text>
        <Text style={styles.price}>Precio Unitario: ${producto.precio}</Text>
        <View style={styles.quantityContainer}>
          <Text style={styles.quantity}>Cantidad: {producto.cantidad}</Text>
          <TouchableOpacity style={styles.quantityButton} onPress={handleRemoveOne}>
            <Text style={styles.quantityButtonText}>-1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quantityButton} onPress={handleAddOne}>
            <Text style={styles.quantityButtonText}>+1</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Image source={{ uri: producto.img }} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    margin: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    position: "relative",
  },
  removeButton: {
    position: "absolute",
    top: 3,
    right: 12,
  },
  removeButtonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.Negro,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    margin: 5,
  },
  content: {
    marginLeft: 10,
    width: "65%",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    color: "#888",
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  quantityButton: {
    backgroundColor: Colors.GrisClaroPeroNoTanClaro,
    borderRadius: 8,
    padding: 5,
    paddingHorizontal: 7,
    marginHorizontal: 3,
  },
  quantityButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#444",
  },
  quantity: {
    fontSize: 16,
    marginRight: 15,
  },
});

export default CardCarrito;
