import React, {createContext, useContext, useState} from "react";
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
        setIsLoading(true);
        if (image !== "") {
            uploadImage(image, userInfo.userId, "diary");
            axios.post(`${BASE_URL}/diaries`, {
                plantId: plantId,
                title: title,
                entryDate: entryDate,
                image: imageUrl,
                diaryContent: diaryContent
            }).then(res => {
                let newDiary = res.data;
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
                diaryContent: diaryContent
            }).then(res => {
                let newDiary = res.data;
                setDiaries([...diaries, newDiary]);
                setIsLoading(false);
            }).catch(e => {
                console.log(`diary adding error ${e}`);
                setIsLoading(false);
            })
        }


    }


    const editDiary = (diary, image, imageURL, oldImageName) => {
        setIsLoading(true);

        if (diary.image !== "defaultDiary.jpg") {
            if (oldImageName !== "defaultDiary.jpg" && diary.image !== oldImageName) {
                deleteImage(oldImageName, userInfo.userId, "diary");
            }
            // upload new image to server if different
            if (diary.image !== oldImageName) {
                uploadImage(image, userInfo.userId, "diary");
            }

            axios.put(`${BASE_URL}/diaries`, {
                diaryId: diary.diaryId,
                plantId: diary.plantId,
                title: diary.title,
                entryDate: diary.entryDate,
                image: imageURL,
                diaryContent: diary.diaryContent
            }).then(res => {
                let newDiary = res.data;
                const editArray = diaries.map(diary => diary.diaryId === newDiary.diaryId ? newDiary : diary)
                setDiaries(editArray)

                setIsLoading(false);
            }).catch(e => {
                console.log(`!!!  Diary editing error ${e}  !!!`);
                setIsLoading(false);
            })

        } else { // if new image is default

            // delete old image from server if it's not default
            if (oldImageName !== "defaultDiary.jpg") {
                deleteImage(oldImageName, userInfo.userId, "diary");
            }

            axios.put(`${BASE_URL}/diaries`, {
                diaryId: diary.diaryId,
                plantId: diary.plantId,
                title: diary.title,
                entryDate: diary.entryDate,
                image: "defaultDiary.jpg",
                diaryContent: diary.diaryContent
            }).then(res => {
                let newDiary = res.data;
                const editArray = diaries.map(diary => diary.diaryId === newDiary.diaryId ? newDiary : diary)
                setDiaries(editArray)

                setIsLoading(false);
            }).catch(e => {
                console.log(`diary editing error ${e}`);
                setIsLoading(false);

            })
        }
    }

    const deleteDiary = (diaryId, image) => {
        setIsLoading(true)
        deleteImage(image, userInfo.userId, "diary");
        axios.delete(`${BASE_URL}/diaries/${diaryId}`)
            .then(res => {
                if (diaries.length === 1) {
                    setDiaries([])
                } else {
                    setDiaries(diaries.filter(diary => diary.diaryId !== diaryId))
                }
                setIsLoading(false)
            }).catch(e => {
            console.log(`diary delete error - ${e}`)
            setIsLoading(false)
        })
    }

    return (
        <DiaryContext.Provider
            value={{getAllDiariesForPlant, diaries, isLoadingDiary, addDiary, editDiary, deleteDiary}}>
            {children}
        </DiaryContext.Provider>
    );
}