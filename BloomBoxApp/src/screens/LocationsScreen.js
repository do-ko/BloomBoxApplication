import {Dimensions, FlatList, Pressable, StyleSheet, Text, TextInput, View} from "react-native";
import BarsSvg from "../images/SVGs/Bars";
import React, {useContext, useEffect, useState} from "react";
import AddSvg from "../images/SVGs/Add";
import Gradient from "../images/SVGs/Gradient";
import MacetaSvg from "../images/SVGs/Maceta";
import SearchSvg from "../images/SVGs/Search";
import Spinner from "react-native-loading-spinner-overlay";
import PlantComponent from "../components/PlantComponent";
import {PlantContext} from "../context/PlantContext";
import {LocationContext} from "../context/LocationContext";
import plant2 from "../images/SVGs/Plant2";
import LocationComponent from "../components/LocationComponent";

const LocationsScreen = ({ navigation }) => {
    const {getAllLocationForUser, locations, isLoading} = useContext(LocationContext);
    const [isFocused, setIsFocused] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        getAllLocationForUser();
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
                    {/*<Text style={styles.headerText}>Your</Text>*/}
                    <Text style={styles.headerText}>Locations</Text>
                </View>
                <View style={styles.plantImage}>
                    <MacetaSvg/>
                </View>
            </View>


            <View style={styles.searchContainer}>
                <View style={styles.searchBar}>
                    <SearchSvg/>
                    <TextInput style={styles.searchInput} onFocus={() => setIsFocused(true)}
                               onBlur={() => setIsFocused(false)} value={searchQuery} onChangeText={(query) => {
                        setSearchQuery(query)
                    }}/>
                </View>

                <Pressable style={styles.searchButton} onPress={() => navigation.navigate("AddLocation")}>
                    <AddSvg/>
                </Pressable>

            </View>

            <View style={styles.plantsContainer}>
                <Spinner visible={isLoading}/>
                <FlatList data={locations.filter((location) => location.locationName.toLocaleString().toLowerCase().includes(searchQuery.toLowerCase()))} refreshing={false} onRefresh={() => getAllLocationForUser()} style={{flex:1}} numColumns={1} keyExtractor={(item) => item.locationId} renderItem={({item}) => {
                    if (item.empty === true) {
                        return <View style={styles.itemInvisible}/>
                    }
                    return(
                        <LocationComponent navigation={navigation} location={item}/>
                    );
                }}
                />
            </View>

            {/*<View style={styles.tempNavTesting}>*/}
            {/*    <View style={{width: "100%", flexDirection:"row", justifyContent: "space-around"}}>*/}
            {/*        <Pressable onPress={() => navigation.navigate("AddLocation")}>*/}
            {/*            <AddSvg/>*/}
            {/*        </Pressable>*/}
            {/*        <Pressable onPress={() => navigation.navigate("EditLocation")}>*/}
            {/*            <AddSvg/>*/}
            {/*        </Pressable>*/}
            {/*    </View>*/}
            {/*</View>*/}
        </View>
    )
}


const styles = StyleSheet.create({
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

    headerText: {
        fontSize: 32,
        fontWeight: "bold",
        textTransform: "uppercase",
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
        width: "80%",
        justifyContent: "flex-start",
        paddingHorizontal: 10,
        flexDirection: "row",
        // alignItems
        alignItems: "center"
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
        width: "90%",
        flex: 6,
        marginTop: 20
    }
})

export default LocationsScreen;