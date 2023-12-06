import React, {useContext} from "react";
import {Button, StyleSheet, Text, View, TextInput, Image, Pressable} from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import {AuthContext} from "../context/AuthContext";

const HomeScreen = ({navigation}) => {
    const {isLoading, logout, userInfo} = useContext(AuthContext);
    return(
        <View style={styles.container}>
            <Spinner visible={isLoading} />
            <Text>HomeScreen</Text>
            <Text>{userInfo.userLogin}</Text>
            <Button title={"Logout"} color={"red"} onPress={() => logout()}/>
            <Button styles={styles.backButton} title={"Garden"} onPress={() => navigation.navigate("Garden")}> </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
        // backgroundColor: '#20201D'
    },
    wrapper: {
        width: "80%"
    },
    input: {
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#20201D',
        borderRadius: 5,
        paddingHorizontal: 14
    },
    link: {
        color: '#5B6E4E'
    },
})

export default HomeScreen;