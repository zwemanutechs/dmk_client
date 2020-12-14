import React, { Component } from "react";
import NumberFormat from "react-number-format";
import {
  Sparklines,
  SparklinesLine,
  SparklinesReferenceLine,
} from "react-sparklines";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";

import ChangeHistoryIcon from "@material-ui/icons/ChangeHistory";
import DetailsIcon from "@material-ui/icons/Details";

// import CardContent from "@material-ui/core/CardContent";
// import { makeStyles } from "@material-ui/core/styles";
// import { ArrowUpwardOutlined, ArrowDownwardOutlined } from "@material-ui/icons";
// import dashboardTileServices from "../../../appservices/dashboardTileServices/dashboardTileServices";
// import { CircularProgress } from "@material-ui/core";

import Dialogs from "../dialogs";
import { COLOR } from "../../../components/home/container/home.jsx";

export default class Graph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      chartopen: false,
      chartLabels: this.getChartLabels(this.props.trendInterval),
      showDialogChart: false,
    };
  }

  getChartLabels = (interval) => {
    const today = new Date();
    let labels = [];
    for (let i = 7; i > 0; i--) {
      if (interval === "day") {
        labels.push(
          new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate() - i
          ).toLocaleString("en-GB", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })
        );
      } else if (interval === "month") {
        labels.push(
          new Date(today.getFullYear(), today.getMonth() - i).toLocaleString(
            "en-GB",
            {
              year: "numeric",
              month: "short",
            }
          )
        );
      }
    }
    return labels;
  };

  render() {
    const { data, fetchGraphAPI, graphState } = this.props;
    const { showDialogChart } = this.state;

    return (
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={12} style={{ border: `1px solid ${COLOR.blue}` }}>
          <Card
            style={{
              height: 170,
              color: COLOR.blue,
            }}
            onClick={() => {
              if (fetchGraphAPI) fetchGraphAPI(1);
              this.setState({ showDialogChart: !showDialogChart });
            }}
          >
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <div
                  style={{
                    width: "100%",
                    textAlign: "left",
                    fontSize: "15px",
                    padding: "3px 0 0 3px",
                  }}
                >
                  Target {data && data.target}
                </div>
                <div
                  style={{
                    width: "100%",
                    padding: "3px 0 0 8px",
                  }}
                >
                  <label
                    style={{
                      color: COLOR.blue,
                      fontSize: 35,
                      fontWeight: "bold",
                    }}
                  >
                    <NumberFormat
                      value={data && data.currentVal}
                      displayType={"text"}
                      thousandSeparator
                      fixedDecimalScale={true}
                      // decimalScale={this.props.decimal}
                    />
                  </label>
                </div>
                <div
                  style={{
                    width: "100%",
                    textAlign: "left",
                    fontSize: "15px",
                    padding: "3px 0 0 3px",
                  }}
                >
                  {data && data.unit}
                </div>
              </Grid>
              <Grid item xs={6}>
                <div>Last hr</div>
                <div>
                  {false ? (
                    <ChangeHistoryIcon style={{ marginBottom: "-7px" }} />
                  ) : (
                    <DetailsIcon
                      style={{ marginBottom: "-7px", color: COLOR.red }}
                    />
                  )}
                  {data && data.lastHr}
                </div>
                <Sparklines data={data && data.sparklines} limit={5}>
                  <SparklinesLine
                    style={{ strokeWidth: 3, stroke: COLOR.blue }}
                  />
                  <SparklinesReferenceLine
                    type="mean"
                    style={{ strokeWidth: 2, stroke: COLOR.red }}
                  />
                </Sparklines>
              </Grid>
              <Grid item xs={12}>
                <div
                  style={{
                    textAlign: "right",
                    paddingRight: "4px",
                    width: "100%",
                    fontWeight: "900",
                    fontSize: "23px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {data && data.title}
                </div>
              </Grid>
            </Grid>
          </Card>
        </Grid>
        <Dialogs
          data={graphState}
          showDialogChart={showDialogChart}
          fetchGraphAPI={fetchGraphAPI}
          onClose={(showDialogChart) => this.setState({ showDialogChart })}
        />
      </Grid>
    );
  }
}
