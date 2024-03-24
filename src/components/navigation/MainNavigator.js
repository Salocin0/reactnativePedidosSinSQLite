import React, { useEffect } from "react";
import { StyleSheet, TouchableOpacity, Text, Button } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PedidoStack from "./PedidoStack";
import CompraStack from "./CompraStack";
import CarritoStack from "./CarritoStack";
import { Colors } from "../../Styles/Colors";
import { useSelector, useDispatch } from "react-redux";
import TabBarIcon from "../TabBarIcon";
import AuthStack from "./AuthStack";
import PerfilStack from "./PerfilStack";

const Tab = createBottomTabNavigator();

const MainNavigator = () => {
  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <>
      {user.idToken ? (
        <Tab.Navigator screenOptions={{ tabBarStyle: styles.tabBar }}>
          <Tab.Screen
            name="CompraStack"
            component={CompraStack}
            options={{
              tabBarLabel: "",
              headerShown: false,
              tabBarIcon: ({ focused }) => (
                <TabBarIcon
                  title="Productos"
                  nameIcon="home"
                  focused={focused}
                />
              ),
            }}
          />
          <Tab.Screen
            name="CarritoStack"
            component={CarritoStack}
            options={{
              tabBarLabel: "",
              headerShown: false,
              headerRight: () => <LogoutButton />,
              tabBarIcon: ({ focused }) => (
                <TabBarIcon
                  title="Carrito"
                  nameIcon="shopping-cart"
                  focused={focused}
                />
              ),
            }}
          />
          <Tab.Screen
            name="PedidoStack"
            component={PedidoStack}
            options={{
              tabBarLabel: "",
              headerShown: false,
              headerRight: () => <LogoutButton />,
              tabBarIcon: ({ focused }) => (
                <TabBarIcon title="Pedidos" nameIcon="list" focused={focused} />
              ),
            }}
          />
          <Tab.Screen
            name="PerfilStack"
            component={PerfilStack}
            options={{
              tabBarLabel: "",
              headerShown: false,
              headerRight: () => <LogoutButton />,
              tabBarIcon: ({ focused }) => (
                <TabBarIcon title="Perfil" nameIcon="user" focused={focused} />
              ),
            }}
          />
        </Tab.Navigator>
      ) : (
        <AuthStack />
      )}
    </>
  );
};

export default MainNavigator;

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.Blanco,
    height: 60,
    paddingTop: 15,
  },
  headerButton: {
    marginRight: 10,
  },
  headerButtonText: {
    color: Colors.Azul,
    backgroundColor: Colors.Rojo,
    fontWeight: "bold",
  },
});
