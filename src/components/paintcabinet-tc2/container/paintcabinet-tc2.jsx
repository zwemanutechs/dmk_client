import React, { useEffect, useState } from "react";
import {deleteRange, get, post, put} from "../../../middleware/axios-middleware";
import {formValidation} from "../validator/form-validator";
import {MDUP} from "../../../constants/app-constants";
import {paintCabinetTopCabinet2Model} from "../model/model";
import Grid from "@material-ui/core/Grid";
import {isWidthDown, withWidth} from "@material-ui/core";
import MobileView from "../../../shared/mobileview-table/mobileview-table";
import MUITable from "../../../shared/mui-datatable/container/mui-table";
import {sortByUpdatedAt} from "../../../appservices/app-services";
import {tableCustomizeToolBarSingleSelect} from "../../../constants/table-constants";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import MaxWidthDialog from "../../../shared/mat-diaglog/container/mat-dialog";
import PaintCabinetTopCabinet2AddOrEdit from "./paintcabinet-tc2-addOrEdit";
import compose from "recompose/compose";
import {connect} from "react-redux";
import {closeDialog, openDialog} from "../../../shared/mat-diaglog/actions/maxDialog-action";
import {closeSnack, openSnack} from "../../../shared/snackbar/actions/snackbar-actions";
import {openSpinner} from "../../../shared/spinner/actions/spinner-actions";
import { createOrUpdateTimeSeriesRecord, getDeletedItems } from "../../../appservices/mindsphere-iotapi-services";
import { PAINTBOOTH_ASSETID } from "../../../constants/mindsphere-constants";

const columns = [
    {
        label: "Cabinet Temperature (oC)",
        name: "topCabinet2CabinetTemperture",
    },
    {
        label: "Top Cabinet2 Cabinet Humidity (%)",
        name: "topCabinet2CabinetHumidity",
    },
    {
        label: "Paint Test Visocity (sec)",
        name: "topCabinet2PaintTestVisocity",
    },
    {
        label: "Paint Test Temperature (oC)",
        name: "topCabinet2PaintTestTemperature",
    },
    { label: "Di Water Check (uS/cm)", name: "topCabinet2DiWaterCheck" },
    {
        label: "Andon Light Inspection (Ok/Not Ok)",
        name: "topCabinet2AndonLightInspection",
        options: {
            filter: false,
            customBodyRender: (value, tableMeta, updateValue) => (
                <span>{value ? "Ok" : "Not Ok"}</span>
            ),
        },
    },
    {
        label: "Hardener Pressure Tank3 (bar)",
        name: "topCabinet2HardenerPressureTank3",
    },
    { label: "Hardener Tank3 (bar)", name: "topCabinet2HardenerTank3" },
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
]
class PaintCabinetTopCabinet2 extends React.PureComponent{

    constructor(props) {
        super(props);
        this.state = {
            tableData: [],
            totalCount: 0,
            formData: paintCabinetTopCabinet2Model,
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
            `paintCabinetTC2?pageNo=${pageNo === undefined ? 0 : pageNo}&pageSize=${10}`
        );
        if (response) {
            this.setState((state) => ({
                tableData: response.data.data.data,
                totalCount: response.data.data.count,
                loading: false,
            }));
        }else{
            this.setState({ loading: false})
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
        AndonLight_Inspection_OkNotOk: d.topCabinet2AndonLightInspection,
        Cabinet_Humidity_Pct: d.topCabinet2CabinetHumidity,
        Cabinet_Temperature_degC: d.topCabinet2CabinetTemperture,
        DIWaterCheck_Conductivity_uSpercm: d.topCabinet2DiWaterCheck,
        HardenerTank3_Pressure_bar: d.topCabinet2HardenerTank3,
        Tank3Hardener_Pressure_bar: d.topCabinet2HardenerPressureTank3,
        PaintTest_Temperature_degC: d.topCabinet2PaintTestTemperature,
        PaintTest_Viscosity_sec: d.topCabinet2PaintTestVisocity
      }))
      const response = await createOrUpdateTimeSeriesRecord(PAINTBOOTH_ASSETID, 'Topcoat_Cabinet_2', payload)  
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
                const response = await put("paintCabinetTC2/update", this.state.formData);
                if (response && response.data.code) {
                    const dataIndex = this.state.tableData.findIndex((x) => x.id === response.data.data.id);
                    if (dataIndex >= 0) {
                        const tableData = this.state.tableData;
                        tableData.splice(dataIndex, 1);
                        this.setState(
                            (state) => ({
                                tableData: [...tableData, response.data.data],
                                formData: paintCabinetTopCabinet2Model,
                                onProgress: false,
                            }),
                            () => this.props.closeDialog(false, "")
                        );
                    }
          
                    // Save data to time series
                    this.saveDataToTimeSeries([{...response.data.data}])
                }
            } else {
                const response = await post("paintCabinetTC2/add", this.state.formData);
                if (response && response.data.code) {
                    this.setState(
                        (state) => ({
                            tableData: [response.data.data, ...state.tableData],
                            formData: paintCabinetTopCabinet2Model,
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
                    "paintCabinetTC2/deleterange",
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
        this.setState((state) => ({ formData: paintCabinetTopCabinet2Model }));
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
                                title={"TOPCOAT CABINET 2"}
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
                                title={"TOPCOAT CABINET 2"}
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
                            <PaintCabinetTopCabinet2AddOrEdit
                                dataSet={this.state.formData}
                                handelChange={this.handelChange}
                                onFormSubmit={this.state.onProgress}
                                formError={this.state.formError}
                            />
                        }
                        contentTitle={"TOPCOAT CABINET 2"}
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
)(PaintCabinetTopCabinet2)
