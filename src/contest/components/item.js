import React, { useEffect, useState, useLayoutEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";
import { showMessage } from "react-native-flash-message";

const Item = props => {
  const [timeleft, settimeleft] = useState("");
  const [days, setdays] = useState("");
  const [date, setdate] = useState("");
  const [time, settime] = useState("");

  const localNotification = {
    title: props.ntitle,
    body: props.nbody, // (string) — body text of the notification.
    ios: {
      // (optional) (object) — notification configuration specific to iOS.
      sound: true // (optional) (boolean) — if true, play a sound. Default: false.
    },
    // (optional) (object) — notification configuration specific to Android.
    android: {
      sound: true, // (optional) (boolean) — if true, play a sound. Default: false.
      //icon (optional) (string) — URL of icon to display in notification drawer.
      //color (optional) (string) — color of the notification icon in notification drawer.
      priority: "high", // (optional) (min | low | high | max) — android may present notifications according to the priority, for example a high priority notification will likely to be shown as a heads-up notification.
      sticky: false, // (optional) (boolean) — if true, the notification will be sticky and not dismissable by user. The notification must be programmatically dismissed. Default: false.
      vibrate: true // (optional) (boolean or array) — if true, vibrate the device. An array can be supplied to specify the vibration pattern, e.g. - [ 0, 500 ].
      // link (optional) (string) — external link to open when notification is selected.
    }
  };

  useLayoutEffect(() => {
    const fetchPermissions = async () => {
      let result = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    };
    fetchPermissions();
  });

  useEffect(() => {
    let dateObj = new Date(props.time * 1000);
    let date =
      dateObj.getDate() +
      "/" +
      dateObj.getMonth() +
      "/" +
      dateObj.getFullYear();
    setdate(date);

    let min = dateObj.getMinutes();
    if (min < 10) min = "0" + min;
    let sec = dateObj.getSeconds();
    if (sec < 10) sec = "0" + sec;

    let time = dateObj.getHours() + ":" + min;
    settime(time);

    setInterval(() => {
      let contest2 = [];
      let unix = new Date().getTime() / 1000;
      let time = props.time;
      let timeleft = time - unix;
      let days = Math.floor(timeleft / (3600 * 24));
      timeleft = timeleft % (3600 * 24);
      let hours = Math.floor(timeleft / 3600);
      timeleft = timeleft % 3600;
      let min = Math.floor(timeleft / 60);
      timeleft = timeleft % 60;
      let seconds = Math.floor(timeleft);
      let formattedTime = hours + "h:" + min + "m:" + seconds + "s";
      var str = days + "d:";
      if (!days) {
        str = "Today ";
      }
      contest2.timeleft = formattedTime;
      contest2.days = str;
      settimeleft(contest2.timeleft);
      setdays(contest2.days);
    }, 1000);
  });

  const styles = StyleSheet.create({
    main: {
      backgroundColor: props.bgcol || "white",
      padding: props.mpad || 4,
      margin: props.mrgn || 1,
      paddingTop: props.padtop || 10,
      borderRadius: 1,
      elevation: 5,
      shadowOffset: {
        width: 1,
        height: 1
      },
      shadowRadius: 1,
      shadowOpacity: 0.3,
      justifyContent: "space-between"
    },
    head: {
      padding: props.hpad || 7,
      paddingTop: props.hpadtop || 10,
      paddingLeft: 15,
      fontSize: props.hsize || 17,
      fontWeight: props.hwt || "normal",
      color: "black",
      flexGrow: 1,
      flex: 0
    },
    text: {
      padding: props.tpad || 0,
      paddingTop: props.tpadtop || 0,
      paddingRight: 15,
      fontSize: props.tsize || 17,
      fontWeight: props.twt || "200",
      color: props.tcol || "black"
    },
    name: {
      paddingBottom: 1,
      fontWeight: "300"
    }
  });

  return (
    <View style={styles.main}>
      <View style={{ flexDirection: "column" }}>
        <TouchableOpacity
          onPress={() => {
            let contestUnix = new Date(props.time * 1000);
            let remtime = contestUnix.getTime();
            let remtimestr = new Date(remtime - 1000 * 60 * 30);
            let curr = new Date();
            if (remtimestr.getTime() - curr.getTime() < 0) return 0;
            Notifications.scheduleLocalNotificationAsync(localNotification, {
              time: remtimestr.getTime()
            });
            let min = remtimestr.getMinutes();
            if (min < 10) min = "0" + min;
            showMessage({
              message: `Reminder is set for ${props.head}`,
              description:
                remtimestr.getDate() +
                "/" +
                remtimestr.getMonth() +
                "/" +
                remtimestr.getFullYear() +
                " - " +
                remtimestr.getHours() +
                ":" +
                min,
              type: "info"
            });
          }}
        >
          <Text style={[styles.head, styles.name]}>{props.head} </Text>
          <View
            style={{
              alignContent: "center",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row"
            }}
          >
            <Text style={styles.head}>
              <Text style={{ fontSize: 14 }}>
                {date}
                {"\n"}
                {time}
              </Text>
            </Text>

            <Text style={styles.text}>
              <Text style={{ fontSize: 14 }}>
                {" "}
                {days}
                {timeleft}
              </Text>
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Item;
