import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Inicio from '../Inicio';
import ProductoCard from '../ProductoCard';
import Detalle from '../Detalle';

const Stack = createNativeStackNavigator()

const CompraStack = () => {
    return (
        <Stack.Navigator>
          <Stack.Screen name="Puestos de Comida" component={Inicio} />
          <Stack.Screen name="Productos" component={ProductoCard} />
          <Stack.Screen name="Detalle" component={Detalle} />
        </Stack.Navigator>
      );
}

export default CompraStack