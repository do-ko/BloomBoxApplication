import React, {useContext, useEffect, useLayoutEffect, useRef, useState} from "react";
import {Button, Dimensions, Image, Pressable, StyleSheet, Text, TextInput, View} from "react-native";
import {PlantContext} from "../context/PlantContext";
import {LocationContext} from "../context/LocationContext";
import {SelectList} from "react-native-dropdown-select-list/index";
import SelectDropdown from 'react-native-select-dropdown'
import Gradient from "../images/Gradient";
import GradientSvg from "../images/Gradient";
import BarsSvg from "../images/Bars";
import BackSvg from "../images/BackButton";
import SaveSvg from "../images/SaveButton";
import AddSvg from "../images/Add";
import BigAdd from "../images/BigAdd";

// IMAGE IMPORTS
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import {BASE_URL} from "../config";
import {AuthContext} from "../context/AuthContext";

const imgDir = FileSystem.documentDirectory + "images/"

const ensureDirExists = async () => {
    const dirInfo = await FileSystem.getInfoAsync(imgDir);
    if (!dirInfo.exists){
        await FileSystem.makeDirectoryAsync(imgDir, {intermediates: true});
    }
}

const AddPlantScreen = ({navigation}) => {
    const {userInfo} = useContext(AuthContext);
    const {addPlant} = useContext(PlantContext);

    const {getAllLocationForUser, locations, isLoading} = useContext(LocationContext);
    const [selectedLocation, setSelectedLocation] = useState("");

    const [plantName, setPlantName] = useState("");

    const [image, setImage] = useState("")

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

    const addNewPlant = async () => {
        // if (image !== ""){
        //     await FileSystem.uploadAsync(BASE_URL + '/images/upload/' + userInfo.userId + "/plant", image, {
        //         httpMethod: "POST",
        //         uploadType: FileSystem.FileSystemUploadType.MULTIPART,
        //         fieldName: 'file'
        //     })
        // }

        addPlant(1, plantName, "description", 3, 3, image,  image.split("/").pop())
    }


    useEffect(() => {
        getAllLocationForUser();
    }, [])

    return(
        <View style={styles.appContainer}>
            <View style={styles.imageNameContainer}>
            {/*    image and name/species*/}
                <View style={styles.imageContainer}>
                    {image === "" ? <></> : <Image source={{uri: image}} style={styles.imageStyle} />}
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


                    <Pressable style={styles.saveButton} onPress={() => addNewPlant()}>
                        <SaveSvg/>
                    </Pressable>

                    <View style={styles.nameInputContainer}>
                        {/*<Text>Name</Text>*/}
                        <View  style={styles.nameContainer} >
                            <TextInput style={styles.nameInput} underlineColorAndroid={"transparent"} placeholder={"Enter Name"} placeholderTextColor={"black"} value={plantName} onChangeText={(text) => setPlantName(text)}/>
                        </View>

                        <Text>Species</Text>
                    </View>

                </View>
            </View>
            <View style={styles.locationWaterLightContainer}>
            {/*    location light water*/}
            </View>
        </View>


        // <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
        //
        //
        //     {/*/!*Location Select*!/*/}
        //     {/*<SelectDropdown*/}
        //     {/*    buttonStyle={{backgroundColor:"red"}}*/}
        //     {/*    data={locations.map(location => location.locationName)}*/}
        //     {/*    onSelect={(selectedItem, index) => {*/}
        //     {/*        console.log(selectedItem, index)*/}
        //     {/*        let location = locations.filter(location =>location.locationName === selectedItem)*/}
        //     {/*        setSelectedLocation(location[0].locationId)*/}
        //     {/*    }}*/}
        //     {/*    buttonTextAfterSelection={(selectedItem, index) => {*/}
        //     {/*        // text represented after item is selected*/}
        //     {/*        // if data array is an array of objects then return selectedItem.property to render after item is selected*/}
        //     {/*        return selectedItem*/}
        //     {/*    }}*/}
        //     {/*    rowTextForSelection={(item, index) => {*/}
        //     {/*        // text represented for each item in dropdown*/}
        //     {/*        // if data array is an array of objects then return item.property to represent item in dropdown*/}
        //     {/*        return item*/}
        //     {/*    }}*/}
        //
        //     />
        //
        //     <Button title={"ADD TEST"} onPress={()=>addPlant(1, "Name", "description", 3, 3, "url")}/>
        //
        // </View>
    );
}

const styles = StyleSheet.create({
    // the whole app screen
    appContainer: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        // padding: 15,
        // backgroundColor: "#fff"
        backgroundColor: "pink"
    },

    imageNameContainer: {
        flex: 2,
        backgroundColor: "blue",
        width: "100%",
        paddingBottom: 50
    },

    locationWaterLightContainer: {
        flex: 2,
        backgroundColor: "green",
        width: "100%"
    },

    imageContainer: {
        backgroundColor: "red",
        height: 318,
        borderBottomRightRadius: 80,
        borderBottomLeftRadius: 80,
    },

    imageStyle: {
        width: "100%",
        height: "100%",
        borderBottomRightRadius: 80,
        borderBottomLeftRadius: 80
    },



    backButton: {
        position: "absolute",
        top: 15,
        left: 15,
        backgroundColor: "yellow"
    },

    saveButton: {
        position: "absolute",
        top: 15,
        right: 15,
        backgroundColor: "yellow",
        padding: 20
    },

    addButton: {
        position: "absolute",
        top: 318 / 2 - 20,
        left: Dimensions.get('window').width / 2 - 45,
        backgroundColor: "yellow",
        flexDirection: "row",
        gap: 10
    },

    nameInputContainer: {
        width: "80%",
        paddingHorizontal: "5%",
        borderRadius: 23,

        height: 86,
        backgroundColor:"yellow",
        position: "absolute",
        bottom: -43 ,

        alignSelf: 'center',
        justifyContent: "center",
        alignItems: "center"
    },

    nameContainer: {
        width: "80%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "green"
    },

    nameInput: {
        textAlign: "center",
        fontSize: 36,
        // fontWeight: "bold"
    },





    header: {
        // backgroundColor: "red",
        // height: "20%",
        width: "100%",
        flex: 0,
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "flex-end",
        paddingHorizontal: 20
        // gap: 20
    },

    headerTextContainer: {
        // backgroundColor: "yellow",
        // width: "100%"
    },

    headerText: {
        fontSize: 40,
        fontWeight: "bold",
        textTransform: "uppercase",
    },

    plantImage: {
        // backgroundColor: "blue",
        // marginRight: "10%",
        // height: 87
    },

    searchContainer: {
        backgroundColor: "#20201D",
        height: 81,
        width: "100%",
        borderRadius: 23,
        flex: 1,
        justifyContent: "space-between",
        paddingHorizontal: 20,
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "nowrap"
    },

    searchBar: {
        height: "50%",
        backgroundColor: "white",
        borderRadius: 23,
        width: "65%",
        justifyContent: "flex-start",
        paddingHorizontal: 10,
        flexDirection: "row",
        // alignItems
        alignItems: "center"
    },

    searchInput: {
        flex: 1
    },

    searchButton: {
        backgroundColor: "#5B6E4E",
        height: 40,
        width: 40,
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "center"
    },

    plantsContainer: {
        // backgroundColor: "blue",
        height: "100%",
        width: "100%",
        flex: 6,
        marginTop: 20
    },

    itemInvisible: {
        backgroundColor: "transparent",
        height: (Dimensions.get('window').width / 2) - 30,
        margin: 10,
        flex: 1,
    }

    // // container for header texts and icons
    // headerContainer: {
    //     width: "60%",
    //     //height: "30%",
    //     textAlign: "left",
    //     //fontFamily: "calibri",
    // },
    //
    // headerText1: {
    //     marginTop: 50,
    //     fontSize: 32,
    //     fontWeight: "700",
    //     letterSpacing: 1,
    // },
    //
    // headerText2: {
    //     marginTop: -15,
    //     fontSize: 32,
    //     fontWeight: "700",
    //     letterSpacing: 1,
    // },
    //
    // barContainer: {
    //     flexDirection: "row",
    //     alignItems: "center",
    //     width: "80%",
    //     height: "7%",
    //     backgroundColor: "#20201D",
    //     borderRadius: 20,
    //     gap: 5
    // },
    //
    // searchBarContainer: {
    //     flexDirection: "row",
    //     flex: 1,
    //     alignItems: "center",
    // },
    //
    // searchBarInput: {
    //     marginHorizontal: "5%",
    //     padding: 5,
    //     paddingLeft: 40,
    //     width: "85%",
    //     height: 32,
    //     backgroundColor: "#ffffff",
    //     borderRadius: 25,
    //     fontSize: 16,
    // },
    //
    // magnifyingGlassIcon: {
    //     width: 20,
    //     height: 20,
    //     //position: "absolute",
    //     left: -250,
    // },
    //
    // pressableAddPlantButton: {},
    //
    // addPlantButton: {
    //     left: -20,
    // },
    //
    // leftLine: {
    //     backgroundColor: "#DFDFD9",
    //     width: 10,
    //     height: "16.5%",
    //     position: "absolute",
    //     left: "15%",
    // },
    //
    // rightLine: {
    //     backgroundColor: "#DFDFD9",
    //     width: 10,
    //     height: "16.5%",
    //     position: "absolute",
    //     right: "15%",
    // },
    //
    // plant1Image: {
    //     position: "absolute",
    //     width: 65,
    //     top: "6%",
    //     left: "64%",
    // },
    //
    // drawerIcon: {
    //     position: "absolute",
    //     left: "3%",
    //     top: "5%",
    // },
})


export default AddPlantScreen;