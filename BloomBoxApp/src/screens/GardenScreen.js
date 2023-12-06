import React, {useContext} from "react";
import {Button, StyleSheet, Text, View, TextInput, Image, Pressable} from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import {AuthContext} from "../context/AuthContext";

const GardenScreen = ({navigation}) => {
    const {isLoading, logout, userInfo} = useContext(AuthContext);
    return(
        <View style={styles.appContainer}>
              <View style={styles.headerContainer}>
                <Text style={styles.headerText1}>YOUR</Text>
                <Text style={styles.headerText2}>GARDEN</Text>
              </View>

              <View style={styles.barContainer}>
                <View style={styles.searchBarContainer}>
                  <TextInput
                    style={styles.searchBarInput}
                    value={"Search plants"}
                  ></TextInput>

                  <Image
                    style={styles.magnifyingGlassIcon}
                    source={require("../images/magnifying_glass.png")}
                  />
                </View>

                <Pressable
                  onPress={() => navigation.navigate("AddPlant")}
                  style={({ pressed }) => {
                    return { opacity: pressed ? 0.5 : 1 };
                  }}
                >
                  <Image
                    style={styles.addPlantButton}
                    source={require("../images/add_plant_button.png")}
                  />
                </Pressable>
              </View>

              <View style={styles.leftLine} />
              <View style={styles.rightLine} />

              <Image
                style={styles.plant1Image}
                source={require("../images/plant1.png")}
              />

              <Image
                style={styles.drawerIcon}
                source={require("../images/drawer_icon.png")}
              />
            </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
        // backgroundColor: '#20201D'
    },
    wrapper: {
        width: "80%"
    },
    input: {
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#20201D',
        borderRadius: 5,
        paddingHorizontal: 14
    },
    link: {
        color: '#5B6E4E'
    },
    // the whole app screen
    appContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    },

    // container for header texts and icons
    headerContainer: {
    width: "60%",
    //height: "30%",
    textAlign: "left",
    //fontFamily: "calibri",
    },

    headerText1: {
    marginTop: 50,
    fontSize: 42,
    fontWeight: "700",
    letterSpacing: 1,
    },

    headerText2: {
    marginTop: -15,
    fontSize: 42,
    fontWeight: "700",
    letterSpacing: 1,
    },

    barContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "80%",
    height: "7%",
    backgroundColor: "#20201D",
    borderRadius: 20,
    },

    searchBarContainer: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    },

    searchBarInput: {
    marginHorizontal: "5%",
    padding: 5,
    paddingLeft: 40,
    width: "85%",
    height: 32,
    backgroundColor: "#ffffff",
    borderRadius: 25,
    fontSize: 16,
    },

    magnifyingGlassIcon: {
    width: 20,
    height: 20,
    //position: "absolute",
    left: -250,
    },

    pressableAddPlantButton: {},

    addPlantButton: {
    left: -20,
    },

    leftLine: {
    backgroundColor: "#DFDFD9",
    width: 10,
    height: "16.5%",
    position: "absolute",
    left: "15%",
    },

    rightLine: {
    backgroundColor: "#DFDFD9",
    width: 10,
    height: "16.5%",
    position: "absolute",
    right: "15%",
    },

    plant1Image: {
    position: "absolute",
    width: 65,
    top: "6%",
    left: "64%",
    },

    drawerIcon: {
    position: "absolute",
    left: "3%",
    top: "5%",
    },
})

export default GardenScreen;