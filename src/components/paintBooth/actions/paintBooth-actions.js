import {PAINTBOOTH_GET} from '../action-constants/paintBooth-actionTypes';
import {apiAction} from "../../../appservices/api-services";
import {snackError} from "../../../constants/app-constants";


export const paintBoothGet = (page, take) => {
    return apiAction({
        url: `/paintBooth?pageNo=${page}&pageSize=${take}`,
        onSuccess: (data) => {
            return {
                type: PAINTBOOTH_GET,
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

