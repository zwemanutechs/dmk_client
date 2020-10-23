import {FETCH, GET} from '../action-constants/lineChart-actionTypes'
import {OPEN_SNACK} from "../../../snackbar/action-constants/snackbar-actionTypes";
import {snackError} from "../../../../constants/app-constants";
import {API} from "../../../../constants/api-constants";

export const lineChartFetchData = (fetchUrl, keys) => ({
   payload: '',
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
