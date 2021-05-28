import {NOTIFICATION_FETCH, NOTIFICATION_GET} from '../action-constants/notificationCard-actionTypes'
import {OPEN_SNACK} from "../../snackbar/action-constants/snackbar-actionTypes";
import {snackError} from "../../../constants/app-constants";
import {BASEURI, API} from "../../../constants/api-constants";

export const notificationCardFetchData = (formName,datetime) => ({
   payload: '',
    meta: {
       type: 'API',
        url: `${window.location.hostname === 'localhost' ? API + BASEURI : BASEURI}/dashboard/notification/${formName}/${datetime}`,
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
