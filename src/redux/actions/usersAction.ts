import { Dispatch } from "@reduxjs/toolkit"
import { CLIENT, ClientMeAction, notifyErr, UserAction, USERS } from "./action"



export const getUser = () => {
    return async (dispatch: Dispatch<UserAction>) => {
      try {
        const accessToken = localStorage.getItem("accessToken"); 
        if (!accessToken) {
          notifyErr("Login errato");
          return;
        }
        const resp = await fetch("http://localhost:8080/users/me", {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        });
  
        if (resp.ok) {
          const user = await resp.json();
          dispatch({ type: USERS, payload: user });
        } else {
          console.log("Errore nel fetch dell'utente");
        }
      } catch (error) {
        console.log(error);
      }
    };
  };




  export const getClientMe = () => {
    return async (dispatch: Dispatch<ClientMeAction>) => {
      try {
        const accessToken = localStorage.getItem("accessToken"); 
        if (!accessToken) {
          notifyErr("Login errato");
          return;
        }
  
        const resp = await fetch("http://localhost:8080/clients/me", {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        });
  
        if (resp.ok) {
          const client = await resp.json();
          dispatch({ type: CLIENT, payload: client });
        } else {
          console.log("Errore nel fetch dell'utente");
        }
      } catch (error) {
        console.log(error);
      }
    };
  };
  
  