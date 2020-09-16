import React, {Component} from 'react';
import MUIDataTable from "mui-datatables";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";
import { withStyles } from "@material-ui/core/styles";
import {tableCustomizeToolBarSingleSelect} from "../../../constants/table-constants";
import MaxWidthDialog from "../../../shared/mat-diaglog/container/mat-dialog";
import Main_layout from "../../../layout/container/main_layout";
import { openDialog, closeDialog } from "../../../shared/mat-diaglog/actions/maxDialog-action";
import { openSnack, closeSnack } from "../../../shared/snackbar/actions/snackbar-actions";
import { rdiOpenDiag, rdiGet, rdiCloseDiag, rdiSave, rdiFormChange } from "../actions/rinseDI-actions";
import RinseDIAddOrEdit from "./rinse-di-addOrEdit";
import CustomTableToolbar from "../../../shared/mui-datatable/container/custamize-table-toolbar";
import rinseDIItemActions from "../reducers/rinseDI-reducer";
import {connect} from "react-redux";
import MUITable from "../../../shared/mui-datatable/container/mui-table";
import {snackSuccess} from "../../../constants/app-constants";

const columns = [{label: 'Ph Meter', name: 'phMeter'},{label: 'Water Guage', name: 'waterGuage'},{label: 'Updated At', name: 'createdAt'},{label: 'Updated By', name: 'createdBy'}];
class RinseDi extends Component{

    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    phMeter: 1.0,
                    waterGuage: 2.0,
                    createdAt: '09-09-2020, 12:14:12 PM',
                    createdBy: 'admin'
                },
                {
                    phMeter: 2.0,
                    waterGuage: 1.2,
                    createdAt: '09-09-2020, 12:24:12 PM',
                    createdBy: 'admin'
                },
            ],
        }
    }

    componentDidMount() {

    }

    handelEdit = (rowData, rowMeta) => {
        this.props.rdiOpenDiag(this.state.data[rowMeta.dataIndex], 'UPDATE');
    };

    handelFormClose = () => {
        this.props.rdiCloseDiag();
    };

    handelFormSubmit= () => {
        if(this.props.title === 'UPDATE'){

        }else{
            this.setState(state => ({
                data: [...state.data, this.props.rinseDIDataSet],
                snackOpen: true
            }));
            this.props.rdiCloseDiag();
            this.props.openSnack(true,  'Successfully Save', snackSuccess);
        }
    };

    handelChange = (propertyName, value) => {
        let newState = {...this.props.rinseDIDataSet};
        newState[propertyName] = value;
        this.props.rdiFormChange(newState);
    };

    tableCustomizeToolBarSingleSelect = () =>({
        filter: true,
        selectableRows: 'multiple',
        filterType: 'dropdown',
        responsive: 'simple',
        rowsPerPage: 10,
        customToolbar: () => {
            return (
                <CustomTableToolbar />
            );
        },
         onRowClick: (rowData, rowMeta) => {
            this.handelEdit(rowData, rowMeta);
        }
    });

    render() {
        return (
            <div>
                <MUITable title={"RINSE 2"} data={this.state.data} columns={columns} options={this.tableCustomizeToolBarSingleSelect()} />
                <MaxWidthDialog
                    content={<RinseDIAddOrEdit dataSet={this.props.rinseDIDataSet} handelChange={this.handelChange}/> }
                    contentTitle={"RINSE 2"}
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
    { openDialog, rdiOpenDiag, rdiCloseDiag, rdiSave, rdiFormChange, openSnack, closeSnack },
)(RinseDi)
