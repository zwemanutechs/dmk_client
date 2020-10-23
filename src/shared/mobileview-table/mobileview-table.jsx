import React from "react";
//import MobileTable from "../MobileTable";
import MobileTable from "ReactMobileViewTable";

function MobileView(props) {

    return (
        /***
         * Mobile View
         * **/
        <MobileTable columns={props.columns}
                     title={props.title}
                     data={props.data}
                     nextData={props.nextData}
                     totalCount={props.totalCount}
                     handleClick={props.handleClick}
                     handelDelete={props.handelDelete}
                     sortValue={props.sortValue}
        />
    );
}
export default MobileView;
