import React, {useEffect, useState} from "react";
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
                <ReminderComponentHome reminder={reminder} containerColor={"#DFDFD9"} textColor={"#A9A9A7"}
                                       lineDecoration={"line-through"}/>
                :
                (differenceInDays > 3 ?
                        <ReminderComponentHome reminder={reminder} containerColor={"#20201D"} textColor={"#FFFFFF"}
                                               lineDecoration={"none"}/>
                        :
                        (differenceInDays > 1 ?
                                <ReminderComponentHome reminder={reminder} containerColor={"#5B6E4E"}
                                                       textColor={"#FFFFFF"} lineDecoration={"none"}/>
                                :
                                <ReminderComponentHome reminder={reminder} containerColor={"#8AA578"}
                                                       textColor={"#20201D"} lineDecoration={"none"}/>
                        )
                )
            }
        </>
    );
};
export default ReminderHomeScreen;
