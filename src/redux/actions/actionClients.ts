import { Dispatch } from "@reduxjs/toolkit"
import { ClientAction, CLIENTS } from "./action"
import { AppDispatch } from "../store/store"



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
            const url = `http://localhost:8080/clients/search?name=${query}`;

            const resp = await fetch(url, {
                headers: {
                    Authorization: "Bearer " + accessToken
                },
            });

            if (resp.ok) {
                const clients = await resp.json();
                dispatch({ type: CLIENTS, payload: clients.content });
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
            const resp = await fetch(`http://localhost:8080/clients`, {
                method: "POST",
                headers: {
                    Authorization: "Bearer "+accessToken,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(client)
            })
            if(resp.ok){
                dispatch(getClients())
            } else{
                throw new Error("Get clients error")
            }
        } catch (error){
            console.log(error)
        }
    }
}





