import {createContext, useContext, useState} from "react";
import {PlantContext} from "./PlantContext";
import * as FileSystem from "expo-file-system";
import {BASE_URL} from "../config";
import {AuthContext} from "./AuthContext";
import axios from "axios";

export const ImageContext = createContext();

export const ImageProvider = ({children}) => {
    const uploadImage = async (image, userId) => {
        await FileSystem.uploadAsync(BASE_URL + '/images/upload/' + userId + "/plant", image, {
            httpMethod: "POST",
            uploadType: FileSystem.FileSystemUploadType.MULTIPART,
            fieldName: 'file'
        })
    }

    return(
        <ImageContext.Provider value={{uploadImage}}>
            {children}
        </ImageContext.Provider>
    );
}