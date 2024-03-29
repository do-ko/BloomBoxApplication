import React, {createContext, useEffect, useState} from "react";
import axios from "axios";
import {BASE_URL} from "../config";
import asyncStorage from "@react-native-async-storage/async-storage/src/AsyncStorage";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [userInfo, setUserInfo] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [splashLoading, setSplashLoading] = useState(false);

    const login = (login, password) => {
        setIsLoading(true);
        axios.get(`${BASE_URL}/users/${login}/${password}`)
            .then(result => {
                let userData = result.data;
                setUserInfo(userData);
                asyncStorage.setItem('userInfo', JSON.stringify(userData));
                setIsLoading(false);
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
        }).catch(e => {
            console.log(`registration error ${e}`);
            setIsLoading(false);
        })
    }

    const logout = () => {
        setIsLoading(true);
        setUserInfo({});
        asyncStorage.removeItem('userInfo');
        setIsLoading(false);
    }

    const isLoggedIn = async () => {
        try {
            setSplashLoading(true);
            let userInfo = await asyncStorage.getItem('userInfo');
            userInfo = JSON.parse(userInfo);

            if (userInfo) {
                setUserInfo(userInfo);
            }
            setSplashLoading(false);
        } catch (e) {
            console.log(`is logged in error ${e}`);
            setSplashLoading(false);
        }
    }

    useEffect(() => {
        isLoggedIn();
    }, [])

    return (
        <AuthContext.Provider value={{splashLoading, isLoading, userInfo, register, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
}