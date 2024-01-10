import React, {useContext, useEffect, useState} from "react";
import {
    Animated,
    Button,
    Dimensions,
    FlatList,
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput, TouchableOpacity,
    View, VirtualizedList
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
import {red} from "react-native-reanimated/src";
import {Agenda, Calendar} from "react-native-calendars";
import {Card, Avatar} from 'react-native-paper';
import ReminderComponent2 from "../components/ReminderComponent2";
import {RemainderContext} from "../context/RemainderContext";
import {ExpandingDot} from "react-native-animated-pagination-dots";



import { Menu, MenuProvider, MenuTrigger, MenuOptions, MenuOption} from "react-native-popup-menu";


const PlantScreen = ({route, navigation}) => {
    // plant contains all parameters of current plant
    // diaries contains all parameters belonging to this plant
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

    // const testDates = {
    //     '2024-01-08': {selected: true, marked: true, selectedColor: 'blue'},
    //     '2024-01-09': {marked: true},
    //     '2024-01-10': {marked: true, dotColor: 'red', activeOpacity: 0},
    //     '2024-01-11': {disabled: true, disableTouchEvent: true}
    // };

    useEffect(() => {
        getAllDiariesForPlant(plant.plantId);
        getAllLocationForUser();
        // setTasks(remainders.filter(rem => rem.plantId === plant.plantId));
        formatMarkedDots();
        let today = new Date();
        let todayDateString = `${today.getFullYear()}-${today.getMonth()+1 < 10 ? "0" + (today.getMonth()+1) : today.getMonth()+1}-${today.getDate() < 10 ? "0" + today.getDate() : today.getDate()}`
        getRemaindersForToday(todayDateString);
    }, [])

    // useEffect(() => {
    //     getAllLocationForUser();
    // }, [locations])


    const formatMarkedDots = () => {
        let remaindersForPlant = remainders.filter(rem => rem.plantId === plant.plantId);
        let today = new Date();
        let todayDateString = `${today.getFullYear()}-${today.getMonth()+1 < 10 ? "0" + (today.getMonth()+1) : today.getMonth()+1}-${today.getDate() < 10 ? "0" + today.getDate() : today.getDate()}`
        setCurrentDay(todayDateString);
        setTodayDate(todayDateString);
        console.log(todayDateString);
        let formattedTasks = {}
        console.log(remaindersForPlant);
        remaindersForPlant.forEach((remainder) => {
            let date = new Date(Date.parse(remainder.remainderDay));
            let dateString = `${date.getFullYear()}-${date.getMonth()+1 < 10 ? "0" + (date.getMonth()+1) : date.getMonth()+1}-${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}`;
            // console.log(dateString);
            // let markedTask;
            // if (dateString === todayDateString){
            //     markedTask = {[dateString]: {marked: true, dotColor: "#5B6E4E", customStyles: {
            //                 container: {
            //                     backgroundColor: 'green'
            //                 },
            //                 text: {
            //                     color: 'black',
            //                     fontWeight: 'bold'
            //                 }
            //             }}}
            // } else {
            //     markedTask = {[dateString]: {marked: true, dotColor: "#5B6E4E"}}
            // }
            // console.log(markedTask);
            if (dateString === todayDateString){
                formattedTasks[dateString] = {marked: true, dotColor: "#FFFFFF", selected: true, selectedColor: '#5B6E4E'};
            } else {
                formattedTasks[dateString] = {marked: true, dotColor: "#5B6E4E", selected: false, selectedColor: '#5B6E4E'};
            }
            // formattedTasks[dateString] = {marked: true, dotColor: "#5B6E4E"};
            // console.log(formattedTasks);
        });

        // console.log("haha");
        // console.log(formattedTasks['20-01-2014'])
        if (formattedTasks[todayDateString] === undefined){
            // console.log("hehe")
            formattedTasks[todayDateString] = {selected: true, selectedColor: '#8AA578'};
        }

        // console.log(formattedTasks);
        setMarkedDatesOnCal(formattedTasks);
        // setTasks(formattedTasks);
    }

    const getRemaindersForToday = (dateStringInput) => {
        let remaindersForPlant = remainders.filter(rem => rem.plantId === plant.plantId);
        let remToday = []
        remaindersForPlant.forEach((remainder) => {
            let date = new Date(Date.parse(remainder.remainderDay));
            let dateString = `${date.getFullYear()}-${date.getMonth()+1 < 10 ? "0" + (date.getMonth()+1) : date.getMonth()+1}-${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}`;
            if (dateString === dateStringInput){
                remToday.push(remainder);
            }
        });
        // console.log(remToday);
        setTasksForToday(remToday);
        // return remToday;
    }

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
                                <Image source={{uri: BASE_URL + "/images/download/" + userInfo.userId + "/plant/" + plant.image}} style={styles.imageStyle} />
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
                        <Pressable style={styles.addDiaryButton} onPress={() => navigation.navigate("AddDiary", {plant})}>
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


                <View style={styles.calendarSectionContainer}>
                    <View style={styles.calendarTitleContainer}>
                        {/*    TITLE AND BUTTON*/}
                        <Text style={styles.Title}>Calendar</Text>
                    </View>
                    <View>
                        <Calendar
                            // Handler which gets executed on day press. Default = undefined
                            onDayPress={day => {
                                let tempArrayWithDates = markedDatesOnCal;

                                // 1. handle old selected:
                                if (currentDay !== todayDate){
                                //     if old selected is not today's date
                                    if (tempArrayWithDates[currentDay].marked === undefined){
                                        //     if old selected was not marked:
                                        tempArrayWithDates[currentDay] = {selected: false};
                                    } else {
                                        //     if old select was marked:
                                        tempArrayWithDates[currentDay] = {selected: false, marked: true, dotColor: "#5B6E4E"}
                                    }
                                } else {
                                    if (tempArrayWithDates[currentDay].marked === undefined){
                                        //     if old selected was not marked:
                                        tempArrayWithDates[currentDay] = {selected: true, selectedColor: "#DFDFD9"};
                                    } else {
                                        //     if old select was marked:
                                        tempArrayWithDates[currentDay] = {selected: true, marked: true, dotColor: "#5B6E4E", selectedColor: "#DFDFD9"}
                                    }
                                }


                                // 2. handle new selected:
                                if (tempArrayWithDates[day.dateString] === undefined){
                                //     if new selected not in markedDots yet (not a task day)
                                    tempArrayWithDates[day.dateString] = {selected: true, selectedColor: "#8AA578"};
                                } else {
                                    if (tempArrayWithDates[day.dateString].marked === undefined){
                                            // if new selected is not marked
                                            tempArrayWithDates[day.dateString] = {selected: true, selectedColor: "#8AA578"};
                                        } else {
                                            // if new selected is marked
                                            tempArrayWithDates[day.dateString] = {selected: true, selectedColor: "#5B6E4E", marked: true, dotColor: "#fff"};
                                        }
                                }

                                setMarkedDatesOnCal(tempArrayWithDates);

                                // change current day
                                setCurrentDay(day.dateString)

                                getRemaindersForToday(day.dateString);

                            }}
                            // // Handler which gets executed on day long press. Default = undefined
                            // onDayLongPress={day => {
                            //     console.log('selected day', day);
                            // }}
                            // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
                            monthFormat={'yyyy MM'}
                            // Handler which gets executed when visible month changes in calendar. Default = undefined
                            onMonthChange={month => {
                                console.log('month changed', month);
                            }}

                            // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday
                            firstDay={1}
                            // Handler which gets executed when press arrow icon left. It receive a callback can go back month
                            onPressArrowLeft={subtractMonth => subtractMonth()}
                            // Handler which gets executed when press arrow icon right. It receive a callback can go next month
                            onPressArrowRight={addMonth => addMonth()}

                            // Enable the option to swipe between months. Default = false
                            enableSwipeMonths={true}

                            markedDates={markedDatesOnCal}
                        />

                        <View style={styles.remainderContainer}>
                            {/*<Text>Day: {day.day}</Text>*/}
                            {/*<ReminderComponent2 />*/}
                            <FlatList
                                data={tasksForToday}
                                renderItem={({ item }) => (
                                    <ReminderComponent2 remainder={item}/>
                                )}
                                keyExtractor={(item) => item.remainderId.toString()}
                                horizontal={true}
                                pagingEnabled
                                decelerationRate={'normal'}
                                scrollEventThrottle={16}
                                showsHorizontalScrollIndicator={false}
                                onScroll={Animated.event(
                                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
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
        // height: 392,
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
        // backgroundColor: "blue",
        height: 230,
        width: "100%",
        // padding: 10,
        // margin: 10,
        // flex: 6,
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
        // backgroundColor: "red",
        alignItems: "center"
    }

})

export default PlantScreen;