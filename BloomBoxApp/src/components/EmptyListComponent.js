import {StyleSheet, Text, View} from "react-native";
import NoDataSvg from "../images/SVGs/NoData";

const EmptyListComponent = ({type}) => {
    return (
        <View style={styles.container}>
            <NoDataSvg />
            <Text style={styles.text}>There are no {type} yet.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        // backgroundColor: "yellow"
    },

    text: {
        color: "#DFDFD9",
        fontSize: 14,
        fontStyle: "italic"
    }
});
export default EmptyListComponent;