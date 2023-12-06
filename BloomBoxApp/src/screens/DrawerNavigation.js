import React from "react";
import HomeScreen from "./HomeScreen";
import {createDrawerNavigator} from "@react-navigation/drawer";
import GardenScreen from "./GardenScreen";
const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
    return(
        <Drawer.Navigator>
            <Drawer.Screen name={"Home"} component={HomeScreen} />
            <Drawer.Screen name={"Garden"} component={GardenScreen} />
        </Drawer.Navigator>
    );
}

export default DrawerNavigation;