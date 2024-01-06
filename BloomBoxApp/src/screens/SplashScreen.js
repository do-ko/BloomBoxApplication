import React from "react";
import {ActivityIndicator, View} from "react-native";

export const SplashScreen = () => {
    return(
        <View style={{flex: 1, justifyContent: "center"}}>
            <ActivityIndicator size={"large"} color={"red"}/>
        </View>
    );
}