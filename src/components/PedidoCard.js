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
        <Text style={{ fontSize: 16, fontWeight: "bold", backgroundColor: Colors.Verde, borderRadius: 5, color: Colors.Blanco, textAlign:"center", padding:5, width:105, paddingEnd:12 }}>  {pedido.estado}</Text>
      </View>
      <View style={{}}>
        <Text style={{ fontSize: 35 }}>{pedido.total} $</Text>
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
    backgroundColor: Colors.Blanco,
    borderRadius: 8,
    padding: 10,
    marginVertical: 5,
    marginHorizontal:5,
    flexDirection: "row",
    justifyContent: 'space-between',
  },
  cancelButton: {
    color: Colors.Rojo,
    marginTop: 5,
  },
});

export { PedidoCard };
