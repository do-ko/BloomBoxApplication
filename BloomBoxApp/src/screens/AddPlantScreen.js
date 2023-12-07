import React, {useContext} from "react";
import {Button, Text, View} from "react-native";
import {PlantContext} from "../context/PlantContext";

const AddPlantScreen = () => {
    const {addPlant} = useContext(PlantContext);

    return(
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            <Text>AddPlantScreen</Text>
            <Button title={"ADD TEST"} onPress={()=>addPlant(1, "Name", "description", 3, 3, "url")}/>
        </View>
    );
}

export default AddPlantScreen;