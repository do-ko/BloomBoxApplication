import React, {useContext, useEffect, useState} from "react";
import {Dimensions, Image, Pressable, StyleSheet, Text, View} from "react-native";
import {ImageContext} from "../context/ImageContext";
import {BASE_URL} from "../config";
import {AuthContext} from "../context/AuthContext";
import EditSvg from "../images/SVGs/Edit";
import WhiteEditSvg from "../images/SVGs/EditWhite";

const LocationComponent = ({location, navigation}) => {
    const {userInfo} = useContext(AuthContext);

    return(
        <View style={styles.locationItem}>

            <View style={styles.locationImageContainer}>
                <Image style={styles.locationImage} source={{uri: BASE_URL + "/images/download/" + userInfo.userId + "/location/" + location.locationImage}} />
            </View>

            <View style={styles.locationTextContainer}>
                <Text style={styles.locationText}>{location.locationName}</Text>
                <Pressable style={styles.editButton} onPress={() => navigation.navigate("EditLocation", {location})}>
                    <WhiteEditSvg/>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    locationItem: {
        height: (Dimensions.get('window').width / 2) - 30,
        // marginHorizontal: 10,
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

    locationImageContainer: {
        flex: 7,
        alignItems: "center",
        justifyContent: "flex-end"
        // backgroundColor: "red"
    },

    locationTextContainer: {
        flex: 3,
        backgroundColor: "#20201D",
        // borderBottomEndRadius: 23,
        // borderEndEndRadius: 23
        borderBottomRightRadius: 23,
        borderBottomLeftRadius: 23,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row"
    },

    locationText: {
        fontSize: 20,
        fontWeight: "bold",
        letterSpacing: 1,
        color: "#fff"
    },

    locationImage: {
        width: "80%",
        height: "80%",
        borderTopRightRadius: 23,
        borderTopLeftRadius: 23
    },

    editButton: {
        position: "absolute",
        right: 20
    }

})

export default LocationComponent;