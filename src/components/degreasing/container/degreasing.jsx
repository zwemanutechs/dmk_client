import React, {Component} from 'react';
import {openSnack, closeSnack} from "../../../shared/snackbar/actions/snackbar-actions";
import {degreasingGet} from "../actions/degreasing-actions";
import CustomTableToolbar from "../../../shared/mui-datatable/container/custamize-table-toolbar";
import {connect} from "react-redux";
import MUITable from "../../../shared/mui-datatable/container/mui-table";

const columns = [
    {label: 'Concentration', name: 'concentration'},
    {label: 'Oil Skimming', name: 'oilSkimming'},
    {label: 'Water Supply From Tank 2', name: 'waterSupplyFromTank2'},
    {
        label: 'Concentration Below 2% Top-up Chemical', name: 'concentrationTopUp', options: {
            filter: false,
            customBodyRender: (value, tableMeta, updateValue) => (
                <span>
              {value ? 'Yes' : 'No'}
            </span>
            )
        }
    },
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

class Degreasing extends Component {

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
        this.props.degreasingGet(pageNo, pageSize);
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
                <MUITable title={"Degreasing"} data={this.props.data} columns={columns} options={this.options()} loading={this.props.loading}/>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    title: state.diagItemActions.title,
    digOpen: state.diagItemActions.digOpen,
    degreasingDataSet: state.degreasingItemActions.degreasingDataSet,
    snackOpen: state.snackItemActions.snackOpen,
    data: state.degreasingItemActions.data,
    count: state.degreasingItemActions.count,
    page: state.degreasingItemActions.page,
    rowsPerPage: state.degreasingItemActions.rowsPerPage,
    loading: state.degreasingItemActions.loading,
});


export default connect(
    mapStateToProps,
    {degreasingGet, openSnack, closeSnack},
)(Degreasing)
