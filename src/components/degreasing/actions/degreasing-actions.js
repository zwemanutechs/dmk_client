import {DEGREASING_GET,} from '../action-constants/degreasing-actionTypes';
import {apiAction} from "../../../appservices/api-services";


export const degreasingGet = (page, take) => {
    return apiAction({
        url: `/degreasing?pageNo=${page}&pageSize=${take}`,
        onSuccess: (data)=>{
            return {
                type: 'DEGREASING_GET',
                data: data
            };
        },
        onFailure: () => console.log("Error occured loading articles"),
        label: DEGREASING_GET
    });
};


