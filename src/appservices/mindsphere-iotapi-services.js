import {getFromOtherOrigin} from "../middleware/axios-middleware";

export const loadDataByGivenDate = (from, to, assetId, aspectId, parameterName, limit) => {
    return getFromOtherOrigin(`/api/iottimeseries/v3/timeseries/${assetId}/${aspectId}?select=${parameterName}&from=${new Date(from).toISOString()}&to=${new Date(to).toISOString()}&limit=${limit}&sort=desc`);
};

export const loadLatestValue = (assetId, aspectId, parameterName) => {
    return getFromOtherOrigin(`/api/iottimeseries/v3/timeseries/${assetId}/${aspectId}?select=${parameterName}&latestValue=true`);
};
