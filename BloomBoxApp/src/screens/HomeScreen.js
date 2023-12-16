import React, { useContext, useState } from "react";
import {
  Button,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import { AuthContext } from "../context/AuthContext";
import BarsSvg from "../images/SVGs/Bars";
import HangingLampSvg from "../images/SVGs/HangingLamp";
import Plant2 from "../images/SVGs/Plant2";

const HomeScreen = ({ navigation }) => {
  const { isLoading, logout, userInfo } = useContext(AuthContext);
  const [enteredReminder, setEnteredReminder] = useState(1);
  const [reminder, setReminder] = useState([]);

  function reminderInputHandler() {
    setEnteredReminder(enteredReminder + 1);
  }

  function addReminder() {
    setReminder((currentReminders) => [...currentReminders, enteredReminder]);
  }

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        {/* <Text style={styles.userInfo}>{userInfo.userLogin}</Text> */}
        <View style={styles.barsContainer}>
          <Pressable onPress={() => navigation.openDrawer()}>
            <BarsSvg />
          </Pressable>
        </View>
      </View>

      <Spinner visible={isLoading} />

      <Button
        title="Add reminder"
        onPress={(reminderInputHandler, addReminder)}
        //color={reminder ? "blue" : "green"}
        style={styles.addReminderBtn}
      />

      <View style={styles.headerTextContainer}>
        <Text style={styles.headerText}>Welcome</Text>
        <Text style={styles.headerText}>back</Text>
        <Text style={styles.subheaderText}>here are your reminders</Text>
        <HangingLampSvg style={styles.hangingLamp1} />
        <HangingLampSvg style={styles.hangingLamp2} />
        <Plant2 style={styles.plant2} />
      </View>

      <View style={styles.reminderListContainer}>
        <View style={styles.reminderListBackground}>
          <View style={styles.reminderList}>
            <ScrollView>
              {reminder.map((r) => (
                <View style={styles.reminderItem}>
                  <Text style={styles.reminderItemText}>Hello</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#fff",
  },

  wrapper: {
    width: "80%",
  },

  link: {
    color: "#5B6E4E",
  },

  topBar: {
    flex: 0,
    alignItems: "flex-start",
    width: "100%",
    justifyContent: "flex-start",
  },

  barsContainer: {
    padding: 15,
  },

  headerTextContainer: {
    flex: 1,
    //backgroundColor: "yellow",
    width: "70%",
    marginTop: "20%",
    marginBottom: "20%",
  },

  headerText: {
    fontSize: 42,
    fontWeight: "bold",
    textTransform: "uppercase",
    marginTop: -15,
  },

  subheaderText: {
    fontSize: 17,
    fontWeight: "light",
    textTransform: "lowercase",
    marginTop: -5,
  },

  reminderListContainer: {
    flex: 6,
    width: "80%",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: "#20201D",
  },

  reminderListBackground: {
    width: "100%",
    height: "100%",
    padding: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: "white",
  },

  hangingLamp1: {
    position: "absolute",
    alignItems: "flex-start",
    marginLeft: "70%",
    marginTop: " -45%",
  },

  hangingLamp2: {
    position: "absolute",
    alignItems: "flex-start",
    marginLeft: "45%",
    marginTop: "-48%",
  },

  plant2: {
    position: "absolute",
    marginLeft: "70%",
    marginTop: "18%",
  },

  addReminderBtn: {},

  reminderItem: {
    width: "100%",
    height: 100,
    padding: 10,
    marginBottom: 10,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#20201D",
  },

  reminderItemText: {
    color: "#F4F7F8",
    fontSize: 28,
    //fontWeight: "bold",
  },
});

export default HomeScreen;
