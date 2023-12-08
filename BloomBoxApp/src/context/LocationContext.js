import React, {createContext, useContext, useEffect, useState} from "react";
import axios from "axios";
import {BASE_URL} from "../config";
import asyncStorage from "@react-native-async-storage/async-storage/src/AsyncStorage";
import {AuthContext} from "./AuthContext";
import {PlantContext} from "./PlantContext";

export const LocationContext = createContext();

export const LocationProvider = ({children}) => {
    const [locations, setLocations] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const {userInfo} = useContext(AuthContext);

    const getAllLocationForUser = () => {
        setIsLoading(true);
        axios.get(`${BASE_URL}/locations/user/${userInfo.userId}`)
            .then(res => {
                let data = res.data;
                setLocations(data);
                console.log(locations);
                setIsLoading(false);
            }).catch(e => {
                console.log(`location fetch error ${e}`);
                setIsLoading(false);
        })
    }

    return(
        <LocationContext.Provider value={{isLoading, locations, getAllLocationForUser}}>
            {children}
        </LocationContext.Provider>
    );

}