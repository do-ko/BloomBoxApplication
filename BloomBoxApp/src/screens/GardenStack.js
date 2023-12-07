import {SplashScreen} from "./SplashScreen";
import DrawerNavigation from "./DrawerNavigation";
import LoginScreen from "./LoginScreen";
import RegisterScreen from "./RegisterScreen";
import {createNativeStackNavigator} from "react-native-screens/native-stack";
import GardenScreen from "./GardenScreen";
import PlantScreen from "./PlantScreen";
import AddPlantScreen from "./AddPlantScreen";

const Stack = createNativeStackNavigator();
const GardenStack = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen name={"Garden"} component={GardenScreen} options={{headerShown:false}}/>
            <Stack.Screen name={"Plant"} component={PlantScreen} options={{headerShown:false}}/>
            <Stack.Screen name={"AddPlant"} component={AddPlantScreen} options={{headerShown:false}}/>
        </Stack.Navigator>
    );
}

export default GardenStack;