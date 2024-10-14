import { Dispatch } from "@reduxjs/toolkit"
import { setAppointment } from "../slices/appointmentsSlice"
import { AppDispatch } from "../store/store"
import { notify, notifyErr } from "./action"

import { IAppointment, IAppointments } from "../../interfaces/IAppointment"

export const getAppointments = () => {
    return async (dispatch: Dispatch)=>{
        try {
            const accessToken = localStorage.getItem("accessToken")
            const resp = await fetch(`http://localhost:8080/appointments`, {
                headers: {
                    Authorization: "Bearer "+accessToken
                },
            })
            if(resp.ok){
                const appointments = await resp.json()
                console.log("Appuntamenti ricevuti dal backend:", appointments.content);
                dispatch(setAppointment(appointments.content))
            } else{
                throw new Error("Get clients error")
            }
        } catch (error){
            console.log(error)
        }
    }
}


export const createAppointment = (appointment: IAppointment) => {
    return async (dispatch: AppDispatch)=>{
        try {
            const accessToken = localStorage.getItem("accessToken")
        
            const resp = await fetch(`http://localhost:8080/appointments`, {
                method: "POST",
                headers: {
                    Authorization: "Bearer "+accessToken,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(appointment)
            })
            if(resp.ok){
                notify("Appuntamento creato")
                dispatch(getAppointments())
            } else{
                console.log(resp.statusText)
                notifyErr("Errore nella creazione ")
            }
        } catch (error){
            console.log(error)
        }
    }
}

export const updateAppointment = (appointmentId: string, appointment: IAppointments) => {
    return async (dispatch: AppDispatch)=>{
        try {
            const accessToken = localStorage.getItem("accessToken")
        
            const resp = await fetch(`http://localhost:8080/appointments/${appointmentId}`, {
                method: "PUT",
                headers: {
                    Authorization: "Bearer "+accessToken,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(appointment)
            })
            if(resp.ok){
                const updatedData = await resp.json();
                console.log("Risposta dal backend:", updatedData);
                notify("Appuntamento modificato")
                dispatch(getAppointments())
            } else{
                console.log(resp.statusText)
                notifyErr("Errore nella creazione ")
            }
        } catch (error){
            console.log(error)
        }
    }
}


export const deleteStaff = (appointmentId: string | undefined) => {
    return async (dispatch: AppDispatch)=>{
        try {
            const accessToken = localStorage.getItem("accessToken")
            const resp = await fetch(`http://localhost:8080/appointments/${appointmentId}`, {
                method: "DELETE",
                headers: {
                    Authorization: "Bearer "+accessToken,
                    
                },
            })
            if(resp.ok){
                notify("Trattamento eliminato")
                dispatch(getAppointments())
            } else{
                console.log(resp.statusText)
                notifyErr("Errore nell'eliminazione!")
            }
        } catch (error){
            console.log(error)
        }
    }
}