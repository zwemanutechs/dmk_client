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
import {get} from "../../../appservices/http-services/httpservices";

const rdiModel = {
    phMeter: 0,
    waterGuage: 0,
    updatedAt: new Date().toLocaleDateString(),
    updatedBy: 'Admin'
};

export const rdiGet = (page, take) => {
    return function (dispatch) {
        return  get(`/rinsedi?pageNo=${page}&pageSize=${take}`).then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.code === true) {
                    dispatch({
                        type: RDI_GET,
                        data: data.data
                    })
                }
            });
    }
};

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

