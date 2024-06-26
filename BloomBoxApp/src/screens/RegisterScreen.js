import React, {useContext, useState} from "react";
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {AuthContext} from "../context/AuthContext";
import Spinner from "react-native-loading-spinner-overlay";
import BloomBoxLogoLoginRegisterSvg from "../images/SVGs/BloomBoxLogoLoginRegister";

const RegisterScreen = ({navigation}) => {
    const [login, setLogin] = useState(null);
    const [password, setPassword] = useState(null);

    const {isLoading, register} = useContext(AuthContext);

    return (
        <View style={styles.container}>
            <Spinner visible={isLoading}/>
            <BloomBoxLogoLoginRegisterSvg/>
            <View style={styles.wrapper}>
                <TextInput style={styles.input} placeholder={"login"} value={login} onChangeText={(text) => {
                    setLogin(text)
                }}/>
                <TextInput style={styles.input} placeholder={"password"} value={password} onChangeText={(text) => {
                    setPassword(text)
                }} secureTextEntry={true}/>
                <TouchableOpacity style={styles.register} onPress={() => register(login, password)}>
                    <Text style={styles.registerText}>register</Text>
                </TouchableOpacity>

                <View style={{flexDirection: "row", marginTop: 20}}>
                    <Text>Already have an account? </Text>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate("Login")
                    }}><Text style={styles.link}>Login here</Text></TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: 50
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

    register: {
        backgroundColor: "#5B6E4E",
        padding: 10,
        borderRadius: 10
    },

    registerText: {
        textAlign: "center",
        color: "#fff",
        textTransform: "uppercase"
    }
})

export default RegisterScreen;