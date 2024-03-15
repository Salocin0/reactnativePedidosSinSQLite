import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Colors } from '../Styles/Colors';

export default function Perfil() {
  const usuario = {
    nombre: 'John Doe',
    email: 'johndoe@example.com',
    direccion: '123 Calle Principal',
    imagen: require('../../assets/imagenPorDefectoUser.png'),
  };

  return (
    <View style={styles.container}>
      <View style={styles.fotoContainer}>
        <Image source={usuario.imagen} style={styles.foto} />
        <TouchableOpacity style={styles.boton}>
          <Text style={styles.botonTexto}>Actualizar foto</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoTexto}>{usuario.nombre}</Text>
        <Text style={styles.infoTexto}>{usuario.email}</Text>
        <Text style={styles.infoTexto}>{usuario.direccion}</Text>
        <TouchableOpacity style={styles.boton}>
          <Text style={styles.botonTexto}>Actualizar ubicación</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fotoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  foto: {
    width: 150,
    height: 150,
    borderRadius: 10,
    backgroundColor: Colors.GrisClaroPeroNoTanClaro
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
    alignItems: 'center',
  },
  infoTexto: {
    marginBottom: 10,
    fontSize: 16,
  },
});
