import React, {Component, PureComponent, useState, useEffect} from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import NotificationCard from "../../../shared/notification-card/container/notificationCard";
import {withStyles} from "@material-ui/core/styles";
import { withWidth, isWidthDown } from "@material-ui/core";
import {
  openSnack,
  closeSnack,
} from "../../../shared/snackbar/actions/snackbar-actions";
import { openSpinner } from "../../../shared/spinner/actions/spinner-actions";
import { connect } from "react-redux";
import MUITable from "../../../shared/mui-datatable/container/mui-table";
import MobileView from "../../../shared/mobileview-table/mobileview-table";
import { MDUP } from "../../../constants/app-constants";
import { sortByUpdatedAt } from "../../../appservices/app-services";
import { loadEventData } from "../../../appservices/mindsphere-iotapi-services";
import { tableCustomizeToolBarSingleSelect } from "../../../constants/table-constants";
import MaxWidthDialog from "../../../shared/mat-diaglog/container/mat-dialog";
import NotificationAddOrEdit from "./notification-addOrEdit";
import {
  openDialog,
  closeDialog,
} from "../../../shared/mat-diaglog/actions/maxDialog-action";
import compose from "recompose/compose";
import {
  get,
  post,
  put,
  deleteRange,
} from "../../../middleware/axios-middleware";
import { notificationModel } from "../model/model";
import { TextField, FormLabel, FormGroup, RadioGroup, Radio, FormControlLabel, Checkbox } from "@material-ui/core";
import axios from "axios";

const useStyles = theme => ({
});

const columns = [
    { 
      label: "Message", 
      name: "message",
          
      options: {
        filter: true,
        filterType: "custom",
        filterList: [],
        customFilterListOptions: {
          render: value => {
            if (value[0] && value[1] && value[2]) {
              return `Asset: Oven, Paint Booth, Power Wash`;
            } else if (value[0] && value[1]) {
              return `Asset: Oven, Paint Booth`;
            } else if (value[0] && value[2]) {
              return `Asset: Oven, Power Wash`;
            }else if (value[1] && value[2]) {
              return `Asset: Paint Booth, Power Wash`;
            }else if (value[0]) {
              return `Asset: Oven`;
            }else if (value[1]) {
              return `Asset: Paint Booth`;
            }else if (value[2]) {
              return `Asset: Power Wash`;
            }
            return [];
          },
          update: (filterList, filterPos, index) => {
            if (filterPos === 0) {
              filterList[index].splice(filterPos, 1, "");
            } else if (filterPos === 1) {
              filterList[index].splice(filterPos, 1);
            } else if (filterPos === 2) {
              filterList[index].splice(filterPos, 2);
            } else if (filterPos === -1) {
              filterList[index] = [];
            }

            return filterList;
          }
        },
        filterOptions: {
          names: [],
          logic(value, filters) {
            const oven = filters[0];
            const paintBooth = filters[1];
            const powerWash = filters[2];
            let ovenList = ['Dryer', 'Oven']
            let paintBoothList = ['Cabinet', 'Primer', 'Coat', 'Paint', 'Esta']
            let powerWashList = ['Rinse', 'DI', 'Passivation', 'Degreasing', 'Neutralization', 'Conversion', 'Distilled', 'Sodium', 'Sulphuric']

            if (oven && paintBooth && powerWash) {
              return !value;
            } else if (oven && paintBooth) {
              return ![...ovenList, ...paintBoothList].some(e => value.includes(e));
            } else if (oven && powerWash) {
              return ![...ovenList, ...powerWashList].some(e => value.includes(e));
            }else if (paintBooth && powerWash) {
              return ![...paintBoothList, ...powerWashList].some(e => value.includes(e));
            }else if (oven) {
              return !ovenList.some(e => value.includes(e));
            }else if (paintBooth) {
              return !paintBoothList.some(e => value.includes(e));
            }else if (powerWash) {
              return !powerWashList.some(e => value.includes(e));
            }
            return false;
          },
          display: (filterList, onChange, index, column) => (
            <div>
              <FormLabel>Asset</FormLabel>              
              <FormGroup row>
                <FormControlLabel
                  control={
                    <Checkbox
                    checked={filterList[index][0] || false}
                    onChange={event => {
                      filterList[index][0] = event.target.checked;
                      onChange(filterList[index], index, column);
                    }}
                    name="Oven"
                    color="primary"
                    />
                  }
                  label="Oven"
                />                
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={filterList[index][1] || false}
                      onChange={event => {
                        filterList[index][1] = event.target.checked;
                        onChange(filterList[index], index, column);
                      }}
                      name="Paint Booth"
                      color="primary"
                    />
                  }
                  label="Paint Booth"
                />                
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={filterList[index][2] || false}
                      onChange={event => {
                        filterList[index][2] = event.target.checked;
                        onChange(filterList[index], index, column);
                      }}
                      name="Power Wash"
                      color="primary"
                    />
                  }
                  label="Power Wash"
                />
              </FormGroup>
            </div>
          )
        }
      }
    },
    { 
      label: "Actual Value", 
      name: "actualValue",      
      options: {
        filter: true,
        filterType: "custom",
        filterList: [],
        customFilterListOptions: {
          render: value => {
            if (value[0] && value[1]) {
              return `Min Value: ${value[0]}, Max Value: ${value[1]}`;
            } else if (value[0]) {
              return `Min Value: ${value[0]}`;
            } else if (value[1]) {
              return `Max Value: ${value[1]}`;
            }
            return [];
          },
          update: (filterList, filterPos, index) => {
            if (filterPos === 0) {
              filterList[index].splice(filterPos, 1, "");
            } else if (filterPos === 1) {
              filterList[index].splice(filterPos, 1);
            } else if (filterPos === -1) {
              filterList[index] = [];
            }

            return filterList;
          }
        },
        filterOptions: {
          names: [],
          logic(value, filters) {
            const lower = filters[0];
            const upper = filters[1];
            if (lower && upper) {
              return value < lower || value > upper;
            } else if (lower) {
              return value < lower;
            } else if (upper) {
              return value > upper;
            }
            return false;
          },
          display: (filterList, onChange, index, column) => (
            <div>
              <FormLabel>Actual Value</FormLabel>
              <FormGroup row>
                <TextField
                  label="min"
                  value={filterList[index][0] || ""}
                  onChange={event => {
                    filterList[index][0] = event.target.value;
                    onChange(filterList[index], index, column);
                  }}
                  style={{ width: "45%", marginRight: "5%" }}
                />
                <TextField
                  label="max"
                  value={filterList[index][1] || ""}
                  onChange={event => {
                    filterList[index][1] = event.target.value;
                    onChange(filterList[index], index, column);
                  }}
                  style={{ width: "45%" }}
                />
              </FormGroup>
            </div>
          )
        }
      } 
    },
    {
      label: "Acknowledge",
      name: "acknowledge",
      options: {
        filter: true,
        customBodyRender: (value, tableMeta, updateValue) => (
            <span>{value ? "Yes" : "No"}</span>
        ),
        filterType: "custom",
        filterList: [],
        customFilterListOptions: {
          render: value => {
            if (value[0] && value[1]) {
              return `Acknowledge: Yes, No`;
            }else if (value[0]) {
              return `Acknowledge: Yes`;
            }else if (value[1]) {
              return `Acknowledge: No`;
            }
            return [];
          },
          update: (filterList, filterPos, index) => {
            if (filterPos === 0) {
              filterList[index].splice(filterPos, 1, "");
            } else if (filterPos === 1) {
              filterList[index].splice(filterPos, 1);
            } else if (filterPos === -1) {
              filterList[index] = [];
            }

            return filterList;
          }
        },
        filterOptions: {
          names: [],
          logic(value, filters) {
            const yes = filters[0];
            const no = filters[1];

            if (yes && no) {
              return value;
            } else if (yes) {
              return value == false;
            }else if (no) {
              return value == true;
            }
            return false;
          },
          display: (filterList, onChange, index, column) => (
            <div>
              <FormLabel>Acknowledge</FormLabel>              
              <FormGroup row>
                <FormControlLabel
                  control={
                    <Checkbox
                    checked={filterList[index][0] || false}
                    onChange={event => {
                      filterList[index][0] = event.target.checked;
                      onChange(filterList[index], index, column);
                    }}
                    name="Yes"
                    color="primary"
                    />
                  }
                  label="Yes"
                />                
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={filterList[index][1] || false}
                      onChange={event => {
                        filterList[index][1] = event.target.checked;
                        onChange(filterList[index], index, column);
                      }}
                      name="No"
                      color="primary"
                    />
                  }
                  label="No"
                />   
              </FormGroup>
            </div>
          )
        }
      },
    },
    // {
    //   label: "Notified",
    //   name: "notified",
    //   options: {
    //     filter: false,
    //     customBodyRender: (value, tableMeta, updateValue) => (
    //         <span>{value ? "Yes" : "No"}</span>
    //     ),
    //   },
    // },
    {
      label: "Created At",
      name: "updatedat",
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => (
          <span>
            {new Date(value).toLocaleString("en-GB", {
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
              second: "numeric",
            })}
          </span>
        ),
      },
    },
  ];

class Notification extends PureComponent {    
  constructor(props) {
    super(props);
    this.state = {
      tableData: [],
      totalCount: 0,
      formData: notificationModel,
      loading: true,
      onProgress: false,
      formError: [],
    };
  }

  async componentDidMount() {
    await this.getData(this.props.page, this.props.rowsPerPage);
  }

  /***
   * Fetch the Data
   * **/
  getData = async (pageNo) => {
    let from = new Date();
    let to = new Date();
    axios.get(`https://randomuser.me/api/`).then(res => { 
        console.log(res);
    }).catch(error => {
        console.log('error', error);
    })
    // const res  = await loadEventData(from.setHours(from.getHours() - 1), to, 100);
    // console.log('res', res);
    const response = await get(
      `NotificationMessage?pageNo=${pageNo === undefined ? 0 : pageNo}&pageSize=${10}`
    );
    if (response) {
      this.setState((state) => ({
        tableData: response.data.data.data,
        totalCount: response.data.data.count,
        loading: false,
      }));
    }
  };

  /**
   * Capture the user handel changes
   * */
  handelChange = (propertyName, propertyValue) => {
    let newDataSet = { ...this.state.formData };
    newDataSet[propertyName] = propertyValue;
    this.setState({ formData: newDataSet });
  };
  
  /***
   * Form Submit
   * * * We will send the user new or modified data to backend server
   * **/
  handelFormSubmit = async () => {
    this.setState({ onProgress: true });
    if (this.props.title === "UPDATE") {
      console.log('this.state.formData', this.state.formData)
      const response = await put("NotificationMessage/update", this.state.formData);
      if (response && response.data.code) {
        const dataIndex = this.state.tableData.findIndex(
          (x) => x.id === response.data.data.id
        );
        if (dataIndex >= 0) {
          const tableData = this.state.tableData;
          tableData.splice(dataIndex, 1);
          this.setState(
            (state) => ({
              tableData: [...tableData, response.data.data],
              formData: notificationModel,
              onProgress: false,
            }),
            () => this.props.closeDialog(false, "")
          );
        } 
      }
    } else {
      const response = await post("NotificationMessage/add", this.state.formData);
      if (response && response.data.code) {
        this.setState(
          (state) => ({
            tableData: [response.data.data, ...state.tableData],
            formData: notificationModel,
            onProgress: false,
            totalCount: state.totalCount + 1,
          }),
          () => this.props.closeDialog(false, "")
        );
      }
    }
  };


  /***
   * Initialize the selected row Data to bind in Dialog Content
   * ***/
  onUpdate = async (rowData, rowMeta, size) => {
    if (size === MDUP) {
      const updateData = this.state.tableData[rowMeta.dataIndex];
      this.setState({ formData: updateData }, () =>
        this.props.openDialog(true, "UPDATE")
      );
    } else {
      const updateData = this.state.tableData.find((x) => x.id === rowData.id);
      this.setState({ formData: updateData }, () =>
        this.props.openDialog(true, "UPDATE")
      );
    }
  };  

  /***
   * Handel Form Cancel
   * **/
  onFormClose = async () => {
    await this.props.closeDialog(false, "");
    this.setState((state) => ({ formData: notificationModel }));
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
                title={"Notification"}
                data={this.state.tableData}
                nextData={this.getData}
                totalCount={this.state.totalCount}
                sortValue={"Updated At"}
              />
            ) : (
              /***
               * Desktop View
               * **/
              <MUITable
                title={"Notification"}
                totalCount={this.state.totalCount}
                data={this.state.tableData.sort(sortByUpdatedAt)}
                columns={columns}
                accessRight={{ Create: false, Update: true, Delete: false }}
                options={tableCustomizeToolBarSingleSelect}
                loading={this.state.loading}
                handleUpdate={this.onUpdate}
                //onPageChange={this.getData}
              />
            )
          }
          {/***
           * * Material Dialog for Creation and Update
           * * * * we will render Medium size Dialog for 'MD' and UP
           * * * * * * and
           * * * * Full Screen Dialog for 'SM' and Down
           * **/}
          <MaxWidthDialog
            content={
              <NotificationAddOrEdit
                dataSet={this.state.formData}
                handelChange={this.handelChange}
                onFormSubmit={this.state.onProgress}
                formError={this.state.formError}
              />
            }
            contentTitle={"NOTIFICATION"}
            formClose={this.onFormClose}
            formSubmit={this.handelFormSubmit}
            onFormSubmit={this.state.onProgress}
          />
        </Grid>
      </Grid>
    );
  }

    // render() {
    //     return (
    //         <Grid container direction="row" wrap="wrap" spacing={2}>
    //             <Grid item lg={12}>
    //                 <Typography variant="h4" component="h4">
    //                     Notification
    //                 </Typography>
    //             </Grid>
    //             <Grid item xs={12} md={4}>
    //                 <NotificationCard
    //                     formName='DEGREASING'
    //                     title='DEGREASING(TANK 01)'
    //                 />
    //             </Grid>
    //             <Grid item xs={12} md={4}>
    //                 <NotificationCard
    //                     formName='RINSEONE'
    //                     title='WATER RINSE (TANK 2)'
    //                 />
    //             </Grid>
    //             <Grid item xs={12} md={4}>
    //                 <NotificationCard
    //                     formName='RINSETWO'
    //                     title='WATER RINSE (TANK 3)'
    //                 />
    //             </Grid>
    //             <Grid item xs={12} md={4}>
    //                 <NotificationCard
    //                     formName='RINSETHREE'
    //                     title='WATER RINSE (TANK 4)'
    //                 />
    //             </Grid>
    //             <Grid item xs={12} md={4}>
    //                 <NotificationCard
    //                     formName='DIRINSE'
    //                     title='DI WATER RINSE (TANK 5)'
    //                 />
    //             </Grid>
    //             <Grid item xs={12} md={4}>
    //                 <NotificationCard
    //                     formName='PASSIVATION'
    //                     title='PASSIVATION (TANK 6)'
    //                 />
    //             </Grid>
    //             <Grid item xs={12} md={4}>
    //                 <NotificationCard
    //                     formName='NEUEVAP'
    //                     title='NEUTRALIZATION (TANK 03-09)'
    //                 />
    //             </Grid>
    //             <Grid item xs={12} md={4}>
    //                 <NotificationCard
    //                     formName='CONVERSION'
    //                     title='DISTILLED WATER(TANK 05)'
    //                 />
    //             </Grid>
    //             <Grid item xs={12} md={4}>
    //                 <NotificationCard
    //                     formName='PAINTBOOTH'
    //                     title='PAINT BOOTH'
    //                 />
    //             </Grid>
    //             <Grid item xs={12} md={4}>
    //                 <NotificationCard
    //                     formName='PRIMERCABINETONE'
    //                     title='PRIMER CABINET 1'
    //                 />
    //             </Grid>
    //             <Grid item xs={12} md={4}>
    //                 <NotificationCard
    //                     formName='PRIMERCABINETTWO'
    //                     title='PRIMER CABINET 2'
    //                 />
    //             </Grid>
    //             <Grid item xs={12} md={4}>
    //                 <NotificationCard
    //                     formName='TOPCOATCABINETONE'
    //                     title='TOPCOAT CABINET 1'
    //                 />
    //             </Grid>
    //             <Grid item xs={12} md={4}>
    //                 <NotificationCard
    //                     formName='TOPCOATCABINETTWO'
    //                     title='TOPCOAT CABINET 2'
    //                 />
    //             </Grid>
    //         </Grid>
    //     )
    // }
}

const mapStateToProps = (state) => ({
  title: state.diagItemActions.title,
  digOpen: state.diagItemActions.digOpen,
});

export default compose(
  withWidth(),
  connect(mapStateToProps, {
    openDialog,
    closeDialog,
    openSnack,
    closeSnack,
    openSpinner,
  })
)(Notification);
