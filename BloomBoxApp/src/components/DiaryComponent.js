import React, {useContext, useEffect, useState} from "react";
import {Dimensions, Image, Pressable, StyleSheet, Text, View} from "react-native";
import {ImageContext} from "../context/ImageContext";
import {BASE_URL} from "../config";
import {AuthContext} from "../context/AuthContext";

const DiaryComponent = ({diary, navigation}) => {
    const {userInfo} = useContext(AuthContext);
    const [date, setDate] = useState(new Date(Date.parse(diary.entryDate)))

    return(
        <Pressable style={styles.diaryItem} onPress={() => {navigation.navigate("DiaryScreen", {diary})}}>

            <View style={styles.diaryImageContainer}>
                <Image style={styles.diaryImage} source={{uri: BASE_URL + "/images/download/" + userInfo.userId + "/diary/" + diary.image}} />
            </View>

            <View style={styles.diaryTextContainer}>
                {/*{console.log(date.getUTCDay())}*/}
                <Text style={styles.diaryDateText}>{date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}.{date.getMonth()+1 < 10 ? "0" + (date.getMonth()+1) : date.getMonth()+1}.{date.getFullYear()}</Text>
                <Text style={styles.diaryTitleText}>{diary.title}</Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    diaryItem: {
        height: 200,
        width: (Dimensions.get('window').width / 2) - 40,
        margin: 10,
        flex: 1,
        backgroundColor: "#F4F7F8",
        borderRadius: 23,
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.25,
        shadowRadius: 4
    },

    diaryImageContainer: {
        flex: 7,
        alignItems: "center",
        justifyContent: "flex-end",
        // backgroundColor: "red"
    },

    diaryTextContainer: {
        flex: 4,
        // backgroundColor: "red",
        // backgroundColor: "#20201D",
        // borderBottomEndRadius: 23,
        // borderEndEndRadius: 23
        borderBottomRightRadius: 23,
        borderBottomLeftRadius: 23,
        justifyContent: "center",
        alignItems: "center"
    },

    diaryDateText: {
        fontSize: 20,
        fontWeight: "300",
        color: "#20201D",
        lineHeight: 20
    },

    diaryTitleText: {
        fontSize: 24,
        fontWeight: "bold",
        lineHeight: 24,
        color: "#20201D"
    },

    diaryImage: {
        backgroundColor: "red",
        width: "80%",
        height: "80%",
        borderTopRightRadius: 23,
        borderTopLeftRadius: 23
    }

})

export default DiaryComponent;