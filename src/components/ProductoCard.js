import React from "react";
import { Text, TouchableOpacity, FlatList } from "react-native";
import { useRoute } from "@react-navigation/native";
import styles from "./../Styles/Styles";

const ProductoCard = ({ navigation }) => {
  const route = useRoute();
  const puesto = route.params.puesto;

  const seleccionarProducto = (producto) => {
    navigation.navigate("Detalle", { producto });
  };

  return (
    <TouchableOpacity style={styles.container}>
      <FlatList
        data={puesto?.productos}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.tarjeta}
            onPress={() => seleccionarProducto(item)}
          >
            <Text style={styles.nombrePuesto}>{item?.nombre}</Text>
            <Text style={styles.descripcionPuesto}>{item?.descripcion}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listaPuestos}
      />
    </TouchableOpacity>
  );
};

export default ProductoCard;
