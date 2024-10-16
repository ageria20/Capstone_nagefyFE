import { Dispatch } from "@reduxjs/toolkit"
import { setCash } from "../slices/cashSlice"
import { AppDispatch } from "../store/store"
import { ICash } from "../../interfaces/ICash"

export const getCash = () => {
    return async (dispatch: Dispatch)=>{
        try {
            const accessToken = localStorage.getItem("accessToken")
            const resp = await fetch(`http://localhost:8080/cash`, {
                headers: {
                    Authorization: "Bearer "+accessToken
                },
            })
            if(resp.ok){
                const cash = await resp.json()
                dispatch(setCash(cash.content))
            } else{
                throw new Error("Get clients error")
            }
        } catch (error){
            console.log(error)
        }
    }
}

// export const searchStaff = (query: string) => {
//     return async (dispatch: Dispatch) => {
//         try {
//             const accessToken = localStorage.getItem("accessToken");
//             const url = `http://localhost:8080/staffs/search?name=${encodeURIComponent(query)}`;

//             const resp = await fetch(url, {
//                 headers: {
//                     Authorization: "Bearer " + accessToken
//                 },
//             });

//             if (resp.ok) {
//                 const staffs = await resp.json();
//                 dispatch(setStaffs(staffs));
//             } else {
//                 throw new Error("Get clients error");
//             }
//         } catch (error) {
//             console.log(error);
//         }
//     };
// };

export const createCash = (cash: ICash) => {
    return async (dispatch: AppDispatch)=>{
        try {
            const accessToken = localStorage.getItem("accessToken")
            const resp = await fetch(`http://localhost:8080/cash`, {
                method: "POST",
                headers: {
                    Authorization: "Bearer "+accessToken,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(cash)
            })
            if(resp.ok){
                dispatch(getCash())
            } else{
                console.log(resp.statusText)
            }
        } catch (error){
            console.log(error)
        }
    }
}