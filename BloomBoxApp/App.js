import 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import {AuthProvider} from "./src/context/AuthContext";
import {Navigation} from "./src/screens/Navigation";

import { setCustomText } from 'react-native-global-props';
import {ImageProvider} from "./src/context/ImageContext";
import {RemainderProvider} from "./src/context/RemainderContext";
import PlantComponent from "./src/components/PlantComponent";
import {PlantContext, PlantProvider} from "./src/context/PlantContext";



export default function App() {
    // const customTextProps = {
    //     style: {
    //         fontFamily: "Inter",
    //         color: "black"
    //     }
    // };
    //
    // setCustomText(customTextProps);


  return (
      <AuthProvider>
          <RemainderProvider>
              <ImageProvider>
                  <Navigation />
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
