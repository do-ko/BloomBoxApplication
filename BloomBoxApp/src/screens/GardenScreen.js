import React from "react";
import {Button, Pressable, Text, TextInput, View, StyleSheet, Image} from "react-native";
// import SVGImg from '../images/Maceta.svg';

import MacetaSvg from "../images/Maceta";
import BarsSvg from "../images/Bars";
import AddSvg from "../images/Add";

const GardenScreen = ({navigation}) => {
    return(
        // <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
        //     <Button title={"DRAWER"} onPress={() => navigation.openDrawer()} />
        //     <Button title={"PLANT"} onPress={() => navigation.navigate("Plant")} />
        //     <Text>Garden Screen</Text>
        // </View>
        <View style={styles.appContainer}>
            <View style={styles.barsContainer}>
                <Pressable onPress={() => navigation.openDrawer()}>
                    <BarsSvg/>
                </Pressable>
            </View>
            <View style={styles.header}>
                <View style={styles.headerTextContainer}>
                    <Text style={styles.headerText}>Your</Text>
                    <Text style={styles.headerText}>Garden</Text>
                </View>
                <View style={styles.plantImage}>
                    <MacetaSvg/>
                </View>
            </View>

            <View style={styles.searchContainer}>
                {/*<Text>x</Text>*/}
                <View style={styles.searchBar}></View>
                <Pressable style={styles.searchButton}>
                    <View></View>
                </Pressable>
                <Pressable style={styles.searchButton} onPress={() => navigation.navigate("AddPlant")}>
                    <AddSvg />
                </Pressable>

            </View>

            <View style={styles.plantsContainer}>
                <Text>Plants here</Text>
            </View>

            {/*<View style={styles.headerContainer}>*/}
            {/*    <Text style={styles.headerText1}>YOUR</Text>*/}
            {/*    <Text style={styles.headerText2}>GARDEN</Text>*/}
            {/*</View>*/}

            {/*<View style={styles.barContainer}>*/}
            {/*    <View style={styles.searchBarContainer}>*/}
            {/*        <TextInput*/}
            {/*            style={styles.searchBarInput}*/}
            {/*            value={"Search plants"}*/}
            {/*        ></TextInput>*/}

            {/*        <Image*/}
            {/*            style={styles.magnifyingGlassIcon}*/}
            {/*            source={require("../images/magnifying_glass.png")}*/}
            {/*        />*/}
            {/*    </View>*/}

            {/*    <Pressable*/}
            {/*        onPress={() => navigation.navigate("AddPlant")}*/}
            {/*        style={({ pressed }) => {*/}
            {/*            return { opacity: pressed ? 0.5 : 1 };*/}
            {/*        }}*/}
            {/*    >*/}
            {/*        <Image*/}
            {/*            style={styles.addPlantButton}*/}
            {/*            source={require("../images/add_plant_button.png")}*/}
            {/*        />*/}
            {/*    </Pressable>*/}
            {/*</View>*/}

            {/*<View style={styles.leftLine} />*/}
            {/*<View style={styles.rightLine} />*/}

            {/*<Image*/}
            {/*    style={styles.plant1Image}*/}
            {/*    source={require("../images/plant1.png")}*/}
            {/*/>*/}

            {/*<Image*/}
            {/*    style={styles.drawerIcon}*/}
            {/*    source={require("../images/drawer_icon.png")}*/}
            {/*/>*/}
        </View>
    );
}

const styles = StyleSheet.create({
    // container: {
    //     flex: 1,
    //     alignItems: "center",
    //     justifyContent: "center"
    //     // backgroundColor: '#20201D'
    // },
    //
    // wrapper: {
    //     width: "80%"
    // },
    //
    // input: {
    //     marginBottom: 12,
    //     borderWidth: 1,
    //     borderColor: '#20201D',
    //     borderRadius: 5,
    //     paddingHorizontal: 14
    // },
    //
    // link: {
    //     color: '#5B6E4E'
    // },

    // the whole app screen
    appContainer: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        padding: 15
    },

    barsContainer: {
        // backgroundColor: "blue",
        flex: 0,
        alignItems: "flex-start",
        width: "100%",
        justifyContent: "flex-start"
    },

    header: {
        // backgroundColor: "red",
        // height: "20%",
        width: "100%",
        flex: 0,
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "flex-end",
        paddingHorizontal: 20
        // gap: 20
    },

    headerTextContainer: {
        // backgroundColor: "yellow",
        // width: "100%"
    },

    headerText: {
        fontSize: 40,
        fontWeight: "bold",
        textTransform: "uppercase",
    },

    plantImage: {
        // backgroundColor: "blue",
        // marginRight: "10%",
        // height: 87
    },

    searchContainer: {
        backgroundColor: "#20201D",
        height: 81,
        width: "100%",
        borderRadius: 23,
        flex: 1,
        justifyContent: "space-between",
        paddingHorizontal: 20,
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "nowrap"
    },

    searchBar: {
      height: "50%",
        backgroundColor: "white",
        borderRadius: 23,
        width: "65%"
    },

    searchButton: {
      backgroundColor: "#5B6E4E",
        height: 40,
        width: 40,
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "center"
    },

    plantsContainer: {
        backgroundColor: "blue",
        height: "100%",
        width: "100%",
        flex: 6
    }

    // // container for header texts and icons
    // headerContainer: {
    //     width: "60%",
    //     //height: "30%",
    //     textAlign: "left",
    //     //fontFamily: "calibri",
    // },
    //
    // headerText1: {
    //     marginTop: 50,
    //     fontSize: 32,
    //     fontWeight: "700",
    //     letterSpacing: 1,
    // },
    //
    // headerText2: {
    //     marginTop: -15,
    //     fontSize: 32,
    //     fontWeight: "700",
    //     letterSpacing: 1,
    // },
    //
    // barContainer: {
    //     flexDirection: "row",
    //     alignItems: "center",
    //     width: "80%",
    //     height: "7%",
    //     backgroundColor: "#20201D",
    //     borderRadius: 20,
    //     gap: 5
    // },
    //
    // searchBarContainer: {
    //     flexDirection: "row",
    //     flex: 1,
    //     alignItems: "center",
    // },
    //
    // searchBarInput: {
    //     marginHorizontal: "5%",
    //     padding: 5,
    //     paddingLeft: 40,
    //     width: "85%",
    //     height: 32,
    //     backgroundColor: "#ffffff",
    //     borderRadius: 25,
    //     fontSize: 16,
    // },
    //
    // magnifyingGlassIcon: {
    //     width: 20,
    //     height: 20,
    //     //position: "absolute",
    //     left: -250,
    // },
    //
    // pressableAddPlantButton: {},
    //
    // addPlantButton: {
    //     left: -20,
    // },
    //
    // leftLine: {
    //     backgroundColor: "#DFDFD9",
    //     width: 10,
    //     height: "16.5%",
    //     position: "absolute",
    //     left: "15%",
    // },
    //
    // rightLine: {
    //     backgroundColor: "#DFDFD9",
    //     width: 10,
    //     height: "16.5%",
    //     position: "absolute",
    //     right: "15%",
    // },
    //
    // plant1Image: {
    //     position: "absolute",
    //     width: 65,
    //     top: "6%",
    //     left: "64%",
    // },
    //
    // drawerIcon: {
    //     position: "absolute",
    //     left: "3%",
    //     top: "5%",
    // },
})

export default GardenScreen;