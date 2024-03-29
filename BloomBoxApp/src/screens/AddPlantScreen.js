import React, {useContext, useEffect, useState} from "react";
import {Alert, Dimensions, Image, Pressable, StyleSheet, Text, TextInput, View} from "react-native";


import {PlantContext} from "../context/PlantContext";
import {LocationContext} from "../context/LocationContext";
import SelectDropdown from 'react-native-select-dropdown'
import {Menu, MenuOption, MenuOptions, MenuProvider, MenuTrigger} from "react-native-popup-menu";

// SVG imports
import BackSvg from "../images/SVGs/BackButton";
import SaveSvg from "../images/SVGs/SaveButton";
import BigAdd from "../images/SVGs/BigAdd";

// IMAGE IMPORTS
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import SunFilledSvg from "../images/SVGs/SunFilled";
import SunEmptySvg from "../images/SVGs/SunEmpty";
import DropletFilledSvg from "../images/SVGs/DropletFilled";
import DropletEmptySvg from "../images/SVGs/DropletEmpty";

const imgDir = FileSystem.documentDirectory + "images/"

const ensureDirExists = async () => {
    const dirInfo = await FileSystem.getInfoAsync(imgDir);
    if (!dirInfo.exists) {
        await FileSystem.makeDirectoryAsync(imgDir, {intermediates: true});
    }
}

const AddPlantScreen = ({navigation}) => {
    const {addPlant} = useContext(PlantContext);


    const {getAllLocationForUser, locations} = useContext(LocationContext);
    const [selectedLocation, setSelectedLocation] = useState(null);

    const [plantName, setPlantName] = useState("");
    const [species, setSpecies] = useState("")
    const [image, setImage] = useState("")
    const [lightValue, setLightValue] = useState(0)
    const [waterValue, setWaterValue] = useState(0)

    const selectImage = async (useLibrary) => {
        let result;
        if (useLibrary) {
            result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.75
            });
        } else {
            await ImagePicker.requestCameraPermissionsAsync();

            result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.75
            });
        }

        if (!result.canceled) {
            saveImage(result.assets[0].uri);
        }
    };

    const saveImage = async (imageUri) => {
        await ensureDirExists();
        const filename = new Date().getTime() + ".jpg";
        const dest = imgDir + filename;
        await FileSystem.copyAsync({from: imageUri, to: dest});
        setImage(dest);
    }

    const addNewPlant = async () => {
        if (plantName === "") {
            createAlert("Add Name");
        } else if (lightValue === 0) {
            createAlert("Select a light value")
        } else if (waterValue === 0) {
            createAlert("Select a water value")
        } else {
            let frequency = 14 - waterValue - lightValue;
            addPlant(selectedLocation, plantName, species, lightValue, waterValue, frequency, image, image.split("/").pop(), true);
            navigation.goBack();
        }
    }

    const createAlert = (msg) =>
        Alert.alert('Incomplete input', msg, [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);

    const getDataForLocations = () => {
        return locations.map(location => location.locationName).concat("none")
    }

    useEffect(() => {
        getAllLocationForUser();
    }, [])

    return (
        <View style={styles.appContainer}>
            <View style={styles.imageNameContainer}>
                {/*    image and name/species*/}

                <View style={styles.imageContainer}>
                    <View style={{overflow: "hidden"}}>
                        {image === "" ? <View style={styles.image}></View> :
                            <View style={styles.image}><Image source={{uri: image}} style={styles.imageStyle}/></View>}
                    </View>
                    {/*menu*/}

                    <View style={styles.menuContainer}>
                        <MenuProvider style={styles.menuProvider}>
                            <Menu style={styles.menu}>
                                <MenuTrigger customStyles={{triggerWrapper: styles.popup}}>
                                    <BigAdd/>
                                </MenuTrigger>

                                <MenuOptions style={styles.menuOptions}>
                                    <MenuOption onSelect={() => selectImage(false)} text="Take a photo" customStyles={{
                                        optionWrapper: styles.optionWrapper,
                                        optionText: styles.optionWrapper
                                    }}/>
                                    <View style={styles.divider}/>
                                    <MenuOption onSelect={() => selectImage(true)} text="Open gallery" customStyles={{
                                        optionWrapper: styles.optionWrapper,
                                        optionText: styles.optionWrapper
                                    }}/>
                                </MenuOptions>
                            </Menu>
                        </MenuProvider>
                    </View>

                    <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
                        <BackSvg/>
                    </Pressable>

                    <Pressable style={styles.saveButton} onPress={() => addNewPlant()}>
                        <SaveSvg/>
                    </Pressable>

                    <View style={styles.nameInputContainer}>
                        {/*<Text>Name</Text>*/}
                        <View style={styles.nameSpeciesContainer}>
                            <TextInput style={styles.nameInput} underlineColorAndroid={"transparent"}
                                       placeholder={"Enter Name"} placeholderTextColor={"black"} maxLength={10}
                                       value={plantName} onChangeText={(text) => setPlantName(text)}/>
                        </View>

                        <View style={styles.nameSpeciesContainer}>
                            <TextInput style={styles.speciesInput} underlineColorAndroid={"transparent"}
                                       placeholder={"enter species"} placeholderTextColor={"black"} maxLength={39}
                                       value={species} onChangeText={(text) => setSpecies(text)}/>
                        </View>
                    </View>
                </View>
            </View>


            {/*    DATA SECTION*/}
            <View style={styles.locationWaterLightContainer}>
                {/*    location light water*/}

                <View style={styles.dataContainer}>
                    {/*    location*/}

                    <SelectDropdown
                        buttonStyle={{width: "100%"}}
                        data={getDataForLocations()}
                        onSelect={(selectedItem, index) => {
                            if (selectedItem !== "none") {
                                let location = locations.filter(location => location.locationName === selectedItem)
                                setSelectedLocation(location[0].locationId)
                                setLightValue(location[0].light)
                                setWaterValue(location[0].water)
                            } else {
                                setSelectedLocation(null)
                                setLightValue(3)
                                setWaterValue(3)
                            }
                        }}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            return selectedItem
                        }}
                        rowTextForSelection={(item, index) => {
                            return item
                        }}/>
                </View>

                {/*    light*/}
                <View style={styles.dataContainer}>
                    <Text style={styles.dataText}>Light</Text>
                    <View style={styles.lightWaterIconContainer}>
                        {
                            [...Array(5).keys()].map(i => <Pressable onPress={() => setLightValue(i + 1)}>
                                {i < lightValue ? <SunFilledSvg/> : <SunEmptySvg/>}
                            </Pressable>)
                        }
                    </View>
                </View>

                {/*    water*/}
                <View style={styles.dataContainer}>
                    <Text style={styles.dataText}>Water</Text>
                    <View style={styles.lightWaterIconContainer}>
                        {
                            [...Array(5).keys()].map(i => <Pressable onPress={() => setWaterValue(i + 1)}>
                                {i < waterValue ? <DropletFilledSvg/> : <DropletEmptySvg/>}
                            </Pressable>)
                        }
                    </View>
                </View>


            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    // the whole app screen
    appContainer: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#fff"
    },

    imageNameContainer: {
        flex: 2,
        backgroundColor: "#fff",
        width: "100%",
        paddingBottom: 90,
    },

    locationWaterLightContainer: {
        flex: 2,
        backgroundColor: "#DFDFD9",
        width: "100%",
        padding: 15,
        alignItems: "center"
    },

    imageContainer: {
        height: 318,
        borderBottomRightRadius: 80,
        borderBottomLeftRadius: 80,
    },

    image: {
        width: "100%",
        height: "100%",
        borderBottomRightRadius: 80,
        borderBottomLeftRadius: 80,
        backgroundColor: "#fff",
        elevation: 10
    },

    imageStyle: {
        width: "100%",
        height: "100%",
        borderBottomRightRadius: 80,
        borderBottomLeftRadius: 80,
    },

    menuContainer: {
        position: "absolute",
        width: "100%",
        height: "100%",
    },

    menuProvider: {
        width: "100%",
        height: "100%",
        borderBottomRightRadius: 80,
        borderBottomLeftRadius: 80,
    },

    menu: {
        width: "100%",
        height: "100%",
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomRightRadius: 80,
        borderBottomLeftRadius: 80,
    },

    popup: {
        padding: 20,
    },


    optionWrapper: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",

        padding: 10,
        fontSize: 20,
    },

    divider: {
        width: "100%",
        backgroundColor: "lightgrey",
        height: 0.2,
    },


    backButton: {
        position: "absolute",
        top: 15,
        left: 15,
    },

    saveButton: {
        position: "absolute",
        top: 15,
        right: 15,
    },

    addButton: {
        position: "absolute",
        top: 318 / 2 - 20,
        left: Dimensions.get('window').width / 2 - 45,
        flexDirection: "row",
        gap: 10
    },

    nameInputContainer: {
        width: "80%",
        paddingHorizontal: "5%",
        borderRadius: 23,
        height: 86,
        backgroundColor: "#fff",
        position: "absolute",
        bottom: -43,
        alignSelf: 'center',
        justifyContent: "center",
        alignItems: "center",
        elevation: 10
    },

    nameSpeciesContainer: {
        width: "80%",
        justifyContent: "center",
        alignItems: "center",
    },


    nameInput: {
        textAlign: "center",
        fontSize: 36,
    },

    speciesInput: {
        textAlign: "center",
        fontSize: 14
    },

    dataContainer: {
        width: "80%",
        marginBottom: 32
    },

    dataText: {
        fontSize: 32,
        fontWeight: "bold"
    },


    lightWaterIconContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    }
})


export default AddPlantScreen;
