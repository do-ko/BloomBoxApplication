import {Pressable, StyleSheet, Text, View} from "react-native";
import BarsSvg from "../images/SVGs/Bars";
import AddSvg from "../images/SVGs/Add";
import React from "react";

const EditLocationScreen = ({ navigation }) => {
    return (
        <View style={styles.appContainer}>
            <Text>Edit location screen</Text>
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
    }
})

export default EditLocationScreen;