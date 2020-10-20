import React, {Component} from 'react';
import MUIDataTable from "mui-datatables";
import {withStyles} from "@material-ui/styles";
import {Skeleton} from '@material-ui/lab';
import CustomTableToolbar from "./custamize-table-toolbar";

const defaultTableStyles = theme => ({
    root: {},
    paper: {},
    paperResponsiveScrollFullHeightFullWidth: {
        position: 'absolute',
    },
    tableRoot: {
        outline: 'none',
    },
    responsiveBase: {
        overflow: 'auto',
        '@media print': {
            height: 'auto !important',
        },
    },
});

class MUITable extends Component{

    constructor(props) {
        super(props);
    }

    configureAccessRight = () => {
        let tableOptions = this.props.options;
        if(this.props.accessRight && this.props.accessRight.Create){
            tableOptions = Object.assign({}, tableOptions, {customToolbar: () => <CustomTableToolbar/>});
        }
        if(this.props.accessRight && this.props.accessRight.Update){
            tableOptions = Object.assign({}, tableOptions, {onRowClick: (rowData, rowMeta) => this.props.handleUpdate(rowData, rowMeta)});
        }
        if(this.props.accessRight && this.props.accessRight.Delete){
            tableOptions = Object.assign({}, tableOptions, {selectableRows: 'multiple'});
        }
        return tableOptions;
    };

    render() {
        return (
            <div>
                {this.props.loading?
                <Skeleton width={'100%'} height={200}/>:
                <MUIDataTable title={this.props.title} data={this.props.data} columns={this.props.columns} options={this.configureAccessRight()}/>}
            </div>
        );
    }
}
export default withStyles(defaultTableStyles, { name: 'MUITable' })(MUITable);
