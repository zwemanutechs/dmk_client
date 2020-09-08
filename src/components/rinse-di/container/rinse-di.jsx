import React, {Component} from 'react';
import MUIDataTable from "mui-datatables";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";
import { withStyles } from "@material-ui/core/styles";
import {tableCustomizeToolBarSingleSelect} from "../../../constants/table-constants";

const columns = ["Ph Meter", "Water Guage", "Updated By", "Updated At"];
class RinseDi extends Component{

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <MUIDataTable title={"RINSE DI"} data={[]} columns={columns} options={tableCustomizeToolBarSingleSelect} />
        );
    }
}

export default RinseDi
