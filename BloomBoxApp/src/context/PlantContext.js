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

    const addPlant = (locationId, plantName, species, plantDescription, light, water, image, imageUrl) => {
        setIsLoading(true);

        if (image !== "") {
            uploadImage(image, userInfo.userId);
            axios.post(`${BASE_URL}/plants`, {
                locationId: locationId,
                userId: userInfo.userId,
                plantName: plantName,
                species: species,
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

        } else {
            axios.post(`${BASE_URL}/plants`, {
                locationId: locationId,
                userId: userInfo.userId,
                plantName: plantName,
                species: species,
                description: plantDescription,
                light: light,
                water: water,
                imageUrl: "defaultPlant.jpg"
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



        const editPlant = (plantId, locationId, plantName, species, plantDescription, light, water, image, imageName, oldImageName) => {
            setIsLoading(true);

            console.log("Image name: ", imageName)

            if (imageName !== "defaultPlant.jpg"){
                // if new image is not default

                // delete old image from server
                if (oldImageName !== "defaultPlant.jpg" && imageName !== oldImageName){
                    deleteImage(oldImageName, userInfo.userId);
                }

                // upload new image to server if different
                if (imageName !== oldImageName){
                    uploadImage(image, userInfo.userId);
                }

                axios.put(`${BASE_URL}/plants`, {
                    plantId : plantId,
                    locationId: locationId,
                    userId: userInfo.userId,
                    plantName: plantName,
                    species: species,
                    description: plantDescription,
                    light: light,
                    water: water,
                    imageUrl: imageName
                }).then(res => {
                    let newPlant = res.data;
                    console.log(newPlant);

                    const editArray = plants.map(plant => plant.plantId === newPlant.plantId ? newPlant : plant)
                    setPlants(editArray)

                    setIsLoading(false);
                }).catch(e => {
                    console.log(`plant adding error ${e}`);
                    setIsLoading(false);

                })

            } else {

                // delete old image from server
                if (oldImageName !== "defaultPlant.jpg"){
                    deleteImage(oldImageName, userInfo.userId);
                }


                axios.put(`${BASE_URL}/plants`, {
                    plantId : plantId,
                    locationId: locationId,
                    userId: userInfo.userId,
                    plantName: plantName,
                    species: species,
                    description: plantDescription,
                    light: light,
                    water: water,
                    imageUrl: "defaultPlant.jpg"
                }).then(res => {
                    let newPlant = res.data;
                    console.log(newPlant);

                    const editArray = plants.map(plant => plant.plantId === newPlant.plantId ? newPlant : plant)
                    setPlants(editArray)

                    setIsLoading(false);
                }).catch(e => {
                    console.log(`plant adding error ${e}`);
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