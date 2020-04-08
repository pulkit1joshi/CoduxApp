import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import Header from "../../Header";
import { AsyncStorage } from "react-native";

export default function Profile() {
  const [u_name, setData] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const name = await AsyncStorage.getItem("Name");
        setData(name);
        if (name !== null) {
          this.setState(name);
        }
      } catch (e) {
        alert("Failed to load name.");
      }
    };
    getData();
  });

  return (
    <View>
      <Header name={u_name} nodrawer={true} />
      <Text>You have saved profile of {u_name}</Text>
    </View>
  );
}
