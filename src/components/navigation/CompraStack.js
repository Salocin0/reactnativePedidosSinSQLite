import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import LogoutButtom from "./LogoutButtom";
import Inicio from "../Inicio"
import ProductoCard from "../ProductoCard";
import Detalle from "../Detalle";

const Stack = createNativeStackNavigator();

const CompraStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Puestos"
        component={Inicio}
        options={{ headerRight: () => <LogoutButtom /> }}
      />
      <Stack.Screen
        name="Productos"
        component={ProductoCard}
        options={{ headerRight: () => <LogoutButtom /> }}
      />
      <Stack.Screen
        name="Detalle"
        component={Detalle}
        options={{ headerRight: () => <LogoutButtom /> }}
      />
    </Stack.Navigator>
  );
};

export default CompraStack;
