import React, {Component} from 'react';
import {openSnack, closeSnack} from "../../../shared/snackbar/actions/snackbar-actions";
import {openSpinner} from "../../../shared/spinner/actions/spinner-actions";
import { rinse1Get} from "../actions/rinse1-actions";
import CustomTableToolbar from "../../../shared/mui-datatable/container/custamize-table-toolbar";
import {connect} from "react-redux";
import compose from 'recompose/compose'
import MUITable from "../../../shared/mui-datatable/container/mui-table";
import MobileTable from "ReactMobileViewTable";
import {withWidth, isWidthDown} from "@material-ui/core";

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
            data:[{'ph': 1.0, 'waterOverflowToWasteWaterTank1': 2.1, 'waterSupplyFromTank3': 3.1}, {'ph': 1.2, 'waterOverflowToWasteWaterTank1': 1.1, 'waterSupplyFromTank3': 2.1}]
        };
    }

    componentDidMount() {
       this.getData(this.props.page, this.props.rowsPerPage)
    }

    getData(pageNo, pageSize) {
        //this.props.rinse1Get(pageNo, pageSize);
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
            isWidthDown('sm', this.props.width) ? <React.Fragment>
                <MobileTable columns={columns} title={"RINSE 1"} data={this.state.data} handleClick={e => console.log(e)}/>
                </React.Fragment>
                :<React.Fragment>
                    <MUITable title={"RINSE 1"} data={this.props.data} columns={columns} options={this.options()} loading={this.props.loading}/>
                </React.Fragment>
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
});


export default compose(
    withWidth(),
    connect(
        mapStateToProps,
        {rinse1Get, openSnack, closeSnack,openSpinner},
    )
)(Rinse1)
