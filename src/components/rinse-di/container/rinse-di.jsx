import React, {Component} from 'react';
import MUIDataTable from "mui-datatables";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";
import {withStyles} from "@material-ui/core/styles";
import {options} from "../../../constants/table-constants";
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
            sortOrder: {},
        }
    }

    componentDidMount() {
       this.getData(this.props.page, this.props.rowsPerPage)
    }

    getData(pageNo, pageSize) {
        this.props.rdiGet(pageNo, pageSize);
    }

    handelEdit = (rowData, rowMeta) => {
        this.props.rdiOpenDiag(this.props.data[rowMeta.dataIndex], 'UPDATE');
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
        // onRowClick: (rowData, rowMeta) => {
        //     this.handelEdit(rowData, rowMeta);
        // }
    });

    render() {
        return (
            <div>
                <MUITable title={"RINSE DI"} data={this.props.data} columns={columns} options={this.options()}/>
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
    data:state.rinseDIItemActions.data,
    count:state.rinseDIItemActions.count,
    page:state.rinseDIItemActions.page,
    rowsPerPage:state.rinseDIItemActions.rowsPerPage,
});


export default connect(
    mapStateToProps,
    {rdiGet,openDialog, rdiOpenDiag, rdiCloseDiag, rdiSave, rdiFormChange, openSnack, closeSnack},
)(RinseDi)
