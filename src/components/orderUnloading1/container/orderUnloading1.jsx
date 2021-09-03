import React, { Component } from "react";
import compose from "recompose/compose";
import MUITable from "../../../shared/mui-datatable/container/mui-table";
import { withWidth, isWidthDown } from "@material-ui/core";
import { tableCustomizeToolBarSingleSelect } from "../../../constants/table-constants";
import Grid from "@material-ui/core/Grid";
import { loadLatestValueNoParameter, handleMindsphereError } from "../../../appservices/mindsphere-iotapi-services";
import MobileView from "../../../shared/mobileview-table/mobileview-table";
import { get } from "../../../middleware/axios-middleware";
import { ORDER_UNLOADING1_ASSETID, TIMEZONE } from "../../../constants/mindsphere-constants";
import { TOOMANYREQUESTS } from "../../../constants/app-constants";
import { sortByName } from "../../../appservices/app-services";

const columns = [
  { name: "OrderIndex", label: "Order Index" },
  { name: "SalesArticle", label: "Sales Article" },
  { name: "MaterialNumber", label: "Material No" },
  { name: "ColorCode", label: "Color Code" },  
  { name: "PartTotal", label: "Total Parts" },
  { name: "PartRemaining", label: "Remaining Parts" },
  { name: "TrolleyTotal", label: "Total Trolleys" },
  { name: "TroleyRemaining", label: "Remaining Trolleys" },
  { name: "ETA", label: "ETA" },  
];

class OrderUnloading1 extends Component {
  intervalID;
  constructor(props) {
    super(props);
    this.state = {
      tableData: [],
      totalCount: 0,
      loading: true,
      onProgress: false,
      trolleyNumber: '',
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
    
    loadLatestValueNoParameter(ORDER_UNLOADING1_ASSETID, 'TrolleyData')
      .then((response) => {
        if (response && response.data  && response.data.length > 0) {
          let aggreateData = response.data[0];   
          this.setState((state) => ({
            trolleyNumber: aggreateData.CurrentTrolley,
          })); 
        }
      })

    for (var i = 0; i < 8; i++) {
      let trolleyName = 'Trolley_0' + i;
      let positionName = i < 9 ? 'Position 0' + (i + 1) : 'Position 10';
      loadLatestValueNoParameter(ORDER_UNLOADING1_ASSETID, trolleyName)
        .then((response) => {
          if (response && response.data  && response.data.length > 0) {
            // let aggreateData = response.data.aggregates.reduce((r, o) => (Object.entries(o).forEach(([k, v]) => r[k] = v['lastvalue']), r), {});
            let aggreateData = response.data[0];
            let name = { name: positionName };
            aggreateData = { ...name, ...aggreateData };
            
            aggreateData.ETA = aggreateData.ETA && aggreateData.ETA !== '' ? new Date(aggreateData.ETA.toString()).toLocaleString("en-US", { timeZone: TIMEZONE, hour12: true, hour: "numeric", minute: "numeric", second: "numeric"}) : '';

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
                  aggreateData.SalesArticle = masterData.data.data.data[index].description || '';
                }
              }

              if (aggreateData.ColorCode) {
                let index = masterData.data.data.data.findIndex((x) => x.number === aggreateData.ColorCode && x.type === 'Color Code');
  
                if (index > -1) {
                  aggreateData.ColorCode = masterData.data.data.data[index].description || '';
                }
              }
            }
            
            this.setState((state) => ({
              tableData: [ ...state.tableData, aggreateData ]
            }));  
          } else {
            let defaultData = {
              OrderIndex: 0,
              TrolleyTotal: 0,
              TroleyRemaining: 0,
              PartTotal: 0,
              PartRemaining: 0,
              SalesArticle: 0,
              MaterialNumber: 0,
              ColorCode: 0,
              ETA: ''
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
      <div>
        <div style={{display: 'grid', padding: '0'}}>
          <h3 style={{textAlign: 'right', paddingRight: '10px'}}>{this.state.currentTime}</h3>
        </div>
        <h2 style={{float: 'left', paddingLeft: '10px'}}>Current Trolley No: {this.state.trolleyNumber}</h2>
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
                  title={"Order Unloading 1"}
                  data={this.state.tableData.sort(sortByName)}
                  nextData={this.getData}
                  totalCount={this.state.totalCount}
                />
              ) : (
                /***
                 * Desktop View
                 * **/
                <MUITable
                  title={"Order Unloading 1"}
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
      </div>
    );
  }
}

export default compose(
  withWidth(),
)(OrderUnloading1);
