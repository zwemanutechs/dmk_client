import React, {Component} from 'react';
import {openSnack, closeSnack} from "../../../shared/snackbar/actions/snackbar-actions";
import {neuEvaporatorGet} from "../actions/neuEvaporator-actions";
import CustomTableToolbar from "../../../shared/mui-datatable/container/custamize-table-toolbar";
import {connect} from "react-redux";
import MUITable from "../../../shared/mui-datatable/container/mui-table";

const columns = [
    {label: 'pH  Tank3', name: 'phTank3'},
    {label: 'Feed Rate Evaporator  Tank 3', name: 'feedRateEvaporatorTank3'},
    {label: 'pH HMI Tank3', name: 'phHmiTank3'},
    {label: 'pH Tank6', name: 'phTank6'},
    {label: 'Water Sample Tank6', name: 'waterSampleInBottleTank6', options: {
            filter: false,
            customBodyRender: (value, tableMeta, updateValue) => (
                <span>
              {value ? 'Good' : 'Bad'}
            </span>
            )
        }},
    {label: 'Conductivity', name: 'conductivity'},
    {label: 'Water Level Tank6', name: 'waterLevelTank6'},
    {label: 'Flow Rate Tank6', name: 'flowRateTank6'},
    {label: 'Water Quality Tank7', name: 'waterQualityTank7', options: {
            filter: false,
            customBodyRender: (value, tableMeta, updateValue) => (
                <span>
              {value ? 'Good' : 'Bad'}
            </span>
            )
        }},
    {label: 'Water Level Tank7', name: 'waterLevelTank7'},
    {label: 'Water Level (Litre) Tank8', name: 'waterLevelLitreTank8'},
    {label: 'Any Abnormal Usage Tank8', name: 'anyAbnormalUsageTank8', options: {
            filter: false,
            customBodyRender: (value, tableMeta, updateValue) => (
                <span>
              {value ? 'Yes' : 'No'}
            </span>
            )
        }},
    {label: 'Water Level (Litre) Tank9', name: 'waterLevelTank9'},
    {label: 'Any Abnormal Usage Tank9', name: 'anyAbnormalUsageTank9', options: {
            filter: false,
            customBodyRender: (value, tableMeta, updateValue) => (
                <span>
              {value ? 'Yes' : 'No'}
            </span>
            )
        }},
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

class NeuEvaporator extends Component {

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
        this.props.neuEvaporatorGet(pageNo, pageSize);
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
                <MUITable title={"Neu Evaporator"} data={this.props.data} columns={columns}
                          options={this.options()}/>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    title: state.diagItemActions.title,
    digOpen: state.diagItemActions.digOpen,
    neuEvaporatorDataSet: state.neuEvaporatorItemActions.neuEvaporatorDataSet,
    snackOpen: state.snackItemActions.snackOpen,
    data: state.neuEvaporatorItemActions.data,
    count: state.neuEvaporatorItemActions.count,
    page: state.neuEvaporatorItemActions.page,
    rowsPerPage: state.neuEvaporatorItemActions.rowsPerPage,
});


export default connect(
    mapStateToProps,
    {neuEvaporatorGet, openSnack, closeSnack},
)(NeuEvaporator)
