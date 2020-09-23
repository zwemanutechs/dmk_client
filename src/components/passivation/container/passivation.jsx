import React, {Component} from 'react';
import {openSnack, closeSnack} from "../../../shared/snackbar/actions/snackbar-actions";
import {passivationGet} from "../actions/passivation-actions";
import CustomTableToolbar from "../../../shared/mui-datatable/container/custamize-table-toolbar";
import {connect} from "react-redux";
import MUITable from "../../../shared/mui-datatable/container/mui-table";

const columns = [
    {label: 'Concentration', name: 'concentration'},
    {
        label: 'Concentration Below 0.5% Top-up Chemical', name: 'concentrationTopUp', options: {
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

class Passivation extends Component {

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
        this.props.passivationGet(pageNo, pageSize);
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
                case 'sort':
                    this.sort(tableState.page, tableState.sortOrder);
                    break;
                default:
                    console.log('action not handled.');
            }
        }
    });

    render() {
        return (
            <div>
                <MUITable title={"Passivation"} data={this.props.data} columns={columns}
                          options={this.options()}/>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    title: state.diagItemActions.title,
    digOpen: state.diagItemActions.digOpen,
    passivationDataSet: state.passivationItemActions.passivationDataSet,
    snackOpen: state.snackItemActions.snackOpen,
    data: state.passivationItemActions.data,
    count: state.passivationItemActions.count,
    page: state.passivationItemActions.page,
    rowsPerPage: state.passivationItemActions.rowsPerPage,
});


export default connect(
    mapStateToProps,
    {passivationGet, openSnack, closeSnack},
)(Passivation)
