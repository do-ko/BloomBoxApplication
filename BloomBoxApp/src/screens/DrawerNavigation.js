import React, {useContext} from "react";
import HomeScreen from "./HomeScreen";
import {createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList} from "@react-navigation/drawer";
import GardenScreen from "./GardenScreen";
import GardenStack from "./GardenStack";
import {Button, Image, StyleSheet} from "react-native";
import {red} from "react-native-reanimated/src";
import Icon from "react-native-vector-icons/FontAwesome";
import {AuthContext} from "../context/AuthContext";
const Drawer = createDrawerNavigator();


function ImageDrawerContent(navigation ) {
    const {logout} = useContext(AuthContext);
    return (
        <DrawerContentScrollView {...navigation }>
            <Image source={ require('../images/plant1.png') } resizeMethod="resize" resizeMode="contain" style={{ flex:1, alignSelf:"center", width:91, height:86, }} />
            <DrawerItemList {...navigation } />
            <DrawerItem style={{backgroundColor:"white"}} label="Logout" onPress={() => logout()} />
        </DrawerContentScrollView>
    );}

const DrawerNavigation = () => {
    return(
        <Drawer.Navigator screenOptions={{drawerStyle: styles.drawerStyles, headerShown:false}} drawerContent={(props) => <ImageDrawerContent {...props} />} >
            <Drawer.Screen name={"Home"} component={HomeScreen} options={{drawerIcon: ({focused, size}) => (
                    <Icon name={"home"} size={size} color={focused ? "#fff" : "#fff"}/>
            ) ,drawerActiveBackgroundColor:"#5B6E4E", drawerLabelStyle:{color:"white"}}}/>
            {/*<Drawer.Screen name={"Garden"} component={GardenScreen} />*/}
            <Drawer.Screen name={"Garden"} component={GardenStack} options={{drawerIcon: ({focused, size}) => (
                    <Icon name={"home"} size={size} color={focused ? "#fff" : "#fff"}/>
                ) ,drawerActiveBackgroundColor:"#5B6E4E", drawerLabelStyle:{color:"white"}}}/>
            {/*<Drawer.Screen name={"Logout"} component={<Button title={"Logout"} color={"red"} onPress={() => logout()}/>}/>*/}
        </Drawer.Navigator>
    );
}

const styles = StyleSheet.create({
    drawerStyles: {
        backgroundColor: "#20201D"
    }
})

export default DrawerNavigation;