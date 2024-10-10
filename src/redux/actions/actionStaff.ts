import { Dispatch } from "@reduxjs/toolkit"
import { notify, notifyErr} from "./action"
import { AppDispatch } from "../store/store"
import { setStaffs } from "../slices/staffSlice"

export const getStaffs = () => {
    return async (dispatch: Dispatch)=>{
        try {
            const accessToken = localStorage.getItem("accessToken")
            const resp = await fetch(`http://localhost:8080/staffs`, {
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
        }
    }
}

export const searchStaff = (query: string) => {
    return async (dispatch: Dispatch) => {
        try {
            const accessToken = localStorage.getItem("accessToken");
            const url = `http://localhost:8080/staffs/search?name=${encodeURIComponent(query)}`;

            const resp = await fetch(url, {
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
        }
    };
};

export const createStaff = (staff: INewStaff) => {
    return async (dispatch: AppDispatch)=>{
        try {
            const accessToken = localStorage.getItem("accessToken")
            const resp = await fetch(`http://localhost:8080/staffs/create`, {
                method: "POST",
                headers: {
                    Authorization: "Bearer "+accessToken,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(staff)
            })
            if(resp.ok){
                notify("Staff creato")
                dispatch(getStaffs())
            } else{
                console.log(resp.statusText)
                notifyErr("Errore nella creazione ")
            }
        } catch (error){
            console.log(error)
        }
    }
}
export const deleteStaff = (staffId: string | undefined) => {
    return async (dispatch: AppDispatch)=>{
        try {
            const accessToken = localStorage.getItem("accessToken")
            const resp = await fetch(`http://localhost:8080/staffs/${staffId}`, {
                method: "DELETE",
                headers: {
                    Authorization: "Bearer "+accessToken,
                    
                },
            })
            if(resp.ok){
                notify("Trattamento eliminato")
                dispatch(getStaffs())
            } else{
                console.log(resp.statusText)
                notifyErr("Errore nell'eliminazione!")
            }
        } catch (error){
            console.log(error)
        }
    }
}