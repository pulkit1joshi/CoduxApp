import React from "react";
import { View } from "react-native";
import Item from "./user/components/item";
import { Ionicons } from "@expo/vector-icons";
import {
  NavigationContainer,
  useNavigation,
  DrawerActions
} from "@react-navigation/native";

import { Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Header({ name }) {
  const navigation = useNavigation();
  const styles = StyleSheet.create({
    main: {
      backgroundColor: "white",
      flexDirection: "row",
      padding: 4,
      margin: 1,
      paddingTop: 10,
      borderRadius: 1,
      elevation: 5,
      shadowOffset: {
        width: 1,
        height: 1
      },
      shadowRadius: 1,
      shadowOpacity: 0.3,
      justifyContent: "space-around"
    },
    head: {
      padding: 7,
      paddingTop: 13,
      paddingLeft: 15,
      fontSize: 17,
      fontWeight: "normal",
      color: "black",
      flexGrow: 1
    },
    text: {
      padding: 7,
      paddingTop: 20,
      paddingRight: 15,
      fontSize: 17,
      fontWeight: "200",
      color: "black"
    }
  });

  return (
    <View style={styles.main}>
      <View style={styles.head}>
        <TouchableOpacity onPressIn={() => navigation.openDrawer()}>
          <Ionicons name="md-menu" size={30} color="gray" />
        </TouchableOpacity>
      </View>
      <Text style={styles.text}> {name}</Text>
    </View>
  );
}
