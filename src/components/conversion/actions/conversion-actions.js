import {
    CONVERSION_GET,
} from '../action-constants/conversion-actionTypes';
import {OPEN_SNACK} from '../../../shared/snackbar/action-constants/snackbar-actionTypes';
import {apiAction} from "../../../appservices/api-services/index";
import {snackError} from "../../../constants/app-constants";


export const conversionGet = (page, take) => {
    return apiAction({
        url: `/conversion?pageNo=${page}&pageSize=${take}`,
        onSuccess: (data)=>{
            return {
                type: CONVERSION_GET,
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
        label: CONVERSION_GET
    });
};



