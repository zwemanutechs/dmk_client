import {RDI_GET, RDI_UPDATE, RDI_DELETE, RDI_SAVE, RDI_OPEN_DIAG, RDI_FILTER, RDI_PRINT_CSV, RDI_PRINT_PDF} from '../action-constants/rinseDi-actionTypesjs';
import {OPEN_MENU} from "../../../layout/action-constants/menu-actionTypes";

export const rdiGet = (page, take) => {
    return function (dispatch) {
        const requestURL = `http://pokeapi.co/api/v2/pokemon/${page}/${take}`;
        dispatch({
            type: RDI_GET,
            promise: fetch(requestURL)
        })
    }
};

export const openDiag = itemValue => ({
    type: RDI_OPEN_DIAG, // mandatory key
    itemValue
});
