import React, {useContext, useEffect, useState} from "react";
import {
    Button,
    Dimensions,
    FlatList,
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View
} from "react-native";
import {PlantContext} from "../context/PlantContext";
import {DiaryContext} from "../context/DiaryContext";
import BarsSvg from "../images/SVGs/Bars";
import AddSvg from "../images/SVGs/Add";
import BackSvg from "../images/SVGs/BackButton";
import BigAdd from "../images/SVGs/BigAdd";
import {BASE_URL} from "../config";
import SaveSvg from "../images/SVGs/SaveButton";
import {AuthContext} from "../context/AuthContext";
import LocationSvg from "../images/SVGs/Location";
import {LocationContext} from "../context/LocationContext";
import DropletFilledBigSvg from "../images/SVGs/DropletFilledBig";
import SunFilledBig from "../images/SVGs/SunFilledBig";
import BigEditSvg from "../images/SVGs/BigEdit";
import ReverseGradientSvg from "../images/SVGs/ReverseGradient";
import Spinner from "react-native-loading-spinner-overlay";
import PlantComponent from "../components/PlantComponent";
import DiaryComponent from "../components/DiaryComponent";

const PlantScreen = ({route, navigation}) => {
    // plant contains all parameters of current plant
    // diaries contains all parameters belonging to this plant
    const {plant} = route.params;
    const {userInfo} = useContext(AuthContext);
    const {getAllDiariesForPlant, diaries, addDiary, isLoadingDiary} = useContext(DiaryContext);
    const {getAllLocationForUser, locations, isLoading} = useContext(LocationContext)

    const [test, setTest] = useState({})

    useEffect(() => {
        getAllDiariesForPlant(plant.plantId);
        getAllLocationForUser()
        setTest(locations.filter(location => location.locationId === plant.locationId)[0])
    }, [])


    const plantChanged = (plant)=>{
     //   console.log("plant changed2: ",plant)
    }

    return(
        <ScrollView>
            <View style={styles.appContainer}>
                <View style={styles.imageNameContainer}>
                    {/*    image and name/species*/}

                    <View style={styles.imageContainer}>
                        <View style={{overflow: "hidden"}}>
                            <View style={styles.image}>
                                <Image source={{uri: BASE_URL + "/images/download/" + userInfo.userId + "/plant/" + plant.imageUrl}} style={styles.imageStyle} />
                            </View>
                        </View>
                        {/*menu*/}
                        <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
                            <BackSvg/>
                        </Pressable>


                        <Pressable style={styles.saveButton} onPress={() => navigation.navigate("EditPlant", {plant,plantChanged})}>
                            <BigEditSvg/>
                        </Pressable>

                        <View style={styles.nameDataContainer}>
                            <View  style={styles.nameSpeciesContainer} >
                                <Text style={styles.nameData}>{plant.plantName}</Text>
                            </View>

                            <View  style={styles.nameSpeciesContainer} >
                                <Text style={styles.speciesData}>{plant.species}</Text>
                            </View>
                        </View>


                    </View>
                </View>

                <View style={styles.plantDataContainer}>
                    {/*    LOCATION, WATER, LIGHT DATA*/}
                    <View style={styles.locationContainer}>
                        {/*    LOCATION*/}
                        <LocationSvg />
                        <View>
                            <Text style={styles.dataTitle}>LOCATION</Text>
                            <Text style={styles.dataText}>{plant.locationId == null ? "not specified" : (isLoading ? "loading" : locations.filter(location => location.locationId === plant.locationId)[0].locationName)}</Text>
                        </View>
                    </View>

                    <View style={styles.waterLightContainer}>
                        <View style={styles.waterContainer}>
                            {/*    WATER*/}
                            <DropletFilledBigSvg />
                            <View>
                                <Text style={styles.dataTitle}>WATER</Text>
                                <Text style={styles.waterLightData}>{plant.water}/5</Text>
                            </View>
                        </View>

                        <View style={styles.lightContainer}>
                            {/*    WATER*/}
                            <SunFilledBig />
                            <View>
                                <Text style={styles.dataTitle}>LIGHT</Text>
                                <Text style={styles.waterLightData}>{plant.light}/5</Text>
                            </View>
                        </View>

                    </View>
                </View>



                <View style={styles.diarySectionContainer}>
                    <ReverseGradientSvg style={{
                        position: 'absolute',
                    }}/>
                    <View style={styles.diaryTitleContainer}>
                    {/*    TITLE AND BUTTON*/}
                        <Text style={styles.diaryTitle}>Diary</Text>
                        <Pressable style={styles.addDiaryButton} onPress={() => addDiary(plant.plantId, "test", Date.now(), "defaultDiary.jpg")}>
                            <Text style={styles.addDiaryText}>ADD</Text>
                        </Pressable>
                    </View>

                    <View style={styles.diaryContainer}>
                        <Spinner visible={isLoadingDiary}/>
                        <FlatList horizontal={true} data={diaries} refreshing={false} onRefresh={() => getAllDiariesForPlant(plant.plantId)} style={{flex:1}} keyExtractor={(item) => item.diaryId} renderItem={({item}) => {
                            if (item.empty === true) {
                                console.log("Empty")
                                return <View style={styles.itemInvisible}/>
                            }
                            console.log(item)
                            return(
                                <DiaryComponent navigation={navigation} diary={item}/>
                            );
                        }}
                        />
                    </View>

                </View>




            </View>
        </ScrollView>




        // <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
        //     <Button title={"GO BACK"} onPress={() => {navigation.goBack()}}/>
        //     <Text>{plant.plantName}</Text>
        //     <Text>{plant.plantId}</Text>
        //     <Text>{plant.locationId}</Text>
        //
        //     {diaries.map(diary => <Text>{diary.title}</Text>)}
        //     <Button title={"ADD DIARY TEST"} onPress={() => addDiary(plant.plantId, "test", Date.now(), null)}/>
        //     <Button title={"EDIT PLANT"} onPress={() => navigation.navigate("EditPlant", {plant,plantChanged})}/>
        // </View>
    );
}

const styles = StyleSheet.create({
    // the whole app screen
    appContainer: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#fff"
    },

    imageNameContainer: {
        // flex: 1,
        backgroundColor: "#fff",
        width: "100%",
        paddingBottom: 90,
    },

    imageContainer: {
        height: 216,
        borderBottomRightRadius: 80,
        borderBottomLeftRadius: 80,
    },

    image: {
        width: "100%",
        height: "100%",
        borderBottomRightRadius: 80,
        borderBottomLeftRadius: 80,
        backgroundColor: "#fff",
        elevation: 10
    },

    imageStyle: {
        width: "100%",
        height: "100%",
        borderBottomRightRadius: 80,
        borderBottomLeftRadius: 80,
    },


    backButton: {
        position: "absolute",
        top: 15,
        left: 15,
    },

    saveButton: {
        position: "absolute",
        top: 15,
        right: 15,
    },


    nameDataContainer: {
        width: "80%",
        paddingHorizontal: "5%",
        borderRadius: 23,

        height: 98,
        backgroundColor: "#fff",
        position: "absolute",
        bottom: -49,

        alignSelf: 'center',
        justifyContent: "center",
        alignItems: "center",

        elevation: 10
    },

    nameSpeciesContainer: {
        width: "80%",
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: "green"
    },

    nameData: {
        textAlign: "center",
        fontSize: 48,
        fontWeight: "bold",
        lineHeight: 48,
        color: "#20201D"
    },

    speciesData: {
        textAlign: "center",
        fontSize: 20,
        textTransform: "uppercase",
        lineHeight: 20,
        color: "#20201D"
    },

    plantDataContainer: {
        width: "100%",
        alignItems: "center"
    },

    locationContainer: {
        backgroundColor: "#DFDFD9",
        width: "80%",
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderRadius: 23,
        flexDirection: "row",
        gap: 20
    },

    dataTitle: {
        fontSize: 16,
        fontWeight: "300",
        lineHeight: 16,
        color: "#20201D"
    },

    dataText: {
        fontSize: 32,
        fontWeight: "bold",
        lineHeight: 32,
        color: "#20201D"
    },

    waterLightContainer: {
        marginTop: 20,
        width: "80%",
        flexDirection: "row",
        gap: 20,
        height: 80,
    },

    waterContainer: {
        backgroundColor: "#DFDFD9",
        flexGrow: 50,
        justifyContent: "flex-start",
        alignItems: "center",
        borderRadius: 23,
        flexDirection: "row",
        paddingHorizontal: 10
    },

    lightContainer: {
        backgroundColor: "#DFDFD9",
        flexGrow: 50,
        justifyContent: "flex-start",
        alignItems: "center",
        borderRadius: 23,
        flexDirection: "row",
        gap: 10,
        paddingHorizontal: 10
    },

    waterLightData: {
        fontSize: 20,
        fontWeight: "bold",
        lineHeight: 20,
        color: "#20201D"
    },

    diarySectionContainer: {
        marginTop: 60,
        height: 392,
        width: "100%",
        padding: 20,
        //backgroundColor: "red",
    },

    diaryTitleContainer: {
        // backgroundColor: "red",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },

    diaryTitle: {
        fontSize: 48,
        fontWeight: "bold",
        color: "#20201D",
        lineHeight: 48,
        marginLeft: 20
    },

    addDiaryButton: {
        backgroundColor: "#5B6E4E",
        borderRadius: 23,
        paddingHorizontal: 25,
        paddingVertical: 5,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 20
    },

    addDiaryText: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#fff",
        letterSpacing: 3,
        textAlign: "center"
    },

    diaryContainer: {
        // backgroundColor: "blue",
        height: 230,
        width: "100%",
        // padding: 10,
        // margin: 10,
        // flex: 6,
        marginTop: 20
    },

})

export default PlantScreen;