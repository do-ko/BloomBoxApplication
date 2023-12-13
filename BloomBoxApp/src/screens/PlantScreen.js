import React from "react";
import {Button, Text, View} from "react-native";

const PlantScreen = ({route, navigation}) => {
    const {plant} = route.params;
    return(
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            <Button title={"GO BACK"} onPress={() => {navigation.goBack()}}/>
            <Text>{plant.plantName}</Text>
            <Text>{plant.plantId}</Text>
            <Text>{plant.locationId}</Text>
        </View>
    );
}

export default PlantScreen;