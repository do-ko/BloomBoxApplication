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


const DatePickerComponent = () => {
    const [date, setDate] = useState(new Date());
  
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
        {/* <Text>{date.toLocaleString()}</Text>
        <Button onPress={showDatepicker} title="Select date" /> */}
        {/* <Button onPress={showTimepicker} title="Show time picker!" /> */}
        <Pressable onPress={showDatepicker}>
            <Text style={styles.dateText}>{date.toLocaleString()}</Text>
        </Pressable>
      </SafeAreaView>
    );
  };
  
const styles = StyleSheet.create({
    datePickerContainer: {
        
    },
    
    dateText: {
        fontSize: 16,
    },
})
  
  
  export default DatePickerComponent;