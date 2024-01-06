import {createNativeStackNavigator} from "react-native-screens/native-stack";
import {useContext} from "react";
import {AuthContext} from "../context/AuthContext";
import {NavigationContainer} from "@react-navigation/native";
import HomeScreen from "./HomeScreen";
import LoginScreen from "./LoginScreen";
import RegisterScreen from "./RegisterScreen";
import {SplashScreen} from "./SplashScreen";
import DrawerNavigation from "./DrawerNavigation";


const Stack = createNativeStackNavigator();


export const Navigation = () => {
    const {userInfo, splashLoading} = useContext(AuthContext);

    return(
        <NavigationContainer>
            <Stack.Navigator>
                {splashLoading ? (
                    <Stack.Screen name={"Splash Screen"} component={SplashScreen} options={{headerShown:false}}/>
                ) : (
                    userInfo.userId ? (
                        <Stack.Screen name={"Drawer"} component={DrawerNavigation} options={{headerShown:false}}/>
                    ) : (
                        <>
                            <Stack.Screen name={"Login"} component={LoginScreen} options={{headerShown:false}}/>
                            <Stack.Screen name={"Register"} component={RegisterScreen} options={{headerShown:false}}/>
                        </>
                    )
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );


}