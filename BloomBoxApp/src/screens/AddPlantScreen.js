import React, {useContext, useEffect, useState} from "react";
import {Button, Text, View} from "react-native";
import {PlantContext} from "../context/PlantContext";
import {LocationContext} from "../context/LocationContext";
import {SelectList} from "react-native-dropdown-select-list/index";
import SelectDropdown from 'react-native-select-dropdown'

const AddPlantScreen = () => {
    const {addPlant} = useContext(PlantContext);
    const {getAllLocationForUser, locations, isLoading} = useContext(LocationContext);
    const [selectedLocation, setSelectedLocation] = useState("");

    useEffect(() => {
        getAllLocationForUser();
    }, [])

    return(
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            <Text>{selectedLocation}</Text>
            {/*{console.log(locations)}*/}
            {/*{isLoading ? <Text>Wait</Text> : <SelectList boxStyles={{width:200}} dropdownStyles={{width:"100%", backgroundColor:"red"}}*/}
            {/*    setSelected={(val) => setSelectedLocation(val)}*/}
            {/*    data={locations.map(location => location.locationName)}*/}
            {/*    save="value"*/}
            {/*/>}*/}
            <SelectDropdown
                buttonStyle={{backgroundColor:"red"}}
                data={locations.map(location => location.locationName)}
                onSelect={(selectedItem, index) => {
                    console.log(selectedItem, index)
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                    // text represented after item is selected
                    // if data array is an array of objects then return selectedItem.property to render after item is selected
                    return selectedItem
                }}
                rowTextForSelection={(item, index) => {
                    // text represented for each item in dropdown
                    // if data array is an array of objects then return item.property to represent item in dropdown
                    return item
                }}
            />

            <Button title={"ADD TEST"} onPress={()=>addPlant(1, "Name", "description", 3, 3, "url")}/>

        </View>
    );
}

export default AddPlantScreen;