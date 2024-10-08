import { Dispatch } from "@reduxjs/toolkit"
import { ClientAction, CLIENTS } from "./action"

const url = import.meta.env.VITE_URL

export const getClients = () => {
    return async (dispatch: Dispatch<ClientAction>)=>{
        try {
            const accessToken = localStorage.getItem("accessToken")
            const resp = await fetch(`${url}/clients`, {
                headers: {
                    Authorization: "Bearer"+accessToken
                },
            })
            if(resp.ok){
                const clients = await resp.json()
                dispatch({type: CLIENTS, payload: clients.content})
            } else{
                throw new Error("Get clients error")
            }
        } catch (error){
            console.log(error)
        }
    }
}