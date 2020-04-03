import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Item = props => {
  const styles = StyleSheet.create({
    main: {
      backgroundColor: props.bgcol || "white",
      flexDirection: "row",
      padding: props.mpad || 4,
      margin: props.mrgn || 1,
      paddingTop: props.padtop || 10,
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
      padding: props.hpad || 7,
      paddingTop: props.hpadtop || 0,
      paddingLeft: 15,
      fontSize: props.hsize || 17,
      fontWeight: props.hwt || "normal",
      color: props.hcol || "black",
      flexGrow: 1
    },
    text: {
      padding: props.tpad || 7,
      paddingTop: props.tpadtop || 0,
      paddingRight: 15,
      fontSize: props.tsize || 17,
      fontWeight: props.twt || "200",
      color: props.tcol || "black"
    }
  });

  return (
    <View style={styles.main}>
      <Text style={styles.head}> {props.head} </Text>
      <Text style={styles.text}> {props.text}</Text>
    </View>
  );
};

export default Item;
