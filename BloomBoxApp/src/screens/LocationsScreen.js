import {Pressable, StyleSheet, Text, View} from "react-native";
import BarsSvg from "../images/SVGs/Bars";
import React from "react";
import AddSvg from "../images/SVGs/Add";

const LocationsScreen = ({ navigation }) => {
    return (
        <View style={styles.appContainer}>
            <View style={styles.barsContainer}>
                <Pressable onPress={() => navigation.openDrawer()}>
                    <BarsSvg/>
                </Pressable>
            </View>

            <View style={styles.tempNavTesting}>
                <View style={{width: "100%", flexDirection:"row", justifyContent: "space-around"}}>
                    <Pressable onPress={() => navigation.navigate("AddLocation")}>
                        <AddSvg/>
                    </Pressable>
                    <Pressable onPress={() => navigation.navigate("EditLocation")}>
                        <AddSvg/>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    appContainer: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        padding: 15,
        backgroundColor: "#fff"
    },

    barsContainer: {
        // backgroundColor: "blue",
        flex: 0,
        alignItems: "flex-start",
        width: "100%",
        justifyContent: "flex-start"
    },

    tempNavTesting: {
        // backgroundColor: "yellow",
        height: "100%",
        width: "100%",
        alignItems:"center",
        justifyContent:"center"
    }
})

export default LocationsScreen;