import React, {Component} from 'react';
import MUIDataTable from "mui-datatables";
import {withStyles} from "@material-ui/styles";
import { CircularProgress, Typography } from '@material-ui/core';

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

    render() {
        return (
            <MUIDataTable title={this.props.title} data={this.props.data} columns={this.props.columns} options={this.props.options}/>
        );
    }
}
export default withStyles(defaultTableStyles, { name: 'MUITable' })(MUITable);
