import React from "react";
import { View, Text, Linking, ScrollView } from "react-native";
import Item from "./user/components/item";
import Header from "./Header";
import { TouchableOpacity } from "react-native-gesture-handler";

const Help = () => {
  return (
    <View>
      <Header name="About" nodrawer={false} />
      <ScrollView>
        <Item head="Contests" text="" />
        <Item head="" text="Get list of upcoming contests" />
        <Item head="" text="Set reminder for upcoming contests" />
        <Item head="User" text="" />
        <Item head="" text="Search any user on code-forces" />
        <Item head="" text="Check Submissions summary of any user" />
        <Item head="" text="Check Ratings and contests participated" />
        <Item head="" text="Check solved and unsolved problems of the user" />
        <Item head="" text="" />
        <Item head="@Pulkit" hwt="800" text="" />
        <TouchableOpacity
          onPress={() =>
            Linking.openURL("https://pulkit1joshi.github.io/Codux-Profile")
          }
        >
          <Item
            head="Website"
            hwt="400"
            text="pulkit1joshi.github.io/Codux-Profile"
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            Linking.openURL("https://github.com/pulkit1joshi/CoduxApp")
          }
        >
          <Item
            head="Contribute:"
            hwt="400"
            text="github.com/pulkit1joshi/CoduxApp"
          />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Help;
