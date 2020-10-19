import {
    R1_GET,
    R1_SAVE,
    R1_UPDATE,
    R1_DELETE,
    R1_FORM_ERROR,
    R1_FORM_CHANGE,
    R1_CLOSE_DIAG, R1_ON_FORMSUBMIT
} from '../action-constants/rinse1-actionTypes';
import {OPEN_SNACK} from '../../../shared/snackbar/action-constants/snackbar-actionTypes';
import {APIGET, APIADD, APIUPDATE, APIDELETE, snackError} from "../../../constants/app-constants";
import {API} from "../../../appservices/api-services/types";
import {formValidation} from "../validator/form-validator";
import {closeDialog} from "../../../shared/mat-diaglog/actions/maxDialog-action";

export const rinse1Get = (page, take) => ({
    payload: '',
    meta: {
        type: API,
        method: APIGET,
        url:  `rinse1?pageNo=${page}&pageSize=${take}`,
        onSuccess: (data) => ({
            type: R1_GET,
            data: data.data,
            legendKey: ''
        }),
        onFailure: (error) => ({
            type: OPEN_SNACK,
            status:false,
            message:'Oops, something went wrong please try again later.',
            snackType:snackError
        })
    }
});

export const rinse1Add = (data) => async dispatch => {
    try {
        const formValid = await formValidation(data);
        if(formValid && formValid.valid){
            dispatch({
                payload: data,
                meta: {
                    type: API,
                    method: APIADD,
                    url: `rinse1/add`,
                    onSuccess: (data) => dispatch => {
                        dispatch(closeDialog(false, ''));
                        dispatch({
                            type: R1_SAVE,
                            data: data.data,
                            legendKey: ''
                        });
                    },
                    onFailure: (error) => ({
                        type: OPEN_SNACK,
                        status:false,
                        message:'Oops, something went wrong please try again later.',
                        snackType:snackError
                    })
                }
            });
        }else{
            dispatch({
                type: R1_FORM_ERROR,
                validateResult: formValid
            });
        }
    }catch (e) {

    }
};

export const r1FormChange = (updatedDataSet) => ({
    type: R1_FORM_CHANGE,
    updatedDataSet
});

export const onFormSubmition = () => ({
    type: R1_ON_FORMSUBMIT
});

export const onDialogClose = () => async dispatch => {
    dispatch(closeDialog(false, ''));
    dispatch({
      type: R1_CLOSE_DIAG
  })
};



