import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { PedidoCard } from "./PedidoCard";
import { useGetPedidosQuery } from "../app/services/PedidosApi";
import { useSelector } from "react-redux";

const Pedidos = () => {
  const localId = useSelector((state) => state.auth.localId);
  var pedidos = useGetPedidosQuery(localId);

  const handleCancelarPedido = (pedidoId) => {
    console.log("Cancelando pedido:", pedidoId);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={pedidos.data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <PedidoCard pedido={item} onCancel={handleCancelarPedido} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  card: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  cancelButton: {
    color: "red",
    marginTop: 5,
  },
});

export default Pedidos;
