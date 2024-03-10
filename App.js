import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { fontCollection } from "./src/Styles/Fonts";
import MainNavigator from "./src/components/navigation/MainNavigator";
import store from "./src/app/store";
import { Provider } from "react-redux";

export default function App() {
  const [fontsLoaded] = useFonts(fontCollection);
  if (!fontsLoaded) return null;
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </Provider>
  );
}
