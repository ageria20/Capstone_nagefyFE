export const TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR';



  export type ToggleSidebarAction = {
    type: 'TOGGLE_SIDEBAR';
};

export const toggleSidebar = (): ToggleSidebarAction => ({
  type: TOGGLE_SIDEBAR,
});

export type SidebarActions = ToggleSidebarAction;
