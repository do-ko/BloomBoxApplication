import React, { useState } from "react";
import {
    Dimensions,
    Image,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";
import WateringSvg from "../images/SVGs/Watering";
import CheckButtonSvg from "../images/SVGs/CheckButton";

const ReminderComponent = (props) => {
    return (
        <View style={styles.reminderContainer}>
            <View style={styles.reminderTitleContainer}>
                <WateringSvg />
                <Text style={styles.reminderTitle}>WATERING</Text>
            </View>
            <Pressable onPress={() => console.log("Reminder button pressed!")}>
                <CheckButtonSvg />
            </Pressable>

        </View>
    );
};

const styles = StyleSheet.create({

    reminderContainer: {
        backgroundColor : "#8AA578",
        flex: 1,
        flexDirection: "row",
        padding: 20,
        alignItems: "center",
        justifyContent: "space-between",
        gap: 20,
        borderRadius: 23,
        width: "90%",
        margin: 10,
        marginBottom: 50
    },

    reminderTitleContainer: {
        flexDirection: "row",
        justifyContent: "flex-start",
        gap: 20
    },


    reminderTitle: {
        fontSize: 24,
        color: "#20201D",
        // backgroundColor: "yellow"
    }
});

export default ReminderComponent;
