import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import Button from "@material-ui/core/Button";

import { COLOR } from "../../../components/home/container/home.jsx";

class ChartPanel extends Component {
  constructor(props) {
    super(props);
    //["D1", "D2", "D3", "D4", "D5", "D6", "D7"];7D
    // [ "D1", "D3", "D5", "D7", "D9", "D11", "D13" "D15", "D17", "D19", "D21", "D23", "D25", "D27", "D29" ];1M, 30D +2
    // [ "D1", "D7", "D13", "D19", "D25", "D31", "D37" "D43", "D49", "D55", "D61", "D67", "D73", "D79", "D85" ];3M, 90D +6
    // [ "D1", "D7", "D13", "D19", "D25", "D31", "D37" "D43", "D49", "D55", "D61", "D67", "D73", "D79", "D85" ];6M, 180D +12
    const { data } = this.props;
    this.state = {
      isLoading: false,
      data: {
        // labels: ["D1", "D2", "D3", "D4", "D5", "D6", "D7"],
        labels: data && data.labels,
        datasets: [
          {
            label: "Value",
            fill: false,
            lineTension: 0.1,
            // backgroundColor: ["#78ce90", "#b977ce", "#fac76e", "#de4d4d"],
            borderColor: COLOR.blue,
            data: data && data.timeSeries,
          },
        ],
        options: {
          annotations: [
            {
              type: "line",
              mode: "horizontal",
              scaleID: "y-axis-0",
              value: "25",
              borderColor: COLOR.red,
              borderWidth: 2,
            },
          ],
        },
      },
    };
  }

  static getDerivedStateFromProps(prevProps) {
    if (prevProps.tilesDetails.endPoint === "degreasing/rinseone")
      console.log(prevProps);
    return {
      data: {
        // labels: ["D1", "D2", "D3", "D4", "D5", "D6", "D7"],
        labels: prevProps.data && prevProps.data.labels,
        datasets: [
          {
            label: "Value",
            fill: false,
            lineTension: 0.1,
            // backgroundColor: ["#78ce90", "#b977ce", "#fac76e", "#de4d4d"],
            borderColor: COLOR.blue,
            data: prevProps.data && prevProps.data.timeSeries,
          },
        ],
      },
    };
  }

  // componentDidMount() {
  //   this.setState({ isLoading: false });
  // }

  // componentDidUpdate(
  //   prevProps: Readonly<P>,
  //   prevState: Readonly<S>,
  //   snapshot: SS
  // ): void {
  //   if (prevProps.data !== this.props.data) {
  //     let data = this.state.data;
  //     data.datasets[0].data = this.props.data.map(
  //       (d) => Math.round(d * 100) / 100
  //     );
  //     this.setState({ data: data });
  //   }
  // }

  render() {
    const { fetchGraphAPI, tilesDetails } = this.props;
    return (
      <div>
        {/* <h2>Trend Of Last 5 Days</h2> */}
        <Button
          onClick={() => fetchGraphAPI && fetchGraphAPI(1, tilesDetails)}
          variant="contained"
        >
          1 Months
        </Button>
        <Button
          onClick={() => fetchGraphAPI && fetchGraphAPI(3, tilesDetails)}
          variant="contained"
        >
          3 Months
        </Button>
        <Button
          onClick={() => fetchGraphAPI && fetchGraphAPI(6, tilesDetails)}
          variant="contained"
        >
          6 Months
        </Button>
        <Line
          redraw={true}
          ref="chart"
          data={this.state.data}
          options={this.state.options}
        />
      </div>
    );
  }
}

export default ChartPanel;
