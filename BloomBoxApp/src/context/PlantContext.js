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
    const {uploadImage, deleteImage} = useContext(ImageContext);

    const getAllPlants = () => {
        setIsLoading(true);
        axios.get(`${BASE_URL}/plants/user/${userInfo.userId}`)
            .then(res => {
                let data = res.data;
                setPlants(data);
                setIsLoading(false);
            })
            .catch(e => {
                console.log(`fetch all plants error ${e}`)
                setIsLoading(false);
            })
    }

    const addPlant = (locationId, plantName, species, light, water, frequency, image, imageUrl) => {
        setIsLoading(true);

        if (image !== "") {
            uploadImage(image, userInfo.userId, "plant");
            axios.post(`${BASE_URL}/plants`, {
                locationId: locationId,
                userId: userInfo.userId,
                plantName: plantName,
                species: species,
                light: light,
                water: water,
                frequency: frequency,
                image: imageUrl
            }).then(res => {
                let newPlant = res.data;
                console.log(newPlant);
                setPlants([...plants, newPlant]);
                setIsLoading(false);
            }).catch(e => {
                console.log(`plant adding error ${e}`);
                setIsLoading(false);

            })

        } else {
            axios.post(`${BASE_URL}/plants`, {
                locationId: locationId,
                userId: userInfo.userId,
                plantName: plantName,
                species: species,
                light: light,
                water: water,
                frequency: frequency,
                image: "defaultPlant.jpg"
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
    }



        const editPlant = (plant, image, oldImageName) => {
            setIsLoading(true);

            if (plant.image !== "defaultPlant.jpg"){
                // if new image is not default

                // delete old image from server
                if (oldImageName !== "defaultPlant.jpg" && plant.image !== oldImageName){
                    deleteImage(oldImageName, userInfo.userId, "plant");
                }

                // upload new image to server if different
                if (plant.image !== oldImageName){
                    uploadImage(image, userInfo.userId, "plant");
                }

                axios.put(`${BASE_URL}/plants`, {
                    plantId : plant.plantId,
                    locationId: plant.locationId,
                    userId: userInfo.userId,
                    plantName: plant.plantName,
                    species: plant.species,
                    light: plant.light,
                    water: plant.water,
                    frequency: plant.frequency,
                    image: plant.image
                }).then(res => {
                    let newPlant = res.data;
                    console.log(newPlant);

                    const editArray = plants.map(plant => plant.plantId === newPlant.plantId ? newPlant : plant)
                    setPlants(editArray)

                    setIsLoading(false);
                }).catch(e => {
                    console.log(`plant editing error ${e}`);
                    setIsLoading(false);

                })

            } else {

                // delete old image from server
                if (oldImageName !== "defaultPlant.jpg"){
                    deleteImage(oldImageName, userInfo.userId, "plant");
                }


                axios.put(`${BASE_URL}/plants`, {
                    plantId : plant.plantId,
                    locationId: plant.locationId,
                    userId: userInfo.userId,
                    plantName: plant.plantName,
                    species: plant.species,
                    light: plant.light,
                    water: plant.water,
                    frequency: plant.frequency,
                    image: "defaultPlant.jpg"
                }).then(res => {
                    let newPlant = res.data;
                    console.log(newPlant);

                    const editArray = plants.map(plant => plant.plantId === newPlant.plantId ? newPlant : plant)
                    setPlants(editArray)

                    setIsLoading(false);
                }).catch(e => {
                    console.log(`plant editing error ${e}`);
                    setIsLoading(false);


                })
            }
    }

    return(
        <PlantContext.Provider value={{isLoading, plants, getAllPlants, addPlant, editPlant}}>
            {children}
        </PlantContext.Provider>
    );
}