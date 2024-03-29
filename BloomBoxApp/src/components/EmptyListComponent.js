import {StyleSheet, Text, View} from "react-native";
import NoDataSvg from "../images/SVGs/NoData";

const EmptyListComponent = ({type, color}) => {
    return (
        <View style={styles.container}>
            <NoDataSvg color={color}/>
            <Text style={styles.textWithColor(color)}>There are no {type} yet.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },

    textWithColor: color => ({
        color: color,
        fontSize: 14,
        fontStyle: "italic"
    }),
});
export default EmptyListComponent;