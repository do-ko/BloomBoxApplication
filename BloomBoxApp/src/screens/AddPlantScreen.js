import React, {useContext, useEffect, useState} from "react";
import {Button, Dimensions, StyleSheet, Text, View} from "react-native";
import {PlantContext} from "../context/PlantContext";
import {LocationContext} from "../context/LocationContext";
import {SelectList} from "react-native-dropdown-select-list/index";
import SelectDropdown from 'react-native-select-dropdown'
import Gradient from "../images/Gradient";
import GradientSvg from "../images/Gradient";

const AddPlantScreen = () => {
    const {addPlant} = useContext(PlantContext);
    const {getAllLocationForUser, locations, isLoading} = useContext(LocationContext);
    const [selectedLocation, setSelectedLocation] = useState("");

    useEffect(() => {
        getAllLocationForUser();
    }, [])

    return(
        // <>
        //     <Gradient style={{
        //         position: 'absolute',
        //         // top: 0,
        //         // left: 0,
        //         // right: 0,
        //         bottom: 0,
        //     }} />
        // </>
        // )

        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            {/*{console.log(locations)}*/}
            {/*{isLoading ? <Text>Wait</Text> : <SelectList boxStyles={{width:200}} dropdownStyles={{width:"100%", backgroundColor:"red"}}*/}
            {/*    setSelected={(val) => setSelectedLocation(val)}*/}
            {/*    data={locations.map(location => location.locationName)}*/}
            {/*    save="value"*/}
            {/*/>}*/}

            <SelectDropdown
                buttonStyle={{backgroundColor:"red"}}
                data={locations.map(location => location.locationName)}
                onSelect={(selectedItem, index) => {
                    console.log(selectedItem, index)
                    setSelectedLocation(locations.filter(location => location.locationName === selectedItem).locationId)
                    console.log(selectedLocation)
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                    // text represented after item is selected
                    // if data array is an array of objects then return selectedItem.property to render after item is selected
                    return selectedItem
                }}
                rowTextForSelection={(item, index) => {
                    // text represented for each item in dropdown
                    // if data array is an array of objects then return item.property to represent item in dropdown
                    return item
                }}

            />

            <Button title={"ADD TEST"} onPress={()=>addPlant(1, "Name", "description", 3, 3, "url")}/>

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


export default AddPlantScreen;