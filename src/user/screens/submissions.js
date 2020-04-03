import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import Header from "../../Header";
import Item from "../components/item";
import LoadingIndicator from "../../loader";
import { usePromiseTracker } from "react-promise-tracker";
import { ScrollView } from "react-native-gesture-handler";

function Submissions(props) {
  const { promiseInProgress } = usePromiseTracker();
  const [showUnsolved, setUnsolved] = useState(false);
  const [showSolved, setSolved] = useState(false);

  useEffect(() => {});

  if (promiseInProgress == true) {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <Header name={props.name} />
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
          <Item hcol="red" head="Invalid User entered"></Item>
        </View>
      </View>
    );
  } else {
    return (
      <View>
        <Header name={props.name} />
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
