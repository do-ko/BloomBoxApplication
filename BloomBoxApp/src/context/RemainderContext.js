import {createContext, useContext, useState} from "react";
import axios from "axios";
import {BASE_URL} from "../config";
import {AuthContext} from "./AuthContext";

export const RemainderContext = createContext();

export const RemainderProvider = ({children}) => {
    const {userInfo} = useContext(AuthContext);
    const [remainders, setRemainders] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const getRemaindersByUserId = () => {
        setIsLoading(true);
        axios.get(`${BASE_URL}/remainders/user/${userInfo.userId}`)
            .then(res => {
                let data = res.data;
                setRemainders(data);
                setIsLoading(false);
            })
            .catch(e => {
                console.log(`fetch remainders by userId error ${e}`)
                setIsLoading(false);
            })
    }

    const getRemaindersByPlantId = (plantId) => {
        setIsLoading(true);
        axios.get(`${BASE_URL}/remainders/plant/${plantId}`)
            .then(res => {
                let data = res.data;
                setRemainders(data);
                setIsLoading(false);
            })
            .catch(e => {
                console.log(`fetch remainders by plantId error ${e}`)
                setIsLoading(false);
            })
    }

    const addRemainder = (plantId, remainderType, remainderDay, done, doneDate) => {
        setIsLoading(true);
        axios.post(`${BASE_URL}/remainders`, {
                userId: userInfo.userId,
                plantId: plantId,
                remainderType: remainderType,
                remainderDay: remainderDay,
                done: done,
                doneDate: doneDate
            }).then(res => {
                let newRemainder = res.data;
                console.log(newRemainder);
                setRemainders([...remainders, newRemainder]);
                setIsLoading(false);
            }).catch(e => {
                console.log(`remainder adding error ${e}`);
                setIsLoading(false);

            })
    }

    const editRemainder = (remainder) => {
        setIsLoading(true);
        axios.put(`${BASE_URL}/remainders`, {
            remainderId : remainder.remainderId,
            userId: userInfo.userId,
            plantId: remainder.plantId,
            remainderType: remainder.remainderType,
            remainderDay: remainder.remainderDay,
            done: remainder.done,
            doneDate: remainder.doneDate
        }).then(res => {
            let newRemainder = res.data;
            console.log(newRemainder);
            const editArray = remainders.map(rem => rem.remainderId === newRemainder.remainderId ? newRemainder : rem)
            setRemainders(editArray)

            setIsLoading(false);
        }).catch(e => {
            console.log(`remainder edit error ${e}`);
            setIsLoading(false);

        })
    }

    return(
        <RemainderContext.Provider value={{isLoading, remainders, getRemaindersByUserId, getRemaindersByPlantId, addRemainder, editRemainder}}>
            {children}
        </RemainderContext.Provider>
    );
}
