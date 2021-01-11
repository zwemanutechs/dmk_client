import React, { Component, createRef } from "react";
import "zingchart/es6";
import ZingChart from "zingchart-react";
import styled from "styled-components";

import Dialogs from "../dialogs";
import { COLOR } from "../../../components/home/container/home.jsx--";

class ArcGauge extends Component {
  constructor(props) {
    super(props);
    const { data } = this.props;
    // const currentVal = data ? data.currentVal : 0;
    // console.log(data.title === "Gauge 1 Test" ? data.currentVal : "");

    this.state = {
      config: {
        type: "gauge",
        globals: {
          fontSize: 12,
        },
        plotarea: {
          margin: 0,
          marginTop: 35,
        },
        plot: {
          size: "100%",
          valueBox: {
            placement: "center",
            text: "%v", //default
            fontSize: 20,
            rules: [
              {
                rule: "%v < 40",
                text: `<div style="color:${COLOR.grey}">%v</div><br><div style="font-size:10px;color:${COLOR.blue}">atm</div>`,
              },
              {
                rule: "%v >= 40 && %v < 80",
                text: `<div style="color:${COLOR.blue}">%v</div><br><div style="font-size:10px;color:${COLOR.blue}">atm</div>`,
              },
              {
                rule: "%v >= 80",
                text: `<div style="color:${COLOR.red}">%v</div><br><div style="font-size:10px;color:${COLOR.blue}">atm</div>`,
              },
            ],
          },
        },
        tooltip: {
          borderRadius: 5,
        },
        scaleR: {
          aperture: 180,
          minValue: 0,
          maxValue: 120,
          step: 40,
          center: {
            visible: false,
          },
          tick: {
            visible: false,
          },
          item: {
            offsetR: 0,
            rules: [
              {
                rule: "%i == 9",
                offsetX: 15,
              },
            ],
          },
          labels: ["", "", "", ""],
          ring: {
            size: 10,
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
        },
        // refresh: {
        //   type: "feed",
        //   transport: "js",
        //   url: "feed()",
        //   interval: 1500,
        //   resetTimeout: 1000,
        // },
        series: [
          {
            values: [data && data.currentVal], // starting value
            backgroundColor: "black",
            indicator: [5, 5, 10, 10, 0.81],
            animation: {
              effect: 2,
              method: 5,
              sequence: 4,
              speed: 300,
            },
          },
        ],
      },
      showDialogChart: false,
    };
    this.chart = createRef();
  }

  static getDerivedStateFromProps(prevProps) {
    // console.log(
    //   prevProps.data.title === "Gauge 1 Test" ? prevProps.data.currentVal : ""
    // );
    // console.log(prevProps);

    return {
      config: {
        type: "gauge",
        globals: {
          fontSize: 12,
        },
        plotarea: {
          margin: 0,
          marginTop: 35,
        },
        plot: {
          size: "100%",
          valueBox: {
            placement: "center",
            text: "%v", //default
            fontSize: 20,
            rules: [
              {
                rule: "%v < 40",
                text: `<div style="color:${COLOR.grey}">%v</div><br><div style="font-size:10px;color:${COLOR.blue}">atm</div>`,
              },
              {
                rule: "%v >= 40 && %v < 80",
                text: `<div style="color:${COLOR.blue}">%v</div><br><div style="font-size:10px;color:${COLOR.blue}">atm</div>`,
              },
              {
                rule: "%v >= 80",
                text: `<div style="color:${COLOR.red}">%v</div><br><div style="font-size:10px;color:${COLOR.blue}">atm</div>`,
              },
            ],
          },
        },
        tooltip: {
          borderRadius: 5,
        },
        scaleR: {
          aperture: 180,
          minValue: 0,
          maxValue: 120,
          step: 40,
          center: {
            visible: false,
          },
          tick: {
            visible: false,
          },
          item: {
            offsetR: 0,
            rules: [
              {
                rule: "%i == 9",
                offsetX: 15,
              },
            ],
          },
          labels: ["", "", "", ""],
          ring: {
            size: 10,
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
        },
        // refresh: {
        //   type: "feed",
        //   transport: "js",
        //   url: "feed()",
        //   interval: 1500,
        //   resetTimeout: 1000,
        // },
        series: [
          {
            values: [prevProps.data.currentVal], // starting value
            backgroundColor: "black",
            indicator: [5, 5, 10, 10, 0.81],
            animation: {
              effect: 2,
              method: 5,
              sequence: 4,
              speed: 300,
            },
          },
        ],
      },
    };
  }

  render() {
    const { border, data, fetchGraphAPI, graphState } = this.props;
    const { showDialogChart } = this.state;

    return (
      <>
        <GaugeWrapper
          border={border}
          onClick={() => {
            if (fetchGraphAPI) fetchGraphAPI(1, data);
            this.setState({ showDialogChart: !showDialogChart });
          }}
        >
          <div
            style={{
              color: "#0F3790",
              width: "100%",
              fontWeight: "800",
              padding: "0 2px 0 2px",
            }}
          >
            <span
              style={{
                float: "left",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                // width: "55px",
              }}
            >
              {data && data.title}
            </span>
            <span
              style={{
                float: "right",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                width: "53px",
              }}
            >
              {data && data.title2}
            </span>
          </div>
          <ZingChart ref={this.chart} data={this.state.config} height="150" />
        </GaugeWrapper>
        <Dialogs
          data={graphState}
          // data={[12, 19, 3, 5, 2, 3, 12, 19, 3, 5, 2, 3, 12, 19, 3, 5, 2, 3]}
          showDialogChart={showDialogChart}
          onClose={(showDialogChart) => this.setState({ showDialogChart })}
          fetchGraphAPI={fetchGraphAPI}
          tilesDetails={data}
        />
      </>
    );
  }
}
export default ArcGauge;

const GaugeWrapper = styled.div`
  border: ${({ border }) => (border ? "1px solid #0f3790" : "none")};
`;
