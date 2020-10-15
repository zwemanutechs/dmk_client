import {DEGREASING_GET} from '../action-constants/degreasing-actionTypes';
import {OPEN_SNACK} from '../../../shared/snackbar/action-constants/snackbar-actionTypes';
import {snackError} from "../../../constants/app-constants";
import {API} from "../../../appservices/api-services/types";


export const degreasingGet = (page, take) => ({
    payload: '',
    meta: {
        type: API,
        url: `degreasing?pageNo=${page}&pageSize=${take}`,
        onSuccess: (data) => ({
            type: DEGREASING_GET,
            data: data.data,
            legendKey: ''
        }),
        onFailure: (error) => ({
            type: OPEN_SNACK,
            status: false,
            message: 'Server Error',
            snackType: snackError
        })
    }
});

