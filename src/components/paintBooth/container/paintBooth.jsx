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
import PaintBoothAddOrEdit from "./paintBooth-addOrEdit";
import {
  openDialog,
  closeDialog,
} from "../../../shared/mat-diaglog/actions/maxDialog-action";
import { MDUP } from "../../../constants/app-constants";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
//import MobileTable from "../../../shared/MobileTable";
// import MobileTable from "ReactMobileViewTable";
import { paintBoothModel } from "../model/model";
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
import { PAINTBOOTH_ASSETID } from "../../../constants/mindsphere-constants";

const columns = [
  { label: "Paint Pressure At Esta1 R11 (bar)", name: "paintPressureAtEsta1R11" },
  { label: "High Tension Esta1 R11, (kV)", name: "highTensionEsta1R11" },
  { label: "Paint Pressure At Esta1 R12 (bar)", name: "paintPressureAtEsta1R12" },
  { label: "High Tension Esta1 R12 (kV)", name: "highTensionEsta1R12" },
  { label: "Paint Pressure At Esta2 R11 (bar)", name: "paintPressureAtEsta2R11" },
  { label: "High Tension Esta2 R11 (kV)", name: "highTensionEsta2R11" },
  { label: "Touch Up Room1 Air Flow (m/s)", name: "touchUpRoom1AirFlow" },
  { label: "Touch Up Room2 Air Flow (m/s)", name: "touchUpRoom2AirFlow" },
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

class PaintBooth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: [],
      totalCount: 0,
      formData: paintBoothModel,
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
      `paintBooth?pageNo=${pageNo === undefined ? 0 : pageNo}&pageSize=${10}`
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
    const payloadEsta1 = [];
    data.forEach((d) => payloadEsta1.push({
      _time: d.createdat,
      R11_High_Tension_kV: d.highTensionEsta1R11,
      R11_Paint_Pressure_bar: d.paintPressureAtEsta1R11,
      R12_High_Tension_kV: d.highTensionEsta1R12,
      R12_Paint_Pressure_bar: d.paintPressureAtEsta1R12
    }))
    const responseEsta1 = createOrUpdateTimeSeriesRecord(PAINTBOOTH_ASSETID, 'ESTA1', payloadEsta1)

    const payloadEsta1TouchUpBooth = [];
    data.forEach((d) => payloadEsta1TouchUpBooth.push({
      _time: d.createdat,
      Room_Airflow_mps: d.touchUpRoom1AirFlow
    }))
    const responseEsta1TouchUpBooth = createOrUpdateTimeSeriesRecord(PAINTBOOTH_ASSETID, 'ESTA1_TouchUpBooth', payloadEsta1TouchUpBooth)
    
    const payloadEsta2 = [];
    data.forEach((d) => payloadEsta2.push({
      _time: d.createdat,
      R11_High_Tension_kV: d.highTensionEsta2R11,
      R11_Paint_Pressure_bar: d.paintPressureAtEsta2R11
    }))
    const responseEsta2 = createOrUpdateTimeSeriesRecord(PAINTBOOTH_ASSETID, 'ESTA2', payloadEsta2)

    const payloadEsta2TouchUpBooth = [];
    data.forEach((d) => payloadEsta2TouchUpBooth.push({
      _time: d.createdat,
      Room_Airflow_mps: d.touchUpRoom2AirFlow
    }))
    const responseEsta2TouchUpBooth = createOrUpdateTimeSeriesRecord(PAINTBOOTH_ASSETID, 'ESTA2_TouchUpBooth', payloadEsta2TouchUpBooth)
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
        const response = await put("paintBooth/update", this.state.formData);
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
                formData: paintBoothModel,
                onProgress: false,
              }),
              () => this.props.closeDialog(false, "")
            );
          }
          
          // Save data to time series
          this.saveDataToTimeSeries([{...response.data.data}])
        }
      } else {
        const response = await post("paintBooth/add", this.state.formData);
        if (response && response.data.code) {
          this.setState(
            (state) => ({
              tableData: [response.data.data, ...state.tableData],
              formData: paintBoothModel,
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
        const response = await deleteRange(
          "paintBooth/deleterange",
          deleteList
        );
        if (response && response.data.code) {
          let newDataList = [...this.state.tableData];
          this.updateDataToTimeSeries(newDataList, deleteList);
          deleteList.forEach((deletedItems) => {
            const deletedItemIndex = newDataList.findIndex(
              (x) => x.id === deletedItems.id
            );
            if (deletedItemIndex >= 0) {
              newDataList.splice(deletedItemIndex, 1);
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
    this.setState((state) => ({ formData: paintBoothModel }));
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
                title={"PAINT BOOTH"}
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
                title={"PAINT BOOTH"}
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
                  flex: 1,
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
              <PaintBoothAddOrEdit
                dataSet={this.state.formData}
                handelChange={this.handelChange}
                onFormSubmit={this.state.onProgress}
                formError={this.state.formError}
              />
            }
            contentTitle={"PAINT BOOTH"}
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
)(PaintBooth);
