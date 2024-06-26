import React, {createContext, useContext, useState} from "react";
import axios from "axios";
import {BASE_URL} from "../config";
import {AuthContext} from "./AuthContext";
import {ImageContext} from "./ImageContext";

export const LocationContext = createContext();

export const LocationProvider = ({children}) => {
    const [locations, setLocations] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const {userInfo} = useContext(AuthContext);
    const {uploadImage, deleteImage} = useContext(ImageContext);

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

    const addLocation = (locationName, light, water, imageName, image) => {
        setIsLoading(true);

        if (image !== "") {
            uploadImage(image, userInfo.userId, "location")
            axios.post(`${BASE_URL}/locations`, {
                userId: userInfo.userId,
                locationName: locationName,
                light: light,
                water: water,
                locationImage: imageName
            }).then(res => {
                let newLocation = res.data;
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
                locationImage: "defaultLocation.jpg"
            }).then(res => {
                let newLocation = res.data;
                setLocations([...locations, newLocation]);
                setIsLoading(false);
            }).catch(e => {
                console.log(`location adding error ${e}`);
                setIsLoading(false);
            })
        }
    }


    const editLocation = (location, image, oldImageName) => {
        setIsLoading(true);

        if (location.locationImage !== "defaultLocation.jpg") {
            if (oldImageName !== "defaultLocation.jpg" && location.locationImage !== oldImageName) {
                deleteImage(oldImageName, userInfo.userId, "location");
            }

            if (location.locationImage !== oldImageName) {
                uploadImage(image, userInfo.userId, "location");
            }

            axios.put(`${BASE_URL}/locations`, {
                locationId: location.locationId,
                userId: userInfo.userId,
                locationName: location.locationName,
                light: location.light,
                water: location.water,
                locationImage: location.locationImage
            }).then(res => {
                let newLocation = res.data;
                const editArray = locations.map(location => location.locationId === newLocation.plantId ? newLocation : location)
                setLocations(editArray)
                setIsLoading(false);
            }).catch(e => {
                console.log(`location edit error ${e}`);
                setIsLoading(false);
            })

        } else {
            if (oldImageName !== "defaultLocation.jpg") {
                deleteImage(oldImageName, userInfo.userId, "location");
            }

            axios.put(`${BASE_URL}/locations`, {
                locationId: location.locationId,
                userId: userInfo.userId,
                locationName: location.locationName,
                light: location.light,
                water: location.water,
                locationImage: "defaultLocation.jpg"
            }).then(res => {
                let newLocation = res.data;
                const editArray = locations.map(location => location.locationId === newLocation.plantId ? newLocation : location)
                setLocations(editArray)
                setIsLoading(false);
            }).catch(e => {
                console.log(`location edit error ${e}`);
                setIsLoading(false);
            })
        }
    }

    const deleteLocation = (locationId, image) => {
        setIsLoading(true)
        deleteImage(image, userInfo.userId, "location");
        axios.delete(`${BASE_URL}/locations/${locationId}`)
            .then(res => {
                if (locations.length === 1) {
                    setLocations([])
                } else {
                    setLocations(locations.filter(location => location.locationId !== locationId))
                }

                setIsLoading(false)
            }).catch(e => {
            console.log(`location delete error - ${e}`)
            setIsLoading(false)
        })
    }

    return (
        <LocationContext.Provider
            value={{isLoading, locations, getAllLocationForUser, addLocation, editLocation, deleteLocation}}>
            {children}
        </LocationContext.Provider>
    );

}