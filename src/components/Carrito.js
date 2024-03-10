import React from "react";
import { StyleSheet, Text, View, FlatList, TouchableOpacity  } from "react-native";
import CardCarrito from "./CardCarrito";
import { Colors } from "../Styles/Colors";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSelector, useDispatch } from "react-redux";
import {
  addProduct,
  removeProduct,
  removeAll,
} from "../features/carrito/carritoSlice";

const Carrito = () => {
  const productos = useSelector((state) => state.carrito.productos);
  const total = useSelector((state) => state.carrito.total);
  const renderCard = ({ item }) => <CardCarrito producto={item} />;
  const dispatch = useDispatch();

  const handleRemoveAll = () => {
    dispatch(removeAll());
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={productos}
        renderItem={renderCard}
        keyExtractor={(item) => item.id.toString()}
        style={{marginTop:54, marginBottom:47}}
      />
      <TouchableOpacity style={styles.trashButton} onPress={handleRemoveAll}>
      <Text style={{color:Colors.Blanco}}>Vaciar Carrito</Text><Icon name="trash" size={24} color={Colors.Blanco} />
      </TouchableOpacity>
      <View style={styles.total}>
        <Text style={styles.text}>Total $ {total}</Text>
      </View>
    </View>
  );
};

export default Carrito;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  total: {
    position: "absolute",
    bottom: 0,
    width: "100%", 
    backgroundColor: Colors.Info,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  text:{
    color: Colors.Blanco,
    fontWeight: "bold",
    fontSize: 20,
  },
  trashButton: {
    position: "absolute",
    top:0,
    width: "100%", 
    backgroundColor: Colors.Rojo,
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
  },
});
