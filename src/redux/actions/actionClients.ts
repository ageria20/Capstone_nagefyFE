import { Dispatch } from "@reduxjs/toolkit"
import { ClientAction, CLIENTS } from "./action"



export const getClients = () => {
    return async (dispatch: Dispatch<ClientAction>)=>{
        try {
            const accessToken = localStorage.getItem("accessToken")
            const resp = await fetch(`http://localhost:8080/clients`, {
                headers: {
                    Authorization: "Bearer "+accessToken
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

