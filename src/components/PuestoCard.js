import { Text, TouchableOpacity } from "react-native";
import React from "react";
import styles from "./../Styles/Styles";

export default PuestoCard = ({ item, navigation }) => {
  const seleccionarPuesto = (puesto) => {
    navigation.navigate("Productos", { puesto });
  };

  return (
    <TouchableOpacity
      style={styles.tarjeta}
      onPress={() => seleccionarPuesto(item)}
    >
      <Text style={styles.nombrePuesto}>{item?.nombre}</Text>
      <Text style={styles.descripcionPuesto}>{item?.descripcion}</Text>
    </TouchableOpacity>
  );
};
