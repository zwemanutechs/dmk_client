import {
    R1_GET,
} from '../action-constants/rinse1-actionTypes';
import {apiAction} from "../../../appservices/api-services/index";


export const r1Get = (page, take) => {
    return apiAction({
        url: `/rinse1?pageNo=${page}&pageSize=${take}`,
        onSuccess: (data)=>{
            return {
                type: 'R1_GET',
                data: data
            };
        },
        onFailure: () => console.log("Error occured loading articles"),
        label: R1_GET
    });
};



