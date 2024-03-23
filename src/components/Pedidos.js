import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { PedidoCard } from "./PedidoCard";
import { useGetPedidosQuery } from "../app/services/PedidosApi";
import { useSelector } from "react-redux";
import { Colors } from "../Styles/Colors";
import Aviso from "./Aviso";

const Pedidos = () => {
  const localId = useSelector((state) => state.auth.localId);
  const pedidosQuery = useGetPedidosQuery(localId);
  const { data: pedidos, isLoading } = pedidosQuery;

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.Azul} />
      </View>
    );
  }

  if (!pedidos || pedidos.length === 0) {
    return (
        <Aviso mensaje="No hay pedidos pendientes"/>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={pedidos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <PedidoCard pedido={item} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.GrisClaro,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.GrisClaro,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.GrisClaro,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  }
});

export default Pedidos;
