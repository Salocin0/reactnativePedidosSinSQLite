import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ToastAndroid
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
import Aviso from "./Aviso";

const Carrito = ({ navigation }) => {
  const dispatch = useDispatch();
  const localId = useSelector((state) => state.auth.localId);
  const { data: carrito, isLoading } = useGetCarritoQuery(localId);
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

  const handleRemoveAll = () => {
    Alert.alert(
      "Vaciar Carrito",
      "¿Estás seguro de que deseas vaciar el carrito?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Sí",
          onPress: () => {dispatch(removeAll()),ToastAndroid.show('Carrito eliminado!', ToastAndroid.SHORT);},
          
        },
      ]
    );
  };
  
  const handleBuy = () => {
    if (carro.total > 0) {
      Alert.alert(
        "Confirmar Compra",
        "¿Estás seguro de que deseas confirmar la compra?",
        [
          {
            text: "Cancelar",
            style: "cancel",
          },
          {
            text: "Sí",
            onPress: async () => {
              const pedido = {
                id: Math.random() * 1000000000,
                total: carro.total,
                fecha: Date.now(),
                estado: "Pendiente",
              };
              try {
                agregarPedidoMutation({ localId, pedido });
                dispatch(removeAll());
                ToastAndroid.show('Compra registrada!', ToastAndroid.SHORT);
                navigation.navigate("Pedidos")
              } catch (error) {
                console.error("Error al agregar pedido:", error);
              }
            },
          },
        ]
      );
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
      {isLoading ? (
        <ActivityIndicator size="large" color={Colors.Azul} />
      ) : carrito?.productos.length > 0 ? (
        <View style={styles.container}>
          <FlatList
            data={productos}
            renderItem={renderCard}
            keyExtractor={(item) => item.id.toString()}
            style={{ width: "100%", marginTop: 0, marginBottom: 95 }}
            ListFooterComponent={() => <View style={{ height: 25 }} />}
          />
          <View style={styles.total}>
            <Text style={styles.text}>Total $ {total}</Text>
          </View>
          <TouchableOpacity
            style={styles.trashButton}
            onPress={handleRemoveAll}
          >
            <Text style={{ color: Colors.Blanco }}>Vaciar Carrito </Text>
            <Icon name="trash" size={18} color={Colors.Blanco} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.BuyButton} onPress={handleBuy}>
            <Text style={{ color: Colors.Blanco }}>Confirmar Compra </Text>
            <Icon name="arrow-right" size={18} color={Colors.Blanco} />
          </TouchableOpacity>
        </View>
      ) : (
        <Aviso mensaje="No hay productos en el Carrito" />
      )}
    </View>
  );
};

export default Carrito;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    position: "relative",
  },
  total: {
    position: "absolute",
    bottom: 0,
    width: "101%",
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
    right: -10,
    width: "31%",
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
    left: -10,
    width: "71%",
    backgroundColor: Colors.Verde,
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    flexDirection: "row",
    height: 45,
  },
});
