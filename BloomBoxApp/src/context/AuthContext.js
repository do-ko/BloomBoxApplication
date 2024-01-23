import React, {createContext, useEffect, useState} from "react";
import axios from "axios";
import {BASE_URL} from "../config";
import AsyncStorage from '@react-native-async-storage/async-storage'

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [userInfo, setUserInfo] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [splashLoading, setSplashLoading] = useState(false);

    console.log(userInfo);
    const login = (login, password) => {
        setIsLoading(true);
        console.log(`${BASE_URL}/users/${login}/${password}`);
        axios.get(`${BASE_URL}/users/${login}/${password}`)
            .then(result => {
                let userData = result.data;
                setUserInfo(userData);
                AsyncStorage.setItem('userInfo', JSON.stringify(userData));
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
            AsyncStorage.setItem('userInfo', JSON.stringify(userData));
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
        AsyncStorage.removeItem('userInfo');
        setIsLoading(false);
    }

    const isLoggedIn = async () => {
        try{
            setSplashLoading(true);
            let userInfo = await AsyncStorage.getItem('userInfo');
            userInfo = JSON.parse(userInfo);

            if (userInfo){
                setUserInfo(userInfo);
            }
            setSplashLoading(false);
        } catch (e){
            console.log(`is logged in error ${e}`);
            setSplashLoading(false);
        }
    }

    useEffect(() => {
        isLoggedIn();
    }, [])

    return(
        <AuthContext.Provider value={{splashLoading, isLoading, userInfo, register, login, logout}}>
            {children}
        </AuthContext.Provider>
        );
}