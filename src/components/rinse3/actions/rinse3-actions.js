import {
    R3_GET,
} from '../action-constants/rinse3-actionTypes';
import {apiAction} from "../../../appservices/api-services";

export const r3Get = (page, take) => {
    return apiAction({
        url: `/rinse3?pageNo=${page}&pageSize=${take}`,
        onSuccess: (data)=>{
            return {
                type: 'R3_GET',
                data: data
            };
        },
        onFailure: () => console.log("Error occured loading articles"),
        label: R3_GET
    });
};


