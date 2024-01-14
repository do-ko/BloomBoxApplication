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
            uploadImage(image, userInfo.userId, "diaries");
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
                console.log("Trying to delete old image (non-default image)...");
                deleteImage(oldImageName, userInfo.userId, "diary");
            }

            // upload new image to server if different
            if (diary.image !== oldImageName){
                console.log("Trying to upload new image...")
                uploadImage(image, userInfo.userId, "diary");
            }
            
            console.log("Newly changed diary data: ", diary.diaryId, ", plantId: ", diary.plantId, ", title: ", diary.title, ", entryDate: ", diary.entryDate, ", newImage: ", diary.image, ", newContent: ", diary.diaryContent);

            axios.put(`${BASE_URL}/diaries`, {
                diaryId : diary.diaryId,
                plantId : diary.plantId,
                title : diary.title,
                entryDate : diary.entryDate,
                image: image,
                diaryContent: diary.diaryContent
            }).then(res => {
                let newDiary = res.data;
                console.log("Loaded edited diary entry to the database: ", newDiary.title, " | ", newDiary.diaryContent, " | ", newDiary.image);
                //console.log(newDiary);

                const editArray = diaries.map(diary => diary.diaryId === newDiary.diaryId ? newDiary : diary)
                setDiaries(editArray)

                setIsLoading(false);
            }).catch(e => {
                console.log(`!!!  Diary editing error ${e}  !!!`);
                setIsLoading(false);
            })

        } else { // if old image is default

            // delete old image from server
            if (oldImageName !== "defaultDiary.jpg"){
                console.log("Trying to delete old image (non-default image) (2 option)...")
                deleteImage(oldImageName, userInfo.userId, "diary");
            }
            
            axios.put(`${BASE_URL}/diaries`, {
                diaryId : diary.diaryId,
                plantId : diary.plantId,
                title : diary.title,
                entryDate : diary.entryDate,
                image: "defaultDiary.jpg",
                diaryContent: diary.diaryContent
            }).then(res => {
                let newDiary = res.data;
                
                console.log("Loaded edited diary entry to the database: ", newDiary.title, " | ", newDiary.diaryContent, " | ", newDiary.image);
                //console.log(newDiary);

                const editArray = diaries.map(diary => diary.diaryId === newDiary.diaryId ? newDiary : diary)
                setDiaries(editArray)

                setIsLoading(false);
            }).catch(e => {
                console.log(`diary editing error ${e}`);
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