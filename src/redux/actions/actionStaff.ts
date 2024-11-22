import { Dispatch } from "@reduxjs/toolkit"
import { notify, notifyErr, url} from "./action"
import { AppDispatch } from "../store/store"
import { setStaffs } from "../slices/staffSlice"

export const getStaffs = (setIsLoading: (b: boolean) => void) => {
    return async (dispatch: Dispatch)=>{
        try {
            setIsLoading(true)
            const accessToken = localStorage.getItem("accessToken")
            const resp = await fetch(`${url}/staffs`, {
                headers: {
                    Authorization: "Bearer "+accessToken
                },
            })
            if(resp.ok){
                const staffs = await resp.json()
                dispatch(setStaffs(staffs.content))
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

export const searchStaff = (query: string, setIsLoading: (b: boolean) => void) => {
    return async (dispatch: Dispatch) => {
        try {
            setIsLoading(true);
            const accessToken = localStorage.getItem("accessToken");
            const resp = await fetch( `${url}/staffs/search?name=${encodeURIComponent(query)}`, {
                headers: {
                    Authorization: "Bearer " + accessToken
                },
            });

            if (resp.ok) {
                const staffs = await resp.json();
                dispatch(setStaffs(staffs));
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

export const createStaff = (staff: INewStaff, setIsLoading: (b: boolean) => void) => {
    return async (dispatch: AppDispatch)=>{
        try {
            setIsLoading(true)
            const accessToken = localStorage.getItem("accessToken")
            const resp = await fetch(`${url}/staffs/create`, {
                method: "POST",
                headers: {
                    Authorization: "Bearer "+accessToken,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(staff)
            })
            if(resp.ok){
                notify("Staff creato")
                await dispatch(getStaffs(setIsLoading))
                
            } else{
                console.log(resp.statusText)
                notifyErr("Errore nella creazione ")
            }
        } catch (error){
            console.log(error)
        } 
    }
}

export const updateStaff = (staffId: string | undefined, staff: IStaff, setIsLoading: (b: boolean) => void) => {
    return async (dispatch: AppDispatch)=>{
        try {
            setIsLoading(true)
            const accessToken = localStorage.getItem("accessToken")
            const resp = await fetch(`${url}/staffs/${staffId}`, {
                method: "PUT",
                headers: {
                    Authorization: "Bearer "+accessToken,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(staff)
            })
            if(resp.ok){        
                notify("Staff modificato")
                dispatch(getStaffs(setIsLoading))
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

export const deleteStaff = (staffId: string | undefined, setIsLoading: (b: boolean) => void) => {
    return async (dispatch: AppDispatch)=>{
        try {
            setIsLoading(true)
            const accessToken = localStorage.getItem("accessToken")
            const resp = await fetch(`${url}/staffs/${staffId}`, {
                method: "DELETE",
                headers: {
                    Authorization: "Bearer "+accessToken,
                    
                },
            })
            if(resp.ok){
                notify("Staff eliminato")
                dispatch(getStaffs(setIsLoading))
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