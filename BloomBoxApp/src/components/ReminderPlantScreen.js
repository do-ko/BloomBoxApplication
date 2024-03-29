import React, {useEffect, useState} from "react";
import ReminderComponentPlant from "./ReminderComponentPlant";

const ReminderPlantScreen = ({reminder}) => {
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
            {reminder.failed ?
                <ReminderComponentPlant reminder={reminder} containerColor={"#994758"} textColor={"#4D1C25"}
                                        lineDecoration={"line-through"}/>
                :
                (reminder.done ?
                    <ReminderComponentPlant reminder={reminder} containerColor={"#DFDFD9"} textColor={"#A9A9A7"}
                                            lineDecoration={"line-through"}/>
                    :
                    (differenceInDays > 3 ?
                            <ReminderComponentPlant reminder={reminder} containerColor={"#20201D"} textColor={"#FFFFFF"}
                                                    lineDecoration={"none"}/>
                            :
                            (differenceInDays > 1 ?
                                    <ReminderComponentPlant reminder={reminder} containerColor={"#5B6E4E"}
                                                            textColor={"#FFFFFF"} lineDecoration={"none"}/>
                                    :
                                    <ReminderComponentPlant reminder={reminder} containerColor={"#8AA578"}
                                                            textColor={"#20201D"} lineDecoration={"none"}/>
                            )
                    ))
            }
        </>
    );
};


export default ReminderPlantScreen;
