import React, {createContext, useContext, useEffect, useState} from "react";
import axios from "axios";
import {BASE_URL} from "../config";
import asyncStorage from "@react-native-async-storage/async-storage/src/AsyncStorage";
import {AuthContext} from "./AuthContext";
import {ImageContext} from "./ImageContext";

export const PlantContext = createContext();

export const PlantProvider = ({children}) => {
    const [plants, setPlants] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const {userInfo} = useContext(AuthContext);
    const {uploadImage} = useContext(ImageContext);

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

    const addPlant = (locationId, plantName, plantDescription, light, water, image, imageUrl) => {
        // console.log(`${BASE_URL}/plants`);
        setIsLoading(true);

        uploadImage(image, userInfo.userId);

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
            setPlants([...plants, newPlant]);
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