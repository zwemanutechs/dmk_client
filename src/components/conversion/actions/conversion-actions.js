import {
    CONVERSION_GET
} from '../action-constants/conversion-actionTypes';
import {OPEN_SNACK} from '../../../shared/snackbar/action-constants/snackbar-actionTypes';
import {snackError} from "../../../constants/app-constants";
import {API} from "../../../appservices/api-services/types";


export const conversionGet = (page, take) => ({
    payload: '',
    meta: {
        type: API,
        url: `conversion?pageNo=${page}&pageSize=${take}`,
        onSuccess: (data) => ({
            type: CONVERSION_GET,
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




