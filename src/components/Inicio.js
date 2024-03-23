import React from "react";
import { View, FlatList, ActivityIndicator } from "react-native";
import PuestoCard from "./PuestoCard";
import Aviso from "./Aviso";
import styles from "./../Styles/Styles";
import { useGetPuestosQuery } from "../app/services/ProductosApi";
import { Colors } from "../Styles/Colors";

const Inicio = ({ navigation }) => {
  const { data: puestos, isLoading} = useGetPuestosQuery();

  const renderItem = ({ item }) => (
    <PuestoCard item={item} navigation={navigation} />
  );

  return (
    <View style={styles.container}>
      {isLoading ? ( 
        <ActivityIndicator size="large" color={Colors.Azul} />
      ) : puestos?.length > 0 ? (
        <FlatList
          data={puestos}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listaPuestos}
        />
      ) : (
        <Aviso mensaje="No hay puestos disponibles" />
      )}
    </View>
  );
};

export default Inicio;
