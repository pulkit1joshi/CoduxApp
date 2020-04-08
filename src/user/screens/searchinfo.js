import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  Image,
  ScrollView,
} from "react-native";
import { connect } from "react-redux";
import { fetchUser } from "../../redux/Actions/userActions";
import Item from "../components/item";
import { usePromiseTracker } from "react-promise-tracker";
import { useNavigation } from "@react-navigation/native";
import LoadingIndicator from "../../loader";

function SearchedInfo(props) {
  const { promiseInProgress } = usePromiseTracker();

  const navigation = useNavigation();

  if (promiseInProgress === true) {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <LoadingIndicator />
      </View>
    );
  } else if (props.gotosearch == 1) {
    return (
      <View>
        <View
          style={{
            flexDirection: "column",
            alignSelf: "center",
          }}
        >
          <Item hcol="red" head="Please enter a valid user handle"></Item>
          <Button
            onPress={() => navigation.navigate("Search")}
            title="Search Again"
          />
        </View>
      </View>
    );
  } else {
    return (
      <ScrollView>
        <View style={styles.input}>
          <View style={styles.card}>
            <Image
              style={styles.tinyLogo}
              source={{
                uri: "https:" + props.info.titlePhoto,
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
            <Item head="nf" text={props.gotosearch} />
          </View>
        </View>
      </ScrollView>
    );
  }
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
    paddingBottom: 20,
  },
  head: {
    fontSize: 30,
  },
  slog: {
    flexDirection: "row",
    fontSize: 15,
    padding: 10,
    marginBottom: 20,
  },
  tinyLogo: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },

  card: {
    backgroundColor: "white",
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "space-around",
  },
  handle: {
    fontSize: 30,
    fontWeight: "100",
    margin: 10,
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});

const mapStateToProps = (state) => {
  return {
    gotosearch: state.user.gotosearch,
    info: state.user.info,
  };
};
export default connect(mapStateToProps, { fetchUser })(SearchedInfo);
