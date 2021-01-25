import { getFromOtherOrigin, get } from "../middleware/axios-middleware";
import format from "date-fns/format";
import { zonedTimeToUtc } from "date-fns-tz";

// get timeseries data from mindsphere api
export const loadDataByGivenDate = (
    from,
    to,
    assetId,
    aspectId,
    parameterName,
    limit
) => {
  return getFromOtherOrigin(
      `/api/iottimeseries/v3/timeseries/${assetId}/${aspectId}?select=${parameterName}&from=${new Date(
          from
      ).toISOString()}&to=${new Date(to).toISOString()}&limit=${limit}&sort=desc`
  );
};

// get latest value from mindsphere api
export const loadLatestValue = (assetId, aspectId, parameterName) => {
  return getFromOtherOrigin(
      `/api/iottimeseries/v3/timeseries/${assetId}/${aspectId}?select=${parameterName}&latestValue=true`
  );
};

// get aggregate time series data from mindsphere api
export const loadAggregateData = (from, to, assetId, aspectId, parameterName, limit) => {
  return getFromOtherOrigin(
      `/api/iottsaggregates/v4/aggregates?assetId=${assetId}&aspectName=${aspectId}&select=${parameterName}&from=${new Date(
          from
      ).toISOString()}&to=${new Date(to).toISOString()}&limit=${limit}&sort=desc`
  );
}

/* Daryl Code
// ---------------- Minsphere API V2 Gateway

export const loadDataByGivenDateV2 = (assetId, aspectId, parameterName) => {
  try {
    const limit = "1000";
    const fromDate = new Date(
        zonedTimeToUtc(
            new Date(new Date().setHours(0, 59, 59, 59)),
            Intl.DateTimeFormat().resolvedOptions().timeZone
        )
    ).toISOString();
    const toDate = new Date(
        zonedTimeToUtc(
            new Date(new Date().setHours(23, 59, 59, 59)),
            Intl.DateTimeFormat().resolvedOptions().timeZone
        )
    ).toISOString();

    return getFromOtherOrigin(
        `/api/iottimeseries/v3/timeseries/${assetId}/${aspectId}?select=${parameterName}&from=${fromDate}&to=${toDate}&limit=${limit}&sort=desc`
    );
  } catch (err) {
    console.log(err);
    console.log("err");
  }
  return [];
};

export const loadGraphDataByGivenDateV2 = (
    assetId,
    aspectId,
    parameterName,
    fromDate,
    toDate
) => {
  try {
    const limit = "15";

    console.log(fromDate);
    console.log(toDate);
    // return getFromOtherOrigin(
    //   `/api/iottimeseries/v3/timeseries/${assetId}/${aspectId}?select=${parameterName}&from=${fromDate}&to=${toDate}&limit=${limit}&sort=desc`
    // );
  } catch (err) {
    console.log(err);
    console.log("err");
  }
  return [];
};

export const loadLatestValueV2 = (assetId, aspectId, parameterName) => {
  try {
    return getFromOtherOrigin(
        `/api/iottimeseries/v3/timeseries/${assetId}/${aspectId}?select=${parameterName}&latestValue=true`
    );
  } catch (err) {
    console.log(err);
    console.log("err");
  }
  return [];
};

export const loadDataByGivenDateDummy = (aspectId, parameterName) => {
  //   const assetId = "bb2d6d60bed647beb3816fff37639de4";
  //   const limit = "1000";
  // const fromDate = new Date(
  //   zonedTimeToUtc(
  //     new Date(new Date().setHours(0, 59, 59, 59)),
  //     Intl.DateTimeFormat().resolvedOptions().timeZone
  //   )
  // ).toISOString();

  // const toDate = new Date(
  //   zonedTimeToUtc(
  //     new Date(new Date().setHours(23, 59, 59, 59)),
  //     Intl.DateTimeFormat().resolvedOptions().timeZone
  //   )
  // ).toISOString();

  return [
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T06:23:53.100Z",
      [parameterName]: 45.43909,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T06:23:38.097Z",
      [parameterName]: 45.43909,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T06:23:23.103Z",
      [parameterName]: 45.43909,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T06:23:08.102Z",
      [parameterName]: 45.43909,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T06:22:53.106Z",
      [parameterName]: 45.424625,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T06:22:38.104Z",
      [parameterName]: 45.48611,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T06:22:23.108Z",
      [parameterName]: 45.471645,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T06:22:08.108Z",
      [parameterName]: 45.475258,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T06:21:53.105Z",
      [parameterName]: 45.471645,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T06:21:38.103Z",
      [parameterName]: 45.45356,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T06:21:23.107Z",
      [parameterName]: 45.471645,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T06:21:08.106Z",
      [parameterName]: 45.46441,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T06:20:53.102Z",
      [parameterName]: 45.48611,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T06:20:38.102Z",
      [parameterName]: 45.478878,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T06:20:23.108Z",
      [parameterName]: 45.507812,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T06:20:08.107Z",
      [parameterName]: 45.493343,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T06:19:53.103Z",
      [parameterName]: 45.478878,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T06:19:39.332Z",
      [parameterName]: 45.51143,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T06:19:23.110Z",
      [parameterName]: 45.489727,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T06:19:08.110Z",
      [parameterName]: 45.5476,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T06:18:53.109Z",
      [parameterName]: 45.51143,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T06:18:38.109Z",
      [parameterName]: 45.525898,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T06:18:23.114Z",
      [parameterName]: 45.525898,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T06:18:08.113Z",
      [parameterName]: 45.540367,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T06:17:53.114Z",
      [parameterName]: 45.55845,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T06:17:38.117Z",
      [parameterName]: 45.518665,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T06:17:23.112Z",
      [parameterName]: 45.554832,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T06:17:08.110Z",
      [parameterName]: 45.518665,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T06:16:53.106Z",
      [parameterName]: 45.562065,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T06:16:38.104Z",
      [parameterName]: 45.518665,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T06:16:23.107Z",
      [parameterName]: 45.5693,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T06:16:08.105Z",
      [parameterName]: 45.554832,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T06:15:53.107Z",
      [parameterName]: 45.587383,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T06:15:38.106Z",
      [parameterName]: 45.583767,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T06:15:23.109Z",
      [parameterName]: 45.551216,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T06:15:08.107Z",
      [parameterName]: 45.55845,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T06:14:53.109Z",
      [parameterName]: 45.551216,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T06:14:39.928Z",
      [parameterName]: 45.5693,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T06:14:23.103Z",
      [parameterName]: 45.554832,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T06:14:08.103Z",
      [parameterName]: 45.562065,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T06:13:53.100Z",
      [parameterName]: 45.572914,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T06:13:38.099Z",
      [parameterName]: 45.583767,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T06:13:23.097Z",
      [parameterName]: 45.591,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T06:13:08.097Z",
      [parameterName]: 45.598236,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T06:12:53.095Z",
      [parameterName]: 45.598236,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T06:12:38.094Z",
      [parameterName]: 45.62717,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T06:12:23.090Z",
      [parameterName]: 45.630787,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T06:12:08.089Z",
      [parameterName]: 45.641636,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T06:11:53.094Z",
      [parameterName]: 45.619938,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T06:11:38.094Z",
      [parameterName]: 45.634403,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T06:11:23.091Z",
      [parameterName]: 45.645256,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T06:11:08.091Z",
      [parameterName]: 45.6127,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T06:10:53.088Z",
      [parameterName]: 45.648872,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T06:10:38.087Z",
      [parameterName]: 45.598236,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T06:10:23.083Z",
      [parameterName]: 45.58015,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T06:10:08.083Z",
      [parameterName]: 45.591,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T06:09:53.089Z",
      [parameterName]: 45.641636,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T06:09:39.317Z",
      [parameterName]: 45.601852,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T06:09:23.095Z",
      [parameterName]: 45.638023,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T06:09:08.095Z",
      [parameterName]: 45.598236,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T06:08:53.097Z",
      [parameterName]: 45.594616,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T06:08:38.096Z",
      [parameterName]: 45.591,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T06:08:23.092Z",
      [parameterName]: 45.601852,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T06:08:08.092Z",
      [parameterName]: 45.55845,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T06:07:53.096Z",
      [parameterName]: 45.58015,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T06:07:38.094Z",
      [parameterName]: 45.587383,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T06:07:23.090Z",
      [parameterName]: 45.562065,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T06:07:08.089Z",
      [parameterName]: 45.609085,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T06:06:53.093Z",
      [parameterName]: 45.587383,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T06:06:38.094Z",
      [parameterName]: 45.583767,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T06:06:23.090Z",
      [parameterName]: 45.55845,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T06:06:08.089Z",
      [parameterName]: 45.587383,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T06:05:53.087Z",
      [parameterName]: 45.594616,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T06:05:38.086Z",
      [parameterName]: 45.591,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T06:05:23.090Z",
      [parameterName]: 45.609085,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T06:05:08.091Z",
      [parameterName]: 45.601852,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T06:04:53.095Z",
      [parameterName]: 45.594616,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T06:04:39.314Z",
      [parameterName]: 45.60547,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T06:04:23.094Z",
      [parameterName]: 45.609085,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T06:04:08.093Z",
      [parameterName]: 45.58015,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T06:03:53.090Z",
      [parameterName]: 45.5693,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T06:03:38.089Z",
      [parameterName]: 45.55845,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T06:03:23.094Z",
      [parameterName]: 45.583767,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T06:03:08.094Z",
      [parameterName]: 45.540367,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T06:02:53.090Z",
      [parameterName]: 45.551216,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T06:02:38.090Z",
      [parameterName]: 45.576534,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T06:02:23.087Z",
      [parameterName]: 45.583767,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T06:02:08.087Z",
      [parameterName]: 45.536747,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T06:01:53.093Z",
      [parameterName]: 45.55845,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T06:01:38.092Z",
      [parameterName]: 45.5693,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T06:01:23.089Z",
      [parameterName]: 45.540367,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T06:01:08.092Z",
      [parameterName]: 45.5693,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T06:00:53.088Z",
      [parameterName]: 45.536747,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T06:00:38.087Z",
      [parameterName]: 45.5693,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T06:00:23.084Z",
      [parameterName]: 45.529514,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T06:00:08.084Z",
      [parameterName]: 45.52228,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:59:53.088Z",
      [parameterName]: 45.562065,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:59:39.909Z",
      [parameterName]: 45.554832,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:59:23.093Z",
      [parameterName]: 45.55845,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:59:08.094Z",
      [parameterName]: 45.540367,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:58:53.095Z",
      [parameterName]: 45.5476,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:58:38.093Z",
      [parameterName]: 45.601852,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:58:23.097Z",
      [parameterName]: 45.5693,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:58:08.097Z",
      [parameterName]: 45.601852,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:57:53.093Z",
      [parameterName]: 45.609085,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:57:38.092Z",
      [parameterName]: 45.591,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:57:23.089Z",
      [parameterName]: 45.54398,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:57:08.090Z",
      [parameterName]: 45.587383,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:56:53.086Z",
      [parameterName]: 45.58015,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:56:38.085Z",
      [parameterName]: 45.572914,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:56:23.088Z",
      [parameterName]: 45.583767,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:56:08.090Z",
      [parameterName]: 45.583767,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:55:53.086Z",
      [parameterName]: 45.572914,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:55:38.087Z",
      [parameterName]: 45.572914,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:55:23.082Z",
      [parameterName]: 45.58015,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:55:08.081Z",
      [parameterName]: 45.60547,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:54:53.079Z",
      [parameterName]: 45.594616,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:54:39.306Z",
      [parameterName]: 45.60547,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:54:23.075Z",
      [parameterName]: 45.601852,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:54:08.075Z",
      [parameterName]: 45.562065,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:53:53.081Z",
      [parameterName]: 45.5693,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:53:38.080Z",
      [parameterName]: 45.598236,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:53:23.076Z",
      [parameterName]: 45.5693,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:53:08.075Z",
      [parameterName]: 45.540367,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:52:53.071Z",
      [parameterName]: 45.572914,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:52:38.070Z",
      [parameterName]: 45.60547,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:52:23.074Z",
      [parameterName]: 45.648872,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:52:08.074Z",
      [parameterName]: 45.6127,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:51:53.080Z",
      [parameterName]: 45.663338,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:51:38.078Z",
      [parameterName]: 45.634403,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:51:23.075Z",
      [parameterName]: 45.645256,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:51:08.074Z",
      [parameterName]: 45.688656,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:50:53.078Z",
      [parameterName]: 45.692272,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:50:38.075Z",
      [parameterName]: 45.656105,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:50:23.073Z",
      [parameterName]: 45.656105,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:50:08.074Z",
      [parameterName]: 45.638023,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:49:53.071Z",
      [parameterName]: 45.67419,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:49:39.300Z",
      [parameterName]: 45.65249,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:49:23.079Z",
      [parameterName]: 45.648872,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:49:08.080Z",
      [parameterName]: 45.65972,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:48:53.083Z",
      [parameterName]: 45.65249,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:48:38.082Z",
      [parameterName]: 45.645256,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:48:23.086Z",
      [parameterName]: 45.619938,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:48:08.083Z",
      [parameterName]: 45.65249,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:47:53.087Z",
      [parameterName]: 45.666958,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:47:38.086Z",
      [parameterName]: 45.67419,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:47:23.088Z",
      [parameterName]: 45.65972,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:47:08.088Z",
      [parameterName]: 45.630787,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:46:53.090Z",
      [parameterName]: 45.65972,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:46:38.088Z",
      [parameterName]: 45.641636,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:46:23.083Z",
      [parameterName]: 45.619938,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:46:08.082Z",
      [parameterName]: 45.663338,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:45:53.077Z",
      [parameterName]: 45.666958,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:45:38.075Z",
      [parameterName]: 45.60547,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:45:23.079Z",
      [parameterName]: 45.648872,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:45:08.078Z",
      [parameterName]: 45.598236,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:44:53.078Z",
      [parameterName]: 45.630787,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:44:39.897Z",
      [parameterName]: 45.648872,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:44:23.078Z",
      [parameterName]: 45.562065,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:44:08.075Z",
      [parameterName]: 45.634403,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:43:53.074Z",
      [parameterName]: 45.609085,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:43:38.073Z",
      [parameterName]: 45.641636,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:43:23.071Z",
      [parameterName]: 45.601852,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:43:08.069Z",
      [parameterName]: 45.641636,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:42:53.074Z",
      [parameterName]: 45.619938,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:42:38.073Z",
      [parameterName]: 45.634403,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:42:23.071Z",
      [parameterName]: 45.638023,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:42:08.072Z",
      [parameterName]: 45.630787,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:41:53.077Z",
      [parameterName]: 45.65249,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:41:38.074Z",
      [parameterName]: 45.601852,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:41:23.072Z",
      [parameterName]: 45.645256,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:41:08.071Z",
      [parameterName]: 45.601852,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:40:53.075Z",
      [parameterName]: 45.623554,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:40:38.074Z",
      [parameterName]: 45.65249,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:40:23.079Z",
      [parameterName]: 45.623554,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:40:08.079Z",
      [parameterName]: 45.677807,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:39:53.075Z",
      [parameterName]: 45.681423,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:39:39.291Z",
      [parameterName]: 45.688656,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:39:23.078Z",
      [parameterName]: 45.68504,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:39:08.077Z",
      [parameterName]: 45.65972,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:38:53.081Z",
      [parameterName]: 45.666958,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:38:38.077Z",
      [parameterName]: 45.688656,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:38:23.073Z",
      [parameterName]: 45.688656,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:38:08.073Z",
      [parameterName]: 45.656105,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:37:53.076Z",
      [parameterName]: 45.65972,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:37:38.072Z",
      [parameterName]: 45.692272,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:37:23.075Z",
      [parameterName]: 45.666958,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:37:08.074Z",
      [parameterName]: 45.645256,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:36:53.070Z",
      [parameterName]: 45.65972,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:36:38.068Z",
      [parameterName]: 45.65972,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:36:23.071Z",
      [parameterName]: 45.688656,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:36:08.072Z",
      [parameterName]: 45.728443,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:35:53.068Z",
      [parameterName]: 45.724827,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:35:38.067Z",
      [parameterName]: 45.677807,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:35:23.069Z",
      [parameterName]: 45.713978,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:35:08.068Z",
      [parameterName]: 45.688656,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:34:53.064Z",
      [parameterName]: 45.739292,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:34:39.290Z",
      [parameterName]: 45.739292,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:34:23.059Z",
      [parameterName]: 45.73568,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:34:08.059Z",
      [parameterName]: 45.713978,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:33:53.063Z",
      [parameterName]: 45.742912,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:33:38.060Z",
      [parameterName]: 45.710358,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:33:23.064Z",
      [parameterName]: 45.73568,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:33:08.063Z",
      [parameterName]: 45.74653,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:32:53.062Z",
      [parameterName]: 45.713978,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:32:38.059Z",
      [parameterName]: 45.72121,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:32:23.056Z",
      [parameterName]: 45.645256,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:32:08.054Z",
      [parameterName]: 45.688656,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:31:53.058Z",
      [parameterName]: 45.692272,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:31:38.058Z",
      [parameterName]: 45.677807,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:31:23.062Z",
      [parameterName]: 45.681423,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:31:08.061Z",
      [parameterName]: 45.692272,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:30:53.058Z",
      [parameterName]: 45.717594,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:30:38.057Z",
      [parameterName]: 45.688656,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:30:23.061Z",
      [parameterName]: 45.65249,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:30:08.062Z",
      [parameterName]: 45.692272,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:29:53.059Z",
      [parameterName]: 45.681423,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:29:39.878Z",
      [parameterName]: 45.692272,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:29:23.062Z",
      [parameterName]: 45.724827,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:29:08.062Z",
      [parameterName]: 45.72121,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:28:53.066Z",
      [parameterName]: 45.73568,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:28:38.064Z",
      [parameterName]: 45.681423,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:28:23.069Z",
      [parameterName]: 45.72121,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:28:08.067Z",
      [parameterName]: 45.695892,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:27:53.062Z",
      [parameterName]: 45.681423,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:27:38.060Z",
      [parameterName]: 45.65249,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:27:23.064Z",
      [parameterName]: 45.648872,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:27:08.064Z",
      [parameterName]: 45.65249,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:26:53.059Z",
      [parameterName]: 45.623554,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:26:38.057Z",
      [parameterName]: 45.656105,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:26:23.061Z",
      [parameterName]: 45.648872,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:26:08.061Z",
      [parameterName]: 45.67057,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:25:53.059Z",
      [parameterName]: 45.630787,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:25:38.057Z",
      [parameterName]: 45.630787,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:25:23.054Z",
      [parameterName]: 45.638023,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:25:08.053Z",
      [parameterName]: 45.67419,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:24:53.058Z",
      [parameterName]: 45.677807,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:24:38.298Z",
      [parameterName]: 45.65249,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:24:22.075Z",
      [parameterName]: 45.623554,
    },
    {
      Degreasing_110_TT_01_qc: 0,
      _time: "2020-12-01T05:24:07.074Z",
      [parameterName]: 45.619938,
    },
  ];
  // return getFromOtherOrigin(
  //   `/api/iottimeseries/v3/timeseries/${assetId}/${aspectId}?select=${parameterName}&from=${fromDate}&to=${toDate}&limit=${limit}&sort=desc`
  // );
};

export const loadLatestValueDummy = (aspectId, parameterName) => {
  return [
    {
      [parameterName]: 120,
      _time: "2020-11-20T03:00:51.769Z",
    },
  ];
  //   return getFromOtherOrigin(
  //     `/api/iottimeseries/v3/timeseries/${assetId}/${aspectId}?select=${parameterName}&latestValue=true`
  //   );
};

// ---------------- API Gateway

export const loadFromAPI = (endPoint) => {
  const startDate = format(
      new Date(new Date(new Date().setHours(0, 59, 59, 59))),
      "yyyy-MM-dd'T'HH:mm:ss"
  );
  const endDate = format(
      new Date(new Date(new Date().setHours(23, 59, 59, 59))),
      "yyyy-MM-dd'T'HH:mm:ss"
  );

  return get(`dashboard/${endPoint}/${startDate}/${endDate}/${1000}`);
};

export const loadFromAPIDummy = (endPoint) => {
  return [
    {
      time: "2020-12-01T06:23:53.100Z",
      data: 45.43909,
    },
    {
      time: "2020-12-01T06:23:38.097Z",
      data: 45.43909,
    },
    {
      time: "2020-12-01T06:23:23.103Z",
      data: 45.43909,
    },
  ];
};
*/
