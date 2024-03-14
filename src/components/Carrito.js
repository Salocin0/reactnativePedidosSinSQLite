import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import CardCarrito from "./CardCarrito";
import { Colors } from "../Styles/Colors";
import Icon from "react-native-vector-icons/FontAwesome";
import { useSelector, useDispatch } from "react-redux";
import { removeAll } from "../features/carrito/carritoSlice";
import {
  useAgregarProductoMutation,
  useGetCarritoQuery,
} from "../app/services/CarritoApi";
import { usePostPedidoMutation } from "../app/services/PedidosApi";

const Carrito = () => {
  const dispatch = useDispatch();
  const localId = useSelector((state) => state.auth.localId);
  const {
    data: carrito,
    isError,
    isLoading,
    isSuccess,
    error,
  } = useGetCarritoQuery(localId);
  const productos = carrito
    ? Object.values(carrito?.productos[0] || {}).filter(
        (item) => typeof item === "object"
      )
    : [];
  const total = carrito?.total || 0;
  const carro = useSelector((state) => state.carrito);
  const [agregarProductoMutation] = useAgregarProductoMutation();
  const [agregarPedidoMutation] = usePostPedidoMutation();

  const renderCard = ({ item }) => <CardCarrito producto={item} />;

  const handleRemoveAll = async () => {
    dispatch(removeAll());
  };

  const handleBuy = async () => {
    if(carro.total>0){
      const pedido = {
        id: Math.random() * 1000000000,
        total: carro.total,
        fecha: Date.now(),
        estado: "Pendiente",
      };
      try {
        await agregarPedidoMutation({localId, pedido});
        dispatch(removeAll());
      } catch (error) {
        console.error("Error al agregar pedido:", error);
      }
    }
  };

  useEffect(() => {
    if (carro.productos.length === 0) {
      agregarProductoMutation({
        localId,
        productos: [],
        total: 0,
      });
    }
  }, [carro]);

  return (
    <View style={styles.container}>
      <FlatList
        data={productos}
        renderItem={renderCard}
        keyExtractor={(item) => item.id.toString()}
        style={{ marginTop: 0, marginBottom: 95 }}
        ListFooterComponent={() => <View style={{ height: 25 }} />}
      />
      <TouchableOpacity style={styles.trashButton} onPress={handleRemoveAll}>
        <Text style={{ color: Colors.Blanco }}>Vaciar Carrito </Text>
        <Icon name="trash" size={18} color={Colors.Blanco} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.BuyButton} onPress={handleBuy}>
        <Text style={{ color: Colors.Blanco }}>Confirmar Compra </Text>
        <Icon name="arrow-right" size={18} color={Colors.Blanco} />
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
    height: 50,
  },
  text: {
    color: Colors.Blanco,
    fontWeight: "bold",
    fontSize: 20,
  },
  trashButton: {
    position: "absolute",
    bottom: 50,
    right: 0,
    width: "30%",
    backgroundColor: Colors.Rojo,
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    flexDirection: "row",
    height: 45,
  },
  BuyButton: {
    position: "absolute",
    bottom: 50,
    left: 0,
    width: "70%",
    backgroundColor: Colors.Verde,
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    flexDirection: "row",
    height: 45,
  },
});
