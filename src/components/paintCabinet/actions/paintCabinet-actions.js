import {PAINTCABINET_GET} from '../action-constants/paintCabinet-actionTypes';
import {snackError} from "../../../constants/app-constants";
import {API} from "../../../appservices/api-services/types";
import {OPEN_SNACK} from "../../../shared/snackbar/action-constants/snackbar-actionTypes";


export const paintCabinetGet = (page, take) =>({
    payload: '',
    meta: {
        type: API,
        url:  `paintCabinet?pageNo=${page}&pageSize=${take}`,
        onSuccess: (data) => ({
            type: PAINTCABINET_GET,
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
