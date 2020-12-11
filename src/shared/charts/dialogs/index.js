import React, { Component } from "react";
import {
  Dialog,
  DialogContent,
  Typography,
  IconButton,
} from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
// import Chart from "react-apexcharts";

import CloseIcon from "@material-ui/icons/Close";
import ChartPanel from "./ChartPanel";

export default class Dialogs extends Component {
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     series: [
  //       {
  //         data: this.generateDayWiseTimeSeries(
  //           new Date("11 Feb 2017").getTime(),
  //           185,
  //           {
  //             min: 30,
  //             max: 90,
  //           }
  //         ),
  //       },
  //     ],
  //     options: {
  //       chart: {
  //         id: "chart2",
  //         type: "line",
  //         height: 230,
  //         toolbar: {
  //           autoSelected: "pan",
  //           show: false,
  //         },
  //       },
  //       colors: ["#546E7A"],
  //       stroke: {
  //         width: 3,
  //       },
  //       dataLabels: {
  //         enabled: false,
  //       },
  //       fill: {
  //         opacity: 1,
  //       },
  //       markers: {
  //         size: 0,
  //       },
  //       xaxis: {
  //         type: "datetime",
  //       },
  //     },

  //     seriesLine: [
  //       {
  //         data: this.generateDayWiseTimeSeries(
  //           new Date("11 Feb 2017").getTime(),
  //           185,
  //           {
  //             min: 30,
  //             max: 90,
  //           }
  //         ),
  //       },
  //     ],
  //     optionsLine: {
  //       chart: {
  //         id: "chart1",
  //         height: 130,
  //         type: "area",
  //         brush: {
  //           target: "chart2",
  //           enabled: true,
  //         },
  //         selection: {
  //           enabled: true,
  //           xaxis: {
  //             min: new Date("19 Jun 2017").getTime(),
  //             max: new Date("14 Aug 2017").getTime(),
  //           },
  //         },
  //       },
  //       colors: ["#008FFB"],
  //       fill: {
  //         type: "gradient",
  //         gradient: {
  //           opacityFrom: 0.91,
  //           opacityTo: 0.1,
  //         },
  //       },
  //       xaxis: {
  //         type: "datetime",
  //         tooltip: {
  //           enabled: false,
  //         },
  //       },
  //       yaxis: {
  //         tickAmount: 2,
  //       },
  //     },
  //   };
  // }

  // generateDayWiseTimeSeries = (baseval, count, yrange) => {
  //   var i = 0;
  //   var series = [];
  //   while (i < count) {
  //     var x = baseval;
  //     var y =
  //       Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

  //     series.push([x, y]);
  //     baseval += 86400000;
  //     i++;
  //   }
  //   console.log(series);

  //   return series;
  // };

  render() {
    const { showDialogChart, onClose, data, fetchGraphAPI } = this.props;

    return (
      <Dialog
        open={showDialogChart}
        onClose={() => onClose(!showDialogChart)}
        keepMounted
        aria-labelledby=""
        fullWidth
        maxWidth="md"
      >
        <DialogTitle
          id="customized-dialog-title"
          onClose={() => onClose(!showDialogChart)}
        >
          Trend Chart
        </DialogTitle>
        <DialogContent>
          {/* <Chart
            options={this.state.options}
            series={this.state.series}
            type="line"
            height={230}
          />
          <Chart
            options={this.state.optionsLine}
            series={this.state.seriesLine}
            type="area"
            height={130}
          /> */}
          <ChartPanel data={data} fetchGraphAPI={fetchGraphAPI}></ChartPanel>
        </DialogContent>
      </Dialog>
    );
  }
}

const DialogTitle = (props) => {
  const { children, onClose } = props;
  return (
    <MuiDialogTitle disableTypography>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          style={{ position: "absolute", top: 8, right: 8 }}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
};
