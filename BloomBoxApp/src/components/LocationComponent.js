import React, {useContext} from "react";
import {Dimensions, Image, Pressable, StyleSheet, Text, View} from "react-native";
import {BASE_URL} from "../config";
import {AuthContext} from "../context/AuthContext";
import WhiteEditSvg from "../images/SVGs/EditWhite";

const LocationComponent = ({location, navigation}) => {
    const {userInfo} = useContext(AuthContext);

    return (
        <View style={styles.locationItem}>

            <View style={styles.locationImageContainer}>
                <Image style={styles.locationImage}
                       source={{uri: BASE_URL + "/images/download/" + userInfo.userId + "/location/" + location.locationImage}}/>
            </View>

            <View style={styles.locationTextContainer}>
                {location.locationName.length <= 13 ?
                    <Text style={styles.locationText(20)}>{location.locationName}</Text>
                    :
                    (location.locationName.length <= 18
                        ? <Text style={styles.locationText(16)}>{location.locationName}</Text>
                        : <Text style={styles.locationText(12)}>{location.locationName}</Text>)}
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
    },

    locationTextContainer: {
        flex: 3,
        backgroundColor: "#20201D",
        borderBottomRightRadius: 23,
        borderBottomLeftRadius: 23,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row"
    },

    locationText: (fontSize) => ({
        fontSize: fontSize,
        fontWeight: "bold",
        letterSpacing: 1,
        color: "#fff"
    }),

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