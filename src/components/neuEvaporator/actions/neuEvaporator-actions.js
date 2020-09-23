import {NEUEVAPORATOR_GET} from '../action-constants/neuEvaporator-actionTypes';
import {apiAction} from "../../../appservices/api-services";
import {snackError} from "../../../constants/app-constants";


export const neuEvaporatorGet = (page, take) => {
    return apiAction({
        url: `/neuEvaporator?pageNo=${page}&pageSize=${take}`,
        onSuccess: (data) => {
            return {
                type: NEUEVAPORATOR_GET,
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

