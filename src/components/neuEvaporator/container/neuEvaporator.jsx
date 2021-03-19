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
import NeuEvaporatorAddOrEdit from "./neuEvaporator-addOrEdit";
import {
  openDialog,
  closeDialog,
} from "../../../shared/mat-diaglog/actions/maxDialog-action";
import { MDUP } from "../../../constants/app-constants";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
//import MobileTable from "../../../shared/MobileTable";
// import MobileTable from "ReactMobileViewTable";
import { neuEvaporatorModel } from "../model/model";
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
  { label: "Tank 03 Feed Rate Evaporator, (OK/Not OK)", name: "feedRateEvaporatorTank3", 
    options: {
      filter: false,
      customBodyRender: (value, tableMeta, updateValue) => (
        <span>{value ? "OK" : "Not OK"}</span>
      ),
    },
  },
  { label: "Tank 03 pH Controller", name: "phTank3" },
  { label: "Tank 03 pH Meter", name: "phHmiTank3" },
  {
    label: "Tank 03 Monthly Calibration (Done/Not Done)",
    name: "monthlyCalibrationOfPhMeterTank3",
    options: {
      filter: false,
      customBodyRender: (value, tableMeta, updateValue) => (
          <span>{value ? "Done" : "Not Done"}</span>
      ),
    },
  },
  { label: "Distilled Water Tank 05/06, (pH)", name: "phTank6" },
  {
    label: "Distilled Water Tank 05/06 Water Sample (Good/Bad)",
    name: "waterSampleInBottleTank6",
    options: {
      filter: false,
      customBodyRender: (value, tableMeta, updateValue) => (
        <span>{value ? "Good" : "Bad"}</span>
      ),
    },
  },
  // { label: "Tank 06 Water Level (L)", name: "waterLevelTank6" },
  { label: "Demineralization Water Supply from Tank6, (L/h)", name: "flowRateTank6" },
  { label: "Tank 06 Conductivity, (uS/cm)", name: "conductivity" },
  {
    label: "Tank 07 Water Quality (Good/Bad)",
    name: "waterQualityTank7",
    options: {
      filter: false,
      customBodyRender: (value, tableMeta, updateValue) => (
        <span>{value ? "Good" : "Bad"}</span>
      ),
    },
  },
  // { label: "Tank 07 Water Level LS 17/18/19 (Ok/Low)", name: "waterLevelTank7" },
  { label: "Tank 08 Filled Level, (OK/Not OK)", name: "waterLevelLitreTank8", 
    options: {
      filter: false,
      customBodyRender: (value, tableMeta, updateValue) => (
        <span>{value ? "OK" : "Not OK"}</span>
      ),
    },
  },
  {
    label: "Tank 08 Any Abnormal Usage (YES/NO)",
    name: "anyAbnormalUsageTank8",
    options: {
      filter: false,
      customBodyRender: (value, tableMeta, updateValue) => (
        <span>{value ? "Yes" : "No"}</span>
      ),
    },
  },
  { label: "Tank 09 Filled Level, (OK/Not OK)", name: "waterLevelTank9",
    options: {
      filter: false,
      customBodyRender: (value, tableMeta, updateValue) => (
        <span>{value ? "OK" : "Not OK"}</span>
      ),
    }, 
  },
  {
    label: "Tank 09 Any Abnormal Usage (YES/NO)",
    name: "anyAbnormalUsageTank9",
    options: {
      filter: false,
      customBodyRender: (value, tableMeta, updateValue) => (
        <span>{value ? "Yes" : "No"}</span>
      ),
    },
  },
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

class NeuEvaporator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: [],
      totalCount: 0,
      formData: neuEvaporatorModel,
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
      `neuEvaporator?pageNo=${pageNo === undefined ? 0 : pageNo}&pageSize=${10}`
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
      Tank03_Evaporator_FeedRate_OkNotOk: d.feedRateEvaporatorTank3,
      Tank03_MonthlyCalibration_DoneNotDone: d.monthlyCalibrationOfPhMeterTank3,
      Tank03_pHController_pH: d.phTank3,
      Tank03_pHMeter_pH: d.phHmiTank3,
      Tank0506_DistilledWater_pH: d.phTank6,
      Tank06_Conductivity_uSpercm: d.conductivity,
      Tank06_DistilledWaterSupply_LpHr: d.flowRateTank6,
      Tank06_WaterSample_GoodBad: d.waterSampleInBottleTank6,
      Tank07_WaterQuality_GoodBad: d.waterQualityTank7,
      Tank08_FilledLevel_OkNotOk: d.waterLevelLitreTank8,
      Tank09_AnyAbnormalUsage_YesNo: d.anyAbnormalUsageTank9,
      Tank09_FilledLevel_OkNotOk: d.waterLevelTank9
    }))
    const response = await createOrUpdateTimeSeriesRecord(POWERWASH_ASSETID, 'Neutralization_Evaporation', payload)
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
        const response = await put("neuEvaporator/update", this.state.formData);
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
                formData: neuEvaporatorModel,
                onProgress: false,
              }),
              () => this.props.closeDialog(false, "")
            );
          }
          
          // Save data to time series
          this.saveDataToTimeSeries([{...response.data.data}])
        }
      } else {
        const response = await post("neuEvaporator/add", this.state.formData);
        if (response && response.data.code) {
          this.setState(
            (state) => ({
              tableData: [response.data.data, ...state.tableData],
              formData: neuEvaporatorModel,
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
          "neuEvaporator/deleterange",
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
    this.setState((state) => ({ formData: neuEvaporatorModel }));
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
                title={"NEUTRALIZATION (TANK 03-09)"}
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
                title={"NEUTRALIZATION (TANK 03-09)"}
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
              <NeuEvaporatorAddOrEdit
                dataSet={this.state.formData}
                handelChange={this.handelChange}
                onFormSubmit={this.state.onProgress}
                formError={this.state.formError}
              />
            }
            contentTitle={"NEUTRALIZATION (TANK 03-09)"}
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
)(NeuEvaporator);
