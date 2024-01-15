import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import React, {useContext, useEffect, useLayoutEffect, useRef, useState} from "react";
import {
    Alert,
    Button,
    Dimensions,
    Image,
    Pressable,
    SafeAreaView, ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View
} from "react-native";


const DatePickerComponent = ({date, setDate}) => {
    //const [date, setDate] = useState(date);
  
    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate;
      setDate(currentDate);
    };
  
    const showMode = (currentMode) => {
      DateTimePickerAndroid.open({
        value: date,
        onChange,
        mode: currentMode,
        is24Hour: true,
      });
    };
  
    const showDatepicker = () => {
      showMode('date');
    };
  
    const showTimepicker = () => {
      showMode('time');
    };
  
    return (
      <SafeAreaView style={styles.datePickerContainer}>
        <Pressable onPress={showDatepicker}>
            {/* <Text style={styles.dateText}>{date.toLocaleString()}</Text> */}
            <View  style={styles.diaryDateContainer} >
                <Text style={styles.diaryDateText}>{date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}</Text>
                <Text style={styles.diaryDateMonthText}>{date.toLocaleString('default', { month: 'long' })}</Text>
                <Text style={styles.diaryDateText}>{date.getFullYear()}</Text>
            </View>
        </Pressable>
      </SafeAreaView>
    );
  };
  
const styles = StyleSheet.create({
    datePickerContainer: {
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
    },
    
    showDatepicker: {
      flex: 1,
    },
    
    // dateText: {
    //     fontSize: 16,
    // },
    
    diaryDateContainer: {
        width: "80%",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        gap: 5
        // backgroundColor: "green"
    },
    
    diaryDateText: {
        fontSize: 20,
        fontWeight: "300",
        color: "#20201D",
        lineHeight: 20,
    },

    diaryDateMonthText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#DDB790",
        lineHeight: 20,
        textTransform: "uppercase"
    },
})
  
  
  export default DatePickerComponent;