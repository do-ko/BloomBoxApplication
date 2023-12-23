import React, {useContext, useEffect} from "react";
import {Button, Pressable, Text, View} from "react-native";
import {PlantContext} from "../context/PlantContext";
import {DiaryContext} from "../context/DiaryContext";
import BarsSvg from "../images/SVGs/Bars";
import AddSvg from "../images/SVGs/Add";

const PlantScreen = ({route, navigation}) => {
    // plant contains all parameters of current plant
    // diaries contains all parameters belonging to this plant
    const {plant} = route.params;
    const {getAllDiariesForPlant, diaries, isLoading, addDiary} = useContext(DiaryContext);

    useEffect(() => {
        getAllDiariesForPlant(plant.plantId);
    }, [])


    return(
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            <Button title={"GO BACK"} onPress={() => {navigation.goBack()}}/>
            <Text>{plant.plantName}</Text>
            <Text>{plant.plantId}</Text>
            <Text>{plant.locationId}</Text>

            {diaries.map(diary => <Text>{diary.title}</Text>)}
            <Button title={"ADD DIARY TEST"} onPress={() => addDiary(plant.plantId, "test", Date.now(), null)}/>
            <Button title={"EDIT PLANT"} onPress={() => ""}/>
        </View>
    );
}

export default PlantScreen;