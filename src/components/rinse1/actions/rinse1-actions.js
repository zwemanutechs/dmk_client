import {
    R1_GET,
} from '../action-constants/rinse1-actionTypes';
import {OPEN_SNACK} from '../../../shared/snackbar/action-constants/snackbar-actionTypes';
import {apiAction} from "../../../appservices/api-services/index";
import {snackError} from "../../../constants/app-constants";


export const r1Get = (page, take) => {
    return apiAction({
        url: `/rinse1?pageNo=${page}&pageSize=${take}`,
        onSuccess: (data)=>{
            return {
                type: R1_GET,
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
        label: R1_GET
    });
};



