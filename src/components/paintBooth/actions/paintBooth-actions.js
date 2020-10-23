import {PAINTBOOTH_GET} from '../action-constants/paintBooth-actionTypes';
import {snackError} from "../../../constants/app-constants";
import {OPEN_SNACK} from "../../../shared/snackbar/action-constants/snackbar-actionTypes";
import {API} from "../../../constants/api-constants";


export const paintBoothGet = (page, take) => ({
    payload: '',
    meta: {
        type: API,
        url: `paintBooth?pageNo=${page}&pageSize=${take}`,
        onSuccess: (data) => ({
            type: PAINTBOOTH_GET,
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

