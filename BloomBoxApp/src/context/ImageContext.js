import {createContext, useContext, useState} from "react";
import {PlantContext} from "./PlantContext";
import * as FileSystem from "expo-file-system";
import {BASE_URL} from "../config";
import {AuthContext} from "./AuthContext";
import axios from "axios";

export const ImageContext = createContext();

export const ImageProvider = ({children}) => {
    const uploadImage = async (image, userId, type) => {
        const url = BASE_URL + '/images/upload/' + userId + "/" + type
        await FileSystem.uploadAsync(url, image, {
            httpMethod: "POST",
            uploadType: FileSystem.FileSystemUploadType.MULTIPART,
            fieldName: 'file'
        })
    }

    const deleteImage = (imageName, userId, type) => {
        const url = BASE_URL + '/images/delete/' + userId + "/" + type + "/" + imageName
        axios.delete(url)
            .then(res => {
                console.log(res.data)
            }).catch(e => {
                console.log(`img delete error - ${e}`)
        })
    }

    return(
        <ImageContext.Provider value={{uploadImage, deleteImage}}>
            {children}
        </ImageContext.Provider>
    );
}