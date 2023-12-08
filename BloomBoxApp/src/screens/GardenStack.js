
import {createNativeStackNavigator} from "react-native-screens/native-stack";
import GardenScreen from "./GardenScreen";
import PlantScreen from "./PlantScreen";
import AddPlantScreen from "./AddPlantScreen";
import {PlantProvider} from "../context/PlantContext";
import {LocationProvider} from "../context/LocationContext";

const Stack = createNativeStackNavigator();
const GardenStack = () => {
    return(
        <PlantProvider>
            <LocationProvider>
                <Stack.Navigator>
                    <Stack.Screen name={"GardenScreen"} component={GardenScreen} options={{headerShown:false}}/>
                    <Stack.Screen name={"PlantScreen"} component={PlantScreen} options={{headerShown:false}}/>
                    <Stack.Screen name={"AddPlant"} component={AddPlantScreen} options={{headerShown:false}}/>
                </Stack.Navigator>
            </LocationProvider>
        </PlantProvider>
    );
}

export default GardenStack;