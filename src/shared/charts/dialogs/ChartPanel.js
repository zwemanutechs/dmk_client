import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import Button from "@material-ui/core/Button";

const COLOR = {
  blue: "#0F3790",
  red: "#EA4E49",
  grey: "#D9D9D9",
};


class ChartPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      data: {
        labels: ["D1", "D2", "D3", "D4", "D5", "D6", "D7"],
        datasets: [
          {
            label: "Value",
            fill: false,
            lineTension: 0.1,
            // backgroundColor: ["#78ce90", "#b977ce", "#fac76e", "#de4d4d"],
            borderColor: COLOR.blue,
            data: this.props.data,
          },
        ],
      },
      options: {
        annotation: {
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

  componentDidMount() {
    this.setState({ isLoading: false });
  }

  loadData = (range) => {

  }

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

    return (
        <div>
          {/* <h2>Trend Of Last 5 Days</h2> */}
          <Button
              onClick={() => this.loadData('1')}
              variant="contained"
          >
            1 Months
          </Button>
          <Button
              onClick={() => this.loadData('3')}
              variant="contained"
          >
            3 Months
          </Button>
          <Button
              onClick={() => this.loadData('6')}
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
