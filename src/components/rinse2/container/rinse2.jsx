import React, { Component } from "react";
import {
  openSnack,
  closeSnack,
} from "../../../shared/snackbar/actions/snackbar-actions";
import { openSpinner } from "../../../shared/spinner/actions/spinner-actions";
import { connect } from "react-redux";
import compose from "recompose/compose";
import MUITable from "../../../shared/mui-datatable/container/mui-table";
import { withWidth, isWidthDown } from "@material-ui/core";
import { tableCustomizeToolBarSingleSelect } from "../../../constants/table-constants";
import MaxWidthDialog from "../../../shared/mat-diaglog/container/mat-dialog";
import Grid from "@material-ui/core/Grid";
import RinseTwoAddOrEdit from "./rinse2-addOrEdit";
import {
  openDialog,
  closeDialog,
} from "../../../shared/mat-diaglog/actions/maxDialog-action";
import { MDUP } from "../../../constants/app-constants";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { r2Model } from "../model/model";
import {
  get,
  post,
  put,
  deleteRange,
} from "../../../middleware/axios-middleware";
import { formValidation } from "../validator/form-validator";
import { sortByUpdatedAt } from "../../../appservices/app-services";
import MobileView from "../../../shared/mobileview-table/mobileview-table";
import { createOrUpdateTimeSeriesRecord, getDeletedItems } from "../../../appservices/mindsphere-iotapi-services";
import { POWERWASH_ASSETID } from "../../../constants/mindsphere-constants";

const columns = [
  { label: "Ph", name: "ph" },
  { label: "Water Supply From Tank 4 (L/hr)", name: "waterSupplyFromTank4" },
  {
    label: "Updated At",
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
  { label: "Updated By", name: "updatedby" },
];

class Rinse2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: [],
      totalCount: 0,
      formData: r2Model,
      formError: [],
      loading: true,
      onProgress: false,
    };
  }

  async componentDidMount() {
    await this.getData(this.props.page, this.props.rowsPerPage);
  }

  /***
   * Fetch the Data
   * **/
  getData = async (pageNo) => {
    const response = await get(
      `rinse2?pageNo=${pageNo === undefined ? 0 : pageNo}&pageSize=${10}`
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

  /**
   * Save new or modified data to mindsphere api
   * */
  saveDataToTimeSeries = async (data) => {
    const payload = [];
    data.forEach((d) => payload.push({
      _time: d.createdat,
      ph: d.ph,
      WaterSupplyFromTank4_LpHr: d.waterSupplyFromTank4
    }))
    const response = await createOrUpdateTimeSeriesRecord(POWERWASH_ASSETID, 'Tank3_WaterRinse', payload)
  }
  
  /**
   * Update data to mindsphere for deletion
   * */
  updateDataToTimeSeries = (data, deleteList) => {
    getDeletedItems(data, deleteList)
    .then((deleteItems) => {
      this.saveDataToTimeSeries(deleteItems)
    })
  }

  /***
   * Form Submit
   * * * We will send the user new or modified data to backend server
   * **/
  handelFormSubmit = async () => {
    this.setState({ onProgress: true });
    const hasError = await formValidation(this.state.formData);
    if (hasError && !hasError.valid) {
      this.setState({ formError: hasError, onProgress: false });
    } else {
      if (this.props.title === "UPDATE") {
        const response = await put("rinse2/update", this.state.formData);
        if (response && response.data.code) {
          const dataIndex = this.state.tableData.findIndex(
            (x) => x.id === response.data.data.id
          );
          if (dataIndex >= 0) {
            const tableData = this.state.tableData;
            tableData.splice(dataIndex, 2);
            this.setState(
              (state) => ({
                tableData: [...tableData, response.data.data],
                formData: r2Model,
                onProgress: false,
              }),
              () => this.props.closeDialog(false, "")
            );
          }      
          
          // Save data to time series
          this.saveDataToTimeSeries([{...response.data.data}])
        }
      } else {
        const response = await post("rinse2/add", this.state.formData);
        if (response && response.data.code) {
          this.setState(
            (state) => ({
              tableData: [response.data.data, ...state.tableData],
              formData: r2Model,
              onProgress: false,
              totalCount: state.totalCount + 1,
            }),
            () => this.props.closeDialog(false, "")
          );      
          
          // Save data to time series
          this.saveDataToTimeSeries([{...response.data.data}])
        }
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
   * Handel User Deletion
   * **/
  onDelete = (rowData) =>
    new Promise(async (resolve, reject) => {
      if (Array.isArray(rowData.data) && rowData.data.length > 0) {
        let deleteList = [];
        rowData.data.forEach((deletedRowData) => {
          const deletedData = this.state.tableData[deletedRowData.dataIndex];
          if (deletedData) {
            deleteList.push(deletedData);
          }
        });
        const response = await deleteRange("rinse2/deleterange", deleteList);
        if (response && response.data.code) {
          let newDataList = [...this.state.tableData];
          this.updateDataToTimeSeries(newDataList, deleteList);
          deleteList.forEach((deletedItems) => {
            const deletedItemIndex = newDataList.findIndex(
              (x) => x.id === deletedItems.id
            );
            if (deletedItemIndex >= 0) {
              newDataList.splice(deletedItemIndex, 2);
            }
          });
          this.setState(
            (state) => ({
              tableData: newDataList,
              totalCount: state.totalCount - 1,
            }),
            () => resolve()
          );
        } else {
          reject();
        }
      } else {
        reject();
      }
    });

  /***
   * On Swipe Deletion on Mobile
   *
   * **/
  onSwipeDelete = (rowData) =>
    new Promise((resolve, reject) => {
      const deletedDataIndex = this.state.tableData.findIndex(
        (x) => x.id === rowData.id
      );
      if (deletedDataIndex >= 0) {
        this.onDelete({ data: [{ dataIndex: deletedDataIndex }] })
          .then((res) => resolve())
          .catch((rej) => reject());
      } else {
        reject();
      }
    });

  /***
   * Handel Form Cancel
   * **/
  onFormClose = async () => {
    await this.props.closeDialog(false, "");
    this.setState((state) => ({ formData: r2Model }));
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
                title={"WATER RINSE (TANK 3)"}
                data={this.state.tableData}
                nextData={this.getData}
                totalCount={this.state.totalCount}
                handleClick={this.onUpdate}
                handelDelete={this.onSwipeDelete}
                sortValue={"Updated At"}
              />
            ) : (
              /***
               * Desktop View
               * **/
              <MUITable
                title={"WATER RINSE (TANK 3)"}
                totalCount={this.state.totalCount}
                data={this.state.tableData.sort(sortByUpdatedAt)}
                columns={columns}
                accessRight={{ Create: true, Update: true, Delete: true }}
                options={tableCustomizeToolBarSingleSelect}
                loading={this.state.loading}
                //onPageChange={this.getData}
                handleUpdate={this.onUpdate}
                handelDelete={this.onDelete}
              />
            )
          }
          {
            /***
             * * Render Float button for Creation
             *  if device width is 'SM' and down we will show 'Add' floating button
             * **/
            isWidthDown("xs", this.props.width) ? (
              <Fab
                size="medium"
                color="secondary"
                onClick={(e) => this.props.openDialog(true, "ADD")}
                aria-label="add"
                style={{
                  flex: 2,
                  position: "fixed",
                  right: 30,
                  bottom: 30,
                  zIndex: 999,
                  backgroundColor: "#f50057",
                }}
              >
                <AddIcon />
              </Fab>
            ) : (
              <React.Fragment></React.Fragment>
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
              <RinseTwoAddOrEdit
                dataSet={this.state.formData}
                handelChange={this.handelChange}
                onFormSubmit={this.state.onProgress}
                formError={this.state.formError}
              />
            }
            contentTitle={"WATER RINSE (TANK 3)"}
            formClose={this.onFormClose}
            formSubmit={this.handelFormSubmit}
            onFormSubmit={this.state.onProgress}
          />
        </Grid>
      </Grid>
    );
  }
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
)(Rinse2);
