import React, {useContext, useState} from "react";
import {Button, Text, TextInput, Touchable, TouchableOpacity, View, StyleSheet} from "react-native";
import {AuthContext} from "../context/AuthContext";
import Spinner from "react-native-loading-spinner-overlay";
import BloomBoxLogoLoginRegisterSvg from "../images/SVGs/BloomBoxLogoLoginRegister";

const LoginScreen = ({navigation}) => {
    const [loginValue, setLoginValue] = useState(null);
    const [password, setPassword] = useState(null);

    const {isLoading, login} = useContext(AuthContext);

    return(
        <View style={styles.container}>
            <Spinner visible={isLoading} />
            <BloomBoxLogoLoginRegisterSvg />
            <View style={styles.wrapper}>
                <TextInput style={styles.input} placeholder={"login"} value={loginValue} onChangeText={(text) => {setLoginValue(text)}}/>
                <TextInput style={styles.input} placeholder={"password"} value={password} onChangeText={(text) => {setPassword(text)}} secureTextEntry={true}/>
                
                {/*<Button title={"Sign in"} onPress={() => login(loginValue, password)}/>*/}
                <TouchableOpacity style={styles.signin} onPress={() => login(loginValue, password)}>
                    <Text style={styles.signinText}>sign in</Text>
                </TouchableOpacity>

                <View style={{flexDirection: "row", marginTop: 20}}>
                    <Text>Don't have an account yet? </Text>
                    <TouchableOpacity onPress={() => {navigation.navigate("Register")}}><Text style={styles.link}>Register here</Text></TouchableOpacity>
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
    signin: {
        backgroundColor: "#5B6E4E",
        padding: 10,
        borderRadius: 10
    },
    signinText: {
        textAlign: "center",
        color: "#fff",
        textTransform: "uppercase"
    }
})

export default LoginScreen;