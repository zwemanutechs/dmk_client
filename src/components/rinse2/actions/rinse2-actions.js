import {R2_GET} from '../action-constants/rinse2-actionTypes';
import {OPEN_SNACK} from '../../../shared/snackbar/action-constants/snackbar-actionTypes';
import {snackError} from "../../../constants/app-constants";
import {API} from "../../../appservices/api-services/types";


export const r2Get = (page, take) => ({
    payload: '',
    meta: {
        type: API,
        url:  `rinse2?pageNo=${page}&pageSize=${take}`,
        onSuccess: (data) => ({
            type: R2_GET,
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


