import React, {useContext, useEffect, useState} from "react";
import {Dimensions, FlatList, Pressable, StyleSheet, Text, TextInput, View} from "react-native";
// import SVGImg from '../images/Maceta.svg';
import MacetaSvg from "../images/SVGs/Maceta";
import BarsSvg from "../images/SVGs/Bars";
import AddSvg from "../images/SVGs/Add";
import SearchSvg from "../images/SVGs/Search";
import {PlantContext} from "../context/PlantContext";
import Spinner from "react-native-loading-spinner-overlay";
import PlantComponent from "../components/PlantComponent";
import Gradient from "../images/SVGs/Gradient";
import filter from "lodash.filter"
import {LocationContext} from "../context/LocationContext";
import {RemainderContext} from "../context/RemainderContext";

const formatData = (data, numColumns) => {
    const numberOfFullRows = Math.floor(data.length / numColumns);

    let numberOfElementsInLastRow = data.length - (numberOfFullRows * numColumns);
    while (numberOfElementsInLastRow !== numColumns && numberOfElementsInLastRow !== 0) {
        data.push({key: `blank-${numberOfElementsInLastRow}`, empty: true});
        numberOfElementsInLastRow = numberOfElementsInLastRow + 1;
    }

    return data;
}
const GardenScreen = ({navigation}) => {
    const {getAllPlants, plants, isLoading} = useContext(PlantContext);
    const {getAllLocationForUser} = useContext(LocationContext)
    const {getRemaindersByUserId} = useContext(RemainderContext);


    const [isFocused, setIsFocused] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        getAllPlants();
        getAllLocationForUser();
        getRemaindersByUserId();
    }, [])

    return (
        <View style={styles.appContainer}>
            <Gradient style={{
                position: 'absolute',
                // top: 0,
                // left: 0,
                // right: 0,
                bottom: 0,
            }} />
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
                <View style={styles.searchBar}>
                    {/*{isFocused ? <></> : <SearchSvg />}*/}
                    <SearchSvg/>
                    <TextInput style={styles.searchInput} onFocus={() => setIsFocused(true)}
                               onBlur={() => setIsFocused(false)} value={searchQuery} onChangeText={(query) => {
                        setSearchQuery(query)
                    }}/>
                </View>


                <Pressable style={styles.searchButton} onPress={() => {
                    console.log(Dimensions.get('window').width);
                }}>
                </Pressable>

                <Pressable style={styles.searchButton} onPress={() => navigation.navigate("AddPlant")}>
                    <AddSvg/>
                </Pressable>

            </View>

            <View style={styles.plantsContainer}>
                <Spinner visible={isLoading}/>
                <FlatList data={formatData(plants.filter((plant) => plant.plantName.toLocaleString().toLowerCase().includes(searchQuery.toLowerCase())), 2)} refreshing={false} onRefresh={() => getAllPlants()} style={{flex:1}} numColumns={2} keyExtractor={(item) => item.plantId} renderItem={({item}) => {
                    if (item.empty === true) {
                        return <View style={styles.itemInvisible}/>
                    }
                    return(
                        <PlantComponent navigation={navigation} plant={item}/>
                    );
                }}
                />
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
        padding: 15,
        backgroundColor: "#fff"
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
        width: "65%",
        justifyContent: "flex-start",
        paddingHorizontal: 10,
        flexDirection: "row",
        // alignItems
        alignItems: "center"
    },

    searchInput: {
        flex: 1
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
        // backgroundColor: "blue",
        height: "100%",
        width: "100%",
        flex: 6,
        marginTop: 20
    },

    itemInvisible: {
        backgroundColor: "transparent",
        height: (Dimensions.get('window').width / 2) - 30,
        margin: 10,
        flex: 1,
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