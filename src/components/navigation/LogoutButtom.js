import { StyleSheet, Text, View } from "react-native";
import React from "react";
import styles from "../../Styles/Styles";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Colors } from "../../Styles/Colors";
import { deleteSession } from "../../Utils/db";
import { clearUser } from "../../features/auth/authSlice";
import { useDispatch } from "react-redux";

const LogoutButtom = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(clearUser());
    deleteSession();
  };

  return (
    <TouchableOpacity style={styles.headerButton} onPress={handleLogout}>
      <Icon name="sign-out" size={28} color={Colors.Negro} />
    </TouchableOpacity>
  );
};

export default LogoutButtom;
