import React, {createContext, useContext, useEffect, useState} from "react";
import axios from "axios";
import {BASE_URL} from "../config";
import {AuthContext} from "./AuthContext";
import {ImageContext} from "./ImageContext";

export const DiaryContext = createContext();

export const DiaryProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [diaries, setDiaries] = useState([]);

    const getAllDiariesForPlant = (plantId) => {
        setIsLoading(true);
        console.log(plantId)
        axios.get(`${BASE_URL}/diaries/plant/` + plantId)
            .then(res => {
                let data = res.data;
                setDiaries(data);
                setIsLoading(false);
            })
            .catch(e => {
                console.log(`fetch all diary by plantId error ${e}`)
                setDiaries([]);
                setIsLoading(false);
            })
    }

    const addDiary = (plantId, title, entryDate, image) => {
        console.log(plantId)
        console.log(title)
        console.log(entryDate)
        console.log(image)

        setIsLoading(true);
        axios.post(`${BASE_URL}/diaries`, {
            plantId: plantId,
            title: title,
            entryDate: entryDate,
            image: image
        }).then(res => {
            let newDiary = res.data;
            console.log(newDiary);
            setDiaries([...diaries, newDiary]);
            setIsLoading(false);
        }).catch(e => {
            console.log(`diary adding error ${e}`);
            setIsLoading(false);
        })
    }

    return(
        <DiaryContext.Provider value={{getAllDiariesForPlant, diaries, isLoading, addDiary}}>
            {children}
        </DiaryContext.Provider>
    );
}