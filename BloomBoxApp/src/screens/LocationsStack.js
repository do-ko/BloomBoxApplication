
import {createNativeStackNavigator} from "react-native-screens/native-stack";
import GardenScreen from "./GardenScreen";
import PlantScreen from "./PlantScreen";
import AddPlantScreen from "./AddPlantScreen";
import {PlantProvider} from "../context/PlantContext";
import {LocationProvider} from "../context/LocationContext";
import LocationsScreen from "./LocationsScreen";
import AddLocationScreen from "./AddLocationScreen";
import EditLocationScreen from "./EditLocationScreen";

const Stack = createNativeStackNavigator();
const GardenStack = () => {
    return(
        <LocationProvider>
            <Stack.Navigator>
                <Stack.Screen name={"Locations"} component={LocationsScreen} options={{headerShown:false}}/>
                <Stack.Screen name={"AddLocation"} component={AddLocationScreen} options={{headerShown:false}}/>
                <Stack.Screen name={"EditLocation"} component={EditLocationScreen} options={{headerShown:false}}/>
            </Stack.Navigator>
        </LocationProvider>
    );
}

export default GardenStack;