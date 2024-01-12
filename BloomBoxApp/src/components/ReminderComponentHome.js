import {Pressable, StyleSheet, Text, View} from "react-native";
import WateringSvg from "../images/SVGs/Watering";
import CheckButtonSvg from "../images/SVGs/CheckButton";
import React, {useContext, useState} from "react";
import {RemainderContext} from "../context/RemainderContext";



const ReminderComponentHome = ({reminder, containerColor, textColor, lineDecoration}) => {
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
            <View style={styles.remainderDataContainer}>
                <View style={styles.remainderTitleContainer}>
                    <WateringSvg color={textColor}/>
                    <View>
                        <Text style={styles.reminderTitle(textColor)}>{reminder.remainderType}</Text>
                        <Text style={styles.reminderPlantName(textColor, lineDecoration)}>{reminder.plantName}</Text>
                    </View>
                </View>
                <CheckButtonSvg color={textColor} />
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    reminderContainer: color => ({
        backgroundColor : color,
        flex: 1,
        flexDirection: "row",
        paddingHorizontal: 10,
        paddingVertical: 20,
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: 23,
        marginVertical: 5,
    }),

    remainderDataContainer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },

    remainderTitleContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10
    },

    reminderTitle: (color) => ({
        fontSize: 14,
        color: color,
        textTransform: "uppercase",
        lineHeight: 14,
    }),

    reminderPlantName: (color, line) => ({
        fontSize: 24,
        color: color,
        textTransform: "capitalize",
        lineHeight: 24,
        textDecorationLine : line
    })
});

export default ReminderComponentHome;