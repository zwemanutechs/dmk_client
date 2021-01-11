import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";
// import { find } from "lodash";
import update from "immutability-helper";
import { zonedTimeToUtc } from "date-fns-tz";

// import {
//   Sparklines,
//   SparklinesLine,
//   SparklinesReferenceLine,
// } from "react-sparklines";

// import CheckIcon from "@material-ui/icons/Check";
// import ClearIcon from "@material-ui/icons/Clear";

// import AppLineChart from "../../../shared/charts/line/container/lineChart";
// import {get} from "../../../middleware/axios-middleware";
import {
  loadGraphDataByGivenDateV3,
  // loadDataByGivenDateDummy,
  // loadLatestValueDummy,
  // loadFromAPIDummy,
  loadLatestValueV2,
  loadDataByGivenDateV2,
  loadFromAPI,
} from "../../../appservices/mindsphere-iotapi-services";
import ArcGauge from "../../../shared/charts/arc-gauge";
import Graph from "../../../shared/charts/graph";
import LineChart from "../../../shared/charts/lineChart";
import "./home.css";
import { numFormatter } from "../../../helpers";
import { OPEN_SNACK } from "../../../shared/snackbar/action-constants/snackbar-actionTypes";
import { UNHANDELERROR, snackError } from "../../../constants/app-constants";
import { store } from "../../../index";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(0),
    textAlign: "center",
    COLOR: theme.palette.text.secondary,
  },
}));

export const COLOR = {
  blue: "#0F3790",
  red: "#EA4E49",
  grey: "#D9D9D9",
};

const Home = () => {
  const classes = useStyles();
  const [graphState, setGraphState] = useState({ timeSeries: [0], labels: [] });
  const [OVERVIEW_DATA, SETOVERVIEW_DATA] = useState({
    loader: true,
    grid1: {
      name: "Tank 1",
      c1: [
        {
          target: 90,
          currentVal: 0,
          lastHr: 0,
          unit: "",
          title: "Dyne Test",
          sparklines: [],
          endPoint: "degreasing/dynetest",
          aspectId: "",
          parameterName: "data",
        },
        {
          target: 90,
          currentVal: 0,
          lastHr: 0,
          unit: "",
          title: "Conductivity",
          sparklines: [],
          endPoint: "",
          aspectId: "Degreasing_Tank1",
          parameterName: "Degreasing_Tank1_Conductivity_us",
        },
        {
          target: 50,
          currentVal: 0,
          lastHr: 0,
          unit: "oC",
          title: "Concentration",
          sparklines: [],
          endPoint: "degreasing/concentration",
          aspectId: "",
          parameterName: "data",
        },
        {
          target: 90,
          currentVal: 0,
          lastHr: 0,
          unit: "",
          title: "pH",
          sparklines: [],
          endPoint: "",
          aspectId: "Degreasing_Tank1",
          parameterName: "Degreasing_Tank1_pH",
        },
        {
          target: 90,
          currentVal: 0,
          lastHr: 0,
          unit: "%",
          title: "Water Level",
          sparklines: [],
          endPoint: "",
          aspectId: "Degreasing_Tank1",
          parameterName: "Degreasing_Tank1_WaterLevel_cm",
        },
      ],
      c2: [
        {
          title: "Pump Pressure 1",
          currentVal: 0,
          unit: "atm",
          endPoint: "",
          aspectId: "Degreasing_Tank1",
          parameterName: "Degreasing_Tank1_1_Pressure_bar",
        },
        {
          title: "Pump Pressure 2",
          currentVal: 0,
          unit: "atm",
          endPoint: "",
          aspectId: "Degreasing_Tank1",
          parameterName: "Degreasing_Tank1_2_Pressure_bar",
        },
        {
          title: "Pump Pressure 3",
          currentVal: 0,
          unit: "atm",
          endPoint: "",
          aspectId: "Degreasing_Tank1",
          parameterName: "Degreasing_Tank1_3_Pressure_bar",
        },
        {
          title: "Pump Pressure 4",
          currentVal: 0,
          unit: "atm",
          endPoint: "",
          aspectId: "Degreasing_Tank1",
          parameterName: "Degreasing_Tank1_4_Pressure_bar",
        },
        {
          title: "Pump Pressure 5",
          currentVal: 0,
          unit: "atm",
          endPoint: "",
          aspectId: "Degreasing_Tank1",
          parameterName: "Degreasing_Tank1_5_Pressure_bar",
        },
      ],
      c3: [
        {
          title: "Oil Skimming",
          bool: true,
          endPoint: "",
          aspectId: "",
          parameterName: "",
        },
        {
          title: "Chemical Topup",
          bool: false,
          endPoint: "",
          aspectId: "",
          parameterName: "",
        },
      ],
    },
    grid2: {
      name: "Tank 2",
      c1: {
        target: 90,
        currentVal: 0,
        lastHr: 0,
        unit: "",
        title: "pH",
        sparklines: [],
        endPoint: "degreasing/rinseone",
        aspectId: "",
        parameterName: "data",
      },
      c2: {
        title: "Water Level",
        title2: "",
        currentVal: 0,
        unit: "atm",
        endPoint: "",
        aspectId: "WaterRinse_Tank2",
        parameterName: "WaterRinse_Tank2_WaterLevel_cm",
      },
      c3: {
        target: 90,
        currentVal: 0,
        lastHr: 0,
        unit: "",
        title: "Water Flow",
        sparklines: [],
        endPoint: "",
        aspectId: "WaterRinse_Tank2",
        parameterName: "WaterRinse_Tank2_OverflowLevel_cm",
      },
      c4: {
        title: "Pump Pressure",
        title2: "",
        currentVal: 0,
        unit: "atm",
        endPoint: "",
        aspectId: "WaterRinse_Tank2",
        parameterName: "WaterRinse_Tank2_Pressure_bar",
      },
    },
    grid3: {
      name: "Tank 3",
      c1: {
        target: 90,
        currentVal: 0,
        lastHr: 0,
        unit: "",
        title: "pH",
        sparklines: [],
        endPoint: "degreasing/rinsetwo",
        aspectId: "",
        parameterName: "data",
      },
      c2: {
        title: "Water Level",
        title2: "",
        currentVal: 0,
        unit: "atm",
        endPoint: "",
        aspectId: "WaterRinse_Tank3",
        parameterName: "WaterRinse_Tank3_WaterLevel_cm",
      },
      c3: {
        target: 90,
        currentVal: 0,
        lastHr: 0,
        unit: "",
        title: "Water Flow",
        sparklines: [],
        endPoint: "",
        aspectId: "WaterRinse_Tank3",
        parameterName: "WaterRinse_Tank3_OverflowLevel_cm",
      },
      c4: {
        title: "Pump Pressure",
        title2: "",
        currentVal: 0,
        unit: "atm",
        endPoint: "",
        aspectId: "WaterRinse_Tank3",
        parameterName: "WaterRinse_Tank3_Pressure_bar",
      },
    },
    grid4: {
      name: "Tank 4",
      c1: {
        target: 90,
        currentVal: 0,
        lastHr: 0,
        unit: "",
        title: "pH",
        sparklines: [],
        endPoint: "degreasing/rinsethree",
        aspectId: "",
        parameterName: "data",
      },
      c2: {
        title: "Water Level",
        title2: "",
        currentVal: 0,
        unit: "atm",
        endPoint: "",
        aspectId: "DIWaterRinse_Tank4",
        parameterName: "DIWaterRinse_Tank4_WaterLevel_cm",
      },
      c3: {
        target: 90,
        currentVal: 0,
        lastHr: 0,
        unit: "",
        title: "Water Flow",
        sparklines: [],
        endPoint: "",
        aspectId: "DIWaterRinse_Tank4",
        parameterName: "DIWaterRinse_Tank4_OverflowLevel_cm",
      },
      c4: {
        title: "Pump Pressure",
        title2: "",
        currentVal: 0,
        unit: "atm",
        endPoint: "",
        aspectId: "DIWaterRinse_Tank4",
        parameterName: "DIWaterRinse_Tank4_Pressure_bar",
      },
    },
    grid5: {
      name: "Tank 5",
      c1: {
        target: 90,
        currentVal: 0,
        lastHr: 0,
        unit: "",
        title: "pH",
        sparklines: [],
        endPoint: "",
        aspectId: "DIWaterRinse_Tank5",
        parameterName: "DIWaterRinse_Tank5_pH",
      },
      c2: {
        title: "Water Level",
        title2: "",
        currentVal: 0,
        unit: "atm",
        endPoint: "",
        aspectId: "DIWaterRinse_Tank5",
        parameterName: "DIWaterRinse_Tank5_WaterTankLevel_cm",
      },
      c3: {
        target: 90,
        currentVal: 0,
        lastHr: 0,
        unit: "",
        title: "Water Flow",
        sparklines: [],
        endPoint: "",
        aspectId: "DIWaterRinse_Tank5",
        parameterName: "DIWaterRinse_Tank5_WaterTankOverlowLevel_cm",
      },
      c4: {
        title: "Pump Pressure",
        title2: "",
        currentVal: 0,
        unit: "atm",
        endPoint: "",
        aspectId: "DIWaterRinse_Tank5",
        parameterName: "DIWaterRinse_Tank5_Pressure_bar",
      },
    },
    grid6: {
      name: "Tank 6",
      c1: {
        target: 90,
        currentVal: 0,
        lastHr: 0,
        unit: "",
        title: "pH",
        sparklines: [],
        endPoint: "",
        aspectId: "Passivation_Tank6",
        parameterName: "Passivation_Tank6_pH",
      },
      c2: {
        title: "Water Level",
        title2: "",
        currentVal: 0,
        unit: "atm",
        endPoint: "",
        aspectId: "Passivation_Tank6",
        parameterName: "Passivation_Tank6_WaterLevel_cm",
      },
      c3: {
        target: 90,
        currentVal: 0,
        lastHr: 0,
        unit: "",
        title: "Water Flow",
        sparklines: [],
        endPoint: "",
        aspectId: "Passivation_Tank6",
        parameterName: "Passivation_Tank6_OverFlowLevel_cm",
      },
      c4: {
        title: "Pump Pressure",
        title2: "",
        currentVal: 0,
        unit: "atm",
        endPoint: "",
        aspectId: "Passivation_Tank6",
        parameterName: "Passivation_Tank6_Pressure_bar",
      },
    },
    grid7: {
      name: "Water Levels",
      barChart: [0, 0, 0, 0, 0, 0],
    },
  });

  const dataProcessCurrentVal = async (data, aspectName) => {
    if (aspectName === "data") {
      // take first data value only //api

      return data.data.data.length > 0
        ? numFormatter(data.data.data[0][aspectName])
        : 0;
    }
    // take first data value only // mindsphere
    // if (aspectName === "Degreasing_Tank1_Conductivity_us") {
    //   console.log(data.data.length > 0);
    //   console.log(data);
    //   console.log(Math.round(data.data[0][aspectName]));
    // }
    return data.data.length > 0 ? numFormatter(data.data[0][aspectName]) : 0;
  };

  const dataProcessBarChartCurrentVal = async (data, aspectName) => {
    if (aspectName === "data") {
      // take first data value only //api

      return data.data.data.length > 0
        ? data.data.data[0][aspectName].toFixed(1)
        : 0;
    }
    // take first data value only // mindsphere
    // if (aspectName === "Degreasing_Tank1_Conductivity_us") {
    //   console.log(data.data.length > 0);
    //   console.log(data);
    //   console.log(Math.round(data.data[0][aspectName]));
    // }
    return data.data.length > 0 ? data.data[0][aspectName].toFixed(1) : 0;
  };

  const dataProcessTimeSeries = async (data, aspectName) => {
    if (aspectName === "data") {
      // take seven days only on array // api
      return data.data.data.length > 0
        ? data.data.data
            .map((res, index) => {
              if (index < 7) {
                return res[aspectName];
              }
              return null;
            })
            .filter((res) => res !== null)
        : [];
    }

    return data.data.length > 0
      ? data.data
          .map((res, index) => {
            if (index < 7) {
              return res[aspectName];
            }
            return null;
          })
          .filter((res) => res !== null)
      : [];
  };

  const dataProcessLastHrValInPercent = (currVal, TimeSeries, aspectName) => {
    // console.log(data);
    // percent change, (cur - last val) / last val, (10.5-9.5)/9.5= 10%, (10.5-11.5)/11.5= -8%

    if (aspectName === "data") {
      return currVal.data.data.length > 0 &&
        TimeSeries.data.data.length > 0 &&
        !(Math.round(TimeSeries.data.data[0][aspectName]) === 0)
        ? Math.round(
            ((Math.round(currVal.data.data[0][aspectName]) -
              Math.round(TimeSeries.data.data[0][aspectName])) /
              Math.round(TimeSeries.data.data[0][aspectName])) *
              100
          ).toFixed(2)
        : 0;
    }

    return currVal.data.length > 0 &&
      TimeSeries.data.length > 0 &&
      !(Math.round(TimeSeries.data[0][aspectName]) === 0)
      ? Math.round(
          ((Math.round(currVal.data[0][aspectName]) -
            Math.round(TimeSeries.data[0][aspectName])) /
            Math.round(TimeSeries.data[0][aspectName])) *
            100
        ).toFixed(2)
      : 0;
  };

  const returnZoneTime = (date) => {
    return new Date(
      zonedTimeToUtc(date, Intl.DateTimeFormat().resolvedOptions().timeZone)
    ).toISOString();
  };
  const fetchGraphAPI = async (numMonthsAgo, tilesDetails) => {
    // console.log(numMonthsAgo);
    // console.log(tilesDetails);

    // date.setMonth(date.getMonth() - numMonthsAgo);

    // fromDate = new Date(
    //   zonedTimeToUtc(
    //     monthsAgo,
    //     Intl.DateTimeFormat().resolvedOptions().timeZone
    //   )
    // ).toISOString();
    // toDate = new Date(
    //   zonedTimeToUtc(today, Intl.DateTimeFormat().resolvedOptions().timeZone)
    // ).toISOString();

    console.log(tilesDetails.endPoint);
    if (tilesDetails.endPoint) {
      try {
        const apiData = await loadFromAPI(tilesDetails.endPoint);

        if (apiData.data.data.length > 0) {
          setGraphState({
            timeSeries: apiData.data.data
              .map((res, index) => {
                if (index < 15) {
                  return res["data"];
                }
                return null;
              })
              .filter((res) => res !== null),
            labels: apiData.data.data
              .map((res, index) => {
                if (index < 15) {
                  return new Date(res["time"]).toLocaleDateString();
                }
                return null;
              })
              .filter((res) => res !== null),
          });
          return;
        }

        setGraphState({
          timeSeries: [0],
          labels: [],
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const date = new Date();
        const today = new Date(date);
        date.setMonth(date.getMonth() - numMonthsAgo);
        const monthsAgo = new Date(date);

        let fromDate = returnZoneTime(monthsAgo);
        let toDate = returnZoneTime(today);

        if (numMonthsAgo === 3) {
          const firstFromMonth = returnZoneTime(new Date(date));
          date.setMonth(date.getMonth() + 1);
          const firstToMonth = returnZoneTime(new Date(date));
          const firstTimeData = await loadGraphDataByGivenDateV3(
            tilesDetails.aspectId,
            tilesDetails.parameterName,
            firstFromMonth,
            firstToMonth
          );

          const secondFromMonth = returnZoneTime(new Date(date));
          date.setMonth(date.getMonth() + 1);
          const secondToMonth = returnZoneTime(new Date(date));
          const secondTimeData = await loadGraphDataByGivenDateV3(
            tilesDetails.aspectId,
            tilesDetails.parameterName,
            secondFromMonth,
            secondToMonth
          );

          const thirdFromMonth = returnZoneTime(new Date(date));
          date.setMonth(date.getMonth() + 1);
          const thirdToMonth = returnZoneTime(new Date(date));
          const thirdTimeData = await loadGraphDataByGivenDateV3(
            tilesDetails.aspectId,
            tilesDetails.parameterName,
            thirdFromMonth,
            thirdToMonth
          );

          let allData = [];

          if (firstTimeData.data.aggregates.length > 0)
            allData = [...firstTimeData.data.aggregates, ...allData];

          if (secondTimeData.data.aggregates.length > 0)
            allData = [...secondTimeData.data.aggregates, ...allData];

          if (thirdTimeData.data.aggregates.length > 0) {
            console.log(thirdTimeData.data.aggregates);
            allData = [...thirdTimeData.data.aggregates, ...allData];
          }

          console.log(firstTimeData);
          console.log(secondTimeData);
          console.log(thirdTimeData);

          console.log(allData);
          if (allData.length > 0) {
            setGraphState({
              timeSeries: allData
                .map((res, index) => {
                  if (index < 15) {
                    return res[tilesDetails.parameterName].firstvalue;
                  }
                  return null;
                })
                .filter((res) => res !== null),
              labels: allData
                .map((res, index) => {
                  if (index < 15) {
                    return new Date(
                      res[tilesDetails.parameterName].firsttime
                    ).toLocaleDateString();
                  }
                  return null;
                })
                .filter((res) => res !== null),
            });
          }

          return;
        }

        if (numMonthsAgo === 6) {
          const firstFromMonth = returnZoneTime(new Date(date));
          date.setMonth(date.getMonth() + 1);
          const firstToMonth = returnZoneTime(new Date(date));
          const firstTimeData = await loadGraphDataByGivenDateV3(
            tilesDetails.aspectId,
            tilesDetails.parameterName,
            firstFromMonth,
            firstToMonth
          );

          const secondFromMonth = returnZoneTime(new Date(date));
          date.setMonth(date.getMonth() + 1);
          const secondToMonth = returnZoneTime(new Date(date));
          const secondTimeData = await loadGraphDataByGivenDateV3(
            tilesDetails.aspectId,
            tilesDetails.parameterName,
            secondFromMonth,
            secondToMonth
          );

          const thirdFromMonth = returnZoneTime(new Date(date));
          date.setMonth(date.getMonth() + 1);
          const thirdToMonth = returnZoneTime(new Date(date));
          const thirdTimeData = await loadGraphDataByGivenDateV3(
            tilesDetails.aspectId,
            tilesDetails.parameterName,
            thirdFromMonth,
            thirdToMonth
          );

          const forthFromMonth = returnZoneTime(new Date(date));
          date.setMonth(date.getMonth() + 1);
          const forthToMonth = returnZoneTime(new Date(date));
          const forthTimeData = await loadGraphDataByGivenDateV3(
            tilesDetails.aspectId,
            tilesDetails.parameterName,
            forthFromMonth,
            forthToMonth
          );

          const fifthFromMonth = returnZoneTime(new Date(date));
          date.setMonth(date.getMonth() + 1);
          const fifthToMonth = returnZoneTime(new Date(date));
          const fifthTimeData = await loadGraphDataByGivenDateV3(
            tilesDetails.aspectId,
            tilesDetails.parameterName,
            fifthFromMonth,
            fifthToMonth
          );

          const sixFromMonth = returnZoneTime(new Date(date));
          date.setMonth(date.getMonth() + 1);
          const sixToMonth = returnZoneTime(new Date(date));
          const sixTimeData = await loadGraphDataByGivenDateV3(
            tilesDetails.aspectId,
            tilesDetails.parameterName,
            sixFromMonth,
            sixToMonth
          );

          // fromDate = returnZoneTime(monthsAgo);
          // toDate = returnZoneTime(today);
          let allData = [];

          if (firstTimeData.data.aggregates.length > 0)
            allData = [...firstTimeData.data.aggregates, ...allData];

          if (secondTimeData.data.aggregates.length > 0)
            allData = [...secondTimeData.data.aggregates, ...allData];

          if (thirdTimeData.data.aggregates.length > 0)
            allData = [...thirdTimeData.data.aggregates, ...allData];

          if (forthTimeData.data.aggregates.length > 0)
            allData = [...forthTimeData.data.aggregates, ...allData];

          if (fifthTimeData.data.aggregates.length > 0)
            allData = [...fifthTimeData.data.aggregates, ...allData];

          if (sixTimeData.data.aggregates.length > 0)
            allData = [...sixTimeData.data.aggregates, ...allData];

          console.log(allData);
          if (allData.length > 0) {
            setGraphState({
              timeSeries: allData
                .map((res, index) => {
                  if (index < 15) {
                    return res[tilesDetails.parameterName].firstvalue;
                  }
                  return null;
                })
                .filter((res) => res !== null),
              labels: allData
                .map((res, index) => {
                  if (index < 15) {
                    return new Date(
                      res[tilesDetails.parameterName].firsttime
                    ).toLocaleDateString();
                  }
                  return null;
                })
                .filter((res) => res !== null),
            });
          }

          return;
        }

        const timeData = await loadGraphDataByGivenDateV3(
          tilesDetails.aspectId,
          tilesDetails.parameterName,
          fromDate,
          toDate
        );
        console.log(timeData);
        console.log(timeData.data);
        // console.log(timeData.);
        if (timeData.data.aggregates.length > 0) {
          setGraphState({
            timeSeries: timeData.data.aggregates
              .map((res, index) => {
                if (index < 15) {
                  return res[tilesDetails.parameterName].firstvalue;
                }
                return null;
              })
              .filter((res) => res !== null),
            labels: timeData.data.aggregates
              .map((res, index) => {
                if (index < 15) {
                  return new Date(
                    res[tilesDetails.parameterName].firsttime
                  ).toLocaleDateString();
                }
                return null;
              })
              .filter((res) => res !== null),
          });
        }
        // const timeData = await loadGraphDataByGivenDateV3(
        //   tilesDetails.aspectId,
        //   tilesDetails.parameterName,
        //   fromDate,
        //   toDate
        // );
        // console.log(timeData.data);
        // console.log(timeData.data.length > 0);
        // console.log(
        //   timeData.data
        //     .map((res, index) => {
        //       if (index < 15) {
        //         return res[tilesDetails.parameterName];
        //       }
        //       return null;
        //     })
        //     .filter((res) => res !== null)
        // );
        // console.log(
        //   timeData.data
        //     .map((res, index) => {
        //       if (index < 15) {
        //         return res["_time"];
        //       }
        //       return null;
        //     })
        //     .filter((res) => res !== null)
        // );
        // console.log(timeData);
        // if (timeData.data.length > 0)
        //   setGraphState({
        //     timeSeries: timeData.data
        //       .map((res, index) => {
        //         if (index < 15) {
        //           return res[tilesDetails.parameterName];
        //         }
        //         return null;
        //       })
        //       .filter((res) => res !== null),
        //     labels: timeData.data
        //       .map((res, index) => {
        //         if (index < 15) {
        //           return res["_time"];
        //         }
        //         return null;
        //       })
        //       .filter((res) => res !== null),
        //   });

        // setGraphState({
        //   timeSeries: [12, 19, 3, 5, 2, 3],
        //   labels: ["d1", "d2", "d3", "d4", "d5", "d6"],
        // });
      } catch (err) {
        console.log(err);
      }
    }
    // setGraphState([12, 19, 3, 5, 2, 3]);
  };

  // await dataProcessLastHrValInPercent( await loadFromAPI(""), await loadFromAPI(""), "" )
  // await dataProcessLastHrValInPercent( await loadLatestValueV2( "", "" ), await loadDataByGivenDateV2( "", "" ), "" )

  const fetchAPI = async (data) => {
    try {
      SETOVERVIEW_DATA(
        update(data, {
          loader: { $set: false },
          grid1: {
            c1: {
              0: {
                currentVal: {
                  $set: await dataProcessCurrentVal(
                    await loadFromAPI("degreasing/dynetest"),
                    "data"
                  ),
                },
                lastHr: {
                  $set: await dataProcessLastHrValInPercent(
                    await loadFromAPI("degreasing/dynetest"),
                    await loadFromAPI("degreasing/dynetest"),
                    "data"
                  ),
                },
                sparklines: {
                  $set: await dataProcessTimeSeries(
                    await loadFromAPI("degreasing/dynetest"),
                    "data"
                  ),
                },
              },
              1: {
                currentVal: {
                  $set: await dataProcessCurrentVal(
                    await loadLatestValueV2(
                      "Degreasing_Tank1",
                      "Degreasing_Tank1_Conductivity_us"
                    ),
                    "Degreasing_Tank1_Conductivity_us"
                  ),
                },
                lastHr: {
                  $set: await dataProcessLastHrValInPercent(
                    await loadLatestValueV2(
                      "Degreasing_Tank1",
                      "Degreasing_Tank1_Conductivity_us"
                    ),
                    await loadDataByGivenDateV2(
                      "Degreasing_Tank1",
                      "Degreasing_Tank1_Conductivity_us"
                    ),
                    "Degreasing_Tank1_Conductivity_us"
                  ),
                },
                sparklines: {
                  $set: await dataProcessTimeSeries(
                    await loadDataByGivenDateV2(
                      "Degreasing_Tank1",
                      "Degreasing_Tank1_Conductivity_us"
                    ),
                    "Degreasing_Tank1_Conductivity_us"
                  ),
                },
              },
              2: {
                currentVal: {
                  $set: await dataProcessCurrentVal(
                    await loadFromAPI("degreasing/concentration"),
                    "data"
                  ),
                },
                lastHr: {
                  $set: await dataProcessLastHrValInPercent(
                    await loadFromAPI("degreasing/concentration"),
                    await loadFromAPI("degreasing/concentration"),
                    "data"
                  ),
                },
                sparklines: {
                  $set: await dataProcessTimeSeries(
                    await loadFromAPI("degreasing/concentration"),
                    "data"
                  ),
                },
              },
              3: {
                currentVal: {
                  $set: await dataProcessCurrentVal(
                    await loadLatestValueV2(
                      "Degreasing_Tank1",
                      "Degreasing_Tank1_pH"
                    ),
                    "Degreasing_Tank1_pH"
                  ),
                },
                lastHr: {
                  $set: await dataProcessLastHrValInPercent(
                    await loadLatestValueV2(
                      "Degreasing_Tank1",
                      "Degreasing_Tank1_pH"
                    ),
                    await loadDataByGivenDateV2(
                      "Degreasing_Tank1",
                      "Degreasing_Tank1_pH"
                    ),
                    "Degreasing_Tank1_pH"
                  ),
                },
                sparklines: {
                  $set: await dataProcessTimeSeries(
                    await loadDataByGivenDateV2(
                      "Degreasing_Tank1",
                      "Degreasing_Tank1_pH"
                    ),
                    "Degreasing_Tank1_pH"
                  ),
                },
              },
              4: {
                currentVal: {
                  $set: await dataProcessCurrentVal(
                    await loadLatestValueV2(
                      "Degreasing_Tank1",
                      "Degreasing_Tank1_WaterLevel_cm"
                    ),
                    "Degreasing_Tank1_WaterLevel_cm"
                  ),
                },
                lastHr: {
                  $set: await dataProcessLastHrValInPercent(
                    await loadLatestValueV2(
                      "Degreasing_Tank1",
                      "Degreasing_Tank1_WaterLevel_cm"
                    ),
                    await loadDataByGivenDateV2(
                      "Degreasing_Tank1",
                      "Degreasing_Tank1_WaterLevel_cm"
                    ),
                    "Degreasing_Tank1_WaterLevel_cm"
                  ),
                },
                sparklines: {
                  $set: await dataProcessTimeSeries(
                    await loadDataByGivenDateV2(
                      "Degreasing_Tank1",
                      "Degreasing_Tank1_WaterLevel_cm"
                    ),
                    "Degreasing_Tank1_WaterLevel_cm"
                  ),
                },
              },
            },
            c2: {
              0: {
                currentVal: {
                  $set: await dataProcessCurrentVal(
                    await loadLatestValueV2(
                      "Degreasing_Tank1",
                      "Degreasing_Tank1_1_Pressure_bar"
                    ),
                    "Degreasing_Tank1_1_Pressure_bar"
                  ),
                },
              },
              1: {
                currentVal: {
                  $set: await dataProcessCurrentVal(
                    await loadLatestValueV2(
                      "Degreasing_Tank1",
                      "Degreasing_Tank1_2_Pressure_bar"
                    ),
                    "Degreasing_Tank1_2_Pressure_bar"
                  ),
                },
              },
              2: {
                currentVal: {
                  $set: await dataProcessCurrentVal(
                    await loadLatestValueV2(
                      "Degreasing_Tank1",
                      "Degreasing_Tank1_3_Pressure_bar"
                    ),
                    "Degreasing_Tank1_3_Pressure_bar"
                  ),
                },
              },
              3: {
                currentVal: {
                  $set: await dataProcessCurrentVal(
                    await loadLatestValueV2(
                      "Degreasing_Tank1",
                      "Degreasing_Tank1_4_Pressure_bar"
                    ),
                    "Degreasing_Tank1_4_Pressure_bar"
                  ),
                },
              },
              4: {
                currentVal: {
                  $set: await dataProcessCurrentVal(
                    await loadLatestValueV2(
                      "Degreasing_Tank1",
                      "Degreasing_Tank1_5_Pressure_bar"
                    ),
                    "Degreasing_Tank1_5_Pressure_bar"
                  ),
                },
              },
            },
          },
          grid2: {
            c1: {
              currentVal: {
                $set: await dataProcessCurrentVal(
                  await loadFromAPI("degreasing/rinseone"),
                  "data"
                ),
              },
              lastHr: {
                $set: await dataProcessLastHrValInPercent(
                  await loadFromAPI("degreasing/rinseone"),
                  await loadFromAPI("degreasing/rinseone"),
                  "data"
                ),
              },
              sparklines: {
                $set: await dataProcessTimeSeries(
                  await loadFromAPI("degreasing/rinseone"),
                  "data"
                ),
              },
            },
            c2: {
              currentVal: {
                $set: await dataProcessCurrentVal(
                  await loadLatestValueV2(
                    "WaterRinse_Tank2",
                    "WaterRinse_Tank2_WaterLevel_cm"
                  ),
                  "WaterRinse_Tank2_WaterLevel_cm"
                ),
              },
            },
            c3: {
              currentVal: {
                $set: await dataProcessCurrentVal(
                  await loadLatestValueV2(
                    "WaterRinse_Tank2",
                    "WaterRinse_Tank2_OverflowLevel_cm"
                  ),
                  "WaterRinse_Tank2_OverflowLevel_cm"
                ),
              },
              lastHr: {
                $set: await dataProcessLastHrValInPercent(
                  await loadLatestValueV2(
                    "WaterRinse_Tank2",
                    "WaterRinse_Tank2_OverflowLevel_cm"
                  ),
                  await loadDataByGivenDateV2(
                    "WaterRinse_Tank2",
                    "WaterRinse_Tank2_OverflowLevel_cm"
                  ),
                  "WaterRinse_Tank2_OverflowLevel_cm"
                ),
              },
              sparklines: {
                $set: await dataProcessTimeSeries(
                  await loadDataByGivenDateV2(
                    "WaterRinse_Tank2",
                    "WaterRinse_Tank2_OverflowLevel_cm"
                  ),
                  "WaterRinse_Tank2_OverflowLevel_cm"
                ),
              },
            },
            c4: {
              currentVal: {
                $set: await dataProcessCurrentVal(
                  await loadLatestValueV2(
                    "WaterRinse_Tank2",
                    "WaterRinse_Tank2_Pressure_bar"
                  ),
                  "WaterRinse_Tank2_Pressure_bar"
                ),
              },
            },
          },
          grid3: {
            c1: {
              currentVal: {
                $set: await dataProcessCurrentVal(
                  await loadFromAPI("degreasing/rinsetwo"),
                  "data"
                ),
              },
              lastHr: {
                $set: await dataProcessLastHrValInPercent(
                  await loadFromAPI("degreasing/rinsetwo"),
                  await loadFromAPI("degreasing/rinsetwo"),
                  "data"
                ),
              },
              sparklines: {
                $set: await dataProcessTimeSeries(
                  await loadFromAPI("degreasing/rinsetwo"),
                  "data"
                ),
              },
            },
            c2: {
              currentVal: {
                $set: await dataProcessCurrentVal(
                  await loadLatestValueV2(
                    "WaterRinse_Tank3",
                    "WaterRinse_Tank3_WaterLevel_cm"
                  ),
                  "WaterRinse_Tank3_WaterLevel_cm"
                ),
              },
            },
            c3: {
              currentVal: {
                $set: await dataProcessCurrentVal(
                  await loadLatestValueV2(
                    "WaterRinse_Tank3",
                    "WaterRinse_Tank3_OverflowLevel_cm"
                  ),
                  "WaterRinse_Tank3_OverflowLevel_cm"
                ),
              },
              lastHr: {
                $set: await dataProcessLastHrValInPercent(
                  await loadLatestValueV2(
                    "WaterRinse_Tank3",
                    "WaterRinse_Tank3_OverflowLevel_cm"
                  ),
                  await loadDataByGivenDateV2(
                    "WaterRinse_Tank3",
                    "WaterRinse_Tank3_OverflowLevel_cm"
                  ),
                  "WaterRinse_Tank3_OverflowLevel_cm"
                ),
              },
              sparklines: {
                $set: await dataProcessTimeSeries(
                  await loadDataByGivenDateV2(
                    "WaterRinse_Tank3",
                    "WaterRinse_Tank3_OverflowLevel_cm"
                  ),
                  "WaterRinse_Tank3_OverflowLevel_cm"
                ),
              },
            },
            c4: {
              currentVal: {
                $set: await dataProcessCurrentVal(
                  await loadLatestValueV2(
                    "WaterRinse_Tank3",
                    "WaterRinse_Tank3_Pressure_bar"
                  ),
                  "WaterRinse_Tank3_Pressure_bar"
                ),
              },
            },
          },
          grid4: {
            c1: {
              currentVal: {
                $set: await dataProcessCurrentVal(
                  await loadFromAPI("degreasing/rinsethree"),
                  "data"
                ),
              },
              lastHr: {
                $set: await dataProcessLastHrValInPercent(
                  await loadFromAPI("degreasing/rinsetwo"),
                  await loadFromAPI("degreasing/rinsetwo"),
                  "data"
                ),
              },
              sparklines: {
                $set: await dataProcessTimeSeries(
                  await loadFromAPI("degreasing/rinsethree"),
                  "data"
                ),
              },
            },
            c2: {
              currentVal: {
                $set: await dataProcessCurrentVal(
                  await loadLatestValueV2(
                    "DIWaterRinse_Tank4",
                    "DIWaterRinse_Tank4_WaterLevel_cm"
                  ),
                  "DIWaterRinse_Tank4_WaterLevel_cm"
                ),
              },
            },
            c3: {
              currentVal: {
                $set: await dataProcessCurrentVal(
                  await loadLatestValueV2(
                    "DIWaterRinse_Tank4",
                    "DIWaterRinse_Tank4_OverflowLevel_cm"
                  ),
                  "DIWaterRinse_Tank4_OverflowLevel_cm"
                ),
              },
              lastHr: {
                $set: await dataProcessLastHrValInPercent(
                  await loadLatestValueV2(
                    "DIWaterRinse_Tank4",
                    "DIWaterRinse_Tank4_OverflowLevel_cm"
                  ),
                  await loadDataByGivenDateV2(
                    "DIWaterRinse_Tank4",
                    "DIWaterRinse_Tank4_OverflowLevel_cm"
                  ),
                  "DIWaterRinse_Tank4_OverflowLevel_cm"
                ),
              },
              sparklines: {
                $set: await dataProcessTimeSeries(
                  await loadDataByGivenDateV2(
                    "DIWaterRinse_Tank4",
                    "DIWaterRinse_Tank4_OverflowLevel_cm"
                  ),
                  "DIWaterRinse_Tank4_OverflowLevel_cm"
                ),
              },
            },
            c4: {
              currentVal: {
                $set: await dataProcessCurrentVal(
                  await loadLatestValueV2(
                    "DIWaterRinse_Tank4",
                    "DIWaterRinse_Tank4_Pressure_bar"
                  ),
                  "DIWaterRinse_Tank4_Pressure_bar"
                ),
              },
            },
          },
          grid5: {
            c1: {
              currentVal: {
                $set: await dataProcessCurrentVal(
                  await loadLatestValueV2(
                    "DIWaterRinse_Tank5",
                    "DIWaterRinse_Tank5_pH"
                  ),
                  "DIWaterRinse_Tank5_pH"
                ),
              },
              lastHr: {
                $set: await dataProcessLastHrValInPercent(
                  await loadLatestValueV2(
                    "DIWaterRinse_Tank5",
                    "DIWaterRinse_Tank5_pH"
                  ),
                  await loadDataByGivenDateV2(
                    "DIWaterRinse_Tank5",
                    "DIWaterRinse_Tank5_pH"
                  ),
                  "DIWaterRinse_Tank5_pH"
                ),
              },
              sparklines: {
                $set: await dataProcessTimeSeries(
                  await loadDataByGivenDateV2(
                    "DIWaterRinse_Tank5",
                    "DIWaterRinse_Tank5_pH"
                  ),
                  "DIWaterRinse_Tank5_pH"
                ),
              },
            },
            c2: {
              currentVal: {
                $set: await dataProcessCurrentVal(
                  await loadLatestValueV2(
                    "DIWaterRinse_Tank5",
                    "DIWaterRinse_Tank5_WaterTankLevel_cm"
                  ),
                  "DIWaterRinse_Tank5_WaterTankLevel_cm"
                ),
              },
            },
            c3: {
              currentVal: {
                $set: await dataProcessCurrentVal(
                  await loadLatestValueV2(
                    "DIWaterRinse_Tank5",
                    "DIWaterRinse_Tank5_WaterTankOverlowLevel_cm"
                  ),
                  "DIWaterRinse_Tank5_WaterTankOverlowLevel_cm"
                ),
              },
              lastHr: {
                $set: await dataProcessLastHrValInPercent(
                  await loadLatestValueV2(
                    "DIWaterRinse_Tank5",
                    "DIWaterRinse_Tank5_WaterTankOverlowLevel_cm"
                  ),
                  await loadDataByGivenDateV2(
                    "DIWaterRinse_Tank5",
                    "DIWaterRinse_Tank5_WaterTankOverlowLevel_cm"
                  ),
                  "DIWaterRinse_Tank5_WaterTankOverlowLevel_cm"
                ),
              },
              sparklines: {
                $set: await dataProcessTimeSeries(
                  await loadDataByGivenDateV2(
                    "DIWaterRinse_Tank5",
                    "DIWaterRinse_Tank5_WaterTankOverlowLevel_cm"
                  ),
                  "DIWaterRinse_Tank5_WaterTankOverlowLevel_cm"
                ),
              },
            },
            c4: {
              currentVal: {
                $set: await dataProcessCurrentVal(
                  await loadLatestValueV2(
                    "DIWaterRinse_Tank5",
                    "DIWaterRinse_Tank5_Pressure_bar"
                  ),
                  "DIWaterRinse_Tank5_Pressure_bar"
                ),
              },
            },
          },
          grid6: {
            c1: {
              currentVal: {
                $set: await dataProcessCurrentVal(
                  await loadLatestValueV2(
                    "Passivation_Tank6",
                    "Passivation_Tank6_pH"
                  ),
                  "Passivation_Tank6_pH"
                ),
              },
              lastHr: {
                $set: await dataProcessLastHrValInPercent(
                  await loadLatestValueV2(
                    "Passivation_Tank6",
                    "Passivation_Tank6_pH"
                  ),
                  await loadDataByGivenDateV2(
                    "Passivation_Tank6",
                    "Passivation_Tank6_pH"
                  ),
                  "Passivation_Tank6_pH"
                ),
              },
              sparklines: {
                $set: await dataProcessTimeSeries(
                  await loadDataByGivenDateV2(
                    "Passivation_Tank6",
                    "Passivation_Tank6_pH"
                  ),
                  "Passivation_Tank6_pH"
                ),
              },
            },
            c2: {
              currentVal: {
                $set: await dataProcessCurrentVal(
                  await loadLatestValueV2(
                    "Passivation_Tank6",
                    "Passivation_Tank6_WaterLevel_cm"
                  ),
                  "Passivation_Tank6_WaterLevel_cm"
                ),
              },
            },
            c3: {
              currentVal: {
                $set: await dataProcessCurrentVal(
                  await loadLatestValueV2(
                    "Passivation_Tank6",
                    "Passivation_Tank6_OverFlowLevel_cm"
                  ),
                  "Passivation_Tank6_OverFlowLevel_cm"
                ),
              },
              lastHr: {
                $set: await dataProcessLastHrValInPercent(
                  await loadLatestValueV2(
                    "Passivation_Tank6",
                    "Passivation_Tank6_OverFlowLevel_cm"
                  ),
                  await loadDataByGivenDateV2(
                    "Passivation_Tank6",
                    "Passivation_Tank6_OverFlowLevel_cm"
                  ),
                  "Passivation_Tank6_OverFlowLevel_cm"
                ),
              },
              sparklines: {
                $set: await dataProcessTimeSeries(
                  await loadDataByGivenDateV2(
                    "Passivation_Tank6",
                    "Passivation_Tank6_OverFlowLevel_cm"
                  ),
                  "Passivation_Tank6_OverFlowLevel_cm"
                ),
              },
            },
            c4: {
              currentVal: {
                $set: await dataProcessCurrentVal(
                  await loadLatestValueV2(
                    "Passivation_Tank6",
                    "Passivation_Tank6_Pressure_bar"
                  ),
                  "Passivation_Tank6_Pressure_bar"
                ),
              },
            },
          },
          grid7: {
            barChart: {
              $set: [
                Number(
                  await dataProcessBarChartCurrentVal(
                    await loadLatestValueV2(
                      "Degreasing_Tank1",
                      "Degreasing_Tank1_WaterLevel_cm"
                    ),
                    "Degreasing_Tank1_WaterLevel_cm"
                  )
                ),
                Number(
                  await dataProcessBarChartCurrentVal(
                    await loadLatestValueV2(
                      "WaterRinse_Tank2",
                      "WaterRinse_Tank2_WaterLevel_cm"
                    ),
                    "WaterRinse_Tank2_WaterLevel_cm"
                  )
                ),
                Number(
                  await dataProcessBarChartCurrentVal(
                    await loadLatestValueV2(
                      "WaterRinse_Tank3",
                      "WaterRinse_Tank3_WaterLevel_cm"
                    ),
                    "WaterRinse_Tank3_WaterLevel_cm"
                  )
                ),
                Number(
                  await dataProcessBarChartCurrentVal(
                    await loadLatestValueV2(
                      "DIWaterRinse_Tank4",
                      "DIWaterRinse_Tank4_WaterLevel_cm"
                    ),
                    "DIWaterRinse_Tank4_WaterLevel_cm"
                  )
                ),
                Number(
                  await dataProcessBarChartCurrentVal(
                    await loadLatestValueV2(
                      "DIWaterRinse_Tank5",
                      "DIWaterRinse_Tank5_WaterTankLevel_cm"
                    ),
                    "DIWaterRinse_Tank5_WaterTankLevel_cm"
                  )
                ),
                Number(
                  await dataProcessBarChartCurrentVal(
                    await loadLatestValueV2(
                      "Passivation_Tank6",
                      "Passivation_Tank6_WaterLevel_cm"
                    ),
                    "Passivation_Tank6_WaterLevel_cm"
                  )
                ),
              ],
            },
          },
        })
      );
    } catch (err) {
      console.log(err);
      store.dispatch({
        type: OPEN_SNACK,
        status: true,
        message: UNHANDELERROR,
        snackType: snackError,
      });
    }
  };

  useEffect(() => {
    fetchAPI(OVERVIEW_DATA);
    // const interval = setInterval(() => {
    //   fetchAPI();
    // }, 20000);
    // return () => clearInterval(interval);
  }, []);

  return (
    <div className={classes.root}>
      {/* ---- First Page ----- */}
      <GridRow>
        {/* Title */}
        <Col span={12}>
          <TitleWrapper size={"large"}>
            Degreasing Overview
            {OVERVIEW_DATA.loader && (
              <CircularProgress
                color="secondary"
                style={{ marginLeft: "25px" }}
              />
            )}
          </TitleWrapper>
        </Col>
        {/* Grids */}
        <Row lg={3}>
          <Col span={12}>
            <TitleWrapper>{OVERVIEW_DATA.grid1.name}</TitleWrapper>
          </Col>
          <Col span={6}>
            <GridRow>
              {OVERVIEW_DATA.grid1.c1.map((res, index) => {
                return (
                  <Col key={index} span={12}>
                    <Graph
                      data={res}
                      fetchGraphAPI={fetchGraphAPI}
                      graphState={graphState}
                    />
                  </Col>
                );
              })}
            </GridRow>
          </Col>
          <Col span={6}>
            <Grid
              container
              style={{
                border: `1px solid ${COLOR.blue}`,
                backgroundColor: "white",
              }}
            >
              {OVERVIEW_DATA.grid1.c2.map((res, index) => {
                return (
                  <Grid
                    key={index}
                    item
                    xs={12}
                    style={{ paddingBottom: "7.5px" }}
                  >
                    <ArcGauge
                      data={res}
                      fetchGraphAPI={fetchGraphAPI}
                      graphState={graphState}
                    />
                  </Grid>
                );
              })}
            </Grid>
          </Col>
        </Row>
        <Row lg={6}>
          <Col span={12}>
            <GridRow>
              <Col span={12}>
                <TitleWrapper>{OVERVIEW_DATA.grid2.name}</TitleWrapper>
              </Col>
              <Col span={3}>
                <Paper className={classes.paper}>
                  <Graph
                    fetchGraphAPI={fetchGraphAPI}
                    graphState={graphState}
                    data={OVERVIEW_DATA.grid2.c1}
                  />
                </Paper>
              </Col>
              <Col span={3}>
                <Paper className={classes.paper}>
                  <ArcGauge
                    border
                    fetchGraphAPI={fetchGraphAPI}
                    graphState={graphState}
                    data={OVERVIEW_DATA.grid2.c2}
                  />
                </Paper>
              </Col>
              <Col span={3}>
                <Paper className={classes.paper}>
                  <Graph
                    fetchGraphAPI={fetchGraphAPI}
                    graphState={graphState}
                    data={OVERVIEW_DATA.grid2.c3}
                  />
                </Paper>
              </Col>
              <Col span={3}>
                <Paper className={classes.paper}>
                  <ArcGauge
                    border
                    fetchGraphAPI={fetchGraphAPI}
                    graphState={graphState}
                    data={OVERVIEW_DATA.grid2.c4}
                  />
                </Paper>
              </Col>
            </GridRow>
          </Col>
          <Col span={12}>
            <GridRow>
              <Col span={12}>
                <TitleWrapper marginTop={"30px"}>
                  {OVERVIEW_DATA.grid3.name}
                </TitleWrapper>
              </Col>
              <Col span={3}>
                <Paper className={classes.paper}>
                  <Graph
                    fetchGraphAPI={fetchGraphAPI}
                    graphState={graphState}
                    data={OVERVIEW_DATA.grid3.c1}
                  />
                </Paper>
              </Col>
              <Col span={3}>
                <Paper className={classes.paper}>
                  <ArcGauge
                    border
                    fetchGraphAPI={fetchGraphAPI}
                    graphState={graphState}
                    data={OVERVIEW_DATA.grid3.c2}
                  />
                </Paper>
              </Col>
              <Col span={3}>
                <Paper className={classes.paper}>
                  <Graph
                    fetchGraphAPI={fetchGraphAPI}
                    graphState={graphState}
                    data={OVERVIEW_DATA.grid3.c3}
                  />
                </Paper>
              </Col>
              <Col span={3}>
                <Paper className={classes.paper}>
                  <ArcGauge
                    border
                    fetchGraphAPI={fetchGraphAPI}
                    graphState={graphState}
                    data={OVERVIEW_DATA.grid3.c4}
                  />
                </Paper>
              </Col>
            </GridRow>
          </Col>
          <Col span={12}>
            <GridRow>
              <Col span={12}>
                <TitleWrapper marginTop={"30px"}>
                  {OVERVIEW_DATA.grid4.name}
                </TitleWrapper>
              </Col>
              <Col span={3}>
                <Paper className={classes.paper}>
                  <Graph
                    fetchGraphAPI={fetchGraphAPI}
                    graphState={graphState}
                    data={OVERVIEW_DATA.grid4.c1}
                  />
                </Paper>
              </Col>
              <Col span={3}>
                <Paper className={classes.paper}>
                  <ArcGauge
                    border
                    fetchGraphAPI={fetchGraphAPI}
                    graphState={graphState}
                    data={OVERVIEW_DATA.grid4.c2}
                  />
                </Paper>
              </Col>
              <Col span={3}>
                <Paper className={classes.paper}>
                  <Graph
                    fetchGraphAPI={fetchGraphAPI}
                    graphState={graphState}
                    data={OVERVIEW_DATA.grid4.c3}
                  />
                </Paper>
              </Col>
              <Col span={3}>
                <Paper className={classes.paper}>
                  <ArcGauge
                    border
                    fetchGraphAPI={fetchGraphAPI}
                    graphState={graphState}
                    data={OVERVIEW_DATA.grid4.c4}
                  />
                </Paper>
              </Col>
            </GridRow>
          </Col>
          <Col span={12}>
            <GridRow>
              <Col span={12}>
                <TitleWrapper marginTop={"30px"}>
                  {OVERVIEW_DATA.grid5.name}
                </TitleWrapper>
              </Col>
              <Col span={3}>
                <Paper className={classes.paper}>
                  <Graph
                    fetchGraphAPI={fetchGraphAPI}
                    graphState={graphState}
                    data={OVERVIEW_DATA.grid5.c1}
                  />
                </Paper>
              </Col>
              <Col span={3}>
                <Paper className={classes.paper}>
                  <ArcGauge
                    border
                    fetchGraphAPI={fetchGraphAPI}
                    graphState={graphState}
                    data={OVERVIEW_DATA.grid5.c2}
                  />
                </Paper>
              </Col>
              <Col span={3}>
                <Paper className={classes.paper}>
                  <Graph
                    fetchGraphAPI={fetchGraphAPI}
                    graphState={graphState}
                    data={OVERVIEW_DATA.grid5.c3}
                  />
                </Paper>
              </Col>
              <Col span={3}>
                <Paper className={classes.paper}>
                  <ArcGauge
                    border
                    fetchGraphAPI={fetchGraphAPI}
                    graphState={graphState}
                    data={OVERVIEW_DATA.grid5.c4}
                  />
                </Paper>
              </Col>
            </GridRow>
          </Col>
        </Row>
        <Row lg={3}>
          <Col span={12}>
            <TitleWrapper marginTop={"0px"}>
              {OVERVIEW_DATA.grid6.name}
            </TitleWrapper>
          </Col>
          <Col span={6}>
            <Paper className={classes.paper}>
              <Graph
                fetchGraphAPI={fetchGraphAPI}
                graphState={graphState}
                data={OVERVIEW_DATA.grid6.c1}
              />
            </Paper>
          </Col>
          <Col span={6}>
            <Paper className={classes.paper}>
              <ArcGauge
                border
                fetchGraphAPI={fetchGraphAPI}
                graphState={graphState}
                data={OVERVIEW_DATA.grid6.c2}
              />
            </Paper>
          </Col>
          <Col span={6}>
            <Paper className={classes.paper}>
              <Graph
                fetchGraphAPI={fetchGraphAPI}
                graphState={graphState}
                data={OVERVIEW_DATA.grid6.c3}
              />
            </Paper>
          </Col>
          <Col span={6}>
            <Paper className={classes.paper}>
              <ArcGauge
                border
                fetchGraphAPI={fetchGraphAPI}
                graphState={graphState}
                data={OVERVIEW_DATA.grid6.c4}
              />
            </Paper>
          </Col>
          <Col span={12}>
            <TitleWrapper marginTop={"20px"}>
              {OVERVIEW_DATA.grid7.name}
            </TitleWrapper>
          </Col>
          <Col span={12}>
            <Grid
              item
              xs={12}
              style={{
                border: `1px solid ${COLOR.blue}`,
                backgroundColor: "white",
              }}
            >
              <LineChart
                fetchGraphAPI={fetchGraphAPI}
                graphState={graphState}
                data={OVERVIEW_DATA.grid7.barChart}
              />
            </Grid>
          </Col>
        </Row>
      </GridRow>
    </div>
  );
};

export default Home;

const GridRow = ({ children, marginTop }) => {
  return (
    <Grid container spacing={1} style={{ marginTop: marginTop }}>
      {children}
    </Grid>
  );
};
const Row = ({ children, lg }) => {
  return (
    <Grid item xs={12} md={6} lg={lg}>
      <Grid container spacing={1}>
        {children}
      </Grid>
    </Grid>
  );
};
const Col = ({ children, span }) => {
  return (
    <Grid item xs={12} sm={span} md={span} lg={span}>
      {children}
    </Grid>
  );
};

const TitleWrapper = styled.div`
  font-size: ${({ size }) => (size === "large" ? "32px" : "16px")};
  margin-top: ${({ marginTop }) => marginTop && marginTop};
  color: #0f3790;
  font-weight: 900;
`;

const BolTitleWrapper = styled.div`
  font-size: ${({ size }) => (size === "large" ? "32px" : "16px")};
  padding: 19.5px;
  color: #0f3790;
  font-weight: 900;
`;

// // // POWERWASH-------------
// // Degreasing_Tank1
// await loadDataByGivenDateV2("Degreasing_Tank1", "Degreasing_Tank1_1_Pressure_bar");
// await loadDataByGivenDateV2("Degreasing_Tank1", "Degreasing_Tank1_2_Pressure_bar");
// await loadDataByGivenDateV2("Degreasing_Tank1", "Degreasing_Tank1_3_Pressure_bar");
// await loadDataByGivenDateV2("Degreasing_Tank1", "Degreasing_Tank1_4_Pressure_bar");
// await loadDataByGivenDateV2("Degreasing_Tank1", "Degreasing_Tank1_5_Pressure_bar");
// await loadDataByGivenDateV2("Degreasing_Tank1", "Degreasing_Tank1_Conductivity_us");-- done
// await loadDataByGivenDateV2("Degreasing_Tank1", "Degreasing_Tank1_pH");--done
// await loadDataByGivenDateV2("Degreasing_Tank1", "Degreasing_Tank1_TemperatureSetPoint_degC");
// await loadDataByGivenDateV2("Degreasing_Tank1", "Degreasing_Tank1_WaterLevel_cm");
// await loadDataByGivenDateV2("Degreasing_Tank1", "Degreasing_Tank1_WaterTankOverlowLevel_cm");
// await loadDataByGivenDateV2("Degreasing_Tank1", "Degreasing_Tank1_WaterTankTemperature_degC"); -- done
// await loadDataByGivenDateV2("Degreasing_Tank1", "Degreasing_Tank1_WaterTemperaturefromHeater_degC");

// // WaterRinse_Tank2
// await loadDataByGivenDateV2("WaterRinse_Tank2", "WaterRinse_Tank2_OverflowLevel_cm");
// await loadDataByGivenDateV2("WaterRinse_Tank2", "WaterRinse_Tank2_Pressure_bar");
// await loadDataByGivenDateV2("WaterRinse_Tank2", "WaterRinse_Tank2_WaterLevel_cm");

// // WaterRinse_Tank3
// await loadDataByGivenDateV2("WaterRinse_Tank3", "WaterRinse_Tank3_OverflowLevel_cm");
// await loadDataByGivenDateV2("WaterRinse_Tank3", "WaterRinse_Tank3_Pressure_bar");
// await loadDataByGivenDateV2("WaterRinse_Tank3", "WaterRinse_Tank3_WaterLevel_cm");

// // DIWaterRinse_Tank4
// await loadDataByGivenDateV2("DIWaterRinse_Tank4", "DIWaterRinse_Tank4_Conductivity_us");
// await loadDataByGivenDateV2("DIWaterRinse_Tank4", "DIWaterRinse_Tank4_OverflowLevel_cm");
// await loadDataByGivenDateV2("DIWaterRinse_Tank4", "DIWaterRinse_Tank4_Pressure_bar");
// await loadDataByGivenDateV2("DIWaterRinse_Tank4", "DIWaterRinse_Tank4_WaterLevel_cm");

// // DIWaterRinse_Tank5
// await loadDataByGivenDateV2("DIWaterRinse_Tank5", "DIWaterRinse_Tank5_Conductivity_uS");
// await loadDataByGivenDateV2("DIWaterRinse_Tank5", "DIWaterRinse_Tank5_pH");
// await loadDataByGivenDateV2("DIWaterRinse_Tank5", "DIWaterRinse_Tank5_Pressure_bar");
// await loadDataByGivenDateV2("DIWaterRinse_Tank5", "DIWaterRinse_Tank5_WaterTankLevel_cm");
// await loadDataByGivenDateV2("DIWaterRinse_Tank5", "DIWaterRinse_Tank5_WaterTankOverlowLevel_cm");

// // Passivation_Tank6
// await loadDataByGivenDateV2("Passivation_Tank6", "Passivation_Tank6_Conductivity_us");
// await loadDataByGivenDateV2("Passivation_Tank6", "Passivation_Tank6_OverFlowLevel_cm");
// await loadDataByGivenDateV2("Passivation_Tank6", "Passivation_Tank6_pH");
// await loadDataByGivenDateV2("Passivation_Tank6", "Passivation_Tank6_Pressure_bar");
// await loadDataByGivenDateV2("Passivation_Tank6", "Passivation_Tank6_WaterLevel_cm");

// // DrainsPump
// await loadDataByGivenDateV2("DrainsPump", "DrainsPumpWaterLevel_cm");

// // OverflowsPump
// await loadDataByGivenDateV2("OverflowsPump", "OverflowsPumpWaterLevel_cm");

// // // RAHU-------------
// // RAHU1
// await loadDataByGivenDateV2("RAHU1", "AirIntake_Humidity_Pct");
// await loadDataByGivenDateV2("RAHU1", "AirIntake_Temperature_degC");
// await loadDataByGivenDateV2("RAHU1", "Differential_Pressure_SetPoint_Pa");
// await loadDataByGivenDateV2("RAHU1", "FirstLayerFilterG4_Pressure_Pa");
// await loadDataByGivenDateV2("RAHU1", "Humidity_SetPoint_Pct");
// await loadDataByGivenDateV2("RAHU1", "Outlet_AirFlow_m3ph");
// await loadDataByGivenDateV2("RAHU1", "Outlet_Humidity_Pct");
// await loadDataByGivenDateV2("RAHU1", "Outlet_Pressure_Pa");
// await loadDataByGivenDateV2("RAHU1", "Outlet_Temperature_degC");
// await loadDataByGivenDateV2("RAHU1", "SecondLayerFilterF6_Pressure_Pa");
// await loadDataByGivenDateV2("RAHU1", "Temperature_SetPoint_degC");

// // RAHU2
// await loadDataByGivenDateV2("RAHU2", "AirIntake_Humidity_Pct");
// await loadDataByGivenDateV2("RAHU2", "AirIntake_Temperature_degC");
// await loadDataByGivenDateV2("RAHU2", "Differential_Pressure_SetPoint_Pa");
// await loadDataByGivenDateV2("RAHU2", "FirstLayerFilterG4_Pressure_Pa");
// await loadDataByGivenDateV2("RAHU2", "Humidity_SetPoint_Pct");
// await loadDataByGivenDateV2("RAHU2", "Outlet_AirFlow_m3ph");
// await loadDataByGivenDateV2("RAHU2", "Outlet_Humidity_Pct");
// await loadDataByGivenDateV2("RAHU2", "Outlet_Pressure_Pa");
// await loadDataByGivenDateV2("RAHU2", "Outlet_Temperature_degC");
// await loadDataByGivenDateV2("RAHU2", "SecondLayerFilterF6_Pressure_Pa");
// await loadDataByGivenDateV2("RAHU2", "Temperature_SetPoint_degC");

// // // PAINT BOOTH-------------
// // ESTA1
// await loadDataByGivenDateV2("ESTA1", "Filter_Pressure_Pa");
// await loadDataByGivenDateV2("ESTA1", "Inlet_Humidity_pct");
// await loadDataByGivenDateV2("ESTA1", "Inlet_Temperature_degC");
// await loadDataByGivenDateV2("ESTA1", "Intake_Airflow_m3ph");

// // ESTA1_TouchUpBooth
// await loadDataByGivenDateV2("ESTA1_TouchUpBooth", "Filter_Pressure_Pa");
// await loadDataByGivenDateV2("ESTA1_TouchUpBooth", "Inlet_Humidity_pct");
// await loadDataByGivenDateV2("ESTA1_TouchUpBooth", "Inlet_Temperature_degC");
// await loadDataByGivenDateV2("ESTA1_TouchUpBooth", "Intake_Airflow_m3ph");

// // ESTA2
// await loadDataByGivenDateV2("ESTA2", "Filter_Pressure_Pa");
// await loadDataByGivenDateV2("ESTA2", "Inlet_Humidity_pct");
// await loadDataByGivenDateV2("ESTA2", "Inlet_Temperature_degC");
// await loadDataByGivenDateV2("ESTA2", "Intake_Airflow_m3ph");

// // ESTA2_TouchUpBooth
// await loadDataByGivenDateV2("ESTA2_TouchUpBooth", "Filter_Pressure_Pa");
// await loadDataByGivenDateV2("ESTA2_TouchUpBooth", "Inlet_Humidity_pct");
// await loadDataByGivenDateV2("ESTA2_TouchUpBooth", "Inlet_Temperature_degC");
// await loadDataByGivenDateV2("ESTA2_TouchUpBooth", "Intake_Airflow_m3ph");

// // IndependentBooth
// await loadDataByGivenDateV2("IndependentBooth", "Filter_Pressure_Pa");
// await loadDataByGivenDateV2("IndependentBooth", "Inlet_Humidity_pct");
// await loadDataByGivenDateV2("IndependentBooth", "Inlet_Temperature_degC");
// await loadDataByGivenDateV2("IndependentBooth", "Intake_Airflow_m3ph");

// // // OVEN-------------
// // FinalOven1
// await loadDataByGivenDateV2("FinalOven1", "Airflow_m3ph");
// await loadDataByGivenDateV2("FinalOven1", "Humidity_Pct");
// await loadDataByGivenDateV2("FinalOven1", "Setting_Temperature_degC");
// await loadDataByGivenDateV2("FinalOven1", "Temperature_degC");

// // FinalOven2
// await loadDataByGivenDateV2("FinalOven2", "Airflow_m3ph");
// await loadDataByGivenDateV2("FinalOven2", "Humidity_Pct");
// await loadDataByGivenDateV2("FinalOven2", "Setting_Temperature_degC");
// await loadDataByGivenDateV2("FinalOven2", "Temperature_degC");

// // IntermediateOven
// await loadDataByGivenDateV2("IntermediateOven", "Airflow_m3ph");
// await loadDataByGivenDateV2("IntermediateOven", "Heater_Temperature_degC");
// await loadDataByGivenDateV2("IntermediateOven", "Room_Humidity_Pct");
// await loadDataByGivenDateV2("IntermediateOven", "Room_Temperature_degC");
// await loadDataByGivenDateV2("IntermediateOven", "Setting_Temperature_degC");

// // WaterDryer
// await loadDataByGivenDateV2("WaterDryer", "Airflow_m3ph");
// await loadDataByGivenDateV2("WaterDryer", "Heater_Temperature_degC");
// await loadDataByGivenDateV2("WaterDryer", "Room_Humidity_Pct");
// await loadDataByGivenDateV2("WaterDryer", "Room_Temperature_degC");
// await loadDataByGivenDateV2("WaterDryer", "Setting_Temperature_degC");

// // // AHU-------------
// // AHU1
// await loadDataByGivenDateV2("AHU1", "Airflow_SetPoint_m3ph");
// await loadDataByGivenDateV2("AHU1", "AirIn_Humidity_Pct");
// await loadDataByGivenDateV2("AHU1", "AirIn_Temperature_degC");
// await loadDataByGivenDateV2("AHU1", "AirOut_Humidity_Pct");
// await loadDataByGivenDateV2("AHU1", "AirOut_Temperature_degC");
// await loadDataByGivenDateV2("AHU1", "FirstCoolingCoilCompartment_Pressure_Pa");
// await loadDataByGivenDateV2("AHU1", "FirstCoolingCoilCompartment_Temperature_degC");
// await loadDataByGivenDateV2("AHU1", "FirstLayerFilterG4_Pressure_Pa");
// await loadDataByGivenDateV2("AHU1", "Humidity_SetPoint_Pct");
// await loadDataByGivenDateV2("AHU1", "Outlet_Airflow_m3ph");
// await loadDataByGivenDateV2("AHU1", "Outlet_Pressure_Pa");
// await loadDataByGivenDateV2("AHU1", "SecondCoolingCoilCompartment_Pressure_Pa");
// await loadDataByGivenDateV2("AHU1", "SecondCoolingCoilCompartment_Temperature_degC");
// await loadDataByGivenDateV2("AHU1", "SecondLayerFilterF7_Pressure_Pa");
// await loadDataByGivenDateV2("AHU1", "Temperature_SetPoint_degC");

// // AHU2
// await loadDataByGivenDateV2("AHU2", "Airflow_SetPoint_m3ph");
// await loadDataByGivenDateV2("AHU2", "AirIn_Humidity_Pct");
// await loadDataByGivenDateV2("AHU2", "AirIn_Temperature_degC");
// await loadDataByGivenDateV2("AHU2", "AirOut_Humidity_Pct");
// await loadDataByGivenDateV2("AHU2", "AirOut_Temperature_degC");
// await loadDataByGivenDateV2("AHU2", "FirstCoolingCoilCompartment_Pressure_Pa");
// await loadDataByGivenDateV2("AHU2", "FirstCoolingCoilCompartment_Temperature_degC");
// await loadDataByGivenDateV2("AHU2", "FirstLayerFilterG4_Pressure_Pa");
// await loadDataByGivenDateV2("AHU2", "Humidity_SetPoint_Pct");
// await loadDataByGivenDateV2("AHU2", "Outlet_Airflow_m3ph");
// await loadDataByGivenDateV2("AHU2", "Outlet_Pressure_Pa");
// await loadDataByGivenDateV2("AHU2", "SecondCoolingCoilCompartment_Pressure_Pa");
// await loadDataByGivenDateV2("AHU2", "SecondCoolingCoilCompartment_Temperature_degC");
// await loadDataByGivenDateV2("AHU2", "SecondLayerFilterF7_Pressure_Pa");
// await loadDataByGivenDateV2("AHU2", "Temperature_SetPoint_degC");

//======================================================================================================================================================

//   await loadDataByGivenDateV2(
//     fromDate,
//     toDate,
//     assetId,
//     "Degreasing",
//     "Degreasing_Conductivity",
//     1000
//   )

// const dataDegreasing_ConductivityTimeSe = await dataProcessTimeSeries(
//   await loadDataByGivenDateV2("Degreasing", "Degreasing_Conductivity"),
//   "Degreasing_Conductivity"
// );

// const dataDegreasing_ConductivityCurrVal = await dataProcessCurrentVal(
//   await loadLatestValueV2("Degreasing", "Degreasing_Conductivity"),
//   "Degreasing_Conductivity"
// );

// const dataDegreasing_ConductivityLastHr = await dataProcessLastHrValInPercent(
//   await loadLatestValueV2("Degreasing", "Degreasing_Conductivity"),
//   "Degreasing_Conductivity"
// );

// await dataProcessCurrentVal( await loadLatestValueV2( "", "" ), "" );

// await dataProcessTimeSeries( await loadDataByGivenDateV2( "", "" ), "" );
