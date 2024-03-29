import React, {useContext, useEffect, useState} from "react";
import {Dimensions, FlatList, Pressable, StyleSheet, Text, TextInput, View} from "react-native";
import MacetaSvg from "../images/SVGs/Maceta";
import BarsSvg from "../images/SVGs/Bars";
import AddSvg from "../images/SVGs/Add";
import SearchSvg from "../images/SVGs/Search";
import {PlantContext} from "../context/PlantContext";
import Spinner from "react-native-loading-spinner-overlay";
import PlantComponent from "../components/PlantComponent";
import Gradient from "../images/SVGs/Gradient";
import {LocationContext} from "../context/LocationContext";
import {RemainderContext} from "../context/RemainderContext";
import EmptyListComponent from "../components/EmptyListComponent";
import {DiaryContext} from "../context/DiaryContext";

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
    const {getAllLocationForUser, locations} = useContext(LocationContext)
    const {getRemaindersByUserId} = useContext(RemainderContext);
    const {diaries} = useContext(DiaryContext);


    const [isFocused, setIsFocused] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        getAllPlants();
        getAllLocationForUser();
    }, [])

    useEffect(() => {
        getAllPlants();
    }, [locations])


    return (
        <View style={styles.appContainer}>
            <Gradient style={{
                position: 'absolute',
                bottom: 0,
            }}/>
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
                    <SearchSvg/>
                    <TextInput style={styles.searchInput} onFocus={() => setIsFocused(true)} maxLength={30}
                               onBlur={() => setIsFocused(false)} value={searchQuery} onChangeText={(query) => {
                        setSearchQuery(query)
                    }}/>
                </View>

                <Pressable style={({pressed}) => [
                    {
                        opacity: pressed
                            ? 0.5
                            : 1,
                        backgroundColor: '#5B6E4E'
                    },
                    styles.searchButton
                ]} onPress={() => navigation.navigate("AddPlant")}>
                    <AddSvg/>
                </Pressable>

            </View>
            <View style={styles.plantsContainer}>
                <Spinner visible={isLoading}/>
                {plants.length === 0 ? <EmptyListComponent type={"plants"} color={"#5B6E4E"}/>
                    :
                    <FlatList
                        data={formatData(plants.filter((plant) => plant.plantName.toLocaleString().toLowerCase().includes(searchQuery.toLowerCase())), 2)}
                        extraData={plants} refreshing={false} onRefresh={() => getAllPlants()} style={{flex: 1}}
                        numColumns={2} keyExtractor={(item) => item.plantId} renderItem={({item}) => {
                        if (item.empty === true) {
                            return <View style={styles.itemInvisible}/>
                        }
                        return (
                            <PlantComponent navigation={navigation} plant={item}/>
                        );
                    }}
                    />}
            </View>
        </View>
    );
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
        flex: 0,
        alignItems: "flex-start",
        width: "100%",
        justifyContent: "flex-start"
    },

    header: {
        width: "100%",
        flex: 0,
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "flex-end",
        paddingHorizontal: 20
    },

    headerTextContainer: {},

    headerText: {
        fontSize: 40,
        fontWeight: "bold",
        textTransform: "uppercase",
        lineHeight: 38,
    },

    plantImage: {},

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
        flexWrap: "nowrap",
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

    searchInput: {
        flex: 1,
        paddingHorizontal: 10,
        fontSize: 22,
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
})

export default GardenScreen;