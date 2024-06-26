import React, {useContext, useEffect, useState} from "react";
import {Alert, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View} from "react-native";
import {PlantContext} from "../context/PlantContext";
import {LocationContext} from "../context/LocationContext";
import SelectDropdown from 'react-native-select-dropdown'
import BackSvg from "../images/SVGs/BackButton";
import SaveSvg from "../images/SVGs/SaveButton";
import BigAdd from "../images/SVGs/BigAdd";

// IMAGE IMPORTS
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import {BASE_URL} from "../config";
import {AuthContext} from "../context/AuthContext";
import SunFilledSvg from "../images/SVGs/SunFilled";
import SunEmptySvg from "../images/SVGs/SunEmpty";
import DropletFilledSvg from "../images/SVGs/DropletFilled";
import DropletEmptySvg from "../images/SVGs/DropletEmpty";

import {Menu, MenuOption, MenuOptions, MenuProvider, MenuTrigger} from "react-native-popup-menu";


const imgDir = FileSystem.documentDirectory + "images/"

const ensureDirExists = async () => {
    const dirInfo = await FileSystem.getInfoAsync(imgDir);
    if (!dirInfo.exists) {
        await FileSystem.makeDirectoryAsync(imgDir, {intermediates: true});
    }
}

const EditPlantScreen = ({route, navigation}) => {
    const {plant} = route.params;
    const {editPlant, deletePlant} = useContext(PlantContext);
    const {userInfo} = useContext(AuthContext);
    const {getAllLocationForUser, locations} = useContext(LocationContext);

    const [plantName, setPlantName] = useState(plant.plantName);
    const [species, setSpecies] = useState(plant.species)
    const [selectedLocationId, setSelectedLocationId] = useState(plant.locationId);
    const [selectedLocation, setSelectedLocation] = useState(plant.locationId === null ? locations.filter(loc => loc.locationId === plant.locationId) : {
        locationName: "none",
        locationId: null
    })
    const [image, setImage] = useState(BASE_URL + "/images/download/" + userInfo.userId + "/plant/" + plant.image)
    const [lightValue, setLightValue] = useState(plant.light)
    const [waterValue, setWaterValue] = useState(plant.water)
    const initImageName = plant.image

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

    const edit = async () => {
        if (plantName === "") {
            createAlert("Add Name");
        } else if (selectedLocationId === "") {
            createAlert("Select a location")
        } else if (lightValue === 0) {
            createAlert("Select a light value")
        } else if (waterValue === 0) {
            createAlert("Select a water value")
        } else {
            plant.locationId = selectedLocationId;
            plant.plantName = plantName;
            plant.light = lightValue;
            plant.water = waterValue;
            plant.species = species;
            plant.frequency = 14 - waterValue - lightValue;
            plant.image = image.split("/").pop();
            editPlant(plant, image, initImageName);
            navigation.goBack();
        }


    }

    const deletePl = () => {
        deletePlant(plant.plantId, plant.image)
        navigation.navigate("GardenScreen")
    }

    const createAlert = (msg) =>
        Alert.alert('Incomplete input', msg, [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);


    useEffect(() => {
        getAllLocationForUser();
    }, [])

    useEffect(() => {
        if (plant.locationId) {
            setSelectedLocation(locations.filter(location => location.locationId === plant.locationId)[0]);
        }

    }, [locations])

    return (
        <ScrollView>
            <View style={styles.appContainer}>
                <View style={styles.imageNameContainer}>
                    {/*    image and name/species*/}

                    <View style={styles.imageContainer}>
                        <View style={{overflow: "hidden"}}>
                            {image === "" ? <View style={styles.image}></View> :
                                <View style={styles.image}><Image source={{uri: image}}
                                                                  style={styles.imageStyle}/></View>}
                        </View>

                        {/*menu*/}
                        <View style={styles.menuContainer}>
                            <MenuProvider style={styles.menuProvider}>
                                <Menu style={styles.menu}>
                                    <MenuTrigger customStyles={{triggerWrapper: styles.popup}}>
                                        <BigAdd/>
                                    </MenuTrigger>

                                    <MenuOptions style={styles.menuOptions}>
                                        <MenuOption onSelect={() => selectImage(false)} text="Take a photo"
                                                    customStyles={{
                                                        optionWrapper: styles.optionWrapper,
                                                        optionText: styles.optionWrapper
                                                    }}/>
                                        <View style={styles.divider}/>
                                        <MenuOption onSelect={() => selectImage(true)} text="Open gallery"
                                                    customStyles={{
                                                        optionWrapper: styles.optionWrapper,
                                                        optionText: styles.optionWrapper
                                                    }}/>
                                        <MenuOption
                                            onSelect={() => setImage(BASE_URL + "/images/download/" + userInfo.userId + "/plant/defaultPlant.jpg")}
                                            text="Default" customStyles={{
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

                        <Pressable style={styles.saveButton} onPress={() => edit()}>
                            <SaveSvg/>
                        </Pressable>

                        <View style={styles.nameInputContainer}>
                            <View style={styles.nameSpeciesContainer}>
                                <TextInput style={styles.nameInput} underlineColorAndroid={"transparent"}
                                           placeholder={"Enter Name"} maxLength={10} placeholderTextColor={"black"}
                                           value={plantName} onChangeText={(text) => setPlantName(text)}/>
                            </View>

                            <View style={styles.nameSpeciesContainer}>
                                <TextInput style={styles.speciesInput} underlineColorAndroid={"transparent"}
                                           placeholder={"enter species"} maxLength={39} placeholderTextColor={"black"}
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
                            data={locations.concat({locationName: "none", locationId: null})}
                            defaultButtonText={"select location..."}
                            defaultValue={selectedLocation}
                            onSelect={(selectedItem, index) => {
                                if (selectedItem.locationName !== "none") {
                                    setSelectedLocationId(selectedItem.locationId)
                                    setLightValue(selectedItem.light)
                                    setWaterValue(selectedItem.water)
                                } else {
                                    setSelectedLocationId(null)
                                    setLightValue(3)
                                    setWaterValue(3)
                                }
                            }}
                            buttonTextAfterSelection={(selectedItem, index) => {
                                return selectedItem.locationName
                            }}
                            rowTextForSelection={(item, index) => {
                                return item.locationName
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

                    <Pressable style={({pressed}) => [
                        {
                            opacity: pressed
                                ? 0.5
                                : 1,
                            backgroundColor: '#5B6E4E'
                        },
                        styles.deleteButton
                    ]} onPress={() => deletePl()}>
                        <Text style={styles.deleteText}>DELETE</Text>
                    </Pressable>

                </View>
            </View>

        </ScrollView>

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
    },

    deleteButton: {
        backgroundColor: "#5B6E4E",
        borderRadius: 23,
        paddingHorizontal: 25,
        paddingVertical: 5,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20
    },

    deleteText: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#fff",
        letterSpacing: 3,
        textAlign: "center"
    }
})


export default EditPlantScreen;