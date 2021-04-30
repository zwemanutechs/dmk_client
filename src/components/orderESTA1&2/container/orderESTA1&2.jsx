import React, { Component } from "react";
import compose from "recompose/compose";
import MUITable from "../../../shared/mui-datatable/container/mui-table";
import { withWidth, isWidthDown } from "@material-ui/core";
import { tableCustomizeToolBarSingleSelect } from "../../../constants/table-constants";
import Grid from "@material-ui/core/Grid";
import {loadLatestValueNoParameter, handleMindsphereError } from "../../../appservices/mindsphere-iotapi-services";
import { get } from "../../../middleware/axios-middleware";
import MobileView from "../../../shared/mobileview-table/mobileview-table";
import { ORDER_ESTA1_ASSETID, ORDER_ESTA2_ASSETID } from "../../../constants/mindsphere-constants";
import { TOOMANYREQUESTS } from "../../../constants/app-constants";
import { sortByName } from "../../../appservices/app-services";

const columnsESTA1 = [
  { name: "name", label: "Trolley Number" }, 
  { name: "BarcodeData_MaterialNumber", label: "Part No" },     
  { name: "BarcodeData_Program_Desc", label: "Description" },   
  { name: "BarcodeData_Unloading", label: "Unloading" },
  { name: "BarcodeData_TotalAmountOfParts", label: "Part Qtys" },
  { name: "BarcodeData_TotalAmountOfTrolley", label: "Total Trolley" },
  { name: "BarcodeData_ColorCode", label: "Color Code" }, 
  { name: "BarcodeData_Program", label: "QR Program" },    
];

const columnsESTA2 = [
    { name: "name", label: "Trolley Number" }, 
    { name: "BarcodeData_MaterialNumber", label: "Part No" },     
    { name: "BarcodeData_Program_Desc", label: "Description" },   
    { name: "BarcodeData_Unloading", label: "Unloading" },
    { name: "BarcodeData_TotalAmountOfParts", label: "Part Qtys" },
    { name: "BarcodeData_TotalAmountOfTrolley", label: "Total Trolley" },
    { name: "BarcodeData_ColorCode", label: "Color Code" }, 
    { name: "BarcodeData_Program", label: "QR Program" },    
  ];

class orderESTA1And2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableDataESTA1: [],
      tableDataESTA2: [],
      totalCountESTA1: 0,
      totalCountESTA2: 0,
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

    for (var i = 0; i < 4; i++) {
      let trolleyName = 'Trolley_0' + i;
      let positionName = i < 9 ? 'Position 0' + (i + 1) : 'Position 10';
      await loadLatestValueNoParameter(ORDER_ESTA1_ASSETID, trolleyName)
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
              tableDataESTA1: [ ...state.tableDataESTA1, aggreateData ]
            }));  
          } else {
            let defaultData = {
              name: positionName,
              BarcodeData_ColorCode: 'N/A',
              BarcodeData_MaterialNumber: 'N/A',
              BarcodeData_Program_Desc: '',
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
              tableDataESTA1: [ ...state.tableDataESTA1, defaultData ]
            }));  
          }
        })
        .catch((error) => {
          handleMindsphereError(TOOMANYREQUESTS);
        }); 
        
        await loadLatestValueNoParameter(ORDER_ESTA2_ASSETID, trolleyName)
        .then((response) => {
          if (response && response.data  && response.data.length > 0) {
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
              tableDataESTA2: [ ...state.tableDataESTA2, aggreateData ]
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
              BarcodeData_Program_Desc: '',
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
              tableDataESTA2: [ ...state.tableDataESTA2, defaultData ]
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
      <Grid container direction="row" justify="center" spacing={2}>
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
                columns={columnsESTA1}
                title={"ESTA Booth 1"}
                data={this.state.tableDataESTA1.sort(sortByName)}
                nextData={this.getData}
                totalCountESTA1={this.state.totalCountESTA1}
              />
            ) : (
              /***
               * Desktop View
               * **/
              <MUITable
                title={"ESTA Booth 1"}
                totalCountESTA1={this.state.totalCountESTA1}
                data={this.state.tableDataESTA1.sort(sortByName)}
                columns={columnsESTA1}
                accessRight={{ Create: false, Update: false, Delete: false }}
                options={tableCustomizeToolBarSingleSelect}
                loading={this.state.loading}
              />
            )
          }
        </Grid>

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
                columns={columnsESTA2}
                title={"ESTA Booth 2"}
                data={this.state.tableDataESTA2.sort(sortByName)}
                nextData={this.getData}
                totalCountESTA1={this.state.totalCountESTA2}
              />
            ) : (
              /***
               * Desktop View
               * **/
              <MUITable
                title={"ESTA Booth 2"}
                totalCountESTA1={this.state.totalCountESTA2}
                data={this.state.tableDataESTA2.sort(sortByName)}
                columns={columnsESTA2}
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
)(orderESTA1And2);
