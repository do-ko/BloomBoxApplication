import React, {useContext, useState} from "react";
import {Button, Text, TextInput, Touchable, TouchableOpacity, View, StyleSheet} from "react-native";
import {AuthContext} from "../context/AuthContext";
import Spinner from "react-native-loading-spinner-overlay";

const LoginScreen = ({navigation}) => {
    const [loginValue, setLoginValue] = useState(null);
    const [password, setPassword] = useState(null);

    const {isLoading, login} = useContext(AuthContext);

    return(
        <View style={styles.container}>
            <Spinner visible={isLoading} />
            <View style={styles.wrapper}>
                <TextInput style={styles.input} placeholder={"login"} value={loginValue} onChangeText={(text) => {setLoginValue(text)}}/>
                <TextInput style={styles.input} placeholder={"password"} value={password} onChangeText={(text) => {setPassword(text)}} secureTextEntry={true}/>
                
                <Button title={"Sign in"} onPress={() => login(loginValue, password)}/>

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
    }
})

export default LoginScreen;