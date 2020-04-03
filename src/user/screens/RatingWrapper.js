import React, { useState, useEffect } from "react";
import Ratings from "./ratings";
import { connect } from "react-redux";
import { View } from "react-native";
import { fetchRatingHist } from "../../redux/Actions/userActions";

const ratings = props => {
  useEffect(() => {
    props.fetchRatingHist(props.name);
  });

  return (
    <View>
      <Ratings />
    </View>
  );
};

const mapStateToProps = state => {
  return {
    name: state.user.name
  };
};

export default connect(mapStateToProps, { fetchRatingHist })(ratings);
