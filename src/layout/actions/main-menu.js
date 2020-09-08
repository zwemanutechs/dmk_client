import { OPEN_MENU, CLOSE_MENU } from "../action-constants/menu-actionTypes";

export const openMenu = name => ({
    type: OPEN_MENU, // mandatory key
    name
});

export const closeMenu = name => ({
    type: CLOSE_MENU, // mandatory key
    name
});
