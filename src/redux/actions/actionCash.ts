import { Dispatch } from "@reduxjs/toolkit"
import { setCashList } from "../slices/cashSlice"
import { AppDispatch } from "../store/store"
import { ICash } from "../../interfaces/ICash"
import { getAppointments } from "./actionAppointment"
import { url } from "./action"
import { NavigateFunction } from "react-router-dom"


export const getCash = (setIsLoading: (b: boolean) => void) => {
    return async (dispatch: Dispatch)=>{
        try {
            setIsLoading(true)
            const accessToken = localStorage.getItem("accessToken")
            const resp = await fetch(`${url}/cash`, {
                headers: {
                    Authorization: "Bearer "+accessToken
                },
            })
            if(resp.ok){
                const cash = await resp.json()
                dispatch(setCashList(cash.content))
            } else{
                throw new Error("Get clients error")
            }
        } catch (error){
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }
}


export const createCash = (navigate: NavigateFunction, cash: ICash, setIsLoading: (b: boolean) => void) => {
    return async (dispatch: AppDispatch)=>{
        try {
            setIsLoading(true)
            const accessToken = localStorage.getItem("accessToken")
            const resp = await fetch(`${url}/cash`, {
                method: "POST",
                headers: {
                    Authorization: "Bearer "+accessToken,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(cash)
            })
            if(resp.ok){
                dispatch(getCash(setIsLoading))
                dispatch(getAppointments(navigate, setIsLoading))
            } 
        } catch (error){
            console.log(error)
        } finally{
            setIsLoading(false)
        }
    }
}