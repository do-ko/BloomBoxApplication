import React, {createContext, useContext, useEffect, useState} from "react";
import axios from "axios";
import {BASE_URL} from "../config";
import asyncStorage from "@react-native-async-storage/async-storage/src/AsyncStorage";
import {AuthContext} from "./AuthContext";
import {PlantContext} from "./PlantContext";
import {ImageContext} from "./ImageContext";

export const LocationContext = createContext();

export const LocationProvider = ({children}) => {
    const [locations, setLocations] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const {userInfo} = useContext(AuthContext);
    const {uploadImage} = useContext(ImageContext);

    const getAllLocationForUser = () => {
        setIsLoading(true);
        axios.get(`${BASE_URL}/locations/user/${userInfo.userId}`)
            .then(res => {
                let data = res.data;
                setLocations(data);
                setIsLoading(false);
            }).catch(e => {
                console.log(`location fetch error ${e}`);
                setIsLoading(false);
        })
    }

    const addLocation= (locationName, light, water, imageName, image) => {
        setIsLoading(true);

        if (image !== ""){
            uploadImage(image, userInfo.userId, "location")
            axios.post(`${BASE_URL}/locations`, {
                userId: userInfo.userId,
                locationName: locationName,
                light: light,
                water: water,
                locationImage: imageName,
                locationDescription: "description"
            }).then(res => {
                let newLocation = res.data;
                console.log(newLocation);
                setLocations([...locations, newLocation]);
                setIsLoading(false);
            }).catch(e => {
                console.log(`location adding error ${e}`);
                setIsLoading(false);
            })
        } else {
            axios.post(`${BASE_URL}/locations`, {
                userId: userInfo.userId,
                locationName: locationName,
                light: light,
                water: water,
                locationImage: "defaultLocation.jpg",
                locationDescription: "description"
            }).then(res => {
                let newLocation = res.data;
                console.log(newLocation);
                setLocations([...locations, newLocation]);
                setIsLoading(false);
            }).catch(e => {
                console.log(`location adding error ${e}`);
                setIsLoading(false);
            })
        }
    }

    return(
        <LocationContext.Provider value={{isLoading, locations, getAllLocationForUser, addLocation}}>
            {children}
        </LocationContext.Provider>
    );

}