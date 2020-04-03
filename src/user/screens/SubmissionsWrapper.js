import React, { useState, useEffect } from "react";
import Submissions from "./submissions";
import { connect } from "react-redux";
import { View, Text } from "react-native";
import { fetchUSubmissions } from "../../redux/Actions/userActions";
import Ratings from "./ratings";

const submissions = props => {
  useEffect(() => {
    // console.log("wrapper sub loaded");
    props.fetchUSubmissions(props.name);
  });
  return (
    <View>
      <Submissions />
    </View>
  );
};

const mapStateToProps = state => {
  return {
    name: state.user.name
  };
};

export default connect(mapStateToProps, { fetchUSubmissions })(submissions);
