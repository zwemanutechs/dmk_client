import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import styled from "styled-components";
import update from "immutability-helper";
import { zonedTimeToUtc } from "date-fns-tz";
import CircularProgress from "@material-ui/core/CircularProgress";

import {
  loadGraphDataByGivenDateV3,
  // loadDataByGivenDate,
  // loadLatestValue,
  loadLatestValueV2,
  loadDataByGivenDateV2,
  loadFromAPI,
  loadFromAPIOnlyDateTime,
} from "../../../appservices/mindsphere-iotapi-services";
import ArcGauge from "../../../shared/charts/arc-gauge";
import Graph from "../../../shared/charts/graph";
import LineChart from "../../../shared/charts/lineChart";
import "./index.css";
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

const Overview = () => {
  const classes = useStyles();
  const [graphState, setGraphState] = useState({ timeSeries: [0], labels: [] });
  const [OVERVIEW_DATA, SETOVERVIEW_DATA] = useState({
    loader: true,
    grid9: {
      name: "Water Dryer",
      c1: {
        target: 90,
        currentVal: 0,
        lastHr: 0,
        unit: "",
        title: "Temperature",
        sparklines: [],
        endPoint: "",
        aspectId: "WaterDryer",
        parameterName: "Heater_Temperature_degC",
      },
      c2: {
        title: "Humidity",
        // title2: "Humidity",
        currentVal: 0,
        unit: "atm",
        endPoint: "",
        aspectId: "WaterDryer",
        parameterName: "Room_Humidity_Pct",
      },
      c3: {
        target: 90,
        currentVal: 0,
        lastHr: 0,
        unit: "",
        title: "Air Flow",
        sparklines: [],
        endPoint: "",
        aspectId: "WaterDryer",
        parameterName: "Airflow_m3ph",
      },
    },
    grid10: {
      name: "Intermediate Oven",
      c1: {
        target: 90,
        currentVal: 0,
        lastHr: 0,
        unit: "",
        title: "Temperature",
        sparklines: [],
        endPoint: "",
        aspectId: "IntermediateOven",
        parameterName: "Heater_Temperature_degC",
      },
      c2: {
        title: "Humidity",
        // title2: "Humidity",
        currentVal: 0,
        unit: "atm",
        endPoint: "",
        aspectId: "IntermediateOven",
        parameterName: "Room_Humidity_Pct",
      },
      c3: {
        target: 90,
        currentVal: 0,
        lastHr: 0,
        unit: "",
        title: "Air Flow",
        sparklines: [],
        endPoint: "",
        aspectId: "IntermediateOven",
        parameterName: "Airflow_m3ph",
      },
    },
    grid11: {
      name: "Final Oven 1",
      c1: {
        target: 90,
        currentVal: 0,
        lastHr: 0,
        unit: "",
        title: "Temperature",
        sparklines: [],
        endPoint: "",
        aspectId: "FinalOven1",
        parameterName: "Temperature_degC",
      },
      c2: {
        title: "Humidity",
        // title2: "Humidity",
        currentVal: 0,
        unit: "atm",
        endPoint: "",
        aspectId: "FinalOven1",
        parameterName: "Humidity_Pct",
      },
      c3: {
        target: 90,
        currentVal: 0,
        lastHr: 0,
        unit: "",
        title: "Air Flow",
        sparklines: [],
        endPoint: "",
        aspectId: "FinalOven1",
        parameterName: "Airflow_m3ph",
      },
    },
    grid12: {
      name: "Final Oven 2",
      c1: {
        target: 90,
        currentVal: 0,
        lastHr: 0,
        unit: "",
        title: "Temperature",
        sparklines: [],
        endPoint: "",
        aspectId: "FinalOven1",
        parameterName: "Temperature_degC",
      },
      c2: {
        title: "Humidity",
        // title2: "Humidity",
        currentVal: 0,
        unit: "atm",
        endPoint: "",
        aspectId: "FinalOven1",
        parameterName: "Humidity_Pct",
      },
      c3: {
        target: 90,
        currentVal: 0,
        lastHr: 0,
        unit: "",
        title: "Air Flow",
        sparklines: [],
        endPoint: "",
        aspectId: "FinalOven1",
        parameterName: "Airflow_m3ph",
      },
    },
    grid13: {
      name: "ESTA Booth 1",
      c1: {
        target: 90,
        currentVal: 0,
        lastHr: 0,
        unit: "",
        title: "Temperature",
        sparklines: [],
        endPoint: "",
        aspectId: "ESTA1",
        parameterName: "Inlet_Temperature_degC",
      },
      c2: {
        title: "Humidity",
        // title2: "Humidity",
        currentVal: 0,
        unit: "atm",
        endPoint: "",
        aspectId: "ESTA1",
        parameterName: "Inlet_Humidity_pct",
      },
      c3: {
        target: 90,
        currentVal: 0,
        lastHr: 0,
        unit: "",
        title: "Air Flow",
        sparklines: [],
        endPoint: "",
        aspectId: "ESTA1",
        parameterName: "Intake_Airflow_m3ph",
      },
    },
    grid14: {
      name: "ESTA Booth 2",
      c1: {
        target: 90,
        currentVal: 0,
        lastHr: 0,
        unit: "",
        title: "Temperature",
        sparklines: [],
        endPoint: "",
        aspectId: "ESTA2",
        parameterName: "Inlet_Temperature_degC",
      },
      c2: {
        title: "Humidity",
        // title2: "Humidity",
        currentVal: 0,
        unit: "atm",
        endPoint: "",
        aspectId: "ESTA2",
        parameterName: "Inlet_Humidity_pct",
      },
      c3: {
        target: 90,
        currentVal: 0,
        lastHr: 0,
        unit: "",
        title: "Air Flow",
        sparklines: [],
        endPoint: "",
        aspectId: "ESTA2",
        parameterName: "Intake_Airflow_m3ph",
      },
    },
    grid15: {
      name: "Primer Cabinet 1",
      c1: {
        target: 90,
        currentVal: 0,
        lastHr: 0,
        unit: "",
        title: "Temperature",
        sparklines: [],
      },
      c2: {
        title: "Humidity",
        // title2: "Humidity",
        currentVal: 0,
        unit: "atm",
      },
      c3: {
        target: 90,
        currentVal: 0,
        lastHr: 0,
        unit: "",
        title: "Paint viscosity",
        sparklines: [],
      },
    },
    grid16: {
      name: "Primer Cabinet 2",
      c1: {
        target: 90,
        currentVal: 0,
        lastHr: 0,
        unit: "",
        title: "Temperature",
        sparklines: [],
      },
      c2: {
        title: "Humidity",
        // title2: "Humidity",
        currentVal: 0,
        unit: "atm",
      },
      c3: {
        target: 90,
        currentVal: 0,
        lastHr: 0,
        unit: "",
        title: "Paint viscosity",
        sparklines: [],
      },
    },
    grid17: {
      name: "Top Coat 1",
      c1: {
        target: 90,
        currentVal: 0,
        lastHr: 0,
        unit: "",
        title: "Temperature",
        sparklines: [],
      },
      c2: {
        title: "Humidity",
        // title2: "Humidity",
        currentVal: 0,
        unit: "atm",
      },
    },
    grid18: {
      name: "Top Coat 2",
      c1: {
        target: 90,
        currentVal: 0,
        lastHr: 0,
        unit: "",
        title: "Temperature",
        sparklines: [],
      },
      c2: {
        title: "Humidity",
        // title2: "Humidity",
        currentVal: 0,
        unit: "atm",
      },
    },
    grid19: {
      name: "Neutralization",
      c1: {
        title: "pH",
        title2: "Tank 3",
        currentVal: 0,
        unit: "atm",
      },
    },
    grid20: {
      name: "Distilled Water",
      c1: {
        title: "pH",
        title2: "Tank 6",
        currentVal: 0,
        unit: "atm",
      },
    },
    grid21: {
      name: "Demineralization",
      c1: {
        title: "Conductivity",
        title2: "Tank 7",
        currentVal: 0,
        unit: "atm",
      },
    },
    grid22: {
      name: "Demineralization",
      c1: {
        title: "pH",
        title2: "Tank 7",
        currentVal: 0,
        unit: "atm",
      },
    },
  });

  const dataProcessCurrentVal = async (data, aspectName) => {
    if (aspectName === "data") {
      // take first data value only //api
      if (data.length >= 0) {
        return data.length > 0 ? Math.round(data[0][aspectName].toFixed(1)) : 0;
      }

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

  const dataProcessTimeSeries = async (data, aspectName) => {
    if (aspectName === "data") {
      // take seven days only on array // api
      if (data.length >= 0) {
        return data.length > 0
          ? data
              .map((res, index) => {
                if (index < 7) {
                  return res[aspectName];
                }
                return null;
              })
              .filter((res) => res !== null)
          : [];
      }

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
      if (currVal.length >= 0) {
        return currVal.length > 0 &&
          TimeSeries.length > 0 &&
          !(Math.round(TimeSeries[0][aspectName]) === 0)
          ? Math.round(
              ((Math.round(currVal[0][aspectName]) -
                Math.round(TimeSeries[0][aspectName])) /
                Math.round(TimeSeries[0][aspectName])) *
                100
            ).toFixed(2)
          : 0;
      }

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

        // if (numMonthsAgo === 3) {
        //   setGraphState(
        //     update(graphState, {
        //       timeSeries: { $set: [12, 19, 3, 5, 2, 3] },
        //       labels: { $set: ["d1", "d2", "d3", "d4", "d5", "d6"] },
        //     })
        //   );
        //   return;
        // }
        if (apiData.data.data.length > 0)
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
                  return res["time"];
                }
                return null;
              })
              .filter((res) => res !== null),
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
          return;
        }

        const timeData = await loadGraphDataByGivenDateV3(
          tilesDetails.aspectId,
          tilesDetails.parameterName,
          fromDate,
          toDate
        );
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

  const fetchAPI = async (data) => {
    try {
      SETOVERVIEW_DATA(
        update(data, {
          loader: { $set: false },
          grid9: {
            c1: {
              currentVal: {
                $set: await dataProcessCurrentVal(
                  await loadLatestValueV2(
                    "WaterDryer",
                    "Heater_Temperature_degC"
                  ),
                  "Heater_Temperature_degC"
                ),
              },
              lastHr: {
                $set: await dataProcessLastHrValInPercent(
                  await loadLatestValueV2(
                    "WaterDryer",
                    "Heater_Temperature_degC"
                  ),
                  await loadDataByGivenDateV2(
                    "WaterDryer",
                    "Heater_Temperature_degC"
                  ),
                  "Heater_Temperature_degC"
                ),
              },
              sparklines: {
                $set: await dataProcessTimeSeries(
                  await loadDataByGivenDateV2(
                    "WaterDryer",
                    "Heater_Temperature_degC"
                  ),
                  "Heater_Temperature_degC"
                ),
              },
            },
            c2: {
              currentVal: {
                $set: await dataProcessCurrentVal(
                  await loadLatestValueV2("WaterDryer", "Room_Humidity_Pct"),
                  "Room_Humidity_Pct"
                ),
              },
            },
            c3: {
              currentVal: {
                $set: await dataProcessCurrentVal(
                  await loadLatestValueV2("WaterDryer", "Airflow_m3ph"),
                  "Airflow_m3ph"
                ),
              },
              lastHr: {
                $set: await dataProcessLastHrValInPercent(
                  await loadLatestValueV2("WaterDryer", "Airflow_m3ph"),
                  await loadDataByGivenDateV2("WaterDryer", "Airflow_m3ph"),
                  "Airflow_m3ph"
                ),
              },
              sparklines: {
                $set: await dataProcessTimeSeries(
                  await loadDataByGivenDateV2("WaterDryer", "Airflow_m3ph"),
                  "Airflow_m3ph"
                ),
              },
            },
          },
          grid10: {
            c1: {
              currentVal: {
                $set: await dataProcessCurrentVal(
                  await loadLatestValueV2(
                    "IntermediateOven",
                    "Heater_Temperature_degC"
                  ),
                  "Heater_Temperature_degC"
                ),
              },
              lastHr: {
                $set: await dataProcessLastHrValInPercent(
                  await loadLatestValueV2(
                    "IntermediateOven",
                    "Heater_Temperature_degC"
                  ),
                  await loadDataByGivenDateV2(
                    "IntermediateOven",
                    "Heater_Temperature_degC"
                  ),
                  "Heater_Temperature_degC"
                ),
              },
              sparklines: {
                $set: await dataProcessTimeSeries(
                  await loadDataByGivenDateV2(
                    "IntermediateOven",
                    "Heater_Temperature_degC"
                  ),
                  "Heater_Temperature_degC"
                ),
              },
            },
            c2: {
              currentVal: {
                $set: await dataProcessCurrentVal(
                  await loadLatestValueV2(
                    "IntermediateOven",
                    "Room_Humidity_Pct"
                  ),
                  "Room_Humidity_Pct"
                ),
              },
            },
            c3: {
              currentVal: {
                $set: await dataProcessCurrentVal(
                  await loadLatestValueV2("IntermediateOven", "Airflow_m3ph"),
                  "Airflow_m3ph"
                ),
              },
              lastHr: {
                $set: await dataProcessLastHrValInPercent(
                  await loadLatestValueV2("IntermediateOven", "Airflow_m3ph"),
                  await loadDataByGivenDateV2("IntermediateOven", "Airflow_m3ph"),
                  "Airflow_m3ph"
                ),
              },
              sparklines: {
                $set: await dataProcessTimeSeries(
                  await loadDataByGivenDateV2("IntermediateOven", "Airflow_m3ph"),
                  "Airflow_m3ph"
                ),
              },
            },
          },
          grid11: {
            c1: {
              currentVal: {
                $set: await dataProcessCurrentVal(
                  await loadLatestValueV2("FinalOven1", "Temperature_degC"),
                  "Temperature_degC"
                ),
              },
              lastHr: {
                $set: await dataProcessLastHrValInPercent(
                  await loadLatestValueV2("FinalOven1", "Temperature_degC"),
                  await loadDataByGivenDateV2("FinalOven1", "Temperature_degC"),
                  "Temperature_degC"
                ),
              },
              sparklines: {
                $set: await dataProcessTimeSeries(
                  await loadDataByGivenDateV2("FinalOven1", "Temperature_degC"),
                  "Temperature_degC"
                ),
              },
            },
            c2: {
              currentVal: {
                $set: await dataProcessCurrentVal(
                  await loadLatestValueV2("FinalOven1", "Humidity_Pct"),
                  "Humidity_Pct"
                ),
              },
            },
            c3: {
              currentVal: {
                $set: await dataProcessCurrentVal(
                  await loadLatestValueV2("FinalOven1", "Airflow_m3ph"),
                  "Airflow_m3ph"
                ),
              },
              lastHr: {
                $set: await dataProcessLastHrValInPercent(
                  await loadLatestValueV2("FinalOven1", "Airflow_m3ph"),
                  await loadDataByGivenDateV2("FinalOven1", "Airflow_m3ph"),
                  "Airflow_m3ph"
                ),
              },
              sparklines: {
                $set: await dataProcessTimeSeries(
                  await loadDataByGivenDateV2("FinalOven1", "Airflow_m3ph"),
                  "Airflow_m3ph"
                ),
              },
            },
          },
          grid12: {
            c1: {
              currentVal: {
                $set: await dataProcessCurrentVal(
                  await loadLatestValueV2("FinalOven1", "Temperature_degC"),
                  "Temperature_degC"
                ),
              },
              lastHr: {
                $set: await dataProcessLastHrValInPercent(
                  await loadLatestValueV2("FinalOven1", "Temperature_degC"),
                  await loadDataByGivenDateV2("FinalOven1", "Temperature_degC"),
                  "Temperature_degC"
                ),
              },
              sparklines: {
                $set: await dataProcessTimeSeries(
                  await loadDataByGivenDateV2("FinalOven1", "Temperature_degC"),
                  "Temperature_degC"
                ),
              },
            },
            c2: {
              currentVal: {
                $set: await dataProcessCurrentVal(
                  await loadLatestValueV2("FinalOven1", "Humidity_Pct"),
                  "Humidity_Pct"
                ),
              },
            },
            c3: {
              currentVal: {
                $set: await dataProcessCurrentVal(
                  await loadLatestValueV2("FinalOven1", "Airflow_m3ph"),
                  "Airflow_m3ph"
                ),
              },
              lastHr: {
                $set: await dataProcessLastHrValInPercent(
                  await loadLatestValueV2("FinalOven1", "Airflow_m3ph"),
                  await loadDataByGivenDateV2("FinalOven1", "Airflow_m3ph"),
                  "Airflow_m3ph"
                ),
              },
              sparklines: {
                $set: await dataProcessTimeSeries(
                  await loadDataByGivenDateV2("FinalOven1", "Airflow_m3ph"),
                  "Airflow_m3ph"
                ),
              },
            },
          },
          grid13: {
            c1: {
              currentVal: {
                $set: await dataProcessCurrentVal(
                  await loadLatestValueV2("ESTA1", "Inlet_Temperature_degC"),
                  "Inlet_Temperature_degC"
                ),
              },
              lastHr: {
                $set: await dataProcessLastHrValInPercent(
                  await loadLatestValueV2("ESTA1", "Inlet_Temperature_degC"),
                  await loadDataByGivenDateV2("ESTA1", "Inlet_Temperature_degC"),
                  "Inlet_Temperature_degC"
                ),
              },
              sparklines: {
                $set: await dataProcessTimeSeries(
                  await loadDataByGivenDateV2("ESTA1", "Inlet_Temperature_degC"),
                  "Inlet_Temperature_degC"
                ),
              },
            },
            c2: {
              currentVal: {
                $set: await dataProcessCurrentVal(
                  await loadLatestValueV2("ESTA1", "Inlet_Humidity_pct"),
                  "Inlet_Humidity_pct"
                ),
              },
            },
            c3: {
              currentVal: {
                $set: await dataProcessCurrentVal(
                  await loadLatestValueV2("ESTA1", "Intake_Airflow_m3ph"),
                  "Intake_Airflow_m3ph"
                ),
              },
              lastHr: {
                $set: await dataProcessLastHrValInPercent(
                  await loadLatestValueV2("ESTA1", "Intake_Airflow_m3ph"),
                  await loadDataByGivenDateV2("ESTA1", "Intake_Airflow_m3ph"),
                  "Intake_Airflow_m3ph"
                ),
              },
              sparklines: {
                $set: await dataProcessTimeSeries(
                  await loadDataByGivenDateV2("ESTA1", "Intake_Airflow_m3ph"),
                  "Intake_Airflow_m3ph"
                ),
              },
            },
          },
          grid14: {
            c1: {
              currentVal: {
                $set: await dataProcessCurrentVal(
                  await loadLatestValueV2("ESTA2", "Inlet_Temperature_degC"),
                  "Inlet_Temperature_degC"
                ),
              },
              lastHr: {
                $set: await dataProcessLastHrValInPercent(
                  await loadLatestValueV2("ESTA2", "Inlet_Temperature_degC"),
                  await loadDataByGivenDateV2("ESTA2", "Inlet_Temperature_degC"),
                  "Inlet_Temperature_degC"
                ),
              },
              sparklines: {
                $set: await dataProcessTimeSeries(
                  await loadDataByGivenDateV2("ESTA2", "Inlet_Temperature_degC"),
                  "Inlet_Temperature_degC"
                ),
              },
            },
            c2: {
              currentVal: {
                $set: await dataProcessCurrentVal(
                  await loadLatestValueV2("ESTA2", "Inlet_Humidity_pct"),
                  "Inlet_Humidity_pct"
                ),
              },
            },
            c3: {
              currentVal: {
                $set: await dataProcessCurrentVal(
                  await loadLatestValueV2("ESTA2", "Intake_Airflow_m3ph"),
                  "Intake_Airflow_m3ph"
                ),
              },
              lastHr: {
                $set: await dataProcessLastHrValInPercent(
                  await loadLatestValueV2("ESTA2", "Intake_Airflow_m3ph"),
                  await loadDataByGivenDateV2("ESTA2", "Intake_Airflow_m3ph"),
                  "Intake_Airflow_m3ph"
                ),
              },
              sparklines: {
                $set: await dataProcessTimeSeries(
                  await loadDataByGivenDateV2("ESTA2", "Intake_Airflow_m3ph"),
                  "Intake_Airflow_m3ph"
                ),
              },
            },
          },
          grid15: {
            c1: {
              currentVal: {
                $set: await dataProcessCurrentVal(
                  await loadFromAPIOnlyDateTime(
                    "PaintBooth",
                    "temperaturePrimerCabinet1"
                  ),
                  "data"
                ),
              },
              lastHr: {
                $set: await dataProcessLastHrValInPercent(
                  await loadFromAPIOnlyDateTime(
                    "PaintBooth",
                    "temperaturePrimerCabinet1"
                  ),
                  await loadFromAPIOnlyDateTime(
                    "PaintBooth",
                    "temperaturePrimerCabinet1"
                  ),
                  "data"
                ),
              },
              sparklines: {
                $set: await dataProcessTimeSeries(
                  await loadFromAPIOnlyDateTime(
                    "PaintBooth",
                    "temperaturePrimerCabinet1"
                  ),
                  "data"
                ),
              },
            },
            c2: {
              currentVal: {
                $set: await dataProcessCurrentVal(
                  await loadFromAPIOnlyDateTime(
                    "PaintBooth",
                    "humidityPrimerCabinet1"
                  ),
                  "data"
                ),
              },
            },
            c3: {
              currentVal: {
                $set: await dataProcessCurrentVal(
                  await loadFromAPIOnlyDateTime(
                    "PaintBooth",
                    "paintViscosityPrimerCabinet1"
                  ),
                  "data"
                ),
              },
              lastHr: {
                $set: await dataProcessLastHrValInPercent(
                  await loadFromAPIOnlyDateTime(
                    "PaintBooth",
                    "paintViscosityPrimerCabinet1"
                  ),
                  await loadFromAPIOnlyDateTime(
                    "PaintBooth",
                    "paintViscosityPrimerCabinet1"
                  ),
                  "data"
                ),
              },
              sparklines: {
                $set: await dataProcessTimeSeries(
                  await loadFromAPIOnlyDateTime(
                    "PaintBooth",
                    "paintViscosityPrimerCabinet1"
                  ),
                  "data"
                ),
              },
            },
          },
          grid16: {
            c1: {
              currentVal: {
                $set: await dataProcessCurrentVal(
                  await loadFromAPIOnlyDateTime(
                    "PaintBooth",
                    "temperaturePrimerCabinet2"
                  ),
                  "data"
                ),
              },
              lastHr: {
                $set: await dataProcessLastHrValInPercent(
                  await loadFromAPIOnlyDateTime(
                    "PaintBooth",
                    "temperaturePrimerCabinet2"
                  ),
                  await loadFromAPIOnlyDateTime(
                    "PaintBooth",
                    "temperaturePrimerCabinet2"
                  ),
                  "data"
                ),
              },
              sparklines: {
                $set: await dataProcessTimeSeries(
                  await loadFromAPIOnlyDateTime(
                    "PaintBooth",
                    "temperaturePrimerCabinet2"
                  ),
                  "data"
                ),
              },
            },
            c2: {
              currentVal: {
                $set: await dataProcessCurrentVal(
                  await loadFromAPIOnlyDateTime(
                    "PaintBooth",
                    "humidityPrimerCabinet2"
                  ),
                  "data"
                ),
              },
            },
            c3: {
              currentVal: {
                $set: await dataProcessCurrentVal(
                  await loadFromAPIOnlyDateTime(
                    "PaintBooth",
                    "paintViscosityPrimerCabinet2"
                  ),
                  "data"
                ),
              },
              lastHr: {
                $set: await dataProcessLastHrValInPercent(
                  await loadFromAPIOnlyDateTime(
                    "PaintBooth",
                    "paintViscosityPrimerCabinet2"
                  ),
                  await loadFromAPIOnlyDateTime(
                    "PaintBooth",
                    "paintViscosityPrimerCabinet2"
                  ),
                  "data"
                ),
              },
              sparklines: {
                $set: await dataProcessTimeSeries(
                  await loadFromAPIOnlyDateTime(
                    "PaintBooth",
                    "paintViscosityPrimerCabinet2"
                  ),
                  "data"
                ),
              },
            },
          },
          grid19: {
            c1: {
              currentVal: {
                $set: await dataProcessCurrentVal(
                  await loadFromAPIOnlyDateTime("PaintBooth", "phTank3"),
                  "data"
                ),
              },
            },
          },
          grid20: {
            c1: {
              currentVal: {
                $set: await dataProcessCurrentVal(
                  await loadFromAPIOnlyDateTime("PaintBooth", "phTank6"),
                  "data"
                ),
              },
            },
          },
          grid21: {
            c1: {
              currentVal: {
                $set: await dataProcessCurrentVal(
                  await loadFromAPIOnlyDateTime(
                    "PaintBooth",
                    "waterQualityTank7"
                  ),
                  "data"
                ),
              },
            },
          },
          grid22: {
            c1: {
              currentVal: {
                $set: await dataProcessCurrentVal(
                  await loadFromAPIOnlyDateTime("PaintBooth", "waterLevelTank7"),
                  "data"
                ),
              },
            },
          },
        })
      );
    }catch(err){
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
      {/* ---- Second Page ----- */}
      <GridRow>
        <Col span={12}>
          <TitleWrapper size={"large"} marginTop={0}>
            Ovens, Paint Booth, & Water Treatment Overview
            {OVERVIEW_DATA.loader && (
              <CircularProgress
                color="secondary"
                style={{ marginLeft: "25px" }}
              />
            )}
          </TitleWrapper>
        </Col>

        <Row lg={6}>
          {/* grid9 start */}
          <Col span={12}>
            <TitleWrapper>{OVERVIEW_DATA.grid9.name}</TitleWrapper>
          </Col>
          <Col span={4}>
            <Paper className={classes.paper}>
              <Graph
                fetchGraphAPI={fetchGraphAPI}
                graphState={graphState}
                data={OVERVIEW_DATA.grid9.c1}
              />
            </Paper>
          </Col>
          <Col span={4}>
            <Paper className={classes.paper}>
              <ArcGauge
                border
                fetchGraphAPI={fetchGraphAPI}
                graphState={graphState}
                data={OVERVIEW_DATA.grid9.c2}
              />
            </Paper>
          </Col>
          <Col span={4}>
            <Paper className={classes.paper}>
              <Graph
                fetchGraphAPI={fetchGraphAPI}
                graphState={graphState}
                data={OVERVIEW_DATA.grid9.c3}
              />
            </Paper>
          </Col>
          {/* grid9 end */}

          {/* grid11 start */}
          <Col span={12}>
            <TitleWrapper>{OVERVIEW_DATA.grid11.name}</TitleWrapper>
          </Col>
          <Col span={4}>
            <Paper className={classes.paper}>
              <Graph
                fetchGraphAPI={fetchGraphAPI}
                graphState={graphState}
                data={OVERVIEW_DATA.grid11.c1}
              />
            </Paper>
          </Col>
          <Col span={4}>
            <Paper className={classes.paper}>
              <ArcGauge
                border
                fetchGraphAPI={fetchGraphAPI}
                graphState={graphState}
                data={OVERVIEW_DATA.grid11.c2}
              />
            </Paper>
          </Col>
          <Col span={4}>
            <Paper className={classes.paper}>
              <Graph
                fetchGraphAPI={fetchGraphAPI}
                graphState={graphState}
                data={OVERVIEW_DATA.grid11.c3}
              />
            </Paper>
          </Col>
          {/* grid11 end */}

          {/* grid13 start */}
          <Col span={12}>
            <TitleWrapper>{OVERVIEW_DATA.grid13.name}</TitleWrapper>
          </Col>
          <Col span={4}>
            <Paper className={classes.paper}>
              <Graph
                fetchGraphAPI={fetchGraphAPI}
                graphState={graphState}
                data={OVERVIEW_DATA.grid13.c1}
              />
            </Paper>
          </Col>
          <Col span={4}>
            <Paper className={classes.paper}>
              <ArcGauge
                border
                fetchGraphAPI={fetchGraphAPI}
                graphState={graphState}
                data={OVERVIEW_DATA.grid13.c2}
              />
            </Paper>
          </Col>
          <Col span={4}>
            <Paper className={classes.paper}>
              <Graph
                fetchGraphAPI={fetchGraphAPI}
                graphState={graphState}
                data={OVERVIEW_DATA.grid13.c3}
              />
            </Paper>
          </Col>
          {/* grid13 end */}

          {/* grid15 start */}
          <Col span={12}>
            <TitleWrapper>{OVERVIEW_DATA.grid15.name}</TitleWrapper>
          </Col>
          <Col span={4}>
            <Paper className={classes.paper}>
              <Graph
                fetchGraphAPI={fetchGraphAPI}
                graphState={graphState}
                data={OVERVIEW_DATA.grid15.c1}
              />
            </Paper>
          </Col>
          <Col span={4}>
            <Paper className={classes.paper}>
              <ArcGauge
                border
                fetchGraphAPI={fetchGraphAPI}
                graphState={graphState}
                data={OVERVIEW_DATA.grid15.c2}
              />
            </Paper>
          </Col>
          <Col span={4}>
            <Paper className={classes.paper}>
              <Graph
                fetchGraphAPI={fetchGraphAPI}
                graphState={graphState}
                data={OVERVIEW_DATA.grid15.c3}
              />
            </Paper>
          </Col>
          {/* grid15 end */}
        </Row>
        <Row lg={6}>
          {/* grid10 start */}
          <Col span={12}>
            <TitleWrapper>{OVERVIEW_DATA.grid10.name}</TitleWrapper>
          </Col>
          <Col span={4}>
            <Paper className={classes.paper}>
              <Graph
                fetchGraphAPI={fetchGraphAPI}
                graphState={graphState}
                data={OVERVIEW_DATA.grid10.c1}
              />
            </Paper>
          </Col>
          <Col span={4}>
            <Paper className={classes.paper}>
              <ArcGauge
                border
                fetchGraphAPI={fetchGraphAPI}
                graphState={graphState}
                data={OVERVIEW_DATA.grid10.c2}
              />
            </Paper>
          </Col>
          <Col span={4}>
            <Paper className={classes.paper}>
              <Graph
                fetchGraphAPI={fetchGraphAPI}
                graphState={graphState}
                data={OVERVIEW_DATA.grid10.c3}
              />
            </Paper>
          </Col>
          {/* grid10 end */}

          {/* grid12 start */}
          <Col span={12}>
            <TitleWrapper>{OVERVIEW_DATA.grid12.name}</TitleWrapper>
          </Col>
          <Col span={4}>
            <Paper className={classes.paper}>
              <Graph
                fetchGraphAPI={fetchGraphAPI}
                graphState={graphState}
                data={OVERVIEW_DATA.grid12.c1}
              />
            </Paper>
          </Col>
          <Col span={4}>
            <Paper className={classes.paper}>
              <ArcGauge
                border
                fetchGraphAPI={fetchGraphAPI}
                graphState={graphState}
                data={OVERVIEW_DATA.grid12.c2}
              />
            </Paper>
          </Col>
          <Col span={4}>
            <Paper className={classes.paper}>
              <Graph
                fetchGraphAPI={fetchGraphAPI}
                graphState={graphState}
                data={OVERVIEW_DATA.grid12.c3}
              />
            </Paper>
          </Col>
          {/* grid12 end */}

          {/* grid14 start */}
          <Col span={12}>
            <TitleWrapper>{OVERVIEW_DATA.grid14.name}</TitleWrapper>
          </Col>
          <Col span={4}>
            <Paper className={classes.paper}>
              <Graph
                fetchGraphAPI={fetchGraphAPI}
                graphState={graphState}
                data={OVERVIEW_DATA.grid14.c1}
              />
            </Paper>
          </Col>
          <Col span={4}>
            <Paper className={classes.paper}>
              <ArcGauge
                border
                fetchGraphAPI={fetchGraphAPI}
                graphState={graphState}
                data={OVERVIEW_DATA.grid14.c2}
              />
            </Paper>
          </Col>
          <Col span={4}>
            <Paper className={classes.paper}>
              <Graph
                fetchGraphAPI={fetchGraphAPI}
                graphState={graphState}
                data={OVERVIEW_DATA.grid14.c3}
              />
            </Paper>
          </Col>
          {/* grid14 end */}

          {/* grid16 start */}
          <Col span={12}>
            <TitleWrapper>{OVERVIEW_DATA.grid16.name}</TitleWrapper>
          </Col>
          <Col span={4}>
            <Paper className={classes.paper}>
              <Graph
                fetchGraphAPI={fetchGraphAPI}
                graphState={graphState}
                data={OVERVIEW_DATA.grid16.c1}
              />
            </Paper>
          </Col>
          <Col span={4}>
            <Paper className={classes.paper}>
              <ArcGauge
                border
                fetchGraphAPI={fetchGraphAPI}
                graphState={graphState}
                data={OVERVIEW_DATA.grid16.c2}
              />
            </Paper>
          </Col>
          <Col span={4}>
            <Paper className={classes.paper}>
              <Graph
                fetchGraphAPI={fetchGraphAPI}
                graphState={graphState}
                data={OVERVIEW_DATA.grid16.c3}
              />
            </Paper>
          </Col>
          {/* grid16 end */}
        </Row>
        <Row lg={12}>
          <Col span={3}>
            <GridRow>
              <Col span={12}>
                <TitleWrapper>{OVERVIEW_DATA.grid17.name}</TitleWrapper>
              </Col>
              <Col span={6}>
                <Paper className={classes.paper}>
                  <Graph
                    fetchGraphAPI={fetchGraphAPI}
                    graphState={graphState}
                    data={OVERVIEW_DATA.grid17.c1}
                  />
                </Paper>
              </Col>
              <Col span={6}>
                <Paper className={classes.paper}>
                  <ArcGauge
                    border
                    fetchGraphAPI={fetchGraphAPI}
                    graphState={graphState}
                    data={OVERVIEW_DATA.grid17.c2}
                  />
                </Paper>
              </Col>
            </GridRow>
          </Col>
          <Col span={3}>
            <GridRow>
              <Col span={12}>
                <TitleWrapper>{OVERVIEW_DATA.grid18.name}</TitleWrapper>
              </Col>
              <Col span={6}>
                <Paper className={classes.paper}>
                  <Graph
                    fetchGraphAPI={fetchGraphAPI}
                    graphState={graphState}
                    data={OVERVIEW_DATA.grid18.c1}
                  />
                </Paper>
              </Col>
              <Col span={6}>
                <Paper className={classes.paper}>
                  <ArcGauge
                    border
                    fetchGraphAPI={fetchGraphAPI}
                    graphState={graphState}
                    data={OVERVIEW_DATA.grid18.c2}
                  />
                </Paper>
              </Col>
            </GridRow>
          </Col>
          <Col span={6}>
            <GridRow>
              <Col span={3}>
                <GridRow>
                  <Col span={12}>
                    <TitleWrapper>{OVERVIEW_DATA.grid19.name}</TitleWrapper>
                  </Col>
                  <Col span={12}>
                    <Paper className={classes.paper}>
                      <ArcGauge
                        border
                        fetchGraphAPI={fetchGraphAPI}
                        graphState={graphState}
                        data={OVERVIEW_DATA.grid19.c1}
                      />
                    </Paper>
                  </Col>
                </GridRow>
              </Col>
              <Col span={3}>
                <GridRow>
                  <Col span={12}>
                    <TitleWrapper>{OVERVIEW_DATA.grid20.name}</TitleWrapper>
                  </Col>
                  <Col span={12}>
                    <Paper className={classes.paper}>
                      <ArcGauge
                        border
                        fetchGraphAPI={fetchGraphAPI}
                        graphState={graphState}
                        data={OVERVIEW_DATA.grid20.c1}
                      />
                    </Paper>
                  </Col>
                </GridRow>
              </Col>
              <Col span={3}>
                <GridRow>
                  <Col span={12}>
                    <TitleWrapper>{OVERVIEW_DATA.grid21.name}</TitleWrapper>
                  </Col>
                  <Col span={12}>
                    <Paper className={classes.paper}>
                      <ArcGauge
                        border
                        fetchGraphAPI={fetchGraphAPI}
                        graphState={graphState}
                        data={OVERVIEW_DATA.grid21.c1}
                      />
                    </Paper>
                  </Col>
                </GridRow>
              </Col>
              <Col span={3}>
                <GridRow>
                  <Col span={12}>
                    <TitleWrapper>{OVERVIEW_DATA.grid22.name}</TitleWrapper>
                  </Col>
                  <Col span={12}>
                    <Paper className={classes.paper}>
                      <ArcGauge
                        border
                        fetchGraphAPI={fetchGraphAPI}
                        graphState={graphState}
                        data={OVERVIEW_DATA.grid22.c1}
                      />
                    </Paper>
                  </Col>
                </GridRow>
              </Col>
            </GridRow>
          </Col>
        </Row>
      </GridRow>
    </div>
  );
};

export default Overview;

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
