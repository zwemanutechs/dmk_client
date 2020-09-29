import {
    RDI_GET,
    RDI_UPDATE,
    RDI_DELETE,
    RDI_SAVE,
    RDI_OPEN_DIAG,
    RDI_FILTER,
    RDI_PRINT_CSV,
    RDI_PRINT_PDF,
    RDI_CLOSE_DIAG, RDI_FORM_CHANGE
} from '../action-constants/rinseDi-actionTypes';
import {OPEN_MENU} from "../../../layout/action-constants/menu-actionTypes";
import {closeDialog, openDialog} from "../../../shared/mat-diaglog/actions/maxDialog-action";
import {CLOSE_DIAG} from "../../../shared/mat-diaglog/action-constants/maxDialog-actionTypes";
import {snackError} from "../../../constants/app-constants";
import {OPEN_SNACK} from '../../../shared/snackbar/action-constants/snackbar-actionTypes';
import {OPEN_SPINNER,CLOSE_SPINNER} from '../../../shared/spinner/action-constants/spinner-actionTypes';
import {API} from "../../../appservices/api-services/types";

const rdiModel = {
    phMeter: 0,
    waterGuage: 0,
    updatedAt: new Date().toLocaleDateString(),
    updatedBy: 'Admin'
};

export const rdiGet = (page, take) => ({
    payload: '',
    meta: {
        type: API,
        url: `https://localhost:44394/backend/rinsedi?pageNo=${page}&pageSize=${take}`,
        onSuccess: (data) => ({
            type: RDI_GET,
            data: data.data,
            legendKey: ''
        }),
        onFailure: (error) => ({
            type: OPEN_SNACK,
            status: false,
            message: 'Server Error',
            snackType: snackError
        }),
    }
});

export const rdiOpenDiag = (dataSet, title) => (dispatch) => {
    dispatch(openDialog(true, title));
    dispatch({
        type: RDI_OPEN_DIAG, // mandatory key
        dataSet
    });
};

export const rdiCloseDiag = () => (dispatch) => {
    dispatch(closeDialog(false, ''));
    dispatch({
        type: RDI_CLOSE_DIAG, // mandatory key
        rdiModel
    });
};

export const rdiSave = (model) => (dispatch) => {
    dispatch({
        type: RDI_SAVE,
        rdiModel,// mandatory key
        model
    });
    dispatch(closeDialog(false, ''));
};

export const rdiFormChange = changesValue => ({
    type: RDI_FORM_CHANGE, // mandatory key
    changesValue
});

