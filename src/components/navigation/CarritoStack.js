import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Carrito from "../Carrito";
import LogoutButtom from "./LogoutButtom";

const Stack = createNativeStackNavigator();
const CarritoStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Carrito"
        component={Carrito}
        options={{ headerRight: () => <LogoutButtom /> }}
      />
    </Stack.Navigator>
  );
};

export default CarritoStack;
