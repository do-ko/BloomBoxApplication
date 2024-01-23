import 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import {AuthProvider} from "./src/context/AuthContext";
import {Navigation} from "./src/screens/Navigation";

import { setCustomText } from 'react-native-global-props';
import {ImageProvider} from "./src/context/ImageContext";
import {RemainderProvider} from "./src/context/RemainderContext";
import PlantComponent from "./src/components/PlantComponent";
import {PlantContext, PlantProvider} from "./src/context/PlantContext";
import {LocationProvider} from "./src/context/LocationContext";
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications



export default function App() {
  return (
      <AuthProvider>
          <RemainderProvider>
              <ImageProvider>
                  <PlantProvider>
                      <LocationProvider>
                            <Navigation />
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
