import {Alert, Dimensions, Image, Pressable, StyleSheet, Text, TextInput, View} from "react-native";
import BarsSvg from "../images/SVGs/Bars";
import AddSvg from "../images/SVGs/Add";
import React, {useContext, useState} from "react";
import BackSvg from "../images/SVGs/BackButton";
import BigAdd from "../images/SVGs/BigAdd";
import SaveSvg from "../images/SVGs/SaveButton";
import SunFilledSvg from "../images/SVGs/SunFilled";
import SunEmptySvg from "../images/SVGs/SunEmpty";
import DropletFilledSvg from "../images/SVGs/DropletFilled";
import DropletEmptySvg from "../images/SVGs/DropletEmpty";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import {LocationContext} from "../context/LocationContext";
import { Menu, MenuProvider, MenuTrigger, MenuOptions, MenuOption} from "react-native-popup-menu";


const imgDir = FileSystem.documentDirectory + "images/"
const ensureDirExists = async () => {
    const dirInfo = await FileSystem.getInfoAsync(imgDir);
    if (!dirInfo.exists){
        await FileSystem.makeDirectoryAsync(imgDir, {intermediates: true});
    }
}
const AddLocationScreen = ({ navigation }) => {
    const [image, setImage] = useState("")
    const [locationName, setLocationName] = useState("")
    const [lightValue, setLightValue] = useState(0)
    const [waterValue, setWaterValue] = useState(0)

    const {addLocation} = useContext(LocationContext);

    const selectImage = async (useLibrary) => {
        let result;
        if (useLibrary){
            result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1,1],
                quality: 0.75
            });
        } else {
            await ImagePicker.requestCameraPermissionsAsync();
            result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1,1],
                quality: 0.75
            });
        }

        // do something with the image here
        if (!result.canceled){
            console.log(result.assets[0].uri)
            saveImage(result.assets[0].uri);
        }
    }

    const saveImage = async (imageUri) => {
        await ensureDirExists();
        const filename = new Date().getTime() + ".jpg";
        const dest = imgDir + filename;
        await FileSystem.copyAsync({from: imageUri, to: dest});
        setImage(dest);
        // console.log("dest coming:")
        // console.log(dest);
    }

    const addNewLocation = async () => {
        if (locationName === ""){
            createAlert("Add Name");
        } else if (lightValue === 0){
            createAlert("Select a light value")
        } else if (waterValue === 0){
            createAlert("Select a water value")
        } else {
            console.log("Name: " + locationName)
            console.log("Light: " + lightValue)
            console.log("Water: " + waterValue)
            console.log("Image: " + image)

            addLocation(locationName, lightValue, waterValue, image.split("/").pop(), image)
            navigation.goBack();
        }
    }

    const createAlert = (msg) =>
        Alert.alert('Incomplete input', msg, [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);

    return (
        <View style={styles.appContainer}>
            <View style={styles.imageNameContainer}>
                <View style={styles.imageContainer}>

                    <View style={{overflow: "hidden"}}>
                        {image === "" ? <View style={styles.image}></View> : <View style={styles.image}><Image source={{uri: image}} style={styles.imageStyle} /></View>}
                    </View>

                    {/*menu*/}
                    

                    <View style={styles.menuContainer}>
                        <MenuProvider style={styles.menuProvider}> 
                            <Menu style={styles.menu}>
                                <MenuTrigger customStyles={{triggerWrapper: styles.popup}}>
                                    <BigAdd/>
                                </MenuTrigger>
                                
                                <MenuOptions style={styles.menuOptions}>
                                    <MenuOption onSelect={() => selectImage(false)} text="Take a photo" customStyles={{optionWrapper: styles.optionWrapper, optionText: styles.optionWrapper}} />
                                    <View style={styles.divider}/>
                                    <MenuOption onSelect={() => selectImage(true)} text="Open gallery" customStyles={{optionWrapper: styles.optionWrapper, optionText: styles.optionWrapper}} />
                                </MenuOptions>
                            </Menu>
                        </MenuProvider>
                    </View>
                    
                    <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
                        <BackSvg/>
                    </Pressable>
                    
                    
                    {/* <View style={styles.addButton}>
                        <Pressable  onPress={() => selectImage(true)}>
                            <BigAdd/>
                        </Pressable>
                        <Pressable  onPress={() => selectImage(false)}>
                            <BigAdd/>
                        </Pressable>
                    </View> */}


                    <Pressable style={styles.saveButton} onPress={() => addNewLocation()}>
                        <SaveSvg/>
                    </Pressable>

                    <View style={styles.nameInputContainer}>
                        <View style={styles.nameContainer} >
                            <TextInput style={styles.nameInput} underlineColorAndroid={"transparent"} placeholder={"Enter Name"} placeholderTextColor={"black"} value={locationName} onChangeText={(text) => setLocationName(text)}/>
                        </View>
                    </View>
                </View>
            </View>


            <View style={styles.locationWaterLightContainer}>

                <View style={styles.dataContainer}>
                    <Text style={styles.dataText}>Light</Text>
                    <View style={styles.lightWaterIconContainer}>
                        {
                            [...Array(5).keys()].map( i =><Pressable onPress={() => setLightValue(i+1)}>
                                {i < lightValue ? <SunFilledSvg/> : <SunEmptySvg/>}
                            </Pressable>)
                        }
                    </View>
                </View>

                <View style={styles.dataContainer}>
                    <Text style={styles.dataText}>Water</Text>
                    <View style={styles.lightWaterIconContainer}>
                        {
                            [...Array(5).keys()].map( i =><Pressable onPress={() => setWaterValue(i+1)}>
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
    appContainer: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        // padding: 15,
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
        //backgroundColor: "yellow",
        position: "absolute",
        width: "100%",
        height: "100%",
    },
    
    menuProvider: {
        //backgroundColor: "pink",
        width: "100%",
        height: "100%",
        borderBottomRightRadius: 80,
        borderBottomLeftRadius: 80,
    },
    
    menu: {
        //backgroundColor: "green",
        width:"100%", 
        height: "100%",
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomRightRadius: 80,
        borderBottomLeftRadius: 80,
    },
    
    // clickable
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

    // addButton: {
    //     position: "absolute",
    //     top: 318 / 2 - 20,
    //     left: Dimensions.get('window').width / 2 - 45,
    //     flexDirection: "row",
    //     gap: 10
    // },

    nameInputContainer: {
        width: "80%",
        paddingHorizontal: "5%",
        borderRadius: 23,

        height: 86,
        backgroundColor:"#fff",
        position: "absolute",
        bottom: -43 ,

        alignSelf: 'center',
        justifyContent: "center",
        alignItems: "center",

        elevation: 10
    },

    nameSpeciesContainer: {
        width: "80%",
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: "green"
    },

    nameInput: {
        textAlign: "center",
        fontSize: 36,
        // fontWeight: "bold"
    },

    dataContainer: {
        width: "80%",
        // backgroundColor: "blue",
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

export default AddLocationScreen;