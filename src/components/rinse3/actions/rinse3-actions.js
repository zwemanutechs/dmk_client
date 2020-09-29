import {R3_GET} from '../action-constants/rinse3-actionTypes';
import {snackError} from "../../../constants/app-constants";
import {OPEN_SNACK} from '../../../shared/snackbar/action-constants/snackbar-actionTypes';
import {API} from "../../../appservices/api-services/types";

export const r3Get = (page, take) => ({
    payload: '',
    meta: {
        type: API,
        url:  `https://localhost:44394/backend/rinse3?pageNo=${page}&pageSize=${take}`,
        onSuccess: (data) => ({
            type: R3_GET,
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


