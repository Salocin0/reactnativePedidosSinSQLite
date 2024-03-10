import React, { useState, useEffect } from "react";
import { View, FlatList } from "react-native";
import PuestoCard from "./PuestoCard";
import data from "./../data/data.json";
import styles from "./../Styles/Styles";

export default Inicio = ({ navigation }) => {
  const [puestos, setPuestos] = useState([]);

  const renderItem = ({ item }) => (
    <PuestoCard item={item} navigation={navigation} />
  );

  useEffect(() => {
    setPuestos(data.puestos);
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={puestos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listaPuestos}
      />
    </View>
  );
};
