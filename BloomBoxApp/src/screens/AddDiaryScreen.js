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

const imgDir = FileSystem.documentDirectory + "images/"

const ensureDirExists = async () => {
    const dirInfo = await FileSystem.getInfoAsync(imgDir);
    if (!dirInfo.exists){
        await FileSystem.makeDirectoryAsync(imgDir, {intermediates: true});
    }
}

const AddDiaryScreen = ({navigation}) => {
    const {addDiary} = useContext(DiaryContext);

    const [title, setTitle] = useState("");
    const [image, setImage] = useState("")
    const [date, setDate] = useState(null)
    const [description, setDescription] = useState("")

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
        if (plantName === ""){
            createAlert("Add Name");
        } else if (lightValue === 0){
            createAlert("Select a light value")
        } else if (waterValue === 0){
            createAlert("Select a water value")
        } else {
            addPlant(selectedLocation, plantName, species, lightValue, waterValue, image,  image.split("/").pop());
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

    const getDataForLocations = () => {
        return locations.map(location => location.locationName).concat("none")
    }


    return(
        <ScrollView>
        <View style={styles.appContainer}>
            <View style={styles.imageNameContainer}>
                {/*    image and name/species*/}

                <View style={styles.imageContainer}>
                    <View style={{overflow: "hidden"}}>
                        {image === "" ? <View style={styles.image}></View> : <View style={styles.image}><Image source={{uri: image}} style={styles.imageStyle} /></View>}
                    </View>
                    {/*menu*/}
                    <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
                        <BackSvg/>
                    </Pressable>

                    <View style={styles.addButton}>
                        <Pressable  onPress={() => selectImage(true)}>
                            <BigAdd/>
                        </Pressable>
                        <Pressable  onPress={() => selectImage(false)}>
                            <BigAdd/>
                        </Pressable>
                    </View>


                    <Pressable style={styles.saveButton} onPress={() => console.log("ADD DIARY BUTTON PRESS!")}>
                        <SaveSvg/>
                    </Pressable>

                    <View style={styles.nameInputContainer}>
                        <View  style={styles.nameSpeciesContainer} >
                            <TextInput style={styles.nameInput} underlineColorAndroid={"transparent"} placeholder={"Enter Name"} placeholderTextColor={"black"} value={title} onChangeText={(text) => setTitle(text)}/>
                        </View>
                    </View>


                </View>

            </View>


            {/*    DATA SECTION*/}
            <View style={styles.dateDescriptionContainer}>
                <View style={{marginBottom: 20, backgroundColor:"yellow"}}><Text>test</Text></View>
                <View style={{flex: 1, backgroundColor:"blue"}}><Text>test2</Text></View>
                {/*/!*    location light water*!/*/}
                {/*/!*    light*!/*/}
                {/*<View style={styles.dataContainer}>*/}
                {/*    <Text style={styles.dataText}>Date</Text>*/}
                {/*</View>*/}

                {/*/!*    water*!/*/}
                {/*<View style={styles.dataContainer}>*/}
                {/*    <Text style={styles.dataText}>Description</Text>*/}
                {/*    <View style={{backgroundColor: "yellow", height: "100%"}}>*/}
                {/*        <TextInput multiline={true} placeholder={"Enter diary entry description..."} placeholderTextColor={"black"} value={description} onChangeText={(text) => setDescription(text)}/>*/}
                {/*    </View>*/}
                {/*</View>*/}


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
        backgroundColor: "red",
        width: "100%",
        paddingBottom: 90,
    },

    dateDescriptionContainer: {
        flex: 2,
        backgroundColor: "green",
        width: "100%",
        height: 500,
        padding: 15,
        // alignItems: "center",
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

    addButton: {
        position: "absolute",
        top: 318 / 2 - 20,
        left: Dimensions.get('window').width / 2 - 45,
        // backgroundColor: "yellow",
        flexDirection: "row",
        gap: 10
    },

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

    speciesInput: {
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