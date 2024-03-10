import { StyleSheet } from "react-native";
import { Colors } from "./../Styles/Colors";
import fonts from "../Styles/Fonts";

const styles = StyleSheet.create({
  tarjeta: {
    backgroundColor: Colors.Blanco,
    borderRadius: 10,
    padding: 20,
    marginTop: 10,
    marginBottom: 10,
    borderColor: Colors.Gris,
    borderWidth: 1,
    fontFamily: fonts.Spartan,
  },
  imagenProducto: {
    height: 200,
    marginBottom: 10,
    resizeMode: "cover",
    borderRadius: 10,
  },
  nombreProducto: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    fontFamily: fonts.Spartan,
  },
  descripcionProducto: {
    fontSize: 16,
    marginBottom: 10,
    fontFamily: fonts.Spartan,
  },
  precioProducto: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    fontFamily: fonts.Spartan,
  },
  botonCompra: {
    backgroundColor: Colors.Verde,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    fontFamily: fonts.Spartan,
    width: "95%",
  },
  textoBoton: {
    color: Colors.Blanco,
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: fonts.Spartan,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
    backgroundColor: Colors.GrisClaro,
    fontFamily: fonts.Spartan,
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    fontFamily: fonts.Spartan,
  },
  listaPuestos: {
    width: "100%",
    fontFamily: fonts.Spartan,
  },
  nombrePuesto: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    fontFamily: fonts.Spartan,
  },
  descripcionPuesto: {
    fontSize: 16,
    fontFamily: fonts.Spartan,
  },
  centerVertically: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    height: 40,
  },
  tituloCantidad: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    fontFamily: fonts.Spartan,
    alignSelf: 'center',
  },
});

export default styles;
