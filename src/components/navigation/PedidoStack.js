import { View, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Pedidos from "../Pedidos";
import LogoutButtom from "./LogoutButtom";

const Stack = createNativeStackNavigator();

const PedidoStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Pedidos"
        component={Pedidos}
        options={{ headerRight: () => <LogoutButtom /> }}
      />
    </Stack.Navigator>
  );
};

export default PedidoStack;
