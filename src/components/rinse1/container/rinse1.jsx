import React, {Component} from 'react';
import {openSnack, closeSnack} from "../../../shared/snackbar/actions/snackbar-actions";
import { r1Get} from "../actions/rinse1-actions";
import CustomTableToolbar from "../../../shared/mui-datatable/container/custamize-table-toolbar";
import {connect} from "react-redux";
import MUITable from "../../../shared/mui-datatable/container/mui-table";

const columns = [{label: 'Ph Meter', name: 'ph'}, {label: 'Water Overflow To WasteWater Tank1', name: 'waterOverflowToWasteWaterTank1'},
    {label: 'Water Supply From Tank 3', name: 'waterSupplyFromTank3'},
    {label: 'Water Supply From Tank 6', name: 'waterSupplyFromTank6'},
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

class Rinse1 extends Component {

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
        this.props.r1Get(pageNo, pageSize);
    }

    tableCustomizeToolBarSingleSelect = () => ({
        filter: true,
        selectableRows: 'multiple',
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
                <MUITable title={"RINSE 1"} data={this.props.data} columns={columns} options={this.tableCustomizeToolBarSingleSelect()}/>
            </div>
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
});


export default connect(
    mapStateToProps,
    {r1Get, openSnack, closeSnack},
)(Rinse1)
