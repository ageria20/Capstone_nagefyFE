import { Dispatch } from "@reduxjs/toolkit"
import { ADD_CLIENT, ClientAction, CLIENTS, notify, notifyErr, url } from "./action"
import { AppDispatch } from "../store/store"
import { IClient, INewUser } from "../../interfaces/IUser"
import { setClientAppointment } from "../slices/appointmentsSlice"




export const getClients = () => {
    return async (dispatch: Dispatch<ClientAction>)=>{
        try {
            const accessToken = localStorage.getItem("accessToken")
            const resp = await fetch(`${url}/clients`, {
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

            const resp = await fetch(`${url}/clients/search?name=${encodeURIComponent(query)}`, {
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
            const resp = await fetch(`${url}/clients/create`, {
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


export const updateClient = (clientId: string | undefined, client: IClient) => {
    return async (dispatch: AppDispatch)=>{
        try {
            const accessToken = localStorage.getItem("accessToken")
        
            const resp = await fetch(`${url}/treatments/${clientId}`, {
                method: "PUT",
                headers: {
                    Authorization: "Bearer "+accessToken,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(client)
            })
            if(resp.ok){        
                notify("Staff modificato")
                dispatch(getClients())
            } else{
                console.log(resp.statusText)
                notifyErr("Errore nella creazione ")
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
            const resp = await fetch(`${url}/clients/me/appointments`, {
                headers: {
                    Authorization: "Bearer "+accessToken
                },
            })
            if(resp.ok){
                const appointmentsClient = await resp.json()
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
            const resp = await fetch(`${url}/clients/${clientId}`, {
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





