import React, {Component} from 'react';
import {openSnack, closeSnack} from "../../../shared/snackbar/actions/snackbar-actions";
import {paintCabinetGet} from "../actions/paintCabinet-actions";
import CustomTableToolbar from "../../../shared/mui-datatable/container/custamize-table-toolbar";
import {connect} from "react-redux";
import MUITable from "../../../shared/mui-datatable/container/mui-table";

const columns = [
    {
        label: 'Top Cabinet1 Andon Light Inspection', name: 'topCabinet1AndonLightInspection', options: {
            filter: false,
            customBodyRender: (value, tableMeta, updateValue) => (
                <span>
              {value ? 'Yes' : 'No'}
            </span>
            )
        }
    },
    {label: 'Top Cabinet1 Cabinet Humidity', name: 'topCabinet1CabinetHumidity'},
    {label: 'Top Cabinet1 Cabinet Temperature', name: 'topCabinet1CabinetTemperature'},
    {label: 'Top Cabinet1 DI Water Check', name: 'topCabinet1DiWaterCheck'},
    {label: 'Top Cabinet1 P020 Inlet Tank4', name: 'topCabinet1P020InletTank4'},
    {label: 'Top Cabinet1 P020 Outlet Tank2', name: 'topCabinet1P020OutletTank2'},
    {label: 'Top Cabinet1 P100 Inlet Tank3', name: 'topCabinet1P100InletTank3'},
    {label: 'Top Cabinet1 P190 Inlet Tank2', name: 'topCabinet1P190InletTank2'},
    {label: 'Top Cabinet1 P190 Outlet Tank2', name: 'topCabinet1P190OutletTank2'},
    {label: 'Top Cabinet1 P600 InletTank1', name: 'topCabinet1P600InletTank1'},
    {label: 'Top Cabinet1 P600 Outlet Tank1', name: 'topCabinet1P600OutletTank1'},
    {label: 'Top Cabinet1 Paint Test Temperature', name: 'topCabinet1PaintTestTemperature'},
    {label: 'Top Cabinet1 Paint Test Visocity', name: 'topCabinet1PaintTestVisocity'},
    {
        label: 'Top Cabinet2 Andon Light Inspection', name: 'topCabinet2AndonLightInspection', options: {
            filter: false,
            customBodyRender: (value, tableMeta, updateValue) => (
                <span>
              {value ? 'Yes' : 'No'}
            </span>
            )
        }
    },
    {label: 'Top Cabinet2 Cabinet Humidity', name: 'topCabinet2CabinetHumidity'},
    {label: 'Top Cabinet2 Cabinet Temperature', name: 'topCabinet2CabinetTemperature'},
    {label: 'Top Cabinet2 DI Water Check', name: 'topCabinet2DiWaterCheck'},
    {label: 'Top Cabinet2 HardenerPressureTankTank3', name: 'topCabinet2HardenerPressureTankTank3'},
    {label: 'Top Cabinet2 Hardener Tank3', name: 'topCabinet2HardenerTank3'},
    {label: 'Top Cabinet2 Paint Test Temperature', name: 'topCabinet2PaintTestTemperature'},
    {label: 'Top Cabinet2 Paint Test Visocity', name: 'topCabinet2PaintTestVisocity'},
    {
        label: 'Updated At', name: 'updatedat', options: {
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
    }, {label: 'Updated By', name: 'updatedby'}];

class PaintCabinet extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sortOrder: {},
        }
    }

    componentDidMount() {
        this.getData(this.props.page, this.props.rowsPerPage)
    }

    getData(pageNo, pageSize) {
        this.props.paintCabinetGet(pageNo, pageSize);
    }

    options = () => ({
        filter: true,
        selectableRows: false,
        filterType: 'dropdown',
        responsive: 'simple',
        count: this.props.count,
        customToolbar: () => {
            return (
                <CustomTableToolbar/>
            );
        },
        serverSide: true,
        onTableChange: (action, tableState) => {
            console.log(action, tableState);
            switch (action) {
                case 'changePage':
                case 'changeRowsPerPage':
                    this.getData(tableState.page, tableState.rowsPerPage);
                    break;
                //case 'sort':
                    //this.sort(tableState.page, tableState.sortOrder);
                    //break;
                default:
                    console.log('action not handled.');
            }
        }
    });

    render() {
        return (
            <div>
                <MUITable title={"Paint Cabinet"} data={this.props.data} columns={columns}
                          options={this.options()}/>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    title: state.diagItemActions.title,
    digOpen: state.diagItemActions.digOpen,
    paintCabinetDataSet: state.paintCabinetItemActions.paintCabinetDataSet,
    snackOpen: state.snackItemActions.snackOpen,
    data: state.paintCabinetItemActions.data,
    count: state.paintCabinetItemActions.count,
    page: state.paintCabinetItemActions.page,
    rowsPerPage: state.paintCabinetItemActions.rowsPerPage,
});


export default connect(
    mapStateToProps,
    {paintCabinetGet, openSnack, closeSnack},
)(PaintCabinet)
