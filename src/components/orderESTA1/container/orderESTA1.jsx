import React, { Component } from "react";
import compose from "recompose/compose";
import MUITable from "../../../shared/mui-datatable/container/mui-table";
import { withWidth, isWidthDown } from "@material-ui/core";
import { tableCustomizeToolBarSingleSelect } from "../../../constants/table-constants";
import Grid from "@material-ui/core/Grid";
import {loadLatestValueNoParameter, handleMindsphereError } from "../../../appservices/mindsphere-iotapi-services";
import { get } from "../../../middleware/axios-middleware";
import MobileView from "../../../shared/mobileview-table/mobileview-table";
import { ORDER_ESTA1_ASSETID } from "../../../constants/mindsphere-constants";
import { TOOMANYREQUESTS } from "../../../constants/app-constants";
import { sortByName } from "../../../appservices/app-services";

const columns = [
  { name: "name", label: "Name" },
  { name: "BarcodeData_ColorCode", label: "Color Code" },  
  { name: "BarcodeData_MaterialNumber", label: "Material Number" },  
  { name: "BarcodeData_Pre_Treatment", label: "Pre Treatment" },    
  { name: "BarcodeData_Program", label: "Program" },    
  { name: "BarcodeData_Sales_Articel", label: "Sales Articel" },    
  // { name: "BarcodeData_SAP_TransactionKey", label: "SAP Transaction Key" },  
  { name: "BarcodeData_TotalAmountOfParts", label: "Total Amount Of Parts" },
  { name: "BarcodeData_TotalAmountOfTrolley", label: "Total Amount Of Trolley" },
  { name: "BarcodeData_Unloading", label: "Unloading" },
  { name: "EstimatedArrivalTime", label: "Estimated Arrival Time" },
  // { name: "LastReadingStation", label: "Last Reading Station" },
  // { name: "OrderIndexInQueue", label: "Order Index In Queue" },
  // { name: "RoundsLifetime", label: "Rounds Lifetime" },
  // { name: "RoundsTillLastMaintenance", label: "Rounds Till Last Maintenance" },
  // { name: "State_gap_request_after_trolley", label: "Request After Trolley" },
  // { name: "State_gap_request_before_trolley", label: "Request Before Trolley" },
  // { name: "State_goto_maintanceare", label: "Maintanceare",
  //   options: {
  //     filter: false,
  //     customBodyRender: (value, tableMeta, updateValue) => (
  //       <span>{value ? "Yes" : "No"}</span>
  //     ),
  //   }, 
  // },
  // { name: "State_RequestColorChange", label: "Request Color Change",
  //   options: {
  //     filter: false,
  //     customBodyRender: (value, tableMeta, updateValue) => (
  //       <span>{value ? "Yes" : "No"}</span>
  //     ),
  //   }, 
  // },  
  { name: "TimestampAtLastReadingStation", label: "Timestamp At Last Reading Station" },
  { name: "TimestampLoading", label: "Timestamp Loading" },
  { name: "TrolleyNoInOrder", label: "Trolley No In Order" }
];

class orderESTA1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: [],
      totalCount: 0,
      loading: true,
      onProgress: false,
    };
  }

  async componentDidMount() {
    let from = new Date();
    let fromTo = new Date(from.setDate(from.getDate() - 1));
    let to = new Date();
    await this.getData(fromTo, to);
    this.setState((state) => ({
      loading: false,
    })); 
  }

  /***
   * Fetch the Data
   * **/
  getData = async (from, to) => {         
    const masterData = await get(
      `masterdata?pageNo=${0}&pageSize=${10}`
    );

    for (var i = 0; i < 10; i++) {
      let trolleyName = 'Trolley_0' + i;
      let positionName = i < 9 ? 'Position 0' + (i + 1) : 'Position 10';
      loadLatestValueNoParameter(ORDER_ESTA1_ASSETID, trolleyName)
        .then((response) => {
          if (response && response.data  && response.data.length > 0) {
            // let aggreateData = response.data.aggregates.reduce((r, o) => (Object.entries(o).forEach(([k, v]) => r[k] = v['lastvalue']), r), {});
            let aggreateData = response.data[0];
            let name = { name: positionName };
            aggreateData = { ...name, ...aggreateData };            

            if (masterData && masterData.data.data.data && masterData.data.data.data.length > 0) {
              if (aggreateData.BarcodeData_Sales_Articel) {
                let index = masterData.data.data.data.findIndex((x) => x.number === aggreateData.BarcodeData_Sales_Articel && x.type === 'Sales Articel');
  
                if (index > -1) {
                  aggreateData.BarcodeData_Sales_Articel = masterData.data.data.data[index].description;
                }
              }

              if (aggreateData.BarcodeData_Program) {
                let index = masterData.data.data.data.findIndex((x) => x.number === aggreateData.BarcodeData_Program && x.type === 'Program');
  
                if (index > -1) {
                  aggreateData.BarcodeData_Program = masterData.data.data.data[index].description;
                }
              }

              if (aggreateData.BarcodeData_ColorCode) {
                let index = masterData.data.data.data.findIndex((x) => x.number === aggreateData.BarcodeData_ColorCode && x.type === 'Color Code');
  
                if (index > -1) {
                  aggreateData.BarcodeData_ColorCode = masterData.data.data.data[index].description;
                }
              }
            }

            this.setState((state) => ({
              tableData: [ ...state.tableData, aggreateData ]
            }));  
          } else {
            let defaultData = {
              name: positionName,
              BarcodeData_ColorCode: 'N/A',
              BarcodeData_MaterialNumber: 'N/A',
              BarcodeData_Pre_Treatment: 0,
              BarcodeData_Program: 'N/A',
              BarcodeData_Sales_Articel: 'N/A',
              BarcodeData_SAP_TransactionKey: 'N/A',
              BarcodeData_TotalAmountOfParts: 0,
              BarcodeData_TotalAmountOfTrolley: 0,
              BarcodeData_Unloading: 0,
              EstimatedArrivalTime: 'N/A',
              LastReadingStation: 0,
              OrderIndexInQueue: 0,
              RoundsLifetime: 0,
              RoundsTillLastMaintenance: 0,
              State_gap_request_after_trolley: 0,
              State_gap_request_before_trolley: 0,
              State_goto_maintanceare: 0,
              State_RequestColorChange: 0,
              TimestampAtLastReadingStation: 'N/A',
              TimestampLoading: 'N/A',
              TrolleyNoInOrder: 0
            }          
            this.setState((state) => ({
              tableData: [ ...state.tableData, defaultData ]
            }));  
          }
        })
        .catch((error) => {
          handleMindsphereError(TOOMANYREQUESTS);
        });      
      }
  };

  render() {
    return (
      <Grid container direction="row" justify="center">
        <Grid item xs={12}>
          {
            /***
             * ** Render according to device break point
             *  'SM' and down for Mobile View
             *  'MD' and up for Desktop view
             * ***/
            isWidthDown("xs", this.props.width) ? (
              /***
               * Mobile View
               * **/
              <MobileView
                columns={columns}
                title={"ESTA Booth 1"}
                data={this.state.tableData.sort(sortByName)}
                nextData={this.getData}
                totalCount={this.state.totalCount}
              />
            ) : (
              /***
               * Desktop View
               * **/
              <MUITable
                title={"ESTA Booth 1"}
                totalCount={this.state.totalCount}
                data={this.state.tableData.sort(sortByName)}
                columns={columns}
                accessRight={{ Create: false, Update: false, Delete: false }}
                options={tableCustomizeToolBarSingleSelect}
                loading={this.state.loading}
              />
            )
          }
        </Grid>
      </Grid>
    );
  }
}

export default compose(
  withWidth(),
)(orderESTA1);
