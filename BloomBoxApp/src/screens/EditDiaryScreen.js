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
import {DiaryContext} from "../context/DiaryContext";
import AddSvg from "../images/SVGs/Add";
import BackSvg from "../images/SVGs/BackButton";
import BigAdd from "../images/SVGs/BigAdd";
import {BASE_URL} from "../config";
import SaveSvg from "../images/SVGs/SaveButton";
import {AuthContext} from "../context/AuthContext";
import { Menu, MenuProvider, MenuTrigger, MenuOptions, MenuOption} from "react-native-popup-menu";


import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

//import {LocationContext} from "../context/LocationContext";

import BigEditSvg from "../images/SVGs/BigEdit";



const imgDir = FileSystem.documentDirectory + "images/"

const ensureDirExists = async () => {
    const dirInfo = await FileSystem.getInfoAsync(imgDir);
    if (!dirInfo.exists){
        await FileSystem.makeDirectoryAsync(imgDir, {intermediates: true});
    }
}

const DiaryScreen = ({route, navigation}) => {
    
    const {diary, diaryChanged} = route.params;
    //const {editDiary} = useContext(DiaryContext);
    const {userInfo} = useContext(AuthContext);
    
    // initial data
    const [title, setTitle] = useState(diary.title)
    const [date, setDate] = useState(new Date(Date.parse(diary.entryDate)))
    const [image, setImage] = useState(BASE_URL + "/images/download/" + userInfo.userId + "/diary/" + diary.image)
    const [description, setDescription] = useState("");
    
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
            setImage(result.assets[0].uri);
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
        } else {
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

            editDiary(diary, image.split("/").pop(), initImageName);
            // console.log("HELLO  - - - - - - - - -")
            diaryChanged(diary)
            navigation.goBack();
        }
    }
    
    
    const {getAllDiariesForPlant, diaries, addDiary, isLoadingDiary, editDiary} = useContext(DiaryContext);

    return(
        
        <View style={styles.appContainer}>
            
            <View style={styles.imageNameContainer}>
                {/*    image and name/species*/}

                <View style={styles.imageContainer}>
                    <View style={styles.image}>
                        <Image source={{uri: BASE_URL + "/images/download/" + userInfo.userId + "/diary/" + diary.image}} style={styles.imageStyle} />
                    </View>
                    {/* <Image style={styles.image} source={{uri: BASE_URL + "/images/download/" + userInfo.userId + "/diary/" + diary.image}} /> */}
                </View>
                
                <View style={styles.headerContainer}>
                    <View  style={styles.dateContainer} >
                        <Text style={styles.diaryDateText}>
                            {date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}.{date.getMonth()+1 < 10 ? "0" + (date.getMonth()+1) : date.getMonth()+1}.{date.getFullYear()}
                        </Text>
                    </View>

                    <View>
                        {/* <Text style={styles.diaryTitleText}>{diary.title}</Text> */}
                        <TextInput style={styles.titleInput} underlineColorAndroid={"transparent"} placeholder={"Enter Name"} placeholderTextColor={"black"} value={title} onChangeText={(text) => setTitle(text)}/>
                    </View>
                </View>
                

                {/* <View style={styles.diaryTextContainer}>
                    {/*{console.log(date.getUTCDay())}*/}
                    {/* <Text style={styles.diaryDateText}>{date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}.{date.getMonth()+1 < 10 ? "0" + (date.getMonth()+1) : date.getMonth()+1}.{date.getFullYear()}</Text>
                    <Text style={styles.diaryTitleText}>{diary.title}</Text>
                </View> 
                */}
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
            
            </View>
            
            
            
            
            
            
            <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
                <BackSvg/>
            </Pressable>
            
            {/* TODO: navigate to edit diary page */}
            <Pressable style={styles.editButton} onPress={() => edit()}>
                <SaveSvg/>
            </Pressable>
            
            {/* <View style={styles.addButton}>
                <Pressable  onPress={() => selectImage(true)}>
                    <BigAdd/>
                </Pressable>
                <Pressable  onPress={() => selectImage(false)}>
                    <BigAdd/>
                </Pressable>
                <Pressable  onPress={() => setImage(BASE_URL + "/images/download/" + userInfo.userId + "/plant/defaultPlant.jpg")}>
                    <BigAdd/>
                </Pressable>
            </View> */}
            
            
            <View style={styles.diaryEntryContainer}>
                <View style={styles.diaryEntry}>
                    <ScrollView style={styles.scrolledText}>
                        {/* <Text style={styles.diaryEntryText}>{diary.diaryContent}</Text> */}
                        <TextInput placeholder={diary.diaryContent} value={description} onChangeText={(text) => setDescription(text)} style={styles.descriptionInput} multiline={true}
                        />               
                    </ScrollView>
                </View>
                
            </View>
            
            
        </View>

    );
}

const styles = StyleSheet.create({
        
    // the whole app screen
    appContainer: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#F4F7F8",
        //backgroundColor: 'yellow',
    },

    imageNameContainer: {
        flex: 1,
        backgroundColor: "#fff",
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
        //backgroundColor: 'yellow'
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

    
    
    headerContainer: {
        width: "80%",
        paddingHorizontal: "5%",
        borderRadius: 23,

        height: 98,
        backgroundColor: "#fff",
        //position: "absolute",
        //bottom: -40,
        top: -48,
        //marginBottom: 10,

        alignSelf: 'center',
        justifyContent: "center",
        alignItems: "center",

        elevation: 10,
        //backgroundColor: 'pink',
    },
    
    dateContainer: {
        //backgroundColor: 'green',
    },
    
    diaryDateText: {
        fontSize: 20,
        fontWeight: "300",
        color: "#20201D",
        lineHeight: 35,
        
    },

    diaryTitleText: {
        
        textAlign: "center",
        fontSize: 48,
        fontWeight: "bold",
        lineHeight: 48,
        color: "#20201D"
    },
    
    titleInput: {
        marginTop: -8,
        textAlign: "center",
        fontSize: 36,
        // fontWeight: "bold"
    },
    
    scrolledText: {
        flex: 1,
    },
    
    diaryEntryContainer: {
        flex: 1,
        flexDirection: "column",
        width: "100%",
        //height: 800,
        //paddingTop: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#DFDFD9",
    },
    
    diaryEntry: {
        paddingTop: "8%",
        paddingBottom: "5%",
        paddingLeft: "13%",
        paddingRight: "13%",
        justifyContent: 'center',
        alignItems: 'center',
    },
    
    diaryEntryText: {
        //width: "70%",
        textAlign: 'justify',
        fontSize: 22,
        fontWeight: "300",

    },
    
    descriptionInput: {
        textAlign: 'justify',
        fontSize: 22,
        fontWeight: "300",
    },
    
        
})

export default DiaryScreen;