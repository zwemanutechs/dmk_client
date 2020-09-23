import {
    R3_GET,
} from '../action-constants/rinse3-actionTypes';
import {apiAction} from "../../../appservices/api-services";
import {snackError} from "../../../constants/app-constants";
import {OPEN_SNACK} from '../../../shared/snackbar/action-constants/snackbar-actionTypes';

export const r3Get = (page, take) => {
    return apiAction({
        url: `/rinse3?pageNo=${page}&pageSize=${take}`,
        onSuccess: (data)=>{
            return {
                type: R3_GET,
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
        },
        label: R3_GET
    });
};


