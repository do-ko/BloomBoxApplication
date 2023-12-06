import React, {createContext, useState} from "react";
import axios from "axios";
import {BASE_URL} from "../config";
import asyncStorage from "@react-native-async-storage/async-storage/src/AsyncStorage";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [userInfo, setUserInfo] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    console.log(userInfo);
    const login = (login, password) => {
        setIsLoading(true);
        console.log(`${BASE_URL}/users/${login}/${password}`);
        axios.get(`${BASE_URL}/users/${login}/${password}`)
            .then(result => {
                let userData = result.data;
                setUserInfo(userData);
                asyncStorage.setItem('userInfo', JSON.stringify(userData));
                setIsLoading(false);
                console.log(userData);
            }).catch(e => {
                setIsLoading(false);
                console.log(`login error ${e}`);
        })
    }

    const register = (login, password) => {
        setIsLoading(true);
        axios.post(`${BASE_URL}/users`, {
            userLogin: login,
            userPassword: password
        }).then(result => {
            let userData = result.data;
            setUserInfo(userData);
            asyncStorage.setItem('userInfo', JSON.stringify(userData));
            setIsLoading(false);
            console.log(userData);
        }).catch(e => {
            console.log(`registration error ${e}`);
            setIsLoading(false);
        })
    }

    const logout = () => {
        console.log("logout");
        setIsLoading(true);
        setUserInfo({});
        asyncStorage.setItem('userInfo', JSON.stringify({}));
        setIsLoading(false);
    }

    return(
        <AuthContext.Provider value={{isLoading, userInfo, register, login, logout}}>
            {children}
        </AuthContext.Provider>
        );
}