import { Dispatch } from "@reduxjs/toolkit"
import { notify, notifyErr, TreatmentAction, TREATMENTS, url } from "./action"
import { AppDispatch } from "../store/store"
import { ITreatment } from "../../interfaces/ITreatment"


export const getTreatments = (setIsLoading: (b: boolean) => void) => {
    return async (dispatch: Dispatch<TreatmentAction>)=>{
        try {
            setIsLoading(true)
            const accessToken = localStorage.getItem("accessToken")
            const resp = await fetch(`${url}/treatments`, {
                headers: {
                    Authorization: "Bearer "+accessToken
                },
            })
            if(resp.ok){
                const treatments = await resp.json()
                dispatch({type: TREATMENTS, payload: treatments.content})
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

export const searchTreatments = (query: string, setIsLoading: (b: boolean) => void) => {
    return async (dispatch: Dispatch<TreatmentAction>) => {
        try {
            setIsLoading(true);
            const accessToken = localStorage.getItem("accessToken");
            const resp = await fetch(`${url}/treatments/search?name=${encodeURIComponent(query)}`, {
                headers: {
                    Authorization: "Bearer " + accessToken
                },
            });

            if (resp.ok) {
                const treatments = await resp.json();
                dispatch({ type: TREATMENTS, payload: treatments });
            } else {
                throw new Error("Get clients error");
            }
        } catch (error) {
            console.log(error);
        } finally{
            setIsLoading(false)
        }
    };
};

export const updateTreatment = (treatmentId: string | undefined, appointment: ITreatment, setIsLoading: (b: boolean) => void) => {
    return async (dispatch: AppDispatch)=>{
        try {
            setIsLoading(true)
            const accessToken = localStorage.getItem("accessToken")
            const resp = await fetch(`${url}/treatments/${treatmentId}`, {
                method: "PUT",
                headers: {
                    Authorization: "Bearer "+accessToken,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(appointment)
            })
            if(resp.ok){
                notify("Trattamento modificato")
                dispatch(getTreatments(setIsLoading))
            } else{
                console.log(resp.statusText)
                notifyErr("Errore nella creazione ")
            }
        } catch (error){
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }
}

export const createTreatment = (treatment: ITreatment, setIsLoading: (b: boolean) => void) => {
    return async (dispatch: AppDispatch)=>{
        try {
            setIsLoading(true)
            const accessToken = localStorage.getItem("accessToken")
            const resp = await fetch(`${url}/treatments`, {
                method: "POST",
                headers: {
                    Authorization: "Bearer "+accessToken,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(treatment)
            })
            if(resp.ok){
                notify("Trattamento creato")
                dispatch(getTreatments(setIsLoading))
            } else{
                console.log(resp.statusText)
                notifyErr("Errore nella creazione del trattamento")
            }
        } catch (error){
            console.log(error)
        } 
    }
}
export const deleteTreatment = (treatmentId: string | undefined, setIsLoading: (b: boolean) => void) => {
    return async (dispatch: AppDispatch)=>{
        try {
            setIsLoading(true)
            const accessToken = localStorage.getItem("accessToken")
            const resp = await fetch(`${url}/treatments/${treatmentId}`, {
                method: "DELETE",
                headers: {
                    Authorization: "Bearer "+accessToken,
                    
                },
            })
            if(resp.ok){
                notify("Trattamento eliminato")
                dispatch(getTreatments(setIsLoading))
            } else{
                console.log(resp.statusText)
                notifyErr("Errore nell'eliminazione!")
            }
        } catch (error){
            console.log(error)
        } finally{
            setIsLoading(false)
        }
    }
}