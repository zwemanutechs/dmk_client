import {FETCH, GET} from '../action-constants/lineChart-actionTypes'
import {API} from "../../../../appservices/api-services/types";
import {OPEN_SNACK} from "../../../snackbar/action-constants/snackbar-actionTypes";
import {snackError} from "../../../../constants/app-constants";

export const lineChartFetchData = (fetchUrl, keys, payload) => ({
   type: FETCH,
   payload: payload,
    meta: {
       type: API,
        url: fetchUrl,
        onSuccess: (data) => ({
            type: GET,
            data: data.result,
            legendKey: keys
        }),
        onFailure: (error) => ({
            type: OPEN_SNACK,
            status:false,
            message:'Server Error',
            snackType:snackError
        })
    }
});
