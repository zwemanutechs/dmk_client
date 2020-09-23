import {PAINTCABINET_GET} from '../action-constants/paintCabinet-actionTypes';
import {apiAction} from "../../../appservices/api-services";
import {snackError} from "../../../constants/app-constants";


export const paintCabinetGet = (page, take) => {
    return apiAction({
        url: `/paintCabinet?pageNo=${page}&pageSize=${take}`,
        onSuccess: (data) => {
            return {
                type: PAINTCABINET_GET,
                data: data
            };
        },
        onFailure: (error) => {
            return {
                type: 'OPEN_SNACK',
                status:false,
                message:'Server Error',
                snackType:snackError
            };
        }
    });
};

