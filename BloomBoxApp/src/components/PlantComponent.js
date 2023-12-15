import React, {useContext, useEffect, useState} from "react";
import {Dimensions, Image, Pressable, StyleSheet, Text, View} from "react-native";
import {ImageContext} from "../context/ImageContext";
import {BASE_URL} from "../config";
import {AuthContext} from "../context/AuthContext";




const PlantComponent = ({plant, navigation}) => {
    const {userInfo} = useContext(AuthContext);

    return(
        <Pressable style={styles.plantItem} onPress={() => {navigation.navigate("PlantScreen", {plant})}}>

            <View style={styles.plantImageContainer}>
                <Image style={styles.plantImage} source={{uri: BASE_URL + "/images/download/" + userInfo.userId + "/plant/" + plant.imageUrl}} />
            </View>

            <View style={styles.plantTextContainer}>
                <Text style={styles.plantText}>{plant.plantName}</Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    plantItem: {
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

    plantImageContainer: {
        flex: 7,
        alignItems: "center",
        justifyContent: "flex-end"
        // backgroundColor: "red"
    },

    plantTextContainer: {
        flex: 3,
        backgroundColor: "#20201D",
        // borderBottomEndRadius: 23,
        // borderEndEndRadius: 23
        borderBottomRightRadius: 23,
        borderBottomLeftRadius: 23,
        justifyContent: "center",
        alignItems: "center"
    },

    plantText: {
        fontSize: 20,
        fontWeight: "bold",
        letterSpacing: 1,
        color: "#fff"
    },

    plantImage: {
        width: "80%",
        height: "80%",
        borderTopRightRadius: 23,
        borderTopLeftRadius: 23
    }

})

export default PlantComponent;