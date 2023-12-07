import 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import {AuthProvider} from "./src/context/AuthContext";
import {Navigation} from "./src/screens/Navigation";

import { setCustomText } from 'react-native-global-props';



export default function App() {
    const customTextProps = {
        style: {
            fontFamily: "Inter",
            color: "black"
        }
    };

    setCustomText(customTextProps);


  return (
      <AuthProvider>
          {/*<Drawer.Navigator>*/}
          {/*    <Drawer.Screen name="Home" component={Navigation} />*/}
          {/*    <Drawer.Screen name="Garden" component={Garden} />*/}
          {/*</Drawer.Navigator>*/}
        <Navigation />
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
