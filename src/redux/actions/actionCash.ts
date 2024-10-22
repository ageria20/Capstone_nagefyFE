import { Dispatch } from "@reduxjs/toolkit"
import { setCashList } from "../slices/cashSlice"
import { AppDispatch } from "../store/store"
import { ICash } from "../../interfaces/ICash"

export const getCash = () => {
    return async (dispatch: Dispatch)=>{
        try {
            const accessToken = localStorage.getItem("accessToken")
            const resp = await fetch(`http://localhost:8080/cash`, {
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
        }
    }
}


export const createCash = (cash: ICash) => {
    return async (dispatch: AppDispatch)=>{
        try {
            const accessToken = localStorage.getItem("accessToken")
            const resp = await fetch(`http://localhost:8080/cash`, {
                method: "POST",
                headers: {
                    Authorization: "Bearer "+accessToken,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(cash)
            })
            if(resp.ok){
                console.log("CASH", cash)
                console.log("RESP", resp)
                dispatch(getCash())
            } else{
                console.log(resp.statusText)
            }
        } catch (error){
            console.log(error)
        }
    }
}