import React, { Component } from "react";
import compose from "recompose/compose";
import MUITable from "../../../shared/mui-datatable/container/mui-table";
import { withWidth, isWidthDown } from "@material-ui/core";
import { tableCustomizeToolBarSingleSelect } from "../../../constants/table-constants";
import Grid from "@material-ui/core/Grid";
import { loadLatestValueNoParameter, handleMindsphereError } from "../../../appservices/mindsphere-iotapi-services";
import { get } from "../../../middleware/axios-middleware";
import MobileView from "../../../shared/mobileview-table/mobileview-table";
import { ORDER_UNLOADING2_ASSETID } from "../../../constants/mindsphere-constants";
import { TOOMANYREQUESTS } from "../../../constants/app-constants";
import { sortByName } from "../../../appservices/app-services";

const columns = [
  { name: "name", label: "Trolley Number" },
  { name: "Data_Sales_Articel", label: "Sales Article No" },
  { name: "Data_Sales_Articel_Desc", label: "Sales Article Description" },
  { name: "Data_ColorCode_Desc", label: "Color Description" },  
  // { name: "Data_Pre_Treatment", label: "Pre Treatment" },
  { name: "Data_TotalAmountOfParts", label: "Qtys" },
  { name: "Data_TotalAmountOfTrolley", label: "Total Trolley" },
  { name: "Data_ColorCode", label: "Color Code" },  
  { name: "Data_ETA", label: "ETA" },  
  // { name: "Data_Unloading", label: "Data Unloading" },
  // { name: "FirstTrolleyNo", label: "FTA" },
  // { name: "Data_MaterialNumber", label: "Material Number" },
  // { name: "Data_Program", label: "Data Program" },
  // { name: "Data_SAP_TransactionKey", label: "SAP Transaction Key" },
];

class OrderUnloading2 extends Component {
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
      let trolleyName = 'Unloading_0' + i;
      let positionName = i < 9 ? 'Position 0' + (i + 1) : 'Position 10';
      loadLatestValueNoParameter(ORDER_UNLOADING2_ASSETID, trolleyName)
        .then((response) => {
          if (response && response.data  && response.data.length > 0) {
            // let aggreateData = response.data.aggregates.reduce((r, o) => (Object.entries(o).forEach(([k, v]) => r[k] = v['lastvalue']), r), {});
            let aggreateData = response.data[0];
            let name = { name: positionName };
            aggreateData = { ...name, ...aggreateData };

            if (masterData && masterData.data.data.data && masterData.data.data.data.length > 0) {
              if (aggreateData.Data_Sales_Articel) {
                let index = masterData.data.data.data.findIndex((x) => x.number === aggreateData.Data_Sales_Articel && x.type === 'Sales Articel');
  
                if (index > -1) {
                  aggreateData.Data_Sales_Articel_Desc = masterData.data.data.data[index].description || '';
                }
              }

              if (aggreateData.Data_Program) {
                let index = masterData.data.data.data.findIndex((x) => x.number === aggreateData.Data_Program && x.type === 'Program');
  
                if (index > -1) {
                  aggreateData.Data_Program = masterData.data.data.data[index].description;
                }
              }

              if (aggreateData.Data_ColorCode) {
                let index = masterData.data.data.data.findIndex((x) => x.number === aggreateData.Data_ColorCode && x.type === 'Color Code');
  
                if (index > -1) {
                  aggreateData.Data_ColorCode_Desc = masterData.data.data.data[index].description || '';
                }
              }
            }

            this.setState((state) => ({
              tableData: [ ...state.tableData, aggreateData ]
            }));  
          } else {
            let defaultData = {
              name: positionName,
              Data_Pre_Treatment: 0,
              Data_TotalAmountOfParts: 0,
              Data_TotalAmountOfTrolley: 0,
              Data_Unloading: 0,
              FirstTrolleyNo: 0,
              Data_Sales_Articel_Desc: '',
              Data_ColorCode_Desc: '',
              Data_ColorCode: 'N/A',
              Data_MaterialNumber: 'N/A',
              Data_Program: 'N/A',
              Data_Sales_Articel: 'N/A',
              Data_SAP_TransactionKey: 'N/A',
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
                title={"Order Unloading 2"}
                data={this.state.tableData.sort(sortByName)}
                nextData={this.getData}
                totalCount={this.state.totalCount}
              />
            ) : (
              /***
               * Desktop View
               * **/
              <MUITable
                title={"Order Unloading 2"}
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
)(OrderUnloading2);
