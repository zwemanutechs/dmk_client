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
  { name: "UnLoading", label: "Unloading" },
  { name: "SalesArticle", label: "Sales Article" },    
  { name: "TransactionKey", label: "Transaction Key" },   
  { name: "MaterialNumber", label: "Material No" },  
  { name: "TotalParts", label: "Total Parts" },
  { name: "TotalTrolleys", label: "Total Trolleys" },
  { name: "Colorcode", label: "Color Code" },  
  { name: "Program", label: "QR Program" },      
  { name: "PreTreatment", label: "Pre-Treatment", 
    options: {
      filter: false,
      customBodyRender: (value, tableMeta, updateValue) => (
        <span>{value === 1 ? "Yes" : value < 1 || value > 32000 ? "No" : 'N/A'}</span>
      ),
    }, 
  }, 
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
      currentTime: ''
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
      tableData: [],
      currentTime: new Date().toLocaleString("en-GB", { year: "numeric", month: "short", day: "numeric" }) + ', '
       + new Date().toLocaleString("en-US", { hour12: true, hour: "numeric", minute: "numeric", second: "numeric" }) 
    }));  
    
    loadLatestValueNoParameter(ORDER_LOADING_ASSETID, 'TrolleyData')
      .then((response) => {
        if (response && response.data  && response.data.length > 0) {
          let aggreateData = response.data[0];   
          this.setState((state) => ({
            trolleyNumber: aggreateData.CurrentTrolley,
            counterTrolley: aggreateData.RestTrolley
          })); 
        }
      })

    for (var i = 0; i < 8; i++) {
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
              
              if (aggreateData.MaterialNumber) {
                let index = masterData.data.data.data.findIndex((x) => x.number === aggreateData.MaterialNumber && x.type === 'Material No');
  
                if (index > -1) {
                  aggreateData.MaterialNumber = masterData.data.data.data[index].description || '';
                }
              }

              if (aggreateData.SalesArticle) {
                let index = masterData.data.data.data.findIndex((x) => x.number === aggreateData.SalesArticle && x.type === 'Sales Articel');
  
                if (index > -1) {
                  aggreateData.SalesArticle = masterData.data.data.data[index].description;
                }
              }

              if (aggreateData.Program) {
                aggreateData.Program = aggreateData.Program.substring(0,2) === '00' ? '00' : aggreateData.Program;
                let index = masterData.data.data.data.findIndex((x) => x.number === aggreateData.Program && x.type === 'Program');
  
                if (index > -1) {
                  aggreateData.Program = masterData.data.data.data[index].description;
                }
              }

              if (aggreateData.Colorcode) {
                let index = masterData.data.data.data.findIndex((x) => x.number === aggreateData.Colorcode && x.type === 'Color Code');
  
                if (index > -1) {
                  aggreateData.Colorcode = masterData.data.data.data[index].description;
                }
              }
            }

            this.setState((state) => ({
              tableData: [ ...state.tableData, aggreateData ]
            }));  
          } else {
            let defaultData = {
              name: positionName,
              TransactionKey: '',
              Colorcode: '',
              MaterialNumber: '',
              PreTreatment: '',
              Program: '',
              SalesArticle: '',
              TotalParts: '',
              TotalTrolleys: '',
              UnLoading: ''
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
        <div style={{display: 'grid', padding: '0'}}>
          <h3 style={{textAlign: 'right', paddingRight: '10px'}}>{this.state.currentTime}</h3>
        </div>
        <div>
          <h2 style={{float: 'left', paddingLeft: '10px'}}>Current Trolley No: {this.state.trolleyNumber}</h2>
          <h2 style={{float: 'right', paddingRight: '100px'}}>Counter Rest Trolleys: {this.state.counterTrolley}</h2>
        </div>
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
