import React, { useState, useEffect } from "react";
import { View, FlatList } from "react-native";
import PuestoCard from "./PuestoCard";
import styles from "./../Styles/Styles";
import { useGetPuestosQuery } from "../app/services/ProductosApi";

export default Inicio = ({ navigation }) => {
  const {data:puestos, isError,isLoading,isSuccess,error} = useGetPuestosQuery()

  const renderItem = ({ item }) => (
    <PuestoCard item={item} navigation={navigation} />
  );

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
