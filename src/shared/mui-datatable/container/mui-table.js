import React, {Component} from 'react';
import MUIDataTable from "mui-datatables";
import {withStyles} from "@material-ui/styles";
import {Skeleton} from '@material-ui/lab';

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
            <div>
                {this.props.loading?
                <Skeleton width={'100%'} height={200}/>:
                <MUIDataTable title={this.props.title} data={this.props.data} columns={this.props.columns} options={this.props.options}/>}
            </div>
        );
    }
}
export default withStyles(defaultTableStyles, { name: 'MUITable' })(MUITable);
