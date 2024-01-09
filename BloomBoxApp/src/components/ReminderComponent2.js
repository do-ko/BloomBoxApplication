import React, {useContext, useEffect, useState} from "react";
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
import {RemainderContext} from "../context/RemainderContext";
import CheckButtonOverdueSvg from "../images/SVGs/CheckButtonOverdue";
import WateringOverdueSvg from "../images/SVGs/WateringOverdue";

const ReminderComponent2 = ({remainder}) => {
    const [done, setDone] = useState(remainder.done)
    const [doneDate, setDoneDate] = useState(remainder.doneDate)
    const {editRemainder} = useContext(RemainderContext);
    const [differenceInDays, setDifferenceInDays] = useState(0)


    const handleDonePress = () => {
        if (done){
        //     if was true before press -> now will be not done
            setDoneDate(null);
            remainder.doneDate = null;
        } else {
            setDoneDate(Date.now());
            remainder.doneDate = Date.now();
        }
        setDone(!done);
        remainder.done = !done;
        editRemainder(remainder);

    }
    const getDifferenceInDays = () => {
        let Difference_In_Time = Date.now() - new Date(Date.parse(remainder.remainderDay));
        let Difference_In_Days =
            Math.round(Difference_In_Time / (1000 * 3600 * 24));
        setDifferenceInDays(Difference_In_Days);
    }

    useEffect(() => {
        getDifferenceInDays();
    }, [])

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
                (differenceInDays > 3 ?
                    <View style={styles.reminderContainerVeryOverdue}>
                        <View style={styles.reminderTitleContainer}>
                            <WateringOverdueSvg />
                            <Text style={styles.reminderTitleOverdue}>{remainder.remainderType}</Text>
                        </View>
                        <Pressable onPress={() => handleDonePress()}>
                            <CheckButtonOverdueSvg />
                        </Pressable>

                    </View>
                    :
                    (differenceInDays > 1 ?
                        <View style={styles.reminderContainerOverdue}>
                            <View style={styles.reminderTitleContainer}>
                                <WateringOverdueSvg />
                                <Text style={styles.reminderTitleOverdue}>{remainder.remainderType}</Text>
                            </View>
                            <Pressable onPress={() => handleDonePress()}>
                                <CheckButtonOverdueSvg />
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

                        </View>)
                )
                }
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

    reminderContainerOverdue: {
        backgroundColor : "#5B6E4E",
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

    reminderContainerVeryOverdue: {
        backgroundColor : "#20201D",
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
    },

    reminderTitleOverdue: {
        fontSize: 24,
        color: "#FFFFFF",
        textTransform: "uppercase"
    }
});

export default ReminderComponent2;
