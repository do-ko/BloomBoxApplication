import React, {useContext, useEffect, useState} from "react";
import {Animated, FlatList, Image, Pressable, ScrollView, StyleSheet, Text, View} from "react-native";
import {DiaryContext} from "../context/DiaryContext";
import BackSvg from "../images/SVGs/BackButton";
import {BASE_URL} from "../config";
import {AuthContext} from "../context/AuthContext";
import LocationSvg from "../images/SVGs/Location";
import {LocationContext} from "../context/LocationContext";
import DropletFilledBigSvg from "../images/SVGs/DropletFilledBig";
import SunFilledBig from "../images/SVGs/SunFilledBig";
import BigEditSvg from "../images/SVGs/BigEdit";
import ReverseGradientSvg from "../images/SVGs/ReverseGradient";
import Spinner from "react-native-loading-spinner-overlay";
import DiaryComponent from "../components/DiaryComponent";
import {Calendar} from "react-native-calendars";
import ReminderPlantScreen from "../components/ReminderPlantScreen";
import {RemainderContext} from "../context/RemainderContext";
import {ExpandingDot} from "react-native-animated-pagination-dots";
import EmptyListComponent from "../components/EmptyListComponent";


const PlantScreen = ({route, navigation}) => {
    const {plant} = route.params;
    const {userInfo} = useContext(AuthContext);
    const {getAllDiariesForPlant, diaries, addDiary, isLoadingDiary} = useContext(DiaryContext);
    const {getAllLocationForUser, locations, isLoading} = useContext(LocationContext);
    const {remainders} = useContext(RemainderContext);

    const [items, setItems] = useState({});
    const [currentDay, setCurrentDay] = useState("")
    const [todayDate, setTodayDate] = useState("")
    const [markedDatesOnCal, setMarkedDatesOnCal] = useState({})
    const [tasks, setTasks] = useState({})
    const [tasksForToday, setTasksForToday] = useState([])
    const scrollX = React.useRef(new Animated.Value(0)).current;


    useEffect(() => {
        getAllDiariesForPlant(plant.plantId);
        getAllLocationForUser();
        formatMarkedDots();
        let today = new Date();
        let todayDateString = `${today.getFullYear()}-${today.getMonth() + 1 < 10 ? "0" + (today.getMonth() + 1) : today.getMonth() + 1}-${today.getDate() < 10 ? "0" + today.getDate() : today.getDate()}`
        getRemaindersForToday(todayDateString);
    }, [])


    const formatMarkedDots = () => {
        let remaindersForPlant = remainders.filter(rem => rem.plantId === plant.plantId);
        let today = new Date();
        let todayDateString = `${today.getFullYear()}-${today.getMonth() + 1 < 10 ? "0" + (today.getMonth() + 1) : today.getMonth() + 1}-${today.getDate() < 10 ? "0" + today.getDate() : today.getDate()}`
        setCurrentDay(todayDateString);
        setTodayDate(todayDateString);
        let formattedTasks = {}
        remaindersForPlant.forEach((remainder) => {
            let date = new Date(Date.parse(remainder.remainderDay));
            let dateString = `${date.getFullYear()}-${date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1}-${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}`;
            if (dateString === todayDateString) {
                formattedTasks[dateString] = {
                    marked: true,
                    dotColor: "#FFFFFF",
                    selected: true,
                    selectedColor: '#5B6E4E'
                };
            } else {
                formattedTasks[dateString] = {
                    marked: true,
                    dotColor: "#5B6E4E",
                    selected: false,
                    selectedColor: '#5B6E4E'
                };
            }
        });

        if (formattedTasks[todayDateString] === undefined) {
            formattedTasks[todayDateString] = {selected: true, selectedColor: '#8AA578'};
        }

        setMarkedDatesOnCal(formattedTasks);
    }

    const getRemaindersForToday = (dateStringInput) => {
        let remaindersForPlant = remainders.filter(rem => rem.plantId === plant.plantId);
        let remToday = []
        remaindersForPlant.forEach((remainder) => {
            let date = new Date(Date.parse(remainder.remainderDay));
            let dateString = `${date.getFullYear()}-${date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1}-${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}`;
            if (dateString === dateStringInput) {
                remToday.push(remainder);
            }
        });
        setTasksForToday(remToday);
    }


    return (
        <ScrollView>
            <View style={styles.appContainer}>
                <View style={styles.imageNameContainer}>
                    <View style={styles.imageContainer}>
                        <View style={{overflow: "hidden"}}>
                            <View style={styles.image}>
                                <Image
                                    source={{uri: BASE_URL + "/images/download/" + userInfo.userId + "/plant/" + plant.image}}
                                    style={styles.imageStyle}/>
                            </View>
                        </View>
                        <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
                            <BackSvg/>
                        </Pressable>


                        <Pressable style={styles.saveButton} onPress={() => navigation.navigate("EditPlant", {plant})}>
                            <BigEditSvg/>
                        </Pressable>

                        <View style={styles.nameDataContainer}>
                            <View style={styles.nameSpeciesContainer}>
                                {plant.plantName.length <= 7 ?
                                    <Text style={styles.nameData(48)}>{plant.plantName}</Text> :
                                    <Text style={styles.nameData(32)}>{plant.plantName}</Text>}
                            </View>

                            <View style={styles.nameSpeciesContainer}>
                                {plant.species.length <= 15
                                    ? <Text style={styles.speciesData(20)}>{plant.species}</Text>
                                    : (plant.species.length <= 23
                                        ? <Text style={styles.speciesData(16)}>{plant.species}</Text>
                                        : (plant.species.length <= 30
                                            ? <Text style={styles.speciesData(12)}>{plant.species}</Text>
                                            : (plant.species.length <= 35
                                                ? <Text style={styles.speciesData(10)}>{plant.species}</Text>
                                                : <Text style={styles.speciesData(8)}>{plant.species}</Text>)))}

                            </View>
                        </View>


                    </View>
                </View>

                <View style={styles.plantDataContainer}>
                    <View style={styles.locationContainer}>
                        <LocationSvg/>
                        <View>
                            <Text style={styles.dataTitle}>LOCATION</Text>
                            {plant.locationId === null
                                ? <Text style={styles.dataText(32)}>not specified</Text>
                                : (isLoading
                                    ? <Text style={styles.dataText(32)}>loading</Text>
                                    : (locations.filter(location => location.locationId === plant.locationId)[0].locationName.length <= 10
                                        ? <Text
                                            style={styles.dataText(32)}>{locations.filter(location => location.locationId === plant.locationId)[0].locationName}</Text>
                                        : (locations.filter(location => location.locationId === plant.locationId)[0].locationName.length <= 13
                                            ? <Text
                                                style={styles.dataText(24)}>{locations.filter(location => location.locationId === plant.locationId)[0].locationName}</Text>
                                            : (locations.filter(location => location.locationId === plant.locationId)[0].locationName.length <= 16)
                                                ? <Text
                                                    style={styles.dataText(20)}>{locations.filter(location => location.locationId === plant.locationId)[0].locationName}</Text>
                                                : (locations.filter(location => location.locationId === plant.locationId)[0].locationName.length <= 18
                                                    ? <Text
                                                        style={styles.dataText(18)}>{locations.filter(location => location.locationId === plant.locationId)[0].locationName}</Text>
                                                    : (locations.filter(location => location.locationId === plant.locationId)[0].locationName.length <= 20
                                                        ? <Text
                                                            style={styles.dataText(16)}>{locations.filter(location => location.locationId === plant.locationId)[0].locationName}</Text>
                                                        : <Text
                                                            style={styles.dataText(14)}>{locations.filter(location => location.locationId === plant.locationId)[0].locationName}</Text>)))))}
                        </View>
                    </View>

                    <View style={styles.waterLightContainer}>
                        <View style={styles.waterContainer}>
                            <DropletFilledBigSvg/>
                            <View>
                                <Text style={styles.dataTitle}>WATER</Text>
                                <Text style={styles.waterLightData}>{plant.water}/5</Text>
                            </View>
                        </View>

                        <View style={styles.lightContainer}>
                            <SunFilledBig/>
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
                        <Text style={styles.Title}>Diary</Text>
                        <Pressable style={({pressed}) => [
                            {
                                opacity: pressed
                                    ? 0.5
                                    : 1,
                                backgroundColor: '#5B6E4E'
                            },
                            styles.addDiaryButton
                        ]} onPress={() => navigation.navigate("AddDiary", {plant})}>
                            <Text style={styles.addDiaryText}>ADD</Text>
                        </Pressable>
                    </View>

                    <View style={styles.diaryContainer}>
                        <Spinner visible={isLoadingDiary}/>
                        {diaries.length === 0 ? <EmptyListComponent type={"diaries"} color={"#5B6E4E"}/>
                            :
                            <FlatList horizontal={true} data={diaries.sort((d1, d2) => {
                                return new Date(Date.parse(d2.entryDate)) - new Date(Date.parse(d1.entryDate));
                            })} extraData={diaries} refreshing={false} style={{flex: 1}}
                                      keyExtractor={(item) => item.diaryId} renderItem={({item}) => {
                                if (item.empty === true) {
                                    return <View style={styles.itemInvisible}/>
                                }
                                return (
                                    <DiaryComponent navigation={navigation} diary={item} plant={plant}/>
                                );
                            }}
                            />}
                    </View>
                </View>


                <View style={styles.calendarSectionContainer}>
                    <View style={styles.calendarTitleContainer}>
                        <Text style={styles.Title}>Calendar</Text>
                    </View>
                    <View>
                        <Calendar
                            onDayPress={day => {
                                let tempArrayWithDates = markedDatesOnCal;
                                if (currentDay !== todayDate) {
                                    if (tempArrayWithDates[currentDay].marked === undefined) {
                                        tempArrayWithDates[currentDay] = {selected: false};
                                    } else {
                                        tempArrayWithDates[currentDay] = {
                                            selected: false,
                                            marked: true,
                                            dotColor: "#5B6E4E"
                                        }
                                    }
                                } else {
                                    if (tempArrayWithDates[currentDay].marked === undefined) {
                                        tempArrayWithDates[currentDay] = {selected: true, selectedColor: "#DFDFD9"};
                                    } else {
                                        tempArrayWithDates[currentDay] = {
                                            selected: true,
                                            marked: true,
                                            dotColor: "#5B6E4E",
                                            selectedColor: "#DFDFD9"
                                        }
                                    }
                                }

                                if (tempArrayWithDates[day.dateString] === undefined) {
                                    tempArrayWithDates[day.dateString] = {selected: true, selectedColor: "#8AA578"};
                                } else {
                                    if (tempArrayWithDates[day.dateString].marked === undefined) {
                                        tempArrayWithDates[day.dateString] = {selected: true, selectedColor: "#8AA578"};
                                    } else {
                                        tempArrayWithDates[day.dateString] = {
                                            selected: true,
                                            selectedColor: "#5B6E4E",
                                            marked: true,
                                            dotColor: "#fff"
                                        };
                                    }
                                }

                                setMarkedDatesOnCal(tempArrayWithDates);
                                setCurrentDay(day.dateString)
                                getRemaindersForToday(day.dateString);

                            }}
                            monthFormat={'yyyy MM'}
                            firstDay={1}
                            onPressArrowLeft={subtractMonth => subtractMonth()}
                            onPressArrowRight={addMonth => addMonth()}
                            enableSwipeMonths={true}
                            markedDates={markedDatesOnCal}
                        />

                        <View style={styles.remainderContainer}>
                            <FlatList
                                data={tasksForToday}
                                renderItem={({item}) => (
                                    <ReminderPlantScreen reminder={item}/>
                                )}
                                keyExtractor={(item) => item.remainderId.toString()}
                                horizontal={true}
                                pagingEnabled
                                decelerationRate={'normal'}
                                scrollEventThrottle={16}
                                showsHorizontalScrollIndicator={false}
                                onScroll={Animated.event(
                                    [{nativeEvent: {contentOffset: {x: scrollX}}}],
                                    {
                                        useNativeDriver: false,
                                    }
                                )}
                            />

                            <ExpandingDot
                                data={tasksForToday}
                                expandingDotWidth={30}
                                scrollX={scrollX}
                                inActiveDotOpacity={0.6}
                                dotStyle={{
                                    width: 10,
                                    height: 10,
                                    backgroundColor: "#8AA578",
                                    borderRadius: 5,
                                    marginHorizontal: 5
                                }}
                                containerStyle={{
                                    bottom: 30,
                                }}
                            />
                        </View>
                    </View>


                </View>

            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
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
    },

    nameData: (fontSize) => ({
        textAlign: "center",
        fontSize: fontSize,
        fontWeight: "bold",
        lineHeight: 48,
        color: "#20201D"
    }),

    speciesData: (fontSize) => ({
        textAlign: "center",
        fontSize: fontSize,
        textTransform: "uppercase",
        lineHeight: 20,
        color: "#20201D"
    }),

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

    dataText: (fontSize) => ({
        fontSize: fontSize,
        fontWeight: "bold",
        lineHeight: 32,
        color: "#20201D"
    }),

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
        width: "100%",
        padding: 20,
    },

    diaryTitleContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },

    diaryTitle: {},

    Title: {
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
        height: 230,
        width: "100%",
        marginTop: 20
    },

    calendarSectionContainer: {
        marginTop: 30,
        width: "100%",
        padding: 20,
    },

    calendarTitleContainer: {
        marginBottom: 20
    },

    remainderContainer: {
        marginTop: 20,
        alignItems: "center"
    }

})

export default PlantScreen;