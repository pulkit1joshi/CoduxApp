import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Linking,
  Modal,
  Vibration
} from "react-native";
import { connect } from "react-redux";
import LineG from "../components/line";
import Item from "../components/item";
import Header from "../../Header";

import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import { Button } from "react-native";

import LoadingIndicator from "../../loader";
import { usePromiseTracker } from "react-promise-tracker";

function Ratings(props) {
  const { promiseInProgress } = usePromiseTracker();
  const [toggle, setToggle] = useState(false);
  const [togglemodal, setModal] = useState(false);
  const [link, setLink] = useState(1);
  function getdata() {
    let data2 = [];
    //console.log(props);
    props.ratinginfo.map((datapoint, index) => {
      data2.push(datapoint.oldRating);

      return 0;
    });
    if (!data2[0]) {
      data2 = [0];
    }
    return data2;
  }

  if (promiseInProgress === true) {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <LoadingIndicator />
      </View>
    );
  }

  if (props.gotosearch === 1) {
    return (
      <View>
        <Header />
        <View
          style={{
            flexDirection: "column",
            alignSelf: "center"
          }}
        >
          <Item hcol="red" head="Invalid User entered"></Item>
        </View>
      </View>
    );
  } else {
    return (
      <View>
        <Header name={props.name} />
        <ScrollView verticle={true}>
          <View style={[style.center, style.margin]}>
            <Item
              head="Rating History"
              hwt="500"
              bgcol="#5bc0de"
              tcol="white"
              hcol="white"
            />
          </View>
          <Modal
            style={[styles.container, styles.horizontal]}
            animationType="slide"
            transparent={true}
            visible={togglemodal}
          >
            <View style={{ marginTop: "10%" }}>
              <Item
                head="Navigate to the contest?"
                text=""
                hwt="200"
                twt="100"
                hpadtop={10}
                padtop={10}
              />
              <Button
                onPress={() => {
                  setModal(false);
                  Linking.openURL("https://codeforces.com/contest/" + link);
                }}
                title="OK"
              />
              <Button
                color="red"
                style={{
                  color: "red"
                }}
                onPress={() => {
                  setModal(false);
                }}
                style={style.center}
                title="Cancel"
              />
            </View>
          </Modal>
          <View style={style.shade}>
            <LineG data={getdata()} />
          </View>

          <View style={style.center}>
            <TouchableOpacity
              onPressIn={() => setToggle(!toggle)}
              style={style.center}
            >
              <Item
                head="Contests Participated"
                text="+"
                hwt="500"
                twt="900"
                bgcol="#5bc0de"
                tcol="white"
                hcol="white"
              />
            </TouchableOpacity>
          </View>

          {toggle &&
            props.ratinginfo.map((datapoint, index) => (
              <TouchableOpacity
                key={index}
                style={style.center}
                onLongPress={() => {
                  Vibration.vibrate(100);
                  setModal(true);
                  setLink(Number(datapoint.contestId));
                  console.log("Long Pressed");
                  return 0;
                }}
              >
                <Item
                  head={datapoint.contestName}
                  text={datapoint.rank}
                  hwt="200"
                  twt="100"
                />
              </TouchableOpacity>
            ))}
        </ScrollView>
      </View>
    );
  }
}

const style = StyleSheet.create({
  shade: {
    elevation: 100,
    shadowColor: "#000",
    shadowOpacity: 0.4,
    shadowOffset: {
      width: 2,
      height: 2
    },

    padding: 10
  },
  center: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  margin: {
    marginTop: 10
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
    height: "20%"
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  }
});

const mapStateToProps = state => {
  return {
    gotosearch: state.user.gotosearch,
    name: state.user.name,
    ratinginfo: state.user.ratingHist
  };
};
export default connect(mapStateToProps, null)(Ratings);
