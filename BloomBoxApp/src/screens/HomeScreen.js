import React, { useContext } from "react";
import { Button, Pressable, StyleSheet, Text, View } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import { AuthContext } from "../context/AuthContext";
import BarsSvg from "../images/Bars";
import HangingLampSvg from "../images/HangingLamp";

const HomeScreen = ({ navigation }) => {
  const { isLoading, logout, userInfo } = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <View styles={styles.topBar}>
        {/* <Text style={styles.userInfo}>{userInfo.userLogin}</Text> */}

        <View style={styles.barsContainer}>
          <Pressable onPress={() => navigation.openDrawer()}>
            <BarsSvg />
          </Pressable>
        </View>

        <HangingLampSvg style={styles.hangingLamp1} />
        <HangingLampSvg style={styles.hangingLamp2} />
      </View>

      <Spinner visible={isLoading} />

      <View style={styles.headerTextContainer}>
        <Text style={styles.headerText}>Welcome</Text>
        <Text style={styles.headerText}>back</Text>
        <Text style={styles.subheaderText}>here are your reminders</Text>
      </View>

      <View style={styles.reminderListContainer}>
        <View style={styles.reminderListBackground}></View>
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
    //flexDirection: "row",
    flex: 1,
    width: "100%",
    //height: 1000,
    alignItems: "left",
    justifyContent: "left",
    backgroundColor: "yellow",
  },

  barsContainer: {
    //backgroundColor: "blue",
    flex: 0,
    padding: 15,
    alignItems: "flex-start",
    width: "100%",
    justifyContent: "flex-start",
  },

  headerTextContainer: {
    flex: 1,
    //backgroundColor: "yellow",
    width: "70%",
    marginTop: "20%",
    marginBottom: "15%",
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
    backgroundColor: "black",
  },

  reminderListBackground: {
    width: "100%",
    height: "100%",
    padding: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: "white",
  },

  lampImages: {
    position: "absolute",
    width: 5,
    height: 5,
    backgroundColor: "pink",
  },

  hangingLamp1: {
    position: "absolute",
    marginLeft: "20%",
  },

  hangingLamp2: {
    position: "absolute",
    marginLeft: "8%",
    marginTop: "-5%",
  },
});

export default HomeScreen;
