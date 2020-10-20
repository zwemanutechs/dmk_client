import React, {Component} from 'react';
import {openSnack, closeSnack} from "../../../shared/snackbar/actions/snackbar-actions";
import {openSpinner} from "../../../shared/spinner/actions/spinner-actions";
import { r1FormChange, onDialogClose, onFormSubmition, onRowClick, rinse1Get, rinse1Add, rinse1Update} from "../actions/rinse1-actions";
import {connect} from "react-redux";
import compose from 'recompose/compose'
import MUITable from "../../../shared/mui-datatable/container/mui-table";
import MobileTable from "ReactMobileViewTable";
import {withWidth, isWidthDown} from "@material-ui/core";
import {tableCustomizeToolBarSingleSelect} from "../../../constants/table-constants";
import MaxWidthDialog from "../../../shared/mat-diaglog/container/mat-dialog";
import Grid from "@material-ui/core/Grid";
import RinseOneAddOrEdit from "./rinse1-addOrEdit";
import { openDialog, closeDialog} from '../../../shared/mat-diaglog/actions/maxDialog-action';
import {snackSuccess} from "../../../constants/app-constants";
import Fab from "@material-ui/core/Fab";
import AddIcon from '@material-ui/icons/Add';

const columns = [
    {label: 'Ph Meter', name: 'ph'},
    {label: 'Water Overflow To WasteWater Tank1', name: 'waterOverflowToWasteWaterTank1'},
    {label: 'Water Supply From Tank 3', name: 'waterSupplyFromTank3'},
    {label: 'Water Supply From Tank 6', name: 'waterSupplyFromTank6'},
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

class Rinse1 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sortOrder: {},
        };
    }

    componentDidMount() {
       this.getData(this.props.page, this.props.rowsPerPage)
    }

    async getData(pageNo, pageSize) {
        await this.props.rinse1Get(pageNo, pageSize);
    }

    handelChange = (propertyName, propertyValue) => {
        let newDataSet = this.props.rinse1DataSet;
        this.props.r1FormChange({...newDataSet, [propertyName]: propertyValue});
    };

    handelFormClose = () => {
        this.props.onDialogClose();
    };

    handelFormSubmit = async () => {
        await this.props.onFormSubmition();
        if (this.props.title === 'UPDATE') {
            this.props.rinse1Update(this.props.rinse1DataSet);
        } else {
            this.props.rinse1Add(this.props.rinse1DataSet);
        }
    };

    handelMobileOnAdd = () => {
        this.props.openDialog(true, 'ADD')
    };

    onUpdate = async (rowData, rowMeta) => {
        console.log(rowData, rowMeta);
        const updateData = this.props.data[rowMeta.dataIndex];
        this.props.onRowClick(updateData);
    };

    render() {
        return (
            <Grid container direction="row" justify="center">
                <Grid item xs={12}>
                    {
                        isWidthDown('sm', this.props.width) ?
                            <MobileTable columns={columns} title={"RINSE 1"} data={this.props.data} handleClick={e => console.log(e)}/>
                            :<MUITable title={"RINSE ONE"} data={this.props.data} columns={columns} accessRight={{Create: true, Update: true, Delete: false}} options={tableCustomizeToolBarSingleSelect} loading={this.props.loading} handleUpdate={this.onUpdate}/>
                    }
                    {
                        isWidthDown('sm', this.props.width) ?
                            <Fab size="medium" color="secondary" onClick={this.handelMobileOnAdd} aria-label="add" style={{ flex: 1, position: 'fixed', right: 20, bottom: 10, zIndex: 999, backgroundColor: '#f50057'}}>
                                <AddIcon />
                            </Fab>
                            : <React.Fragment>
                            </React.Fragment>
                    }
                    <MaxWidthDialog
                        content={<RinseOneAddOrEdit dataSet={this.props.rinse1DataSet} handelChange={this.handelChange}  onFormSubmit={this.props.onSubmit} formError={this.props.formError}/>}
                        contentTitle={"RINSE ONE"}
                        formClose={this.handelFormClose}
                        formSubmit={this.handelFormSubmit}
                        onFormSubmit={this.props.onSubmit}
                    />
                </Grid>
            </Grid>
        );
    }
}

const mapStateToProps = state => ({
    title: state.diagItemActions.title,
    digOpen: state.diagItemActions.digOpen,
    rinse1DataSet: state.rinse1ItemActions.rinse1DataSet,
    snackOpen: state.snackItemActions.snackOpen,
    data:state.rinse1ItemActions.data,
    count:state.rinse1ItemActions.count,
    page:state.rinse1ItemActions.page,
    rowsPerPage:state.rinse1ItemActions.rowsPerPage,
    loading:state.rinse1ItemActions.loading,
    onSubmit: state.rinse1ItemActions.onSubmit,
    formError: state.rinse1ItemActions.formError
});


export default compose(
    withWidth(),
    connect(
        mapStateToProps,
        {openDialog, onDialogClose, onFormSubmition, onRowClick, rinse1Get, rinse1Add, rinse1Update, r1FormChange, openSnack, closeSnack,openSpinner},
    )
)(Rinse1)
