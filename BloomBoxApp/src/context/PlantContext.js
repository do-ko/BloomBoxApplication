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

    const addPlant = (locationId, plantName, plantDescription, light, water, imageUrl) => {
        // console.log(`${BASE_URL}/plants`);
        setIsLoading(true);
        axios.post(`${BASE_URL}/plants`, {
            locationId: locationId,
            userId: userInfo.userId,
            plantName: plantName,
            description: plantDescription,
            light: light,
            water: water,
            imageUrl: imageUrl
        }).then(res => {
            let newPlant = res.data;
            console.log(newPlant);
            setIsLoading(false);
        }).catch(e => {
            console.log(`plant adding error ${e}`);
            setIsLoading(false);

        })
    }

    return(
        <PlantContext.Provider value={{isLoading, plants, getAllPlants, addPlant}}>
            {children}
        </PlantContext.Provider>
    );
}