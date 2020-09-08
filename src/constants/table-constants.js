import CustomTableToolbar from "../shared/mui-datatable/container/custamize-table-toolbar";
import React from "react";


export const tableCustomizeToolBarSingleSelect = {
    filter: true,
    selectableRows: 'multiple',
    filterType: 'dropdown',
    responsive: 'simple',
    rowsPerPage: 10,
    customToolbar: () => {
        return (
            <CustomTableToolbar />
        );
    }
};
