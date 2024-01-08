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
import CheckedButtonDone from "../images/SVGs/CheckButtonDone";
import CheckButtonDoneSvg from "../images/SVGs/CheckButtonDone";
import WateringDone from "../images/SVGs/WateringDone";
import WateringDoneSvg from "../images/SVGs/WateringDone";

const ReminderComponent = ({remainder}) => {
    const [done, setDone] = useState(remainder.done)
    const [doneDate, setDoneDate] = useState(remainder.doneDate)
    const handleDonePress = () => {
        if (done){
        //     if was true before press -> now will be not done
            setDoneDate(null);
        } else {
            setDoneDate(Date.now());
        }
        setDone(!done);
    }

    return (
        <>
            {done ?
                <View style={styles.reminderContainerDone}>
                <View style={styles.reminderTitleContainer}>
                    <WateringDoneSvg />
                    <Text style={styles.reminderTitleDone}>{remainder.remainderType}</Text>
                </View>
                <Pressable onPress={() => handleDonePress()}>
                    <CheckButtonDoneSvg />
                </Pressable>
                </View>
                :
                <View style={styles.reminderContainer}>
                <View style={styles.reminderTitleContainer}>
                    <WateringSvg />
                    <Text style={styles.reminderTitle}>{remainder.remainderType}</Text>
                </View>
                <Pressable onPress={() => handleDonePress()}>
                    <CheckButtonSvg />
                </Pressable>

            </View>}
        </>


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

    reminderContainerDone: {
        backgroundColor : "#DFDFD9",
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
        textTransform: "uppercase"
        // backgroundColor: "yellow"
    },

    reminderTitleDone: {
        fontSize: 24,
        color: "#A9A9A7",
        textTransform: "uppercase",
        textDecorationLine: "line-through"
    }
});

export default ReminderComponent;
