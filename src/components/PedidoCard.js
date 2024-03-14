import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Colors } from "../Styles/Colors";

const PedidoCard = ({ pedido, onCancel }) => {
    const opcionesFormato = {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit'
      };
  return (
    <View style={styles.card}>
      <View style={{}}>
      <Text style={{ fontSize: 20 }}>{new Date(pedido.fecha).toLocaleString('es-ES', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' })}</Text>
        <Text style={{ fontSize: 16 }}>{pedido.estado}</Text>
      </View>
      <View style={{}}>
        <Text style={{ fontSize: 35 }}>{pedido.total} $</Text>
        <TouchableOpacity onPress={() => onCancel(pedido.id)}>
          <Text style={styles.cancelButton}>Cancelar Pedido</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.Blanco
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  card: {
    borderWidth: 1,
    borderColor: Colors.GrisClaroPeroNoTanClaro,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: 'space-between',
  },
  cancelButton: {
    color: Colors.Rojo,
    marginTop: 5,
  },
});

export { PedidoCard };
