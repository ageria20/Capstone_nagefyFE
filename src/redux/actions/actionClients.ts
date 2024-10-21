import { Dispatch } from "@reduxjs/toolkit"
import { ADD_CLIENT, ClientAction, CLIENTS, notify, notifyErr } from "./action"
import { AppDispatch } from "../store/store"
import { INewUser } from "../../interfaces/IUser"
import { setClientAppointment } from "../slices/appointmentsSlice"




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

export const searchClients = (query: string) => {
    return async (dispatch: Dispatch<ClientAction>) => {
        try {
            const accessToken = localStorage.getItem("accessToken");
            const url = `http://localhost:8080/clients/search?name=${encodeURIComponent(query)}`;

            const resp = await fetch(url, {
                headers: {
                    Authorization: "Bearer " + accessToken
                },
            });

            if (resp.ok) {
                const clients = await resp.json();
                dispatch({ type: CLIENTS, payload: clients });
            } else {
                throw new Error("Get clients error");
            }
        } catch (error) {
            console.log(error);
        }
    };
};

export const createClients = (client: INewUser) => {
    return async (dispatch: AppDispatch)=>{
        try {
            const accessToken = localStorage.getItem("accessToken")
            const resp = await fetch(`http://localhost:8080/clients/create`, {
                method: "POST",
                headers: {
                    Authorization: "Bearer "+accessToken,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(client)
            })
            if(resp.ok){
                dispatch({type: ADD_CLIENT, payload: client})
                notify("Cliente creato")
                dispatch(getClients())
            } else{
                console.log(resp.statusText)
                notifyErr(resp.statusText)
            }
        } catch (error){
            console.log(error)
        }
    }
}

export const getAppointmentsMe = () => {
    return async (dispatch: Dispatch)=>{
        try {
            const accessToken = localStorage.getItem("accessToken")
            const resp = await fetch(`http://localhost:8080/clients/me/appointments`, {
                headers: {
                    Authorization: "Bearer "+accessToken
                },
            })
            if(resp.ok){
                const appointmentsClient = await resp.json()
                console.log("Appuntamenti ricevuti dal backend:", appointmentsClient.content);
                dispatch(setClientAppointment(appointmentsClient.content))
            } else{
                throw new Error("Get clients error")
            }
        } catch (error){
            console.log(error)
        }
    }
}

export const deleteClient = (clientId: string | undefined) => {
    return async (dispatch: AppDispatch)=>{
        try {
            const accessToken = localStorage.getItem("accessToken")
            const resp = await fetch(`http://localhost:8080/clients/${clientId}`, {
                method: "DELETE",
                headers: {
                    Authorization: "Bearer "+accessToken,
                    
                },
            })
            if(resp.ok){
                notify("Cliente eliminato")
                dispatch(getClients())
            } else{
                console.log(resp.statusText)
                notifyErr(resp.statusText)
            }
        } catch (error){
            console.log(error)
        }
    }
}





