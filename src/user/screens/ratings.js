import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { fetchRatingHist } from "../../redux/Actions/userActions";
import { connect } from "react-redux";
import LineG from "../components/line";
import Item from "../components/item";
import Header from "../../Header";

class Ratings extends React.Component {
  componentDidMount() {
    console.log("mounted");
    this.props.fetchRatingHist(this.props.name);
  }

  getdata = () => {
    var data2 = [];
    this.props.ratinginfo.map((datapoint, index) => {
      data2.push(datapoint.oldRating);

      return 0;
    });
    console.log("Get data called: ");
    console.log(this.props.ratinginfo);
    return data2;
  };

  render() {
    return (
      <View>
        <Header name={this.props.name} />
        <View style={style.center}>
          <Item
            head="      Rating History"
            hwt="500"
            bgcol="#5bc0de"
            tcol="white"
            hcol="white"
          />
        </View>
        <View style={style.shade}>
          <LineG data={this.getdata()} />
        </View>
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
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center"
  }
});

const mapStateToProps = state => {
  return {
    name: state.user.name,
    ratinginfo: state.user.ratingHist
  };
};
export default connect(mapStateToProps, { fetchRatingHist })(Ratings);
