import React, { Component } from "react";
import compose from "recompose/compose";
import MUITable from "../../../shared/mui-datatable/container/mui-table";
import { withWidth, isWidthDown } from "@material-ui/core";
import { tableCustomizeToolBarSingleSelect } from "../../../constants/table-constants";
import Grid from "@material-ui/core/Grid";
import { loadLatestValueNoParameter, handleMindsphereError } from "../../../appservices/mindsphere-iotapi-services";
import { get } from "../../../middleware/axios-middleware";
import MobileView from "../../../shared/mobileview-table/mobileview-table";
import { ORDER_LOADING_ASSETID } from "../../../constants/mindsphere-constants";
import { TOOMANYREQUESTS } from "../../../constants/app-constants";
import { sortByName } from "../../../appservices/app-services";

const columns = [
  // { name: "name", label: "Trolley Number" },
  // { name: "TrolleyNoInOrder", label: "Trolley Number" },  
  { name: "BarcodeData_Unloading", label: "Unloading" },
  { name: "BarcodeData_Sales_Articel", label: "Sales Article" },    
  { name: "BarcodeData_MaterialNumber", label: "Material No" },  
  // { name: "BarcodeData_Program_Desc", label: "Description" }, 
  { name: "BarcodeData_TotalAmountOfParts", label: "Total Parts" },
  { name: "BarcodeData_TotalAmountOfTrolley", label: "Total Trolley" },
  { name: "BarcodeData_ColorCode", label: "Color Code" },  
  { name: "BarcodeData_Program", label: "QR Program" },      
  { name: "BarcodeData_Pre_Treatment", label: "Pre-Treatment", 
    options: {
      filter: false,
      customBodyRender: (value, tableMeta, updateValue) => (
        <span>{value === 1 ? "Yes" : value === 2 ? "No" : 'N/A'}</span>
      ),
    }, 
  },  

  // { name: "BarcodeData_Sales_Articel", label: "Sales Articel" },    
  // { name: "BarcodeData_SAP_TransactionKey", label: "SAP Transaction Key" },  
  // { name: "EstimatedArrivalTime", label: "Estimated Arrival Time" },
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
  // { name: "TimestampAtLastReadingStation", label: "Timestamp At Last Reading Station" },
  // { name: "TimestampLoading", label: "Timestamp Loading" },
  // { name: "TrolleyNoInOrder", label: "Trolley No In Order" }
];

class OrderLoading extends Component {
  intervalID;
  constructor(props) {
    super(props);
    this.state = {
      tableData: [],
      filteredData: [],
      totalCount: 10,
      page: 0,
      loading: true,
      onProgress: false,
      trolleyNumber: '',
      counterTrolley: '',
    };
  }

  async componentDidMount() {    
    await this.getData();
    this.intervalID = setInterval(await this.getData, 60000);
    this.setState((state) => ({
      loading: false,
      filteredData: [ state.tableData ]
    })); 
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  /***
   * Fetch the Data
   * **/
  getData = async () => {       
    const masterData = await get(
      `masterdata?pageNo=${0}&pageSize=${10}`
    );
 
    this.setState((state) => ({
      tableData: []
    }));  

    for (var i = 0; i < 10; i++) {
      let trolleyName = 'Trolley_0' + i;
      let positionName = i < 9 ? 'Position 0' + (i + 1) : 'Position 10';
      loadLatestValueNoParameter(ORDER_LOADING_ASSETID, trolleyName)
        .then((response) => {
          if (response && response.data  && response.data.length > 0) {
            // let aggreateData = response.data.aggregates.reduce((r, o) => (Object.entries(o).forEach(([k, v]) => r[k] = v['lastvalue']), r), {});
            let aggreateData = response.data[0];
            let name = { name: positionName };
            aggreateData = { ...name, ...aggreateData };

            if (masterData && masterData.data.data.data && masterData.data.data.data.length > 0) {
              
              if (aggreateData.BarcodeData_MaterialNumber) {
                let index = masterData.data.data.data.findIndex((x) => x.number === aggreateData.BarcodeData_MaterialNumber && x.type === 'Material No');
  
                if (index > -1) {
                  aggreateData.BarcodeData_MaterialNumber = masterData.data.data.data[index].description || '';
                }
              }

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
              tableData: [ ...state.tableData, defaultData ]
            }));  
          }
        })
        .catch((error) => {
            handleMindsphereError(TOOMANYREQUESTS);
          });
      }
  };
  

  changePage = async page => {
    this.setState((state) => ({
      loading: true,
    })); 
    await this.getData(page);
    this.setState((state) => ({
      loading: false,
      page, 
      filteredData: [ state.tableData ]
    })); 
  };

  consolidatedFilters(passedArray, passedFilter) {
    var filteredArray = passedArray.filter(
    function(el) {
        var languagesThis = el[1];
        for (var i = 0; i < passedFilter.length; i++) {
            if (languagesThis.indexOf(passedFilter[i]) != -1) {
                return true;
            }
        }
        return false;
    }
    );     
    return filteredArray;
}

  updateFilter = filterList => {
    let newArray = this.state.filteredData;//.map(a => Object.assign({}, a));
    newArray = newArray.filter(function(item) {
      return !filterList.includes(item); 
    })
    this.setState((state) => ({
      tableData: newArray
    })); 
  };

  render() {
    const { page } = this.state;
    const options = {
      serverSide: true,
      filter: true,
      selectableRows: "none",
      filterType: "dropdown",
      responsive: "vertical",
      rowsPerPage: 5,
      rowsPerPageOptions: [5],
      download: true,
      print: true,
      count: 10, 
      page,
      onTableChange: (action, tableState) => {
        console.log("action", action);
        console.log("tableState", tableState);
        if (action === "changePage") {
          console.log("Go to page", tableState.page);
          this.changePage(tableState.page);
        }
        if (action === "filterChange") {
          this.updateFilter(tableState.filterList);
        }
      }
    };

    return (
      <div>
        <h2 style={{float: 'left', paddingLeft: '10px'}}>Current Trolley No: {this.state.trolleyNumber}</h2>
        <h2 style={{float: 'right', paddingRight: '100px'}}>Current Rest Trolleys: {this.state.counterTrolley}</h2>
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
                  title={"Order Loading"}
                  data={this.state.tableData.sort(sortByName)}
                  nextData={this.getData}
                  // totalCount={this.state.totalCount}
                />
              ) : (
                /***
                 * Desktop View
                 * **/
                <MUITable
                  title={"Order Loading"}
                  // totalCount={this.state.totalCount}
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
      </div>
    );
  }
}

export default compose(
  withWidth(),
)(OrderLoading);
