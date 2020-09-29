import {R1_GET} from '../action-constants/rinse1-actionTypes';
import {OPEN_SNACK} from '../../../shared/snackbar/action-constants/snackbar-actionTypes';
import {snackError} from "../../../constants/app-constants";
import {API} from "../../../appservices/api-services/types";


export const rinse1Get = (page, take) => ({
    payload: '',
    meta: {
        type: API,
        url:  `https://localhost:44394/backend/rinse1?pageNo=${page}&pageSize=${take}`,
        onSuccess: (data) => ({
            type: R1_GET,
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



