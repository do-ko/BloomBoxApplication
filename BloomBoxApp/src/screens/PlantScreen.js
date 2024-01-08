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



const PlantScreen = ({route, navigation}) => {
    // plant contains all parameters of current plant
    // diaries contains all parameters belonging to this plant
    const {plant} = route.params;
    const {userInfo} = useContext(AuthContext);
    const {getAllDiariesForPlant, diaries, addDiary, isLoadingDiary} = useContext(DiaryContext);
    const {getAllLocationForUser, locations, isLoading} = useContext(LocationContext);
    const {remainders} = useContext(RemainderContext);

    const [items, setItems] = useState({});
    const [day, setDay] = useState({})
    const [tasks, setTasks] = useState({})
    const [tasksForToday, setTasksForToday] = useState([])
    const scrollX = React.useRef(new Animated.Value(0)).current;

    const testDates = {
        '2024-01-08': {selected: true, marked: true, selectedColor: 'blue'},
        '2024-01-09': {marked: true},
        '2024-01-10': {marked: true, dotColor: 'red', activeOpacity: 0},
        '2024-01-11': {disabled: true, disableTouchEvent: true}
    };

    useEffect(() => {
        getAllDiariesForPlant(plant.plantId);
        getAllLocationForUser();
        // setTasks(remainders.filter(rem => rem.plantId === plant.plantId));
        formatMarkedDots();
    }, [])


    const formatMarkedDots = () => {
        let remaindersForPlant = remainders.filter(rem => rem.plantId === plant.plantId);
        let formattedTasks = {}
        console.log(remaindersForPlant);
        remaindersForPlant.forEach((remainder) => {
            let date = new Date(Date.parse(remainder.remainderDay));
            let dateString = `${date.getFullYear()}-${date.getMonth()+1 < 10 ? "0" + (date.getMonth()+1) : date.getMonth()+1}-${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}`;
            // console.log(dateString);
            let markedTask = {[dateString]: {marked: true, dotColor: "#5B6E4E"}}
            console.log(markedTask);
            formattedTasks[dateString] = {marked: true, dotColor: "#5B6E4E"};
            console.log(formattedTasks);
            // setTasks({...tasks, [dateString]: {marked: true, dotColor: "#5B6E4E"}})
        });
        setTasks(formattedTasks);
    }

    const getRemainderForToday = (dateStringInput) => {
        let remaindersForPlant = remainders.filter(rem => rem.plantId === plant.plantId);
        let remToday = []
        remaindersForPlant.forEach((remainder) => {
            let date = new Date(Date.parse(remainder.remainderDay));
            let dateString = `${date.getFullYear()}-${date.getMonth()+1 < 10 ? "0" + (date.getMonth()+1) : date.getMonth()+1}-${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}`;
            if (dateString === dateStringInput){
                remToday.push(remainder);
            }
        });
        console.log(remToday);
        setTasksForToday(remToday);
        return remToday;
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
                        <Text style={styles.Title}>Diary</Text>
                        <Pressable style={styles.addDiaryButton} onPress={() => navigation.navigate("AddDiary")}>
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
                        {/*<Agenda*/}
                        {/*    // The list of items that have to be displayed in agenda. If you want to render item as empty date*/}
                        {/*    // the value of date key has to be an empty array []. If there exists no value for date key it is*/}
                        {/*    // considered that the date in question is not yet loaded*/}
                        {/*    items={{*/}
                        {/*        '2024-01-08': [{name: 'item 1 - any js object'}],*/}
                        {/*        '2024-01-09': [{name: 'item 2 - any js object', height: 80}],*/}
                        {/*        '2024-01-11': [],*/}
                        {/*        '2024-01-12': [{name: 'item 3 - any js object'}, {name: 'any js object'}]*/}
                        {/*    }}*/}
                        {/*    // Callback that gets called when items for a certain month should be loaded (month became visible)*/}
                        {/*    loadItemsForMonth={month => {*/}
                        {/*        console.log('trigger items loading');*/}
                        {/*    }}*/}
                        {/*    // Callback that fires when the calendar is opened or closed*/}
                        {/*    onCalendarToggled={calendarOpened => {*/}
                        {/*        console.log(calendarOpened);*/}
                        {/*    }}*/}
                        {/*    // Callback that gets called on day press*/}
                        {/*    onDayPress={day => {*/}
                        {/*        console.log('day pressed');*/}
                        {/*    }}*/}
                        {/*    // Callback that gets called when day changes while scrolling agenda list*/}
                        {/*    onDayChange={day => {*/}
                        {/*        console.log('day changed');*/}
                        {/*    }}*/}
                        {/*    // Initially selected day*/}
                        {/*    selected={'2024-01-07'}*/}
                        {/*    // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined*/}
                        {/*    // minDate={'2012-05-10'}*/}
                        {/*    // // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined*/}
                        {/*    // maxDate={'2012-05-30'}*/}
                        {/*    // Max amount of months allowed to scroll to the past. Default = 50*/}
                        {/*    pastScrollRange={50}*/}
                        {/*    // Max amount of months allowed to scroll to the future. Default = 50*/}
                        {/*    futureScrollRange={50}*/}
                        {/*    // Specify how each item should be rendered in agenda*/}
                        {/*    // renderItem={(item, firstItemInDay) => {*/}
                        {/*    //     return <View><Text>ITEM</Text></View>;*/}
                        {/*    // }}*/}
                        {/*    // Specify how each date should be rendered. day can be undefined if the item is not first in that day*/}
                        {/*    // renderDay={(day, item) => {*/}
                        {/*    //     return <View />;*/}
                        {/*    // }}*/}
                        {/*    // Specify how empty date content with no items should be rendered*/}
                        {/*    // renderEmptyDate={() => {*/}
                        {/*    //     return <View />;*/}
                        {/*    // }}*/}
                        {/*    // // Specify how agenda knob should look like*/}
                        {/*    // renderKnob={() => {*/}
                        {/*    //     return <View />;*/}
                        {/*    // }}*/}
                        {/*    // Specify what should be rendered instead of ActivityIndicator*/}
                        {/*    // renderEmptyData={() => {*/}
                        {/*    //     return <View />;*/}
                        {/*    // }}*/}
                        {/*    // Specify your item comparison function for increased performance*/}
                        {/*    rowHasChanged={(r1, r2) => {*/}
                        {/*        return r1.text !== r2.text;*/}
                        {/*    }}*/}
                        {/*    // Hide knob button. Default = false*/}
                        {/*    // hideKnob={true}*/}
                        {/*    // When `true` and `hideKnob` prop is `false`, the knob will always be visible and the user will be able to drag the knob up and close the calendar. Default = false*/}
                        {/*    // showClosingKnob={false}*/}
                        {/*    // By default, agenda dates are marked if they have at least one item, but you can override this if needed*/}
                        {/*    markedDates={{*/}
                        {/*        '2024-01-08': {selected: true, marked: true},*/}
                        {/*        '2024-01-09': {marked: true},*/}
                        {/*        '2024-01-10': {disabled: true}*/}
                        {/*    }}*/}
                        {/*    // If disabledByDefault={true} dates flagged as not disabled will be enabled. Default = false*/}
                        {/*    // disabledByDefault={true}*/}
                        {/*    // If provided, a standard RefreshControl will be added for "Pull to Refresh" functionality. Make sure to also set the refreshing prop correctly*/}
                        {/*    onRefresh={() => console.log('refreshing...')}*/}
                        {/*    // Set this true while waiting for new data from a refresh*/}
                        {/*    refreshing={false}*/}
                        {/*    // Add a custom RefreshControl component, used to provide pull-to-refresh functionality for the ScrollView*/}
                        {/*    refreshControl={null}*/}
                        {/*    // Agenda theme*/}
                        {/*    // theme={{*/}
                        {/*    //     ...calendarTheme,*/}
                        {/*    //     agendaDayTextColor: 'yellow',*/}
                        {/*    //     agendaDayNumColor: 'green',*/}
                        {/*    //     agendaTodayColor: 'red',*/}
                        {/*    //     agendaKnobColor: 'blue'*/}
                        {/*    // }}*/}
                        {/*    // Agenda container style*/}
                        {/*    style={{}}*/}
                        {/*/>*/}
                        {/*<Agenda*/}
                        {/*    items={items}*/}
                        {/*    loadItemsForMonth={loadItems}*/}
                        {/*    selected={'2017-05-16'}*/}
                        {/*    renderItem={renderItem}*/}
                        {/*/>*/}
                        <Calendar
                            // Handler which gets executed on day press. Default = undefined
                            onDayPress={day => {
                                console.log('selected day', day);
                                setDay(day);
                                console.log("today task:" + getRemainderForToday(day.dateString))
                                // setTasks(testDates["2024-01-08"])
                                console.log('tasks', tasks);
                            //     HERE SET TASKS FOR FLATLIST WITH REMINDERS BELOW
                            }}
                            // Handler which gets executed on day long press. Default = undefined
                            onDayLongPress={day => {
                                console.log('selected day', day);
                            }}
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

                            markedDates={tasks}
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