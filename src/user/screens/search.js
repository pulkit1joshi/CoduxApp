import React, { useState, useEffect } from "react";
import { View, TextInput, Button, StyleSheet, Text, Image } from "react-native";
import { connect } from "react-redux";
import { fetchUser, fetchRatingHist } from "../../redux/Actions/userActions";

import Item from "../components/item";

function Search({ navigation, fetchUser }) {
  const [text, setText] = useState("");
  const [info, setInfo] = useState(false);
  function textInput(text) {
    setText(text);
    console.log(text);
  }

  function searchHandle() {
    fetchUser(text);
    fetchRatingHist(text);
    setInfo(true);
    navigation.navigate("Info");
  }

  function resetData() {
    setInfo(false);
  }

  return (
    <View style={styles.input}>
      <Text style={styles.head}> CODUX </Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Text style={styles.slog}>Check your coding profile at CodeForces</Text>
      </View>
      <TextInput
        placeholder="Your handle goes here"
        onChangeText={textInput}
        value={text}
        style={styles.tinput}
      />
      <View style={{ marginTop: 10 }}>
        <Button title="Search" onPress={searchHandle} />
      </View>
    </View>
  );
}

/*
        {"\n"}
        Contribution: {props.info.contribution}
        {"\n"}
        Rating: {props.info.rating}
        {"\n"}
        Rank: {props.info.rank}
        {"\n"}
        Max Rating: {props.info.maxRating}
        {"\n"}
        Handle: {props.info.handle}
        {"\n"}
*/

const styles = StyleSheet.create({
  input: {
    paddingTop: 20,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    flex: 1,
    backgroundColor: "white"
  },
  head: {
    fontSize: 30
  },
  slog: {
    flexDirection: "row",
    fontSize: 15,
    padding: 10,
    marginBottom: 20
  },
  tinyLogo: {
    width: 100,
    height: 100,
    borderRadius: 50
  },
  tinput: {
    borderBottomWidth: 1,
    width: "55%",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "200"
  },
  card: {
    backgroundColor: "white",
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "space-around"
  },
  handle: {
    fontSize: 30,
    fontWeight: "100"
  }
});

const mapDispatchToProps = dispatch => {
  return {
    fetchUser: fetchUser,
    fetchRatingHist: fetchRatingHist
  };
};

const mapStateToProps = state => {
  return {
    info: state.user.info
  };
};
export default connect(mapStateToProps, { fetchUser, fetchRatingHist })(Search);
