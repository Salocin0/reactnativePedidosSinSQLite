import { StyleSheet, Text, View, Pressable } from "react-native";
import InputForm from "./InputForm";
import SubmitButton from "./SubnutButtom";
import { useEffect, useState } from "react";
import { Colors } from "../Styles/Colors";
import fonts from "../Styles/Fonts";
import { useRegisterMutation } from "../app/services/Auth";
import { useDispatch } from "react-redux";
import { setUser } from "../features/auth/authSlice";
import { registerSchema } from "../validations/authSchema";
import * as Location from "expo-location";
import { usePostUsuarioMutation } from "../app/services/usuarioApi";

const Register = ({ navigation }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nombre, setNombre]= useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [triggerRegister] = useRegisterMutation();
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [direccion, setDireccion] = useState(null);
  const [PostUsuario] = usePostUsuarioMutation();

  const onSubmit = async () => {
    try {
      registerSchema.validateSync({ email, password });
      const { data } = await triggerRegister({ email, password });
      dispatch(
        setUser({
          email: data.email,
          idToken: data.idToken,
          localId: data.localId,
        })
      );
      usuario={
        nombre:nombre,
        email:email,
        direccion:direccion,
        latitude:latitude,
        longitude:longitude,
      }
      PostUsuario({localId:data.localId,usuario})
    } catch (error) {
      console.log(error);
      setErrorEmail("");
      setErrorPassword("");
      switch (error.path) {
        case "email":
          setErrorEmail(error.message);
          break;
        case "password":
          setErrorPassword(error.message);
          break;
        default:
          break;
      }
    }
  };

  const obtenerUbicacion = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      alert("Permiso de ubicación denegado");
      return;
    }

    let ubicacion = await Location.getCurrentPositionAsync({});
    setLatitude(ubicacion.coords.latitude);
    setLongitude(ubicacion.coords.longitude);

    obtenerDireccionDesdeCoordenadas(
      ubicacion.coords.latitude,
      ubicacion.coords.longitude
    );
  };

  const obtenerDireccionDesdeCoordenadas = async (lat, long) => {
    try {
      let response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${long}&format=json`
      );
      let data = await response.json();
      if (data.display_name) {
        setDireccion(data.display_name);
      } else {
        console.log("No se pudo obtener la dirección");
      }
    } catch (error) {
      console.error("Error al obtener la dirección:", error);
    }
  };

  return (
    <View style={styles.main}>
      <View style={styles.container}>
      <InputForm
          label="Nombre"
          value={nombre}
          onChangeText={(t) => setNombre(t)}
          isSecure={false}
        />
        <InputForm
          label="Email"
          value={email}
          onChangeText={(t) => setEmail(t)}
          isSecure={false}
          error={errorEmail}
        />
        <InputForm
          label="Password"
          value={password}
          onChangeText={(t) => setPassword(t)}
          isSecure={true}
          error={errorPassword}
        />
        <View style={[styles.container, { borderWidth:2,borderColor:Colors.Gris }]}>
          <Text style={styles.title}>Dirección (opcional)</Text>
          {direccion !== null && (
            <Text style={styles.direccion}>{direccion}</Text>
          )}

          <Pressable style={styles.btndireccion} onPress={obtenerUbicacion}>
            <Text
              style={{
                color: Colors.Blanco,
                fontFamily: fonts.Spartan,
                fontWeight: "bold",
              }}
            >
              Obtener Ubicación
            </Text>
          </Pressable>
        </View>

        <SubmitButton onPress={onSubmit} title="Registrarme" />
        <Text style={styles.sub}>ya tenes una cuenta?</Text>
        <Pressable onPress={() => navigation.navigate("Login")}>
          <Text style={styles.subLink}>Inicio de sesión</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "90%",
    backgroundColor: Colors.GrisClaroPeroNoTanClaro,
    gap: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  sub: {
    fontSize: 14,
    fontFamily: fonts.Spartan,
  },
  subLink: {
    fontSize: 14,
    fontFamily: fonts.Spartan,
    color: Colors.Azul,
  },
  direccion: {
    fontSize: 14,
    fontFamily: fonts.Spartan,
    textAlign: "center",
    backgroundColor: Colors.Blanco,
    padding: 5,
    borderRadius: 10,
    width: "90%",
  },
  btndireccion: {
    backgroundColor: Colors.Azul,
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 14,
    fontFamily: fonts.Spartan,
  },
});
