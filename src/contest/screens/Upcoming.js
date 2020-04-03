import React, { useEffect } from "react";
import { View, Text, StyleSheet, Vibration } from "react-native";
import { connect } from "react-redux";
import { fetchContests } from "../../redux/Actions/contestactions";
import { usePromiseTracker } from "react-promise-tracker";
import LoadingIndicator from "../../loader";
import Item from "../components/item";
import Header from "../../Header";

function Upcoming(props) {
  const { promiseInProgress } = usePromiseTracker();

  useEffect(() => {
    if (props.upcoming.length == 0) props.fetchContests();
    /*   let result = await   
  Permissions.askAsync(Permissions.NOTIFICATIONS);
  if (Constants.lisDevice && resut.status === ‘granted’) {
   console.log(‘Notification permissions granted.’)
  }*/
  });

  if (promiseInProgress === true) {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <LoadingIndicator />
      </View>
    );
  } else {
    return (
      <View>
        <Header name="Upcoming Contests" nodrawer={false} />
        {props.upcoming.map((datapoint, index) => (
          <Item
            key={index + 10000}
            head={datapoint.name}
            time={datapoint.startTimeSeconds}
            mpad={10}
            tpad={0}
            hpad={0}
            hsize={17}
            tsize={17}
            hwt="200"
            ntitle="Upcoming Contest"
            nbody={datapoint.name}
          />
        ))}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    upcoming: state.contest.upcominglist
  };
};

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

export default connect(mapStateToProps, { fetchContests })(Upcoming);
