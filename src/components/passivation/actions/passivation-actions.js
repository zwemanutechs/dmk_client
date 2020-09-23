import {PASSIVATION_GET} from '../action-constants/passivation-actionTypes';
import {OPEN_SNACK} from '../../../shared/snackbar/action-constants/snackbar-actionTypes';
import {apiAction} from "../../../appservices/api-services";
import {snackError} from "../../../constants/app-constants";


export const passivationGet = (page, take) => {
    return apiAction({
        url: `/passivation?pageNo=${page}&pageSize=${take}`,
        onSuccess: (data) => {
            return {
                type: PASSIVATION_GET,
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

