import React, { useState, useEffect } from "react";
import { View, TextInput, Button, StyleSheet, Text, Image } from "react-native";
import { connect } from "react-redux";
import { fetchUser } from "../../redux/Actions/userActions";
import Item from "../components/item";
const promiseInProgress = usePromiseTracker();

function SearchedInfo(props) {
  const promiseInProgress = usePromiseTracker();
  return (
    <View style={styles.input}>
      <View style={styles.card}>
        <Image
          style={styles.tinyLogo}
          source={{
            uri: "https:" + props.info.titlePhoto
          }}
        />
        <Text style={styles.handle}>{props.info.handle}</Text>
      </View>
      <View style={styles.card}>
        <Item head="Rank" text={props.info.rank} />
        <Item head="Organistion" text={props.info.organisation} />
        <Item head="Contribution" text={props.info.contribution} />
        <Item head="Rating" text={props.info.rating} />
        <Item head="Max-Rank" text={props.info.maxRank} />
        <Item head="Max-Rating" text={props.info.maxRating} />
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
    backgroundColor: "white",
    paddingBottom: 20
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
    width: 150,
    height: 150,
    borderRadius: 75
  },

  card: {
    backgroundColor: "white",
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "space-around"
  },
  handle: {
    fontSize: 30,
    fontWeight: "100",
    margin: 10
  }
});

const mapStateToProps = state => {
  return {
    info: state.user.info
  };
};
export default connect(mapStateToProps, { fetchUser })(SearchedInfo);
