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
import {BASE_URL} from "../config";
import {AuthContext} from "../context/AuthContext";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";

const imgDir = FileSystem.documentDirectory + "images/"
const ensureDirExists = async () => {
    const dirInfo = await FileSystem.getInfoAsync(imgDir);
    if (!dirInfo.exists){
        await FileSystem.makeDirectoryAsync(imgDir, {intermediates: true});
    }
}

const EditLocationScreen = ({ navigation, route }) => {
    const {location} = route.params

    const {userInfo} = useContext(AuthContext);

    const [image, setImage] = useState(BASE_URL + "/images/download/" + userInfo.userId + "/location/" + location.locationImage)
    const [locationName, setLocationName] = useState(location.locationName)
    const [lightValue, setLightValue] = useState(location.light)
    const [waterValue, setWaterValue] = useState(location.water)


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

    const edit = async () => {
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

            // addLocation(locationName, lightValue, waterValue, image.split("/").pop(), image)
            // navigation.goBack();
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
                        <View style={styles.image}><Image source={{uri: image}} style={styles.imageStyle} /></View>
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


                    <Pressable style={styles.saveButton} onPress={() => edit()}>
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

export default EditLocationScreen;