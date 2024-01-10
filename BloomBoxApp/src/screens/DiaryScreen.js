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

import {LocationContext} from "../context/LocationContext";

import BigEditSvg from "../images/SVGs/BigEdit";


const DiaryScreen = ({route, navigation}) => {
    
    const {diary} = route.params;
    const {userInfo} = useContext(AuthContext);
    const [date, setDate] = useState(new Date(Date.parse(diary.entryDate)))
    //const {getAllDiariesForPlant, diaries, addDiary, isLoadingDiary} = useContext(DiaryContext);
    //const {getAllLocationForUser, locations, isLoading} = useContext(LocationContext)
    
    
    const diaryChanged = (diary)=>{
        //   console.log("plant changed2: ",plant)
    }
    
    return(
        
        <View style={styles.appContainer}>
            
            <View style={styles.imageTitleContainer}>
                {/*    image and name/species*/}

                <View style={styles.imageContainer}>
                    <Image style={styles.imageStyle} source={{uri: BASE_URL + "/images/download/" + userInfo.userId + "/diary/" + diary.image}} />
                </View>
                
                <View style={styles.headerContainer}>
                    <View  style={styles.dateContainer} >
                        <Text style={styles.diaryDateText}>
                            {date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}.{date.getMonth()+1 < 10 ? "0" + (date.getMonth()+1) : date.getMonth()+1}.{date.getFullYear()}
                        </Text>
                    </View>

                    <View>
                        <Text style={styles.diaryTitleText}>{diary.title}</Text>
                    </View>
                </View>
                

                {/* <View style={styles.diaryTextContainer}>
                    {/*{console.log(date.getUTCDay())}*/}
                    {/* <Text style={styles.diaryDateText}>{date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}.{date.getMonth()+1 < 10 ? "0" + (date.getMonth()+1) : date.getMonth()+1}.{date.getFullYear()}</Text>
                    <Text style={styles.diaryTitleText}>{diary.title}</Text>
                </View> 
                */}
                
            </View>
            
            <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
                <BackSvg/>
            </Pressable>
            
            {/* TODO: navigate to edit diary page */}
            <Pressable style={styles.editButton} onPress={() => navigation.navigate("EditDiary", {diary,diaryChanged})}>
                <BigEditSvg/>
            </Pressable>
            
            
            
            <View style={styles.diaryEntryContainer}>
                <View style={styles.diaryEntry}>
                    <ScrollView style={styles.scrolledText}>
                        <Text style={styles.diaryEntryText}>Malcolm got a new pot! This is amazing. Wow, i neer expected this. Malcolm got a new pot! This is amazing. Wow, i neer expected this. Malcolm got a new pot! This is amazing. Wow, i neer expected this. Malcolm got a new pot! This is amazing. Wow, i neer expected this. Hello nic to meet you, hello. Malcolm got a new pot! This is amazing. Wow, i neer expected this. Malcolm got a new pot! This is amazing. Wow, i neer expected this. Malcolm got a new pot! This is amazing. Wow, i neer expected this. Malcolm got a new pot! This is amazing. Wow, i neer expected this. Malcolm got a new pot! This is amazing. Wow, i neer expected this. Malcolm got a new pot! This is amazing. Wow, i neer expected this. Malcolm got a new pot! This is amazing. Wow, i neer expected this. Hello nic to meet you, hello. Malcolm got a new pot! This is amazing. Wow, i neer expected this. Malcolm got a new pot! This is amazing. Wow, i neer expected this. Malcolm got a new pot! This is amazing. Wow, i neer expected this.</Text>
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
    
    imageTitleContainer: {
        //flex: 1,
        width: "100%",
        height: "40%",
        backgroundColor: "#F4F7F8",
        //backgroundColor: 'green',
    },

    imageContainer: {
        height: 216,
        borderBottomRightRadius: 80,
        borderBottomLeftRadius: 80,
    },

    image: {
        flex: 1,
        //width: "100%",
        //height: "100%",
        borderBottomRightRadius: 80,
        borderBottomLeftRadius: 80,
        //elevation: 10
    },
    
    imageStyle: {
        width: "100%",
        height: "100%",
        borderBottomRightRadius: 80,
        borderBottomLeftRadius: 80,
    },
    
    backButton: {
        position: "absolute",
        //flex: 1,
        top: 15,
        left: 15,
        //backgroundColor: 'white',
        //padding: 5,
    },
    
    editButton: {
        position: "absolute",
        //flex: 1,
        top: 15,
        right: 15,
        //padding: 5,
    },
    
    headerContainer: {
        width: "80%",
        paddingHorizontal: "5%",
        borderRadius: 23,

        height: 98,
        backgroundColor: "#fff",
        //position: "absolute",
        //bottom: -40,
        top: -15,
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
    
    scrolledText: {
        flex: 1,
    },
    
    diaryEntryContainer: {
        flex: 1,
        flexDirection: "column",
        width: "100%",
        //height: "60%",
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
    
})

export default DiaryScreen;