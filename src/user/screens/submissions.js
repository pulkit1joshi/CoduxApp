import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Button,
  Modal,
  Vibration
} from "react-native";
import { connect } from "react-redux";
import Header from "../../Header";
import Item from "../components/item";
import LoadingIndicator from "../../loader";
import { usePromiseTracker } from "react-promise-tracker";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

function Submissions(props) {
  const { promiseInProgress } = usePromiseTracker();
  const navigation = useNavigation();
  const [showUnsolved, setUnsolved] = useState(false);
  const [showSolved, setSolved] = useState(false);
  const [contestId, setcontestId] = useState("");
  const [qindex, setqindex] = useState("");
  const [togglemodal, settogglemodal] = useState(false);
  const [qname, setqname] = useState("");

  //`https://codeforces.com/contest/${datapoint.contestId}/problem/${datapoint.index}`

  useEffect(() => {});

  if (promiseInProgress == true) {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <LoadingIndicator />
      </View>
    );
  } else if (props.gotosearch == 1) {
    return (
      <View>
        <Header />
        <View
          style={{
            flexDirection: "column",
            alignSelf: "center"
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
      <View>
        <Header name={props.name} />
        <Modal
          style={[styles.container, styles.horizontal]}
          animationType="slide"
          transparent={true}
          visible={togglemodal}
        >
          <View style={{ marginTop: "10%" }}>
            <Item
              head="Navigate to problem :"
              text={qname}
              hwt="300"
              twt="200"
              hpadtop={10}
              tpadtop={10}
              padtop={10}
              mpad={10}
            />
            <Button
              onPress={() => {
                settogglemodal(false);
                Linking.openURL(
                  "https://codeforces.com/contest/" +
                    contestId +
                    "/problem" +
                    qindex +
                    "/"
                );
              }}
              title="OK"
            />
            <Button
              color="red"
              style={{
                color: "red"
              }}
              onPress={() => {
                settogglemodal(false);
              }}
              style={styles.center}
              title="Cancel"
            />
          </View>
        </Modal>
        <ScrollView>
          <View style={{ paddingTop: 10 }}>
            <Item
              head="Submission Summary"
              hwt="500"
              bgcol="#5bc0de"
              tcol="white"
              hcol="white"
            />
          </View>

          {props.problemsinfo.map((datapoint, index) => (
            <Item
              head={datapoint.name}
              text={datapoint.num}
              mpad={3}
              tpad={3}
              hpad={3}
              hsize={14}
              tsize={14}
            />
          ))}
          <View style={{ paddingTop: 10 }}>
            <TouchableOpacity onPressIn={() => setUnsolved(!showUnsolved)}>
              <Item
                head="Unsolved List"
                text="+"
                hwt="500"
                twt="800"
                bgcol="#5bc0de"
                tcol="white"
                hcol="white"
              />
            </TouchableOpacity>

            <ScrollView>
              {showUnsolved &&
                props.unsolved.map((datapoint, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.center}
                    onLongPress={() => {
                      Vibration.vibrate(100);
                      settogglemodal(true);
                      setqname(datapoint.name.substring(0, 20));
                      setqindex(String(datapoint.index));
                      setcontestId(Number(datapoint.contestId));
                      return 0;
                    }}
                  >
                    <Item
                      key={index}
                      head={datapoint.name}
                      text={datapoint.contestId}
                      mpad={3}
                      tpad={3}
                      hpad={3}
                      hsize={14}
                      tsize={14}
                    />
                  </TouchableOpacity>
                ))}
            </ScrollView>
          </View>

          <View style={{ paddingTop: 10 }}>
            <TouchableOpacity onPressIn={() => setSolved(!showSolved)}>
              <Item
                head="Solved List"
                text="+"
                hwt="500"
                twt="800"
                bgcol="#5bc0de"
                tcol="white"
                hcol="white"
              />
            </TouchableOpacity>
            <ScrollView>
              {showSolved &&
                props.solved.map((datapoint, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.center}
                    onLongPress={() => {
                      Vibration.vibrate(100);
                      settogglemodal(true);
                      setqname(datapoint.name.substring(0, 20));
                      setqindex(String(datapoint.index));
                      setcontestId(Number(datapoint.contestId));
                      return 0;
                    }}
                  >
                    <Item
                      key={index + 100000}
                      head={datapoint.name}
                      text={datapoint.contestId}
                      mpad={3}
                      tpad={3}
                      hpad={3}
                      hsize={14}
                      tsize={14}
                    />
                  </TouchableOpacity>
                ))}
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    );
  }
}

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
  },
  center: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  }
});

const mapStateToProps = state => {
  return {
    tags: state.user.tags,
    byverdict: state.user.byverdict,
    verdicts: state.user.verdicts,
    problemsbytags: state.user.problemsbytags,
    gotosearch: state.user.gotosearch,
    problemsinfo: state.user.problemsinfo,
    unsolved: state.user.unsolved,
    solved: state.user.solved,
    qbyindex: state.user.qbyindex,
    qbyindexlist: state.user.qbyindexlist,
    languages: state.user.languages,
    langdata: state.user.langdata,
    verdictcount: state.user.verdictcount,
    uniqueprob: state.user.uniqueprob,
    verdictinfo: state.user.verdictinfo,
    name: state.user.name
  };
};
export default connect(mapStateToProps, null)(Submissions);
