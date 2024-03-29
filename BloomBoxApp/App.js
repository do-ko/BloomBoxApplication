import 'react-native-gesture-handler';
import {LogBox, StyleSheet} from 'react-native';
import {AuthProvider} from "./src/context/AuthContext";
import {Navigation} from "./src/screens/Navigation";
import {ImageProvider} from "./src/context/ImageContext";
import {RemainderProvider} from "./src/context/RemainderContext";
import {PlantProvider} from "./src/context/PlantContext";
import {LocationProvider} from "./src/context/LocationContext";

LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();


export default function App() {
    return (
        <AuthProvider>
            <RemainderProvider>
                <ImageProvider>
                    <PlantProvider>
                        <LocationProvider>
                            <Navigation/>
                        </LocationProvider>
                    </PlantProvider>
                </ImageProvider>
            </RemainderProvider>
        </AuthProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
