import {r1Model} from "../model/model";

const rinse1ItemActions = (
    state = {
        data: [],
        page: 0,
        count: 1,
        rowsPerPage: 10,
        loading:true,
        formError: {},
        onSubmit: false,
        /**
         * 0 means Success
         * 1 mean Error on Get
         * 2 mean Error on Add
         * 3 mean Error on Update
         * 4 mean Error on Delete
         * **/
        errorCode: 0,
        rinse1DataSet: r1Model
    },
    action
) => {
    switch (action.type) {
        case "R1_FORM_ERROR":
            return {
                ...state,
                formError: action.validateResult,
                onSubmit: false
            };
        case "R1_GET":
            return {
                ...state,
                data: action.data.data,
                count: action.data.count,
                loading: false
            };
        case "R1_SAVE":
            return {
                data: [action.data, ...state.data],
                rinse1DataSet: r1Model,
                loading: false,
                onSubmit: false
            };
        case "R1_UPDATE":
            const updatedDataIndex = state.data.findIndex(d => d.id === action.data.id);
            if(updatedDataIndex >= 0){
                let listData = [...state.data];
                listData[updatedDataIndex] = action.data;
                return {
                    data: listData,
                    rinse1DataSet: r1Model,
                    loading: false,
                    onSubmit: false
                };
            }else{
                return {
                    data: state.data,
                    loading: false,
                    errorCode: 3,
                    onSubmit: false
                }
            };
        case "R1_DELETE":
            const deletedDataIndex = state.data.findIndex(d => d.id === action.data.id);
            if(deletedDataIndex >= 0){
                return {
                    data: [...state.data[deletedDataIndex], action.data ],
                    loading: false
                };
            }else{
                return {
                    data: state.data,
                    loading: false,
                    errorCode: 3
                }
            };
        case "R1_ON_FORMSUBMIT":
            return {
              ...state,
                onSubmit: true,
            };
        case "R1_FORM_CHANGE":
            return {
                ...state,
                rinse1DataSet: action.updatedDataSet
            };
        case "R1_CLOSE_DIAG":
            return {
                ...state,
                formError: {},
                onSubmit: false,
                loading: false,
                errorCode: 0,
            };
        case "R1_ON_ROWCLICK":
            return {
                ...state,
                rinse1DataSet: action.dataSet
            };

        default:
            return state;
    }
};

export default rinse1ItemActions;
