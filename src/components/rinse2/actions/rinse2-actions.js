import {R2_GET} from '../action-constants/rinse2-actionTypes';
import {get} from "../../../appservices/http-services/httpservices";
import {apiAction} from "../../../appservices/api-services";


export const r2Get = (page, take) => {
    return apiAction({
        url: `/rinse2?pageNo=${page}&pageSize=${take}`,
        onSuccess: (data)=>{
            return {
                type: 'R2_GET',
                data: data
            };
        },
        onFailure: () => console.log("Error occured loading articles"),
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


