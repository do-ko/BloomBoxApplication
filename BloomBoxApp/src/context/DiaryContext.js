import React, {createContext, useContext, useEffect, useState} from "react";
import axios from "axios";
import {BASE_URL} from "../config";
import {AuthContext} from "./AuthContext";
import {ImageContext} from "./ImageContext";

export const DiaryContext = createContext();

export const DiaryProvider = ({children}) => {
    const [isLoadingDiary, setIsLoading] = useState(false);
    const [diaries, setDiaries] = useState([]);
    const {uploadImage, deleteImage} = useContext(ImageContext);
    const {userInfo} = useContext(AuthContext);

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

    const addDiary = (plantId, title, entryDate, image, imageUrl, diaryContent) => {
        console.log(plantId)
        console.log(title)
        console.log(entryDate)
        console.log(image)
        console.log(diaryContent)

        setIsLoading(true);
        if (image !== "") {
            uploadImage(image, userInfo.userId, "diary");
            axios.post(`${BASE_URL}/diaries`, {
                plantId: plantId,
                title: title,
                entryDate: entryDate,
                image: imageUrl,
                diaryContent : diaryContent
            }).then(res => {
                let newDiary = res.data;
                console.log(newDiary);
                setDiaries([...diaries, newDiary]);
                setIsLoading(false);
            }).catch(e => {
                console.log(`diary adding error ${e}`);
                setIsLoading(false);
            })
        } else {
            axios.post(`${BASE_URL}/diaries`, {
                plantId: plantId,
                title: title,
                entryDate: entryDate,
                image: "defaultDiary.jpg",
                diaryContent : diaryContent
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


    }
    
    
    const editDiary = (diary, image, oldImageName) => {
        setIsLoading(true);
        
        
        if (diary.image !== "defaultDiary.jpg"){
            // if new image is not default

            // delete old image from server
            if (oldImageName !== "defaultDiary.jpg" && diary.image !== oldImageName){
                deleteImage(oldImageName, userInfo.userId, "diary");
            }

            // upload new image to server if different
            if (diary.image !== oldImageName){
                uploadImage(image, userInfo.userId, "diary");
            }

            axios.put(`${BASE_URL}/diaries`, {
                diaryId : diary.diaryId,
                plantId : diary.plantId,
                title : diary.title,
                entry_date : diary.entryDate,
                image: image
            }).then(res => {
                let newDiary = res.data;
                //console.log("   This works!!!!!!!!!!   ");
                console.log(newDiary);

                const editArray = diaries.map(diary => diary.diaryId === newDiary.diaryId ? newDiary : diary)
                setDiaries(editArray)

                setIsLoading(false);
            }).catch(e => {
                console.log(`1rst diary editing error ${e}`);
                setIsLoading(false);
            })

        } else {

            // delete old image from server
            if (oldImageName !== "defaultDiary.jpg"){
                deleteImage(oldImageName, userInfo.userId, "diary");
            }

            
            
            axios.put(`${BASE_URL}/diaries`, {
                diaryId : diary.diaryId,
                plantId : plant.plantId,
                title : diary.title,
                entry_date : diary.entryDate,
                image: "defualtDiary.jpg"
            }).then(res => {
                let newDiary = res.data;
                console.log(newDiary);

                const editArray = diaries.map(diary => diary.diaryId === newDiary.diaryId ? newDiary : diary)
                setDiaries(editArray)

                setIsLoading(false);
            }).catch(e => {
                console.log(`2nd diary editing error ${e}`);
                setIsLoading(false);

            })
        }
}

    return(
        <DiaryContext.Provider value={{getAllDiariesForPlant, diaries, isLoadingDiary, addDiary, editDiary}}>
            {children}
        </DiaryContext.Provider>
    );
}