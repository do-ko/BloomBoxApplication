import React, {useContext, useEffect, useLayoutEffect, useRef, useState} from "react";
import {
    Alert,
    Button,
    Dimensions,
    Image,
    Pressable,
    SafeAreaView, ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View
} from "react-native";
;
import { Menu, MenuProvider, MenuTrigger, MenuOptions, MenuOption} from "react-native-popup-menu";


import {PlantContext} from "../context/PlantContext";
import {LocationContext} from "../context/LocationContext";
import {SelectList} from "react-native-dropdown-select-list/index";
import SelectDropdown from 'react-native-select-dropdown'
import Gradient from "../images/SVGs/Gradient";
import GradientSvg from "../images/SVGs/Gradient";
import BarsSvg from "../images/SVGs/Bars";
import BackSvg from "../images/SVGs/BackButton";
import SaveSvg from "../images/SVGs/SaveButton";
import AddSvg from "../images/SVGs/Add";
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
import {DiaryContext} from "../context/DiaryContext";

import DatePickerComponent from "../components/DatePickerComponent";

const imgDir = FileSystem.documentDirectory + "images/"

const ensureDirExists = async () => {
    const dirInfo = await FileSystem.getInfoAsync(imgDir);
    if (!dirInfo.exists){
        await FileSystem.makeDirectoryAsync(imgDir, {intermediates: true});
    }
}

const AddDiaryScreen = ({route, navigation}) => {
    const {addDiary} = useContext(DiaryContext);
    
    const {plant} = route.params;
    const {userInfo} = useContext(AuthContext);

    
    const [title, setTitle] = useState("No Title");
    const [image, setImage] = useState("");
    const [date, setDate] = useState(new Date());
    const [description, setDescription] = useState("No Description");
    
    const [open, setOpen] = useState(false);

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
            // setImage(result.assets[0].uri);
        }
    };

    const saveImage = async (imageUri) => {
        await ensureDirExists();
        const filename = new Date().getTime() + ".jpg";
        const dest = imgDir + filename;
        await FileSystem.copyAsync({from: imageUri, to: dest});
        setImage(dest);
        console.log("dest coming:")
        console.log(dest);
    }

    const addNewDiary = async () => {
        if (title === ""){
            createAlert("Title cannot be empty.");
        } else {
            //addPlant(selectedLocation, plantName, species, lightValue, waterValue, image,  image.split("/").pop());
            addDiary(plant.plantId, title, date, image, image.split("/").pop(), description);
            navigation.goBack();
        }

        // console.log("Name: " + plantName)
        // console.log("Species: " + species)
        // console.log("Location id: " + selectedLocation)
        // console.log("Light: " + lightValue)
        // console.log("Water: " + waterValue)
        // console.log("Image: " + image)
    }

    const createAlert = (msg) =>
        Alert.alert('Incomplete input', msg, [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);


    return(
        <ScrollView>
            <View style={styles.appContainer}>
                <View style={styles.imageNameContainer}>

                    <View style={styles.imageContainer}>
                        {/* image in the frame */}
                        <View style={{overflow: "hidden"}}>
                            {image === "" ? <View style={styles.image}></View> : <View style={styles.image}><Image source={{uri: image}} style={styles.imageStyle} /></View>}
                        </View>
                        
                        {/* pop-up menu for photo adding */}
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
                                        <MenuOption onSelect={() => setImage(BASE_URL + "/images/download/" + userInfo.userId + "/diary/defaultDiary.jpg")} text="Default" customStyles={{optionWrapper: styles.optionWrapper, optionText: styles.optionWrapper}} />
                                    </MenuOptions>
                                </Menu>
                            </MenuProvider>
                        </View>


                        <Pressable style={styles.saveButton} onPress={addNewDiary}>
                            <SaveSvg/>
                        </Pressable>

                        <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
                            <BackSvg/>
                        </Pressable>

                        <View style={styles.nameInputContainer}>
                            <View  style={styles.nameSpeciesContainer} >
                                <DatePickerComponent/>
                                <TextInput style={styles.nameInput} underlineColorAndroid={"transparent"} placeholder={"Enter title"} maxLength={18} placeholderTextColor={"black"} value={title} onChangeText={(text) => setTitle(text)}/>
                            </View>
                        </View>


                    </View>

                </View>


                {/* Diary entry description */}
                <View style={styles.descriptionContainer}>
                    <View style={styles.descriptionInputContainer}>
                        <TextInput style={styles.descriptionInput} multiline={true} underlineColorAndroid={"transparent"} placeholder={"Enter description"} maxLength={500} placeholderTextColor={"black"} value={description} onChangeText={(text) => setDescription(text)}/>
                    </View>
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
        //backgroundColor: "red",
        width: "100%",
        paddingBottom: 90,
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
        // backgroundColor: "yellow",
        // padding: 20
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
    //     // backgroundColor: "yellow",
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
    
    descriptionContainer: {
        flex: 2,
        flexDirection: 'column',
        backgroundColor: '#DFDFD9',
        width: "100%",
        height: 500,
        paddingTop: 20,
        paddingBottom: 20,
        alignItems: "center",
    },
    
    descriptionInputContainer: {
        flex: 1,
        width: "80%",
    },
    
    descriptionInput: {
        textAlign: 'justify',
        fontSize: 22,
    },

    speciesInput: {
        flex: 1,
        textAlign: "center",
        fontSize: 14
    },

    dataContainer: {
        width: "80%",
        backgroundColor: "blue",
        marginBottom: 32,
        // gap: 20
    },

    dataText: {
        fontSize: 32,
        fontWeight: "bold"
    },
})


export default AddDiaryScreen;