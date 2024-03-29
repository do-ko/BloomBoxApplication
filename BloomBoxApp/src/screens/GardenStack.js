import {createNativeStackNavigator} from "react-native-screens/native-stack";
import GardenScreen from "./GardenScreen";
import PlantScreen from "./PlantScreen";
import AddPlantScreen from "./AddPlantScreen";
import {DiaryProvider} from "../context/DiaryContext";
import EditPlantScreen from "./EditPlantScreen";
import DiaryScreen from "./DiaryScreen";
import EditDiaryScreen from "./EditDiaryScreen";
import AddDiaryScreen from "./AddDiaryScreen";

const Stack = createNativeStackNavigator();
const GardenStack = () => {
    return (
        <DiaryProvider>
            <Stack.Navigator>
                <Stack.Screen name={"GardenScreen"} component={GardenScreen} options={{headerShown: false}}/>
                <Stack.Screen name={"PlantScreen"} component={PlantScreen} options={{headerShown: false}}/>
                <Stack.Screen name={"AddPlant"} component={AddPlantScreen} options={{headerShown: false}}/>
                <Stack.Screen name={"EditPlant"} component={EditPlantScreen} options={{headerShown: false}}/>
                <Stack.Screen name={"DiaryScreen"} component={DiaryScreen} options={{headerShown: false}}/>
                <Stack.Screen name={"EditDiary"} component={EditDiaryScreen} options={{headerShown: false}}/>
                <Stack.Screen name={"AddDiary"} component={AddDiaryScreen} options={{headerShown: false}}/>
            </Stack.Navigator>
        </DiaryProvider>

    );
}

export default GardenStack;