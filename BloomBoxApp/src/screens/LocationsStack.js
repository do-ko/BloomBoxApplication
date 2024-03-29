import {createNativeStackNavigator} from "react-native-screens/native-stack";
import LocationsScreen from "./LocationsScreen";
import AddLocationScreen from "./AddLocationScreen";
import EditLocationScreen from "./EditLocationScreen";

const Stack = createNativeStackNavigator();
const LocationsStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name={"Locations"} component={LocationsScreen} options={{headerShown: false}}/>
            <Stack.Screen name={"AddLocation"} component={AddLocationScreen} options={{headerShown: false}}/>
            <Stack.Screen name={"EditLocation"} component={EditLocationScreen} options={{headerShown: false}}/>
        </Stack.Navigator>

    );
}

export default LocationsStack;