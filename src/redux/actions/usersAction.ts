import { Dispatch } from "@reduxjs/toolkit"
import { UserAction, USERS } from "./action"


export const getUser = () => {
    return async (dispatch: Dispatch<UserAction>) => {
      try {
        const accessToken = localStorage.getItem("accessToken"); // Corretto nome del token
        if (!accessToken) {
          console.log("No access token found");
          return;
        }
  
        const resp = await fetch("http://localhost:8080/users/me", {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        });
  
        if (resp.ok) {
          const user = await resp.json();
          console.log(user); // Verifica che l'utente venga ricevuto correttamente
          dispatch({ type: USERS, payload: user });
        } else {
          console.log("Errore nel fetch dell'utente");
        }
      } catch (error) {
        console.log(error);
      }
    };
  };
  