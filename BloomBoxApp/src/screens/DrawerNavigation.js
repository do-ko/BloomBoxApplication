import React, {useContext} from "react";
import HomeScreen from "./HomeScreen";
import {createDrawerNavigator, DrawerContentScrollView, DrawerItemList} from "@react-navigation/drawer";
import GardenStack from "./GardenStack";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import {AuthContext} from "../context/AuthContext";
import LocationsStack from "./LocationsStack";
import BloomBoxLogoSvg from "../images/SVGs/BloomBoxLogo";
import {MaterialCommunityIcons, MaterialIcons} from '@expo/vector-icons';

const Drawer = createDrawerNavigator();


function ImageDrawerContent(navigation) {
    const {logout} = useContext(AuthContext);
    return (
        <View style={{flex: 1}}>
            <DrawerContentScrollView {...navigation}>
                <BloomBoxLogoSvg
                    style={{flex: 1, alignSelf: "center", width: 91, height: 86, marginTop: 24, marginBottom: 24}}/>
                <DrawerItemList {...navigation} />
            </DrawerContentScrollView>

            <TouchableOpacity onPress={() => logout()} style={{
                position: "absolute",
                bottom: 40,
                right: 15,
                left: 15,
                backgroundColor: "white",
                padding: 15,
                borderRadius: 10
            }}>
                <Text style={{
                    color: "#20201D",
                    fontWeight: "bold",
                    textAlign: "center",
                    textTransform: "uppercase",
                    letterSpacing: 5
                }}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
}

const DrawerNavigation = () => {
    return (
        <Drawer.Navigator screenOptions={{drawerStyle: styles.drawerStyles, headerShown: false}}
                          drawerContent={(props) => <ImageDrawerContent {...props} />}>
            <Drawer.Screen name={"Home"} component={HomeScreen} options={{
                drawerIcon: ({focused, size}) => (
                    <Icon name={"home"} size={size} color={focused ? "#fff" : "#fff"}/>
                ), drawerActiveBackgroundColor: "#5B6E4E", drawerLabelStyle: {color: "white"}
            }}/>
            <Drawer.Screen name={"Garden"} component={GardenStack} options={{
                drawerIcon: ({focused, size}) => (
                    <MaterialCommunityIcons name="flower" size={size} color={focused ? "#fff" : "#fff"}/>
                ), drawerActiveBackgroundColor: "#5B6E4E", drawerLabelStyle: {color: "white"}
            }}/>
            <Drawer.Screen name={"Locations"} component={LocationsStack} options={{
                drawerIcon: ({focused, size}) => (
                    <MaterialIcons name="location-pin" size={size} color={focused ? "#fff" : "#fff"}/>
                ), drawerActiveBackgroundColor: "#5B6E4E", drawerLabelStyle: {color: "white"}
            }}/>
        </Drawer.Navigator>
    );
}

const styles = StyleSheet.create({
    drawerStyles: {
        backgroundColor: "#20201D",
        flex: 1,
        justifyContent: "space-between"
    }
})

export default DrawerNavigation;