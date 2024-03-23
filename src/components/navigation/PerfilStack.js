import { View, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Perfil from "../Perfil";
import LogoutButtom from "./LogoutButtom";

const Stack = createNativeStackNavigator();

const PerfilStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Perfil"
        component={Perfil}
        options={{ headerRight: () => <LogoutButtom /> }}
      />
    </Stack.Navigator>
  );
};

export default PerfilStack;
