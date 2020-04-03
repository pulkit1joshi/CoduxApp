/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar
} from "react-native";

import {
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions
} from "react-native/Libraries/NewAppScreen";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";

import store from "./src/redux/store";
import { Provider } from "react-redux";
import Search from "./src/user/screens/search";
import SearchedInfo from "./src/user/screens/searchinfo";
import ratings from "./src/user/screens/RatingWrapper.js";
import { createStackNavigator } from "@react-navigation/stack";

import { TouchableOpacity } from "react-native-gesture-handler";
import Header from "./src/Header";

import { Ionicons } from "@expo/vector-icons";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import submissions from "./src/user/screens/SubmissionsWrapper";

const SearchN = createStackNavigator();
const SearchN2 = createStackNavigator();
const Tab = createBottomTabNavigator();
const UserDrawer = createDrawerNavigator();
const ContestDrawer = createDrawerNavigator();

const SearchStack = () => {
  const navigation = useNavigation();
  return (
    <SearchN.Navigator>
      <SearchN.Screen
        name="Search"
        component={Search}
        options={{
          headerTitle: () => (
            <TouchableOpacity onPressIn={() => navigation.openDrawer()}>
              <View style={styles.goleft}>
                <Ionicons name="md-menu" size={30} color="gray" />
              </View>
            </TouchableOpacity>
          ),
          headerTitleAlign: "left",
          headerLayoutPreset: "left"
        }}
      />
    </SearchN.Navigator>
  );
};

const SearchStack2 = () => {
  const navigation = useNavigation();
  return (
    <SearchN2.Navigator>
      <SearchN2.Screen
        name="Info"
        component={SearchedInfo}
        options={{
          headerTitle: () => (
            <TouchableOpacity onPressIn={() => navigation.openDrawer()}>
              <View style={styles.goleft}>
                <Ionicons name="md-menu" size={30} color="gray" />
              </View>
            </TouchableOpacity>
          ),
          headerTitleAlign: "left",
          headerLayoutPreset: "left"
        }}
      />
    </SearchN2.Navigator>
  );
};

const UserDrawerContainer = () => {
  return (
    <UserDrawer.Navigator>
      <UserDrawer.Screen name="Search" component={SearchStack} />
      <UserDrawer.Screen name="Info" component={SearchStack2} />
      <UserDrawer.Screen name="Ratings" component={ratings} />
      <UserDrawer.Screen name="Submissions" component={submissions} />
    </UserDrawer.Navigator>
  );
};

const ContestDrawerContainer = () => {
  return (
    <ContestDrawer.Navigator>
      <ContestDrawer.Screen name="ICPC" component={ratings} />
      <ContestDrawer.Screen name="IOI" component={ratings} />
      <ContestDrawer.Screen name="CodeForces" component={ratings} />
    </ContestDrawer.Navigator>
  );
};

const TabContainer = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeBackgroundColor: "black",
        style: {
          height: "7%"
        },
        labelStyle: {
          fontSize: 15,
          paddingBottom: 10
        },
        activeTintColor: "white",
        inactiveTintColor: "gray"
      }}
    >
      <Tab.Screen name="User" component={UserDrawerContainer} />
      <Tab.Screen name="Contest" component={ContestDrawerContainer} />
      <Tab.Screen name="Settings" component={ContestDrawerContainer} />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <TabContainer />
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  goleft: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    alignContent: "flex-start",
    alignSelf: "flex-start"
  }
});
