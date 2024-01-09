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

const ReminderComponent = ({remainder, name}) => {
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
            // <View style={styles.reminderContainerDone}>
            //   <View style={styles.reminderTitleContainer}>
            //     <WateringDoneSvg />
            //     <Text style={styles.reminderTitleDone}>{remainder.remainderType}</Text>
            //   </View>
            //   <Pressable onPress={() => handleDonePress()}>
            //     <CheckButtonDoneSvg />
            //   </Pressable>
            // </View>
            <View style={styles.reminderContainerDone}>
              <View style={styles.remainderDataContainer}>
                <View style={styles.remainderTitleContainer}>
                  <WateringDoneSvg />
                  <View>
                    <Text style={styles.reminderTitleDone}>{remainder.remainderType}</Text>
                    <Text style={styles.reminderPlantNameDone}>{name}</Text>
                  </View>
                </View>

                <Pressable onPress={() => handleDonePress()}>
                  <CheckButtonDoneSvg />
                </Pressable>
              </View>
            </View>
            :
            (differenceInDays > 3 ?
                    <View style={styles.reminderContainerVeryOverdue}>
                      <View style={styles.remainderDataContainer}>
                        <View style={styles.remainderTitleContainer}>
                          <WateringOverdueSvg />
                          <View>
                            <Text style={styles.reminderTitleOverdue}>{remainder.remainderType}!!!</Text>
                            <Text style={styles.reminderPlantNameOverdue}>Joffrey</Text>
                          </View>
                        </View>

                        <Pressable onPress={() => handleDonePress()}>
                          <CheckButtonOverdueSvg />
                        </Pressable>
                      </View>
                    </View>
                    :
                    (differenceInDays > 1 ?
                        <View style={styles.reminderContainerOverdue}>
                          <View style={styles.remainderDataContainer}>
                            <View style={styles.remainderTitleContainer}>
                              <WateringOverdueSvg />
                              <View>
                                <Text style={styles.reminderTitleOverdue}>{remainder.remainderType}!</Text>
                                <Text style={styles.reminderPlantNameOverdue}>Joffrey</Text>
                              </View>
                            </View>

                            <Pressable onPress={() => handleDonePress()}>
                              <CheckButtonOverdueSvg />
                            </Pressable>
                          </View>
                        </View>
                        :
                        <View style={styles.reminderContainer}>
                          <View style={styles.remainderDataContainer}>
                            <View style={styles.remainderTitleContainer}>
                              <WateringSvg />
                              <View>
                                <Text style={styles.reminderTitle}>{remainder.remainderType}</Text>
                                <Text style={styles.reminderPlantName}>Joffrey</Text>
                              </View>
                            </View>

                            <Pressable onPress={() => handleDonePress()}>
                              <CheckButtonSvg />
                            </Pressable>
                          </View>
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
    paddingHorizontal: 10,
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "space-between",
    // gap: 10,
    borderRadius: 23,
    // width: "90%",
    marginVertical: 5,
    // margin: 10,
    // marginBottom: 50
  },

  reminderContainerDone: {
    backgroundColor : "#DFDFD9",
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 23,
    marginVertical: 5
  },

  reminderContainerOverdue: {
    backgroundColor : "#5B6E4E",
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 23,
    marginVertical: 5
  },

  reminderContainerVeryOverdue: {
    backgroundColor : "#20201D",
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 23,
    marginVertical: 5
  },

  remainderDataContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },

  // reminderTitleContainer: {
  //   // width: "100%",
  //   // backgroundColor: "red",
  //   // flexDirection: "row",
  //   // justifyContent: "flex-start",
  //   // alignItems: "center",
  //   // gap: 10
  //
  // },

  remainderTitleContainer: {
    // backgroundColor: "yellow",
    flexDirection: "row",
    alignItems: "center",
    gap: 10
  },


  reminderTitle: {
    fontSize: 14,
    color: "#20201D",
    textTransform: "uppercase",
    lineHeight: 14
    // backgroundColor: "yellow"
  },

  reminderPlantName: {
    fontSize: 24,
    color: "#20201D",
    textTransform: "capitalize",
    lineHeight: 24,
  },

  reminderTitleDone: {
    fontSize: 14,
    color: "#A9A9A7",
    textTransform: "uppercase",
    lineHeight: 14
  },

  reminderPlantNameDone: {
    fontSize: 24,
    color: "#A9A9A7",
    textTransform: "capitalize",
    lineHeight: 24,
    textDecorationLine: "line-through",
  },

  reminderTitleOverdue: {
    fontSize: 14,
    color: "#FFFFFF",
    textTransform: "uppercase",
    lineHeight: 14
  },

  reminderPlantNameOverdue: {
    fontSize: 24,
    color: "#FFFFFF",
    textTransform: "capitalize",
    lineHeight: 24,
  },
});

export default ReminderComponent;
