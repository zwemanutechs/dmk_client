import React, {Component} from 'react';
import {openSnack, closeSnack} from "../../../shared/snackbar/actions/snackbar-actions";
import {openSpinner} from "../../../shared/spinner/actions/spinner-actions";
import {connect} from "react-redux";
import compose from 'recompose/compose'
import MUITable from "../../../shared/mui-datatable/container/mui-table";
import {withWidth, isWidthDown} from "@material-ui/core";
import {tableCustomizeToolBarSingleSelect} from "../../../constants/table-constants";
import MaxWidthDialog from "../../../shared/mat-diaglog/container/mat-dialog";
import Grid from "@material-ui/core/Grid";
import PaintCabinetAddOrEdit from "./paintCabinet-addOrEdit";
import {openDialog, closeDialog} from '../../../shared/mat-diaglog/actions/maxDialog-action';
import {MDUP, ROWPERPAGE, snackSuccess} from "../../../constants/app-constants";
import Fab from "@material-ui/core/Fab";
import AddIcon from '@material-ui/icons/Add';
//import MobileTable from "../../../shared/MobileTable";
import MobileTable from "ReactMobileViewTable";
import {paintCabinetModel} from "../model/model";
import {get, post, put, deleteRange} from "../../../middleware/axios-middleware";
import {formValidation} from "../validator/form-validator";
import {sortByUpdatedAt} from "../../../appservices/app-services";
import MobileView from "../../../shared/mobileview-table/mobileview-table";

const columns = [
    {label: 'Top Cabinet1 Cabinet Temperature', name: 'topCabinet1CabinetTemperature'},
    {label: 'Top Cabinet1 Cabinet Humidity', name: 'topCabinet1CabinetHumidity'},
    {label: 'Top Cabinet1 Paint Test Visocity', name: 'topCabinet1PaintTestVisocity'},
    {label: 'Top Cabinet1 Paint Test Visocity', name: 'topCabinet1PaintTestTemperature'},
    {label: 'Top Cabinet1 DI Water Check', name: 'topCabinet1DiWaterCheck'},
    {label: 'Top Cabinet1 Andon Light Inspection', name: 'topCabinet1AndonLightInspection', options: {
            filter: false,
            customBodyRender: (value, tableMeta, updateValue) => (
                <span>
              {value ? "Yes" : "No"}
            </span>
            )
        }
    },
    {label: 'Top Cabinet1 P600 Inlet Tank1', name: 'topCabinet1P600InletTank1'},
    {label: 'Top Cabinet1 P600 Outlet Tank1', name: 'topCabinet1P600OutletTank1'},
    {label: 'Top Cabinet1 P190 Inlet Tank2', name: 'topCabinet1P190InletTank2'},
    {label: 'Top Cabinet1 P190 Outlet Tank2', name: 'topCabinet1P190OutletTank2'},
    {label: 'Top Cabinet1 P100 Inlet Tank3', name: 'topCabinet1P100InletTank3'},
    {label: 'Top Cabinet1 P100 Outlet Tank3', name: 'topCabinet1P100OutletTank3'},
    {label: 'Top Cabinet1 P020 Inlet Tank4', name: 'topCabinet1P020InletTank4'},
    {label: 'Top Cabinet1 P020 Outlet Tank2', name: 'topCabinet1P020OutletTank2'},
    {label: 'Top Cabinet2 Hardener Pressure Tank3', name: 'topCabinet2HardenerPressureTankTank3'},
    {label: 'Top Cabinet2 Hardener Tank3', name: 'topCabinet2HardenerTank3'},
    {label: 'Top Cabinet2 Di Water Check', name: 'topCabinet2DiWaterCheck'},
    {label: 'Top Cabinet2 Cabinet Temperature', name: 'topCabinet2CabinetTemperature'},
    {label: 'Top Cabinet2 Cabinet Humidity', name: 'topCabinet2CabinetHumidity'},
    {label: 'Top Cabinet2 Paint Test Visocity', name: 'topCabinet2PaintTestVisocity'},
    {label: 'Top Cabinet2 Paint Test Temperature', name: 'topCabinet2PaintTestTemperature'},
    {label: 'Top Cabinet2 Andon Light Inspection', name: 'topCabinet2AndonLightInspection', options: {
            filter: false,
            customBodyRender: (value, tableMeta, updateValue) => (
                <span>
              {value ? "Yes" : "No"}
            </span>
            )
        }
    },
    {label: 'Primer Cabinet1 Di Water Check', name: 'primerCabinet1DiWaterCheck'},
    {label: 'Primer Cabinet1 Black Primer Inlet Tank2', name: 'primerCabinet1BlackPrimerInletTank2'},
    {label: 'Primer Cabinet1 Black Primer Outlet Tank2', name: 'primerCabinet1BlackPrimerOutletTank2'},
    {label: 'Primer Cabinet1 Paint Test Viscosity', name: 'primerCabinet1PaintTestViscosity'},
    {label: 'Primer Cabinet1 R11 Temperature', name: 'primerCabinet1R11Temperature'},
    {label: 'Primer Cabinet1 R11 Humidity', name: 'primerCabinet1R11Humidity'},
    {label: 'Primer Cabinet1 Hardener Pressure Tank3', name: 'primerCabinet1HardenerPressureTank3'},
    {label: 'Primer Cabinet1 Hardener Tank3', name: 'primerCabinet1HardenerTank3'},
    {label: 'Primer Cabinet1 Undon Light Inspection', name: 'primerCabinet1UndonLightInspection', options: {
            filter: false,
            customBodyRender: (value, tableMeta, updateValue) => (
                <span>
              {value ? "Yes" : "No"}
            </span>
            )
        }
    },
    {label: 'Primer Cabinet1 Paint Test Temperature', name: 'primerCabinet1PaintTestTemperature'},
    {label: 'Primer Cabinet1 White Primer Inlet Tank1', name: 'primerCabinet1WhitePrimerInletTank1'},
    {label: 'Primer Cabinet1 White Primer Outlet Tank1', name: 'primerCabinet1WhitePrimerOutletTank1'},
    {label: 'Primer Cabinet2 Undon Light Inspection', name: 'primerCabinet2UndonLightInspection', options: {
            filter: false,
            customBodyRender: (value, tableMeta, updateValue) => (
                <span>
              {value ? "Yes" : "No"}
            </span>
            )
        }
    },
    {label: 'Primer Cabinet2 R12 Temperature', name: 'primerCabinet2R12Temperature'},
    {label: 'Primer Cabinet2 Hardener Tank3', name: 'primerCabinet2HardenerTank3'},
    {label: 'Primer Cabinet2 Paint Test Temperature', name: 'primerCabinet2PaintTestTemperature'},
    {label: 'Primer Cabinet2 Black Primer Inlet Tank2', name: 'primerCabinet2BlackPrimerInletTank2'},
    {label: 'Primer Cabinet2 Black Primer Outlet Tank2', name: 'primerCabinet2BlackPrimerOutletTank2'},
    {label: 'Primer Cabinet2 Paint Test Viscosity', name: 'primerCabinet2PaintTestViscosity'},
    {label: 'Primer Cabinet2 White Primer Inlet Tank1', name: 'primerCabinet2WhitePrimerInletTank1'},
    {label: 'Primer Cabinet2 White Primer Outlet Tank1', name: 'primerCabinet2WhitePrimerOutletTank1'},
    {label: 'Primer Cabinet2 Di Water Check', name: 'primerCabinet2DiWaterCheck'},
    {label: 'Primer Cabinet2 Hardener Pressure Tank3', name: 'primerCabinet2HardenerPressureTank3'},
    {label: 'Primer Cabinet2 R12 Humidity', name: 'primerCabinet2R12Humidity'},
    {
        label: 'Updated At',
        name: 'updatedat',
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
                  second: "numeric"
              })}
            </span>
            )
        }
    },
    {label: 'Updated By', name: 'updatedby'}
];

class PaintCabinet extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tableData: [],
            totalCount: 0,
            formData: paintCabinetModel,
            formError: [],
            loading: true,
            onProgress: false,
        }
    }

    async componentDidMount() {
        await this.getData(this.props.page, this.props.rowsPerPage);
    };

    /***
     * Fetch the Data
     * **/
    getData = async (pageNo) => {
        const response = await get(`paintCabinet?pageNo=${pageNo === undefined ? 0 : pageNo}&pageSize=${10}`);
        if (response) {
            this.setState(state =>
                ({
                    tableData: response.data.data.data,
                    totalCount: response.data.data.count,
                    loading: false
                }));
        }
    };

    /**
     * Capture the user handel changes
     * */
    handelChange = (propertyName, propertyValue) => {
        let newDataSet = {...this.state.formData};
        newDataSet[propertyName] = propertyValue;
        this.setState({formData: newDataSet});
    };

    /***
     * Form Submit
     * * * We will send the user new or modified data to backend server
     * **/
    handelFormSubmit = async () => {
        this.setState({onProgress: true});
        const hasError = await formValidation(this.state.formData);
        if (hasError && !hasError.valid) {
            this.setState({formError: hasError, onProgress: false});
        } else {
            if (this.props.title === 'UPDATE') {
                const response = await put('paintCabinet/update', this.state.formData);
                if (response && response.data.code) {
                    const dataIndex = this.state.tableData.findIndex(x => x.id === response.data.data.id);
                    if (dataIndex >= 0) {
                        const tableData = this.state.tableData;
                        tableData.splice(dataIndex, 1);
                        this.setState(state => ({
                            tableData: [...tableData, response.data.data],
                            formData: paintCabinetModel,
                            onProgress: false
                        }), () => this.props.closeDialog(false, ''));
                    }
                }
            } else {
                const response = await post('paintCabinet/add', this.state.formData);
                if (response && response.data.code) {
                    this.setState(state => ({
                        tableData: [response.data.data, ...state.tableData],
                        formData: paintCabinetModel,
                        onProgress: false,
                        totalCount: state.totalCount + 1
                    }), () => this.props.closeDialog(false, ''));
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
            this.setState({formData: updateData}, () => this.props.openDialog(true, 'UPDATE'));
        } else {
            const updateData = this.state.tableData.find(x => x.id === rowData.id);
            this.setState({formData: updateData}, () => this.props.openDialog(true, 'UPDATE'));
        }
    };

    /***
     * Handel User Deletion
     * **/
    onDelete = (rowData) => new Promise(async (resolve, reject) => {
        if (Array.isArray(rowData.data) && rowData.data.length > 0) {
            let deleteList = [];
            rowData.data.forEach((deletedRowData) => {
                const deletedData = this.state.tableData[deletedRowData.dataIndex];
                if (deletedData) {
                    deleteList.push(deletedData);
                }
            });
            const response = await deleteRange('paintCabinet/deleterange', deleteList);
            if (response && response.data.code) {
                let newDataList = [...this.state.tableData];
                deleteList.forEach((deletedItems) => {
                    const deletedItemIndex = newDataList.findIndex(x => x.id === deletedItems.id);
                    if (deletedItemIndex >= 0) {
                        newDataList.splice(deletedItemIndex, 1);
                    }
                });
                this.setState(state => ({tableData: newDataList, totalCount: state.totalCount - 1}), () => resolve());
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
    onSwipeDelete = (rowData) => new Promise((resolve, reject) => {
        const deletedDataIndex = this.state.tableData.findIndex(x => x.id === rowData.id);
        if (deletedDataIndex >= 0) {
            this.onDelete({data: [{dataIndex: deletedDataIndex}]}).then(res => resolve()).catch((rej) => reject());
        } else {
            reject();
        }
    });


    ;
    /***
     * Handel Form Cancel
     * **/
    onFormClose = async () => {
        await this.props.closeDialog(false, '');
        this.setState(state => ({formData: paintCabinetModel}));
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
                        isWidthDown('xs', this.props.width) ?
                            /***
                             * Mobile View
                             * **/
                            <MobileView columns={columns}
                                        title={"PAINT CABINET"}
                                        data={this.state.tableData}
                                        nextData={this.getData}
                                        totalCount={this.state.totalCount}
                                        handleClick={this.onUpdate}
                                        handelDelete={this.onSwipeDelete}
                                        sortValue={'Updated At'}
                            />
                            /***
                             * Desktop View
                             * **/
                            : <MUITable title={"PAINT CABINET"}
                                        totalCount={this.state.totalCount}
                                        data={this.state.tableData.sort(sortByUpdatedAt)}
                                        columns={columns}
                                        accessRight={{Create: true, Update: true, Delete: true}}
                                        options={tableCustomizeToolBarSingleSelect}
                                        loading={this.state.loading}
                                        onPageChange={this.getData}
                                        handleUpdate={this.onUpdate}
                                        handelDelete={this.onDelete}
                            />
                    }
                    {
                        /***
                         * * Render Float button for Creation
                         *  if device width is 'SM' and down we will show 'Add' floating button
                         * **/
                        isWidthDown('xs', this.props.width) ?
                            <Fab size="medium" color="secondary" onClick={e => this.props.openDialog(true, 'ADD')}
                                 aria-label="add" style={{
                                flex: 1,
                                position: 'fixed',
                                right: 30,
                                bottom: 30,
                                zIndex: 999,
                                backgroundColor: '#f50057'
                            }}>
                                <AddIcon/>
                            </Fab>
                            : <React.Fragment>
                            </React.Fragment>
                    }
                    {/***
                     * * Material Dialog for Creation and Update
                     * * * * we will render Medium size Dialog for 'MD' and UP
                     * * * * * * and
                     * * * * Full Screen Dialog for 'SM' and Down
                     * **/}
                    <MaxWidthDialog
                        content={<PaintCabinetAddOrEdit dataSet={this.state.formData} handelChange={this.handelChange}
                                                         onFormSubmit={this.state.onProgress}
                                                         formError={this.state.formError}/>}
                        contentTitle={"PAINT CABINET"}
                        formClose={this.onFormClose}
                        formSubmit={this.handelFormSubmit}
                        onFormSubmit={this.state.onProgress}
                    />
                </Grid>
            </Grid>
        );
    }
}

const mapStateToProps = state => ({
    title: state.diagItemActions.title,
    digOpen: state.diagItemActions.digOpen,
});

export default compose(
    withWidth(),
    connect(
        mapStateToProps,
        {openDialog, closeDialog, openSnack, closeSnack, openSpinner},
    )
)(PaintCabinet)
