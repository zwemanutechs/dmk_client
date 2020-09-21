import React, {Component} from 'react';
import MUIDataTable from "mui-datatables";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";
import {withStyles} from "@material-ui/core/styles";
import {tableCustomizeToolBarSingleSelect} from "../../../constants/table-constants";
import MaxWidthDialog from "../../../shared/mat-diaglog/container/mat-dialog";
import Main_layout from "../../../layout/container/main_layout";
import {openDialog, closeDialog} from "../../../shared/mat-diaglog/actions/maxDialog-action";
import {openSnack, closeSnack} from "../../../shared/snackbar/actions/snackbar-actions";
import {rdiOpenDiag, rdiGet, rdiCloseDiag, rdiSave, rdiFormChange} from "../actions/rinseDI-actions";
import RinseDIAddOrEdit from "./rinse-di-addOrEdit";
import CustomTableToolbar from "../../../shared/mui-datatable/container/custamize-table-toolbar";
import rinseDIItemActions from "../reducers/rinseDI-reducer";
import {connect} from "react-redux";
import MUITable from "../../../shared/mui-datatable/container/mui-table";
import {snackSuccess} from "../../../constants/app-constants";
import {get} from "../../../appservices/http-services/httpservices";

const columns = [{label: 'Ph Meter', name: 'phMeter'}, {label: 'Water Guage', name: 'waterGauge'}, {
    label: 'Updated At',
    name: 'updatedat', options: {
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

class RinseDi extends Component {

    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            count: 1,
            rowsPerPage: 10,
            sortOrder: {},
            data: [],
        }
    }

    componentDidMount() {
        this.getData(this.state.page, this.state.rowsPerPage)
    }

    getData(pageNo, pageSize) {
        get(`/rinsedi?pageNo=${pageNo}&pageSize=${pageSize}`).then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.code === true) {
                    this.setState({data: data.data.data, count: data.data.count})
                }
            }).catch(function (err) {
            console.log('Fetch Error :-S', err);
        });
    }

    handelEdit = (rowData, rowMeta) => {
        this.props.rdiOpenDiag(this.state.data[rowMeta.dataIndex], 'UPDATE');
    };

    handelFormClose = () => {
        this.props.rdiCloseDiag();
    };

    handelFormSubmit = () => {
        if (this.props.title === 'UPDATE') {

        } else {
            this.setState(state => ({
                data: [...state.data, this.props.rinseDIDataSet],
                snackOpen: true
            }));
            this.props.rdiCloseDiag();
            this.props.openSnack(true, 'Successfully Save', snackSuccess);
        }
    };

    handelChange = (propertyName, value) => {
        let newState = {...this.props.rinseDIDataSet};
        newState[propertyName] = value;
        this.props.rdiFormChange(newState);
    };

    tableCustomizeToolBarSingleSelect = () => ({
        filter: true,
        selectableRows: 'multiple',
        filterType: 'dropdown',
        responsive: 'simple',
        count: this.state.count,
        rowsPerPage: this.state.rowsPerPage,
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
                    this.getData(tableState.page, tableState.rowsPerPage);
                    break;
                case 'sort':
                    this.sort(tableState.page, tableState.sortOrder);
                    break;
                default:
                    console.log('action not handled.');
            }
        }
        // onRowClick: (rowData, rowMeta) => {
        //     this.handelEdit(rowData, rowMeta);
        // }
    });

    render() {
        return (
            <div>
                <MUITable title={"RINSE DI"} data={this.state.data} columns={columns} options={this.tableCustomizeToolBarSingleSelect()}/>
                <MaxWidthDialog
                    content={<RinseDIAddOrEdit dataSet={this.props.rinseDIDataSet} handelChange={this.handelChange}/>}
                    contentTitle={"RINSE DI"}
                    formClose={this.handelFormClose}
                    formSubmit={this.handelFormSubmit}/>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    title: state.diagItemActions.title,
    digOpen: state.diagItemActions.digOpen,
    rinseDIDataSet: state.rinseDIItemActions.rinseDIDataSet,
    snackOpen: state.snackItemActions.snackOpen,
});


export default connect(
    mapStateToProps,
    {openDialog, rdiOpenDiag, rdiCloseDiag, rdiSave, rdiFormChange, openSnack, closeSnack},
)(RinseDi)
