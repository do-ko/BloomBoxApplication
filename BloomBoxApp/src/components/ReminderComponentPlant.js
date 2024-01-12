import {Pressable, StyleSheet, Text, View} from "react-native";
import WateringSvg from "../images/SVGs/Watering";
import CheckButtonSvg from "../images/SVGs/CheckButton";
import React, {useContext, useState} from "react";
import {RemainderContext} from "../context/RemainderContext";



const ReminderComponentPlant = ({reminder, containerColor, textColor, lineDecoration}) => {
    const [done, setDone] = useState(reminder.done)
    const [doneDate, setDoneDate] = useState(reminder.doneDate)
    const {editRemainder} = useContext(RemainderContext);

    const handleDonePress = () => {
        if (!reminder.failed){
            if (done){
                //     if was true before press -> now will be not done
                setDoneDate(null);
                reminder.doneDate = null;
            } else {
                setDoneDate(Date.now());
                reminder.doneDate = Date.now();
            }
            setDone(!done);
            reminder.done = !done;
            editRemainder(reminder);
        }
    }


    return (
        <Pressable onPress={() => handleDonePress()} style={styles.reminderContainer(containerColor)}>
            <View style={styles.reminderTitleContainer}>
                <WateringSvg color={textColor}/>
                <Text style={styles.reminderTitle(textColor,lineDecoration)}>{reminder.remainderType}</Text>
            </View>

            <CheckButtonSvg color={textColor}/>

        </Pressable>
    );
}

const styles = StyleSheet.create({
    reminderContainer: color => ({
        backgroundColor : color,
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
    }),

    reminderTitleContainer: {
        flexDirection: "row",
        justifyContent: "flex-start",
        gap: 20
    },

    reminderTitle: (color, line) => ({
        fontSize: 24,
        color: color,
        textTransform: "uppercase",
        textDecorationLine : line
    })
});

export default ReminderComponentPlant;