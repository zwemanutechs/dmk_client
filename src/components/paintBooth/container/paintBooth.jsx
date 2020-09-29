import React, {Component} from 'react';
import {openSnack, closeSnack} from "../../../shared/snackbar/actions/snackbar-actions";
import {paintBoothGet} from "../actions/paintBooth-actions";
import CustomTableToolbar from "../../../shared/mui-datatable/container/custamize-table-toolbar";
import {connect} from "react-redux";
import MUITable from "../../../shared/mui-datatable/container/mui-table";

const columns = [
    {label: 'High Tension ESTA1 R11', name: 'highTensionEsta1R11'},
    {label: 'High Tension ESTA1 R12', name: 'highTensionEsta1R12'},
    {label: 'High Tension ESTA2 R11', name: 'highTensionEsta2R11'},
    {label: 'Paint Pressure', name: 'paintPressure'},
    {label: 'Paint Pressure At R11', name: 'paintPreasureAtR11'},
    {label: 'Paint Pressure At R12', name: 'paintPreasureAtR12'},
    {label: 'Touch Up Room 1 Air Flow', name: 'touchUpRoom1AirFlow'},
    {label: 'Touch Up Room 2 Air Flow', name: 'touchUpRoom2AirFlow'},
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

class PaintBooth extends Component {

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
        this.props.paintBoothGet(pageNo, pageSize);
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
                <MUITable title={"Paint Booth"} data={this.props.data} columns={columns} options={this.options()} loading={this.props.loading}/>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    title: state.diagItemActions.title,
    digOpen: state.diagItemActions.digOpen,
    paintBoothDataSet: state.paintBoothItemActions.paintBoothDataSet,
    snackOpen: state.snackItemActions.snackOpen,
    data: state.paintBoothItemActions.data,
    count: state.paintBoothItemActions.count,
    page: state.paintBoothItemActions.page,
    rowsPerPage: state.paintBoothItemActions.rowsPerPage,
    loading: state.paintBoothItemActions.loading,
});


export default connect(
    mapStateToProps,
    {paintBoothGet, openSnack, closeSnack},
)(PaintBooth)
