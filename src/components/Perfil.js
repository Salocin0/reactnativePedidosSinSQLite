import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { Colors } from "../Styles/Colors";
import { useGetUsuarioQuery } from "../app/services/usuarioApi";
import { useSelector } from "react-redux";
import {
  usePostUsuarioMutation,
  useDeleteUsuarioMutation,
} from "../app/services/usuarioApi";
import * as Location from "expo-location";

export default function Perfil() {
  const localId = useSelector((state) => state.auth.localId);
  const {
    data: usuario,
    error: usuarioError,
    isLoading: usuarioLoading,
  } = useGetUsuarioQuery(localId);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [direccion, setDireccion] = useState(null);
  const [PostUsuario] = usePostUsuarioMutation();
  const [DeleteUsuario] = useDeleteUsuarioMutation();
  const [datausuario, setDatausuario] = useState({
    imagen: require("../../assets/imagenPorDefectoUser.png"),
    nombre: "John Doe4",
    email: "johndoe@example.com",
    direccion: "123 Calle Principal",
    latitude: null,
    longitude: null,
  });

  const handleUpdateUbicacion = async () => {
    await obtenerUbicacion();
  };

  useEffect(() => {
    if (longitude !== null && latitude !== null) {
      const newUsuarioData = {
        imagen: usuario?.[0]?.imagen || datausuario.imagen,
        nombre: usuario?.[0]?.nombre || datausuario.nombre,
        email: usuario?.[0]?.email || datausuario.email,
        direccion: direccion || datausuario.direccion,
        latitude: latitude || 37.4220936,
        longitude: longitude || -122.08392,
      };
      setDatausuario(newUsuarioData);
      if (usuario) {
        DeleteUsuario(localId);
      }
      PostUsuario({ localId: localId, usuario: newUsuarioData });
    }
  }, [longitude,direccion]);

  const obtenerUbicacion = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      alert("Permiso de ubicación denegado");
      return;
    }

    let ubicacion = await Location.getCurrentPositionAsync({});
    setLatitude(ubicacion.coords.latitude);
    setLongitude(ubicacion.coords.longitude);

    await obtenerDireccionDesdeCoordenadas(ubicacion.coords.latitude, ubicacion.coords.longitude);
  };

  const obtenerDireccionDesdeCoordenadas = async (lat, long) => {
    try {
      let response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${long}&format=json`
      );
      if (response.ok) {
        let data = await response.json();
        if (data.display_name) {
          setDireccion(data.display_name);
        } else {
          console.log("No se pudo obtener la dirección");
        }
      } else {
        console.log("No se pudo obtener la dirección. Respuesta no exitosa.");
      }
    } catch (error) {
      console.error("Error al obtener la dirección:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.fotoContainer}>
        <Image
          source={usuario?.[0]?.imagen || datausuario.imagen}
          style={styles.foto}
        />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoTexto}>
          {usuario?.[0]?.nombre || datausuario.nombre}
        </Text>
        <Text style={styles.infoTexto}>
          {usuario?.[0]?.email || datausuario.email}
        </Text>
        <Text
          style={[styles.infoTexto, styles.direccionTexto]}
          numberOfLines={5}
        >
          {usuario?.[0]?.direccion || datausuario.direccion}
        </Text>
        <TouchableOpacity style={styles.boton} onPress={handleUpdateUbicacion}>
          <Text style={styles.botonTexto}>Actualizar ubicación</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  fotoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  foto: {
    width: 150,
    height: 150,
    borderRadius: 10,
    backgroundColor: Colors.GrisClaroPeroNoTanClaro,
  },
  boton: {
    marginTop: 10,
    backgroundColor: Colors.Azul,
    padding: 10,
    borderRadius: 5,
  },
  botonTexto: {
    color: Colors.Blanco,
    fontSize: 16,
  },
  infoContainer: {
    alignItems: "center",
    width: "80%",
  },
  infoTexto: {
    marginBottom: 10,
    fontSize: 14,
    width: "80%",
    backgroundColor: Colors.GrisClaroPeroNoTanClaro,
    padding: 10,
    textAlign: "center",
    borderRadius: 10,
  },
  direccionTexto: {
    width: "80%",
  },
});
