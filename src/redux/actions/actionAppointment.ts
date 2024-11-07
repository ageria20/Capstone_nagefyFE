import { Dispatch } from "@reduxjs/toolkit"
import { setAppointment, setFreeSlots, setSelectedAppointment } from "../slices/appointmentsSlice"
import { AppDispatch } from "../store/store"
import {  notify, notifyErr, url } from "./action"

import { IAppointment, IFreeSlots, IUpdateAppointment } from "../../interfaces/IAppointment"
import { getAppointmentsMe } from "./actionClients"
import { NavigateFunction } from "react-router-dom"


export const getAppointments = (navigate: NavigateFunction) => {
    return async (dispatch: Dispatch)=>{
        try {
            const accessToken = localStorage.getItem("accessToken")
            const resp = await fetch(`${url}/appointments`, {
                headers: {
                    Authorization: "Bearer "+accessToken
                },
            })
            if(resp.ok){
                const appointments = await resp.json()
                dispatch(setAppointment(appointments.content))
            }  else {
                if(resp.status === 401 || resp.status === 403){
                  notifyErr("Credenziali errate")
                  navigate("/")
              }
            }
        } catch (error){
            console.log(error)
        }
    }
}

export const getFreeSlots = (staffId: string, selectedDay: string) => {
    return async (dispatch: Dispatch)=>{
        try {
            const accessToken = localStorage.getItem("accessToken")
            const resp = await fetch(`${url}/free-slots?staff=${staffId}&date=${selectedDay}`, {
                headers: {
                    Authorization: "Bearer "+accessToken
                },
            })
            if(resp.ok){
                const freeSlots: IFreeSlots[] = await resp.json()
                dispatch(setFreeSlots(freeSlots))
            } else{
                throw new Error("Get clients error")
            }
        } catch (error){
            console.log(error)
        }
    }
}



export const getAppointmentsById = (appointmentId: string | undefined) => {
    return async (dispatch: Dispatch)=>{
        try {
            const accessToken = localStorage.getItem("accessToken")
            const resp = await fetch(`${url}/appointments/${appointmentId}`, {
                headers: {
                    Authorization: "Bearer "+accessToken
                },
            })
            if(resp.ok){
                const appointment = await resp.json()
                
                dispatch(setSelectedAppointment(appointment))
            } else{
                throw new Error("Get clients error")
            }
        } catch (error){
            console.log(error)
        }
    }
}


export const createAppointment = (navigate: NavigateFunction, appointment: IAppointment) => {
    return async (dispatch: AppDispatch)=>{
        try {
            const accessToken = localStorage.getItem("accessToken")
        
            const resp = await fetch(`${url}/appointments`, {
                method: "POST",
                headers: {
                    Authorization: "Bearer "+accessToken,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(appointment)
            })
            if(resp.ok){
                
                dispatch(getAppointments(navigate))
            } else{
                console.log(resp.statusText)
                notifyErr("Errore nella creazione ")
            }
        } catch (error){
            console.log(error)
        }
    }
}

export const createAppointmentClient = (appointment: IAppointment) => {
    return async (dispatch: AppDispatch)=>{
        try {
            const accessToken = localStorage.getItem("accessToken")
        
            const resp = await fetch(`${url}/appointments/create`, {
                method: "POST",
                headers: {
                    Authorization: "Bearer "+accessToken,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(appointment)
            })
            if(resp.ok){
                const newAppointment = await resp.json()
                notify("Appuntamento creato")
                dispatch(getAppointmentsMe())
                return newAppointment
            } else{
                console.log(resp.statusText)
                notifyErr("Errore nella creazione ")
            }
        } catch (error){
            console.log(error)
        }
    }
}

export const updateAppointment = (navigate: NavigateFunction, appointmentId: string, appointment: IAppointment | IUpdateAppointment) => {
    return async (dispatch: AppDispatch)=>{
        try {
            const accessToken = localStorage.getItem("accessToken")
        
            const resp = await fetch(`${url}/appointments/${appointmentId}`, {
                method: "PUT",
                headers: {
                    Authorization: "Bearer "+accessToken,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(appointment)
            })
            if(resp.ok){
            
                dispatch(getAppointments(navigate))
            } else{
                console.log(resp.statusText)
                notifyErr("Errore nella creazione ")
            }
        } catch (error){
            console.log(error)
        }
    }
}


export const deleteAppointment = (navigate: NavigateFunction, appointmentId: string | undefined) => {
    return async (dispatch: AppDispatch)=>{
        try {
            const accessToken = localStorage.getItem("accessToken")
            const resp = await fetch(`${url}/appointments/${appointmentId}`, {
                method: "DELETE",
                headers: {
                    Authorization: "Bearer "+accessToken,
                    
                },
            })
            if(resp.ok){
                dispatch(getAppointments(navigate))
            } else{
                console.log(resp.statusText)
                notifyErr("Errore nell'eliminazione!")
            }
        } catch (error){
            console.log(error)
        }
    }
}

export const deleteMyAppointment = (appointmentId: string | undefined) => {
    return async (dispatch: AppDispatch)=>{
        try {
            const accessToken = localStorage.getItem("accessToken")
            const resp = await fetch(`${url}/appointments/${appointmentId}`, {
                method: "DELETE",
                headers: {
                    Authorization: "Bearer "+accessToken,
                    
                },
            })
            if(resp.ok){
                notify("Appuntamento eliminato")
                dispatch(getAppointmentsMe())
            } else{
                console.log(resp.statusText)
                notifyErr("Errore nell'eliminazione!")
            }
        } catch (error){
            console.log(error)
        }
    }
}