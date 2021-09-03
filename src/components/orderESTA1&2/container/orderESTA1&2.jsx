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
  { name: "UnLoading", label: "Unloading" },
  { name: "SalesArticle", label: "Sales Article" },  
  { name: "TransactionKey", label: "Trolley No" },  
  { name: "MaterialNumber", label: "Material No" },   
  { name: "TotalParts", label: "Total Parts" },
  { name: "TotalTrolleys", label: "Total Trolley" },
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

const columnsESTA2 = [
    { name: "UnLoading", label: "Unloading" },
    { name: "SalesArticle", label: "Sales Article" }, 
    { name: "TransactionKey", label: "Trolley No" },   
    { name: "MaterialNumber", label: "Material No" },    
    { name: "TotalParts", label: "Total Parts" },
    { name: "TotalTrolleys", label: "Total Trolley" },
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

class orderESTA1And2 extends Component {
  intervalID;
  constructor(props) {
    super(props);
    this.state = {
      tableDataESTA1: [],
      tableDataESTA2: [],
      totalCountESTA1: 0,
      totalCountESTA2: 0,
      loading: true,
      onProgress: false,
      trolleyNumberESTA1: 0,
      trolleyNumberESTA2: 0,     
      currentTime: ''
    };
  }

  async componentDidMount() {
    await this.getData();
    this.intervalID = setInterval(await this.getData, 60000);
    this.setState((state) => ({
      loading: false,
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
      tableDataESTA1: [],
      tableDataESTA2: [],
      currentTime: new Date().toLocaleString("en-GB", { year: "numeric", month: "short", day: "numeric" }) + ', '
       + new Date().toLocaleString("en-US", { hour12: true, hour: "numeric", minute: "numeric", second: "numeric" }) 
    }));  

    for (var i = 0; i < 2; i++) {        
      let assetId = i === 0 ? ORDER_ESTA1_ASSETID : ORDER_ESTA2_ASSETID;
      loadLatestValueNoParameter(assetId, 'TrolleyData')
      .then((response) => {
        if (response && response.data  && response.data.length > 0) {
          let aggreateData = response.data[0];   
          this.setState((state) => ({
            trolleyNumberESTA1: i === 0 ? aggreateData.CurrentTrolley : state.trolleyNumberESTA1,
            trolleyNumberESTA2: i === 1 ? aggreateData.CurrentTrolley : state.trolleyNumberESTA2,
          })); 
        }
      })
    }

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
              tableDataESTA1: [ ...state.tableDataESTA1, aggreateData ]
            }));  
          } else {
            let defaultData = {
              UnLoading: 0,
              Colorcode: 'N/A',
              MaterialNumber: 'N/A',
              PreTreatment: 'N/A',
              Program: 'N/A',
              SalesArticle: 'N/A',
              TransactionKey: '',
              TotalParts: 0,
              TotalTrolleys: 0,
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
              tableDataESTA2: [ ...state.tableDataESTA2, aggreateData ]
            }));  
          } else {
            let defaultData = {
              UnLoading: 0,
              Colorcode: 'N/A',
              MaterialNumber: 'N/A',
              PreTreatment: 'N/A',
              Program: 'N/A',
              SalesArticle: 'N/A',
              TransactionKey: '',
              TotalParts: 0,
              TotalTrolleys: 0,
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
      <div>
        <div style={{display: 'grid', padding: '0'}}>
          <h3 style={{textAlign: 'right', paddingRight: '10px'}}>{this.state.currentTime}</h3>
        </div>
        <h2 style={{float: 'left', paddingLeft: '10px'}}>Current Trolley No: {this.state.trolleyNumberESTA1}</h2>
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

          <div style={{width: '100%'}}>
            <h2 style={{float: 'left', paddingLeft: '10px'}}>Current Trolley No: {this.state.trolleyNumberESTA2}</h2>
          </div>
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
      </div>
    );
  }
}

export default compose(
  withWidth(),
)(orderESTA1And2);
