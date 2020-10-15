import {NOTIFICATION_FETCH, NOTIFICATION_GET} from '../action-constants/notificationCard-actionTypes'
import {API} from "../../../appservices/api-services/types";
import {OPEN_SNACK} from "../../snackbar/action-constants/snackbar-actionTypes";
import {snackError} from "../../../constants/app-constants";

export const notificationCardFetchData = (formName,datetime) => ({
   payload: '',
    meta: {
       type: API,
        url: `dashboard/notification/${formName}/${datetime}`,
        onSuccess: (data) => ({
            type: NOTIFICATION_GET,
            data: data.data,
            formName:formName
        }),
        onFailure: (error) => ({
            type: OPEN_SNACK,
            status:false,
            message:'Server Error',
            snackType:snackError
        })
    }
});
