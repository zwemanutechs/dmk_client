import React, { Component } from "react";
// import { makeStyles } from "@material-ui/core/styles";
import ZingChart from "zingchart-react";
// import Grid from "@material-ui/core/Grid";
import { COLOR } from "../../../components/home/container/home.jsx";

class LineChart extends Component {
  constructor(props) {
    super(props);
    const { data } = this.props;
    this.state = {
      config: {
        type: "bar",
        height: "100%",
        plot: {
          valueBox: {
            // text: "%v",
            // textAlign: "left",
            placement: "top-out",
          },
          rules: [
            {
              rule: "%v < 40",
              backgroundColor: COLOR.grey,
            },
            {
              rule: "%v >= 40 && %v < 80",
              backgroundColor: COLOR.blue,
            },
            {
              rule: "%v >= 80",
              backgroundColor: COLOR.red,
            },
          ],
        },
        scaleX: {
          labels: ["T1", "T2", "T3", "T4", "T5", "T6"],
        },
        scaleY: {
          labels: ["", "", "", "", "", "", "", "", ""],
        },
        series: [
          {
            values: data,
          },
        ],
      },
    };
  }

  static getDerivedStateFromProps(prevProps) {
    console.log(prevProps.data);
    return {
      config: {
        type: "bar",
        height: "100%",
        plot: {
          valueBox: {
            // text: "%v",
            // textAlign: "left",
            placement: "top-out",
          },
          rules: [
            {
              rule: "%v < 40",
              backgroundColor: COLOR.grey,
            },
            {
              rule: "%v >= 40 && %v < 80",
              backgroundColor: COLOR.blue,
            },
            {
              rule: "%v >= 80",
              backgroundColor: COLOR.red,
            },
          ],
        },
        scaleX: {
          labels: ["T1", "T2", "T3", "T4", "T5", "T6"],
        },
        scaleY: {
          labels: ["", "", "", "", "", "", "", "", ""],
        },
        series: [
          {
            values: prevProps.data,
          },
        ],
      },
    };
  }

  render() {
    return (
      <div>
        <ZingChart ref={React.createRef()} data={this.state.config} />
      </div>
    );
  }
}
export default LineChart;
