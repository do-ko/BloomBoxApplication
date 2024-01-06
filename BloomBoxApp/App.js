import 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import {AuthProvider} from "./src/context/AuthContext";
import {Navigation} from "./src/screens/Navigation";

import { setCustomText } from 'react-native-global-props';
import {ImageProvider} from "./src/context/ImageContext";



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
          <ImageProvider>
              <Navigation />
          </ImageProvider>
          {/*<Drawer.Navigator>*/}
          {/*    <Drawer.Screen name="Home" component={Navigation} />*/}
          {/*    <Drawer.Screen name="Garden" component={Garden} />*/}
          {/*</Drawer.Navigator>*/}
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
