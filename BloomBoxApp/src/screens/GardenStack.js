import {SplashScreen} from "./SplashScreen";
import DrawerNavigation from "./DrawerNavigation";
import LoginScreen from "./LoginScreen";
import RegisterScreen from "./RegisterScreen";
import {createNativeStackNavigator} from "react-native-screens/native-stack";
import GardenScreen from "./GardenScreen";
import PlantScreen from "./PlantScreen";
import AddPlantScreen from "./AddPlantScreen";
import {PlantProvider} from "../context/PlantContext";

const Stack = createNativeStackNavigator();
const GardenStack = () => {
    return(
        <PlantProvider>
            <Stack.Navigator>
                <Stack.Screen name={"GardenScreen"} component={GardenScreen} options={{headerShown:false}}/>
                <Stack.Screen name={"PlantScreen"} component={PlantScreen} options={{headerShown:false}}/>
                <Stack.Screen name={"AddPlant"} component={AddPlantScreen} options={{headerShown:false}}/>
            </Stack.Navigator>
        </PlantProvider>
    );
}

export default GardenStack;