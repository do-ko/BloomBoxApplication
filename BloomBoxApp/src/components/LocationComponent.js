import React, {useContext, useEffect, useState} from "react";
import {Dimensions, Image, Pressable, StyleSheet, Text, View} from "react-native";
import {ImageContext} from "../context/ImageContext";
import {BASE_URL} from "../config";
import {AuthContext} from "../context/AuthContext";

const LocationComponent = ({location, navigation}) => {
    const {userInfo} = useContext(AuthContext);

    return(
        <Pressable style={styles.locationItem} onPress={() => {navigation.navigate("LocationScreen", {location})}}>

            <View style={styles.locationImageContainer}>
                <Image style={styles.locationImage} source={{uri: BASE_URL + "/images/download/" + userInfo.userId + "/location/" + location.locationImage}} />
            </View>

            <View style={styles.locationTextContainer}>
                <Text style={styles.locationText}>{location.locationName}</Text>
            </View>
        </Pressable>
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
        alignItems: "center"
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
    }

})

export default LocationComponent;