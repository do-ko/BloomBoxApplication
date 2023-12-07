import React from "react";
import {Dimensions, Image, Pressable, StyleSheet, Text, View} from "react-native";

const PlantComponent = ({plant, navigation}) => {
    return(
        <Pressable style={styles.plantItem} onPress={() => {navigation.navigate("PlantScreen", {plant})}}>
            {/*<Text>*/}
            {/*    {plantName}*/}
            {/*</Text>*/}
            <View style={styles.plantImageContainer}>
                <Image style={styles.plantImage} source={require('../images/PlantImages/aloe1.jpg')} />
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
        shadowColor: '#000',
        shadowOffset: {width: -2, height: 4},
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