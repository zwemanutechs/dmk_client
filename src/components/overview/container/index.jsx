import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import styled from "styled-components";
import update from "immutability-helper";

import {
  // loadDataByGivenDate,
  // loadLatestValue,
  loadLatestValueV2,
  loadDataByGivenDateV2,
} from "../../../appservices/mindsphere-iotapi-services";
import ArcGauge from "../../../shared/charts/arc-gauge";
import Graph from "../../../shared/charts/graph";
import LineChart from "../../../shared/charts/lineChart";
import "./index.css";

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
  const [OVERVIEW_DATA, SETOVERVIEW_DATA] = useState({
    grid9: {
      name: "Water Dryer",
      c1: {
        target: 90,
        currentVal: 0,
        lastHr: "45%",
        unit: "",
        title: "Temperature",
        sparklines: [],
      },
      c2: {
        // title: "Gauge 1",
        title2: "Humidity",
        currentVal: 0,
        unit: "atm",
      },
      c3: {
        target: 90,
        currentVal: 0,
        lastHr: "45%",
        unit: "",
        title: "Air Flow",
        sparklines: [],
      },
    },
    grid10: {
      name: "Intermediate Oven",
      c1: {
        target: 90,
        currentVal: 0,
        lastHr: "45%",
        unit: "",
        title: "Temperature",
        sparklines: [],
      },
      c2: {
        // title: "Gauge 1",
        title2: "Humidity",
        currentVal: 0,
        unit: "atm",
      },
      c3: {
        target: 90,
        currentVal: 0,
        lastHr: "45%",
        unit: "",
        title: "Air Flow",
        sparklines: [],
      },
    },
    grid11: {
      name: "Final Oven 1",
      c1: {
        target: 90,
        currentVal: 0,
        lastHr: "45%",
        unit: "",
        title: "Temperature",
        sparklines: [],
      },
      c2: {
        // title: "Gauge 1",
        title2: "Humidity",
        currentVal: 0,
        unit: "atm",
      },
      c3: {
        target: 90,
        currentVal: 0,
        lastHr: "45%",
        unit: "",
        title: "Air Flow",
        sparklines: [],
      },
    },
    grid12: {
      name: "Final Oven 2",
      c1: {
        target: 90,
        currentVal: 0,
        lastHr: "45%",
        unit: "",
        title: "Temperature",
        sparklines: [],
      },
      c2: {
        // title: "Gauge 1",
        title2: "Humidity",
        currentVal: 0,
        unit: "atm",
      },
      c3: {
        target: 90,
        currentVal: 0,
        lastHr: "45%",
        unit: "",
        title: "Air Flow",
        sparklines: [],
      },
    },
    grid13: {
      name: "ESTA Booth 1",
      c1: {
        target: 90,
        currentVal: 0,
        lastHr: "45%",
        unit: "",
        title: "Temperature",
        sparklines: [],
      },
      c2: {
        // title: "Gauge 1",
        title2: "Humidity",
        currentVal: 0,
        unit: "atm",
      },
      c3: {
        target: 90,
        currentVal: 0,
        lastHr: "45%",
        unit: "",
        title: "Air Flow",
        sparklines: [],
      },
    },
    grid14: {
      name: "ESTA Booth 2",
      c1: {
        target: 90,
        currentVal: 0,
        lastHr: "45%",
        unit: "",
        title: "Temperature",
        sparklines: [],
      },
      c2: {
        // title: "Gauge 1",
        title2: "Humidity",
        currentVal: 0,
        unit: "atm",
      },
      c3: {
        target: 90,
        currentVal: 0,
        lastHr: "45%",
        unit: "",
        title: "Air Flow",
        sparklines: [],
      },
    },
    // grid15: {
    //   name: "Primer Cabinet 1",
    //   c1: {
    //     target: 90,
    //     currentVal: 0,
    //     lastHr: "45%",
    //     unit: "",
    //     title: "Temperature",
    //     sparklines: [],
    //   },
    //   c2: {
    //     // title: "Gauge 1",
    //     title2: "Humidity",
    //     currentVal: 0,
    //     unit: "atm",
    //   },
    //   c3: {
    //     target: 90,
    //     currentVal: 0,
    //     lastHr: "45%",
    //     unit: "",
    //     title: "Paint viscosity",
    //     sparklines: [],
    //   },
    // },
    // grid16: {
    //   name: "Primer Cabinet 2",
    //   c1: {
    //     target: 90,
    //     currentVal: 0,
    //     lastHr: "45%",
    //     unit: "",
    //     title: "Temperature",
    //     sparklines: [],
    //   },
    //   c2: {
    //     // title: "Gauge 1",
    //     title2: "Humidity",
    //     currentVal: 0,
    //     unit: "atm",
    //   },
    //   c3: {
    //     target: 90,
    //     currentVal: 0,
    //     lastHr: "45%",
    //     unit: "",
    //     title: "Paint viscosity",
    //     sparklines: [],
    //   },
    // },
    // grid17: {
    //   name: "Top Coat 1",
    //   c1: {
    //     target: 90,
    //     currentVal: 0,
    //     lastHr: "45%",
    //     unit: "",
    //     title: "Temperature",
    //     sparklines: [],
    //   },
    //   c2: {
    //     // title: "Gauge 1",
    //     title2: "Humidity",
    //     currentVal: 0,
    //     unit: "atm",
    //   },
    // },
    // grid18: {
    //   name: "Top Coat 2",
    //   c1: {
    //     target: 90,
    //     currentVal: 0,
    //     lastHr: "45%",
    //     unit: "",
    //     title: "Temperature",
    //     sparklines: [],
    //   },
    //   c2: {
    //     // title: "Gauge 1",
    //     title2: "Humidity",
    //     currentVal: 0,
    //     unit: "atm",
    //   },
    // },
    // grid19: {
    //   name: "Neutralization",
    //   c1: {
    //     title: "pH",
    //     title2: "Tank 3",
    //     currentVal: 0,
    //     unit: "atm",
    //   },
    // },
    // grid20: {
    //   name: "Distilled Water",
    //   c1: {
    //     title: "pH",
    //     title2: "Tank 6",
    //     currentVal: 0,
    //     unit: "atm",
    //   },
    // },
    // grid21: {
    //   name: "Demineralization",
    //   c1: {
    //     title: "Conductivity",
    //     title2: "Tank 7",
    //     currentVal: 0,
    //     unit: "atm",
    //   },
    // },
    // grid22: {
    //   name: "Demineralization",
    //   c1: {
    //     title: "pH",
    //     title2: "Tank 7",
    //     currentVal: 0,
    //     unit: "atm",
    //   },
    // },
  });

  const dataProcessCurrentVal = async (data, Degreasing_Conductivity) => {
    return await data[0][Degreasing_Conductivity];
  };
  const dataProcessTimeSeries = async (data, Degreasing_Conductivity) => {
    // take seven days only
    const timeSeriesData = data
      .map((res, index) => {
        if (index < 7) {
          return res["Degreasing_Conductivity"];
        }
        return null;
      })
      .filter((res) => res !== null);

    return await timeSeriesData;
  };
  const dataProcessLastHrValInPercent = (data) => {
    // console.log(data);
    return [];
  };

  const fetchAPI = async (data) => {
    SETOVERVIEW_DATA(
      update(data, {
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
            lastHr: { $set: "5%" },
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
            lastHr: { $set: "5%" },
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
            lastHr: { $set: "5%" },
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
            lastHr: { $set: "5%" },
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
            lastHr: { $set: "5%" },
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
            lastHr: { $set: "5%" },
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
            lastHr: { $set: "5%" },
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
            lastHr: { $set: "5%" },
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
            lastHr: { $set: "5%" },
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
            lastHr: { $set: "5%" },
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
            lastHr: { $set: "5%" },
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
            lastHr: { $set: "5%" },
            sparklines: {
              $set: await dataProcessTimeSeries(
                await loadDataByGivenDateV2("ESTA2", "Intake_Airflow_m3ph"),
                "Intake_Airflow_m3ph"
              ),
            },
          },
        },
        // grid15: {
        //   c1: {
        //     currentVal: {
        //       $set: await dataProcessCurrentVal(
        //         await loadLatestValueV2("", ""),
        //         ""
        //       ),
        //     },
        //     lastHr: { $set: "5%" },
        //     sparklines: {
        //       $set: await dataProcessTimeSeries(
        //         await loadDataByGivenDateV2("", ""),
        //         ""
        //       ),
        //     },
        //   },
        //   c2: {
        //     currentVal: {
        //       $set: await dataProcessCurrentVal(
        //         await loadLatestValueV2("", ""),
        //         ""
        //       ),
        //     },
        //   },
        //   c3: {
        //     currentVal: {
        //       $set: await dataProcessCurrentVal(
        //         await loadLatestValueV2("", ""),
        //         ""
        //       ),
        //     },
        //     lastHr: { $set: "5%" },
        //     sparklines: {
        //       $set: await dataProcessTimeSeries(
        //         await loadDataByGivenDateV2("", ""),
        //         ""
        //       ),
        //     },
        //   },
        // },
        // grid16: {
        //   c1: {
        //     currentVal: {
        //       $set: await dataProcessCurrentVal(
        //         await loadLatestValueV2("", ""),
        //         ""
        //       ),
        //     },
        //     lastHr: { $set: "5%" },
        //     sparklines: {
        //       $set: await dataProcessTimeSeries(
        //         await loadDataByGivenDateV2("", ""),
        //         ""
        //       ),
        //     },
        //   },
        //   c2: {
        //     currentVal: {
        //       $set: await dataProcessCurrentVal(
        //         await loadLatestValueV2("", ""),
        //         ""
        //       ),
        //     },
        //   },
        //   c3: {
        //     currentVal: {
        //       $set: await dataProcessCurrentVal(
        //         await loadLatestValueV2("", ""),
        //         ""
        //       ),
        //     },
        //     lastHr: { $set: "5%" },
        //     sparklines: {
        //       $set: await dataProcessTimeSeries(
        //         await loadDataByGivenDateV2("", ""),
        //         ""
        //       ),
        //     },
        //   },
        // },
        // grid19: {
        //   c1: {
        //     currentVal: {
        //       $set: await dataProcessCurrentVal(
        //         await loadLatestValueV2("", ""),
        //         ""
        //       ),
        //     },
        //   },
        // },
        // grid20: {
        //   c1: {
        //     currentVal: {
        //       $set: await dataProcessCurrentVal(
        //         await loadLatestValueV2("", ""),
        //         ""
        //       ),
        //     },
        //   },
        // },
        // grid21: {
        //   c1: {
        //     currentVal: {
        //       $set: await dataProcessCurrentVal(
        //         await loadLatestValueV2("", ""),
        //         ""
        //       ),
        //     },
        //   },
        // },
        // grid22: {
        //   c1: {
        //     currentVal: {
        //       $set: await dataProcessCurrentVal(
        //         await loadLatestValueV2("", ""),
        //         ""
        //       ),
        //     },
        //   },
        // },
      })
    );
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
          <TitleWrapper size={"large"} marginTop={"0"}>
            Ovens, Paint Booth, & Water Treatment Overview
          </TitleWrapper>
        </Col>

        <Row lg={6}>
          {/* grid9 start */}
          <Col span={12}>
            <TitleWrapper>{OVERVIEW_DATA.grid9.name}</TitleWrapper>
          </Col>
          <Col span={4}>
            <Paper className={classes.paper}>
              <Graph data={OVERVIEW_DATA.grid9.c1} />
            </Paper>
          </Col>
          <Col span={4}>
            <Paper className={classes.paper}>
              <ArcGauge border data={OVERVIEW_DATA.grid9.c2} />
            </Paper>
          </Col>
          <Col span={4}>
            <Paper className={classes.paper}>
              <Graph data={OVERVIEW_DATA.grid9.c3} />
            </Paper>
          </Col>
          {/* grid9 end */}

          {/* grid11 start */}
          <Col span={12}>
            <TitleWrapper>{OVERVIEW_DATA.grid11.name}</TitleWrapper>
          </Col>
          <Col span={4}>
            <Paper className={classes.paper}>
              <Graph data={OVERVIEW_DATA.grid11.c1} />
            </Paper>
          </Col>
          <Col span={4}>
            <Paper className={classes.paper}>
              <ArcGauge border data={OVERVIEW_DATA.grid11.c2} />
            </Paper>
          </Col>
          <Col span={4}>
            <Paper className={classes.paper}>
              <Graph data={OVERVIEW_DATA.grid11.c3} />
            </Paper>
          </Col>
          {/* grid11 end */}

          {/* grid13 start */}
          <Col span={12}>
            <TitleWrapper>{OVERVIEW_DATA.grid13.name}</TitleWrapper>
          </Col>
          <Col span={4}>
            <Paper className={classes.paper}>
              <Graph data={OVERVIEW_DATA.grid13.c1} />
            </Paper>
          </Col>
          <Col span={4}>
            <Paper className={classes.paper}>
              <ArcGauge border data={OVERVIEW_DATA.grid13.c2} />
            </Paper>
          </Col>
          <Col span={4}>
            <Paper className={classes.paper}>
              <Graph data={OVERVIEW_DATA.grid13.c3} />
            </Paper>
          </Col>
          {/* grid13 end */}

          {/* grid15 start */}
          {/* <Col span={12}>
            <TitleWrapper>{OVERVIEW_DATA.grid15.name}</TitleWrapper>
          </Col>
          <Col span={4}>
            <Paper className={classes.paper}>
              <Graph data={OVERVIEW_DATA.grid15.c1} />
            </Paper>
          </Col>
          <Col span={4}>
            <Paper className={classes.paper}>
              <ArcGauge border data={OVERVIEW_DATA.grid15.c2} />
            </Paper>
          </Col>
          <Col span={4}>
            <Paper className={classes.paper}>
              <Graph data={OVERVIEW_DATA.grid15.c3} />
            </Paper>
          </Col> */}
          {/* grid15 end */}
        </Row>
        <Row lg={6}>
          {/* grid10 start */}
          <Col span={12}>
            <TitleWrapper>{OVERVIEW_DATA.grid10.name}</TitleWrapper>
          </Col>
          <Col span={4}>
            <Paper className={classes.paper}>
              <Graph data={OVERVIEW_DATA.grid10.c1} />
            </Paper>
          </Col>
          <Col span={4}>
            <Paper className={classes.paper}>
              <ArcGauge border data={OVERVIEW_DATA.grid10.c2} />
            </Paper>
          </Col>
          <Col span={4}>
            <Paper className={classes.paper}>
              <Graph data={OVERVIEW_DATA.grid10.c3} />
            </Paper>
          </Col>
          {/* grid10 end */}

          {/* grid12 start */}
          <Col span={12}>
            <TitleWrapper>{OVERVIEW_DATA.grid12.name}</TitleWrapper>
          </Col>
          <Col span={4}>
            <Paper className={classes.paper}>
              <Graph data={OVERVIEW_DATA.grid12.c1} />
            </Paper>
          </Col>
          <Col span={4}>
            <Paper className={classes.paper}>
              <ArcGauge border data={OVERVIEW_DATA.grid12.c2} />
            </Paper>
          </Col>
          <Col span={4}>
            <Paper className={classes.paper}>
              <Graph data={OVERVIEW_DATA.grid12.c3} />
            </Paper>
          </Col>
          {/* grid12 end */}

          {/* grid14 start */}
          <Col span={12}>
            <TitleWrapper>{OVERVIEW_DATA.grid14.name}</TitleWrapper>
          </Col>
          <Col span={4}>
            <Paper className={classes.paper}>
              <Graph data={OVERVIEW_DATA.grid14.c1} />
            </Paper>
          </Col>
          <Col span={4}>
            <Paper className={classes.paper}>
              <ArcGauge border data={OVERVIEW_DATA.grid14.c2} />
            </Paper>
          </Col>
          <Col span={4}>
            <Paper className={classes.paper}>
              <Graph data={OVERVIEW_DATA.grid14.c3} />
            </Paper>
          </Col>
          {/* grid14 end */}

          {/* grid16 start */}
          {/* <Col span={12}>
            <TitleWrapper>{OVERVIEW_DATA.grid16.name}</TitleWrapper>
          </Col>
          <Col span={4}>
            <Paper className={classes.paper}>
              <Graph data={OVERVIEW_DATA.grid16.c1} />
            </Paper>
          </Col>
          <Col span={4}>
            <Paper className={classes.paper}>
              <ArcGauge border data={OVERVIEW_DATA.grid16.c2} />
            </Paper>
          </Col>
          <Col span={4}>
            <Paper className={classes.paper}>
              <Graph data={OVERVIEW_DATA.grid16.c3} />
            </Paper>
          </Col> */}
          {/* grid16 end */}
        </Row>
        {/* <Row lg={12}>
          <Col span={3}>
            <GridRow>
              <Col span={12}>
                <TitleWrapper>{OVERVIEW_DATA.grid17.name}</TitleWrapper>
              </Col>
              <Col span={6}>
                <Paper className={classes.paper}>
                  <Graph data={OVERVIEW_DATA.grid17.c1} />
                </Paper>
              </Col>
              <Col span={6}>
                <Paper className={classes.paper}>
                  <ArcGauge border data={OVERVIEW_DATA.grid17.c2} />
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
                  <Graph data={OVERVIEW_DATA.grid18.c1} />
                </Paper>
              </Col>
              <Col span={6}>
                <Paper className={classes.paper}>
                  <ArcGauge border data={OVERVIEW_DATA.grid18.c2} />
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
                      <ArcGauge border data={OVERVIEW_DATA.grid19.c1} />
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
                      <ArcGauge border data={OVERVIEW_DATA.grid20.c1} />
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
                      <ArcGauge border data={OVERVIEW_DATA.grid21.c1} />
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
                      <ArcGauge border data={OVERVIEW_DATA.grid22.c1} />
                    </Paper>
                  </Col>
                </GridRow>
              </Col>
            </GridRow>
          </Col>
        </Row> */}
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
