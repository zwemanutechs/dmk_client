import {PASSIVATION_GET} from '../action-constants/passivation-actionTypes';
import {OPEN_SNACK} from '../../../shared/snackbar/action-constants/snackbar-actionTypes';
import {snackError} from "../../../constants/app-constants";
import {API} from "../../../constants/api-constants";


export const passivationGet = (page, take) =>  ({
    payload: '',
    meta: {
        type: API,
        url:  `passivation?pageNo=${page}&pageSize=${take}`,
        onSuccess: (data) => ({
            type: PASSIVATION_GET,
            data: data.data,
            legendKey: ''
        }),
        onFailure: (error) => ({
            type: OPEN_SNACK,
            status:false,
            message:'Server Error',
            snackType:snackError
        })
    }
});

