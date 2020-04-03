import { usePromiseTracker } from "react-promise-tracker";

import React from "react";
import { ActivityIndicator } from "react-native";

const LoadingIndicator = () => {
  const { promiseInProgress } = usePromiseTracker();

  return (
    promiseInProgress && <ActivityIndicator size="large" color="#111111" />
  );
};

export default LoadingIndicator;
