import {createNativeStackNavigator} from "react-native-screens/native-stack";
import {useContext} from "react";
import {AuthContext} from "../context/AuthContext";
import {NavigationContainer} from "@react-navigation/native";
import HomeScreen from "./HomeScreen";
import LoginScreen from "./LoginScreen";
import RegisterScreen from "./RegisterScreen";

const Stack = createNativeStackNavigator();
export const Navigation = () => {
    const {userInfo} = useContext(AuthContext);

    return(
        <NavigationContainer>
            <Stack.Navigator>
                {userInfo.userId ? (
                    <Stack.Screen name={"Home"} component={HomeScreen} options={{headerShown:false}}/>
                ) : (
                    <>
                        <Stack.Screen name={"Login"} component={LoginScreen} options={{headerShown:false}}/>
                        <Stack.Screen name={"Register"} component={RegisterScreen} options={{headerShown:false}}/>
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );


}