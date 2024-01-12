import React, {useContext, useEffect, useState} from "react";
import ReminderComponentHome from "./ReminderComponentHome";

const ReminderHomeScreen = ({reminder}) => {
  const [differenceInDays, setDifferenceInDays] = useState(0)

  const getDifferenceInDays = () => {
    let Difference_In_Time = Date.now() - new Date(Date.parse(reminder.remainderDay));
    let Difference_In_Days =
        Math.round(Difference_In_Time / (1000 * 3600 * 24));
    setDifferenceInDays(Difference_In_Days);
  }

  useEffect(() => {
    getDifferenceInDays();
  }, [])


  return (
      <>
        {reminder.done ?
            <ReminderComponentHome reminder={reminder} containerColor={"#DFDFD9"} textColor={"#A9A9A7"} lineDecoration={"line-through"}/>
            :
            (differenceInDays > 3 ?
                <ReminderComponentHome reminder={reminder} containerColor={"#20201D"} textColor={"#FFFFFF"} lineDecoration={"none"}/>
                    :
                    (differenceInDays > 1 ?
                            <ReminderComponentHome reminder={reminder} containerColor={"#5B6E4E"} textColor={"#FFFFFF"} lineDecoration={"none"}/>
                            :
                            <ReminderComponentHome reminder={reminder} containerColor={"#8AA578"} textColor={"#20201D"} lineDecoration={"none"}/>
                    )
            )
        }
      </>
  );
};

// const styles = StyleSheet.create({
//
//   reminderContainer: {
//     backgroundColor : "#8AA578",
//     flex: 1,
//     flexDirection: "row",
//     paddingHorizontal: 10,
//     paddingVertical: 20,
//     alignItems: "center",
//     justifyContent: "space-between",
//     // gap: 10,
//     borderRadius: 23,
//     // width: "90%",
//     marginVertical: 5,
//     // margin: 10,
//     // marginBottom: 50
//   },
//
//   reminderContainerDone: {
//     backgroundColor : "#DFDFD9",
//     flex: 1,
//     flexDirection: "row",
//     paddingHorizontal: 10,
//     paddingVertical: 20,
//     alignItems: "center",
//     justifyContent: "space-between",
//     borderRadius: 23,
//     marginVertical: 5
//   },
//
//   reminderContainerOverdue: {
//     backgroundColor : "#5B6E4E",
//     flex: 1,
//     flexDirection: "row",
//     paddingHorizontal: 10,
//     paddingVertical: 20,
//     alignItems: "center",
//     justifyContent: "space-between",
//     borderRadius: 23,
//     marginVertical: 5
//   },
//
//   reminderContainerVeryOverdue: {
//     backgroundColor : "#20201D",
//     flex: 1,
//     flexDirection: "row",
//     paddingHorizontal: 10,
//     paddingVertical: 20,
//     alignItems: "center",
//     justifyContent: "space-between",
//     borderRadius: 23,
//     marginVertical: 5
//   },
//
//   remainderDataContainer: {
//     width: "100%",
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center"
//   },
//
//   // reminderTitleContainer: {
//   //   // width: "100%",
//   //   // backgroundColor: "red",
//   //   // flexDirection: "row",
//   //   // justifyContent: "flex-start",
//   //   // alignItems: "center",
//   //   // gap: 10
//   //
//   // },
//
//   remainderTitleContainer: {
//     // backgroundColor: "yellow",
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 10
//   },
//
//
//   reminderTitle: {
//     fontSize: 14,
//     color: "#20201D",
//     textTransform: "uppercase",
//     lineHeight: 14
//     // backgroundColor: "yellow"
//   },
//
//   reminderPlantName: {
//     fontSize: 24,
//     color: "#20201D",
//     textTransform: "capitalize",
//     lineHeight: 24,
//   },
//
//   reminderTitleDone: {
//     fontSize: 14,
//     color: "#A9A9A7",
//     textTransform: "uppercase",
//     lineHeight: 14
//   },
//
//   reminderPlantNameDone: {
//     fontSize: 24,
//     color: "#A9A9A7",
//     textTransform: "capitalize",
//     lineHeight: 24,
//     textDecorationLine: "line-through",
//   },
//
//   reminderTitleOverdue: {
//     fontSize: 14,
//     color: "#FFFFFF",
//     textTransform: "uppercase",
//     lineHeight: 14
//   },
//
//   reminderPlantNameOverdue: {
//     fontSize: 24,
//     color: "#FFFFFF",
//     textTransform: "capitalize",
//     lineHeight: 24,
//   },
// });

export default ReminderHomeScreen;
