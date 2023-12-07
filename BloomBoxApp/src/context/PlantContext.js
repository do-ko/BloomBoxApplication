import React, {createContext, useContext, useEffect, useState} from "react";
import axios from "axios";
import {BASE_URL} from "../config";
import asyncStorage from "@react-native-async-storage/async-storage/src/AsyncStorage";
import {AuthContext} from "./AuthContext";

export const PlantContext = createContext();

export const PlantProvider = ({children}) => {
    const [plants, setPlants] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const {userInfo} = useContext(AuthContext);
    // console.log(userInfo.userId);
    const getAllPlants = () => {
        // console.log(`${BASE_URL}/plants/user/${userInfo.userId}`);
        setIsLoading(true);
        axios.get(`${BASE_URL}/plants/user/${userInfo.userId}`)
            .then(res => {
                // console.log(res.data);
                let data = res.data;
                setPlants(data);
                // console.log(plants);
                setIsLoading(false);
            })
            .catch(e => {
                console.log(`fetch all plants error ${e}`)
                setIsLoading(false);
            })
    }

    return(
        <PlantContext.Provider value={{isLoading, plants, getAllPlants}}>
            {children}
        </PlantContext.Provider>
    );
}