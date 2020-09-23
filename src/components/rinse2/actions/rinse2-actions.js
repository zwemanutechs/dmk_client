import {R2_GET} from '../action-constants/rinse2-actionTypes';
import {get} from "../../../appservices/http-services/httpservices";
import {OPEN_SNACK} from '../../../shared/snackbar/action-constants/snackbar-actionTypes';
import {apiAction} from "../../../appservices/api-services";
import {snackError} from "../../../constants/app-constants";


export const r2Get = (page, take) => {
    return apiAction({
        url: `/rinse2?pageNo=${page}&pageSize=${take}`,
        onSuccess: (data)=>{
            return {
                type: R2_GET,
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
        label: R2_GET
    });
    //return function (dispatch) {
        // return  get(`/rinse2?pageNo=${page}&pageSize=${take}`).then(response => response.json())
        //     .then(data => {
        //         console.log(data);
        //         if (data.code === true) {
        //             dispatch({
        //                 type: R2_GET,
        //                 data: data.data
        //             })
        //         }
        //     });
    //}
};


