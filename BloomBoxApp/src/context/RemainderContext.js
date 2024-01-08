import {createContext, useState} from "react";
import axios from "axios";
import {BASE_URL} from "../config";

export const RemainderContext = createContext();

export const RemainderProvider = ({children}) => {
    const [remainders, setRemainders] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
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
    return(
        <RemainderContext.Provider value={{isLoading, remainders, getRemaindersByPlantId}}>
            {children}
        </RemainderContext.Provider>
    );
}
