import React, {Component} from 'react';
import {openSnack, closeSnack} from "../../../shared/snackbar/actions/snackbar-actions";
import {openSpinner} from "../../../shared/spinner/actions/spinner-actions";
import { conversionGet} from "../actions/conversion-actions";
import CustomTableToolbar from "../../../shared/mui-datatable/container/custamize-table-toolbar";
import {connect} from "react-redux";
import MUITable from "../../../shared/mui-datatable/container/mui-table";

const columns = [
    {label: 'Water Guage', name: 'waterGuage'},
    {
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

class Conversion extends Component {

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
        this.props.conversionGet(pageNo, pageSize);
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
                <MUITable title={"CONVERSION"} data={this.props.data} columns={columns} options={this.options()} loading={this.props.loading}/>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    title: state.diagItemActions.title,
    digOpen: state.diagItemActions.digOpen,
    conversionDataSet: state.conversionItemActions.conversionDataSet,
    snackOpen: state.snackItemActions.snackOpen,
    data:state.conversionItemActions.data,
    count:state.conversionItemActions.count,
    page:state.conversionItemActions.page,
    rowsPerPage:state.conversionItemActions.rowsPerPage,
    loading:state.conversionItemActions.loading
});


export default connect(
    mapStateToProps,
    {conversionGet, openSnack, closeSnack,openSpinner},
)(Conversion)
