import React, {useContext, useEffect, useState} from "react";
import {
    Button,
    Dimensions,
    FlatList,
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View
} from "react-native";

// SVGs
import AddSvg from "../images/SVGs/Add";
import BackSvg from "../images/SVGs/BackButton";
import BigAdd from "../images/SVGs/BigAdd";
import SaveSvg from "../images/SVGs/SaveButton";

// Contexts
import {BASE_URL} from "../config";
import {AuthContext} from "../context/AuthContext";
import {DiaryContext} from "../context/DiaryContext";

// Components
import { Menu, MenuProvider, MenuTrigger, MenuOptions, MenuOption} from "react-native-popup-menu";
import DatePickerComponent from "../components/DatePickerComponent";
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

const imgDir = FileSystem.documentDirectory + "images/"

const ensureDirExists = async () => {
    const dirInfo = await FileSystem.getInfoAsync(imgDir);
    if (!dirInfo.exists){
        await FileSystem.makeDirectoryAsync(imgDir, {intermediates: true});
    }
}

const DiaryScreen = ({route, navigation}) => {
    
    const {diary, diaryChanged} = route.params;
    const {userInfo} = useContext(AuthContext);
    
    // initial data
    const [title, setTitle] = useState(diary.title)
    const [date, setDate] = useState(new Date(Date.parse(diary.entryDate)))
    const [image, setImage] = useState(BASE_URL + "/images/download/" + userInfo.userId + "/diary/" + diary.image)
    const [description, setDescription] = useState(diary.diaryContent);
    
    const initImageName = diary.image;
    
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
            //setImage(result.assets[0].uri);
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

    
    const edit = async () => {
        if (title === ""){
            createAlert("Title cannot be empty!");
        } 
        else {
            console.log("Title: " + title)
            console.log("Date: " + date)
            console.log("Image: " + image.split("/").pop())

            // to delete from server
            console.log("OldImage: " + initImageName)

            // only change here in case of canceling
            diary.title = title;
            diary.entryDate = date;
            diary.image = image.split("/").pop();
            diary.diaryContent = description;

            editDiary(diary, image, image.split("/").pop(), initImageName);
            // console.log("HELLO  - - - - - - - - -")
            diaryChanged(diary)
            navigation.navigate("DiaryScreen", {diary});
        }
    }
    
    
    const {getAllDiariesForPlant, diaries, addDiary, isLoadingDiary, editDiary} = useContext(DiaryContext);

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
                                        <MenuOption onSelect={() => setImage(BASE_URL + "/images/download/" + userInfo.userId + "/plant/defaultPlant.jpg")} text="Default" customStyles={{optionWrapper: styles.optionWrapper, optionText: styles.optionWrapper}} />
                                    </MenuOptions>
                                </Menu>
                            </MenuProvider>
                        </View>
                        
                        {/* pressable that edits the current diary entry */}
                        <Pressable style={styles.editButton} onPress={() => edit()}>
                            <SaveSvg/>
                        </Pressable>
                        
                        {/* go back */}
                        <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
                            <BackSvg/>
                        </Pressable>
                        
                        <View style={styles.nameInputContainer}>
                            <View style={styles.nameSpeciesContainer}>
                                <DatePickerComponent/>
                                <TextInput style={styles.nameInput} underlineColorAndroid={"transparent"} placeholder={"Enter Name"} maxLength={18} placeholderTextColor={"black"} value={title} onChangeText={(text) => setTitle(text)}/>
                            </View>
                        </View>
                    
                    </View>
                </View>


                {/* Diary entry description */}
                <View style={styles.descriptionContainer}>
                    <View style={styles.descriptionInputContainer}>
                        <TextInput placeholder={diary.diaryContent} value={description} onChangeText={(text) => setDescription(text)} style={styles.descriptionInput} multiline={true}/>               
                    </View>
                </View>
                
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
        
    // app screen
    appContainer: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#fff"
    },

    
    // IMAGE AND TITLE CARD
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
        elevation: 10,
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

    editButton: {
        position: "absolute",
        top: 15,
        right: 15,
    },
    
    
    // POPUP MENU
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
        width:"100%", 
        height: "100%",
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomRightRadius: 80,
        borderBottomLeftRadius: 80,
    },
    
    popup: {
        padding: 20,
    },
    
    divider: {
        width: "100%",
        backgroundColor: "lightgrey",
        height: 0.2,
    },

    optionWrapper: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        
        padding: 10,
        fontSize: 20,
    },
    
    
    // TITLE CARD
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
    },

    nameInput: {
        textAlign: "center",
        fontSize: 36,
    },
    
    
    // DECRIPTION BOX
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
        fontWeight: "300",
    },
})

export default DiaryScreen;