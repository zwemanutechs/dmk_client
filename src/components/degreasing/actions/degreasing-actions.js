import {DEGREASING_GET} from '../action-constants/degreasing-actionTypes';
import {OPEN_SNACK} from '../../../shared/snackbar/action-constants/snackbar-actionTypes';
import {apiAction} from "../../../appservices/api-services";
import {snackError} from "../../../constants/app-constants";


export const degreasingGet = (page, take) => {
    return apiAction({
        url: `/degreasing?pageNo=${page}&pageSize=${take}`,
        onSuccess: (data) => {
            return {
                type: DEGREASING_GET,
                data: data
            };
        },
        onFailure: (error) => {
            return {
                type: OPEN_SNACK,
                status:false,
                message:'Server Error',
                snackType:snackError
            };
        }
    });
};
