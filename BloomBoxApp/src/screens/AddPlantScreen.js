import { View, Text, StyleSheet, Button } from "react-native";

const AddPlantScreen = ({navigation}) => {
return (
        <View>
            <Text> Hello this is AddPlantScreen </Text>
            <Button styles={styles.backButton} title={"Back"} onPress={() => navigation.navigate("Home")}> </Button>
        </View>
    );
}

export default AddPlantScreen;

const styles = StyleSheet.create({
    backButton: {
        flex: 1,
    },
});
