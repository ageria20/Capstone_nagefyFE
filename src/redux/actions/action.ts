export const TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR';
export const CLIENTS = 'CLIENTS';
export const USERS = 'USERS';

export const url = import.meta.env.VITE_URL

export type ClientAction = {
    type: "CLIENTS"
    payload?: IUser[] 
};

export type UserAction = {
    type: "USERS"
    payload?: IUser 
};

  export type ToggleSidebarAction = {
    type: 'TOGGLE_SIDEBAR';
};

export const toggleSidebar = (): ToggleSidebarAction => ({
  type: TOGGLE_SIDEBAR,
});

export type SidebarActions = ToggleSidebarAction;
