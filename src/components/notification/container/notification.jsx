import React, {Component, PureComponent} from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import NotificationCard from "../../../shared/notification-card/container/notificationCard";
import {withStyles} from "@material-ui/core/styles";
import { withWidth, isWidthDown } from "@material-ui/core";
import MUITable from "../../../shared/mui-datatable/container/mui-table";
import MobileView from "../../../shared/mobileview-table/mobileview-table";
import { sortByUpdatedAt } from "../../../appservices/app-services";
import { tableCustomizeToolBarSingleSelect } from "../../../constants/table-constants";
import compose from "recompose/compose";
import {
  get,
  post,
  put,
  deleteRange,
} from "../../../middleware/axios-middleware";

const useStyles = theme => ({
});

const columns = [
    { label: "Message", name: "message" },
    { label: "Actual Value", name: "actualValue" },
    {
      label: "Acknowledge",
      name: "acknowledge",
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => (
            <span>{value ? "Yes" : "No"}</span>
        ),
      },
    },
    {
      label: "Notified",
      name: "notified",
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => (
            <span>{value ? "Yes" : "No"}</span>
        ),
      },
    },
    {
      label: "Updated At",
      name: "updatedat",
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
              second: "numeric",
            })}
          </span>
        ),
      },
    },
  ];

class Notification extends PureComponent {    
  constructor(props) {
    super(props);
    this.state = {
      tableData: [],
      totalCount: 0,
      loading: true,
      onProgress: false,
    };
  }

  async componentDidMount() {
    await this.getData(this.props.page, this.props.rowsPerPage);
  }

  /***
   * Fetch the Data
   * **/
  getData = async (pageNo) => {
    const response = await get(
      `NotificationMessage?pageNo=${pageNo === undefined ? 0 : pageNo}&pageSize=${10}`
    );
    if (response) {
      this.setState((state) => ({
        tableData: response.data.data.data,
        totalCount: response.data.data.count,
        loading: false,
      }));
    }
  };
  
  render() {
    return (
      <Grid container direction="row" justify="center">
        <Grid item xs={12}>
          {
            /***
             * ** Render according to device break point
             *  'SM' and down for Mobile View
             *  'MD' and up for Desktop view
             * ***/
            isWidthDown("xs", this.props.width) ? (
              /***
               * Mobile View
               * **/
              <MobileView
                columns={columns}
                title={"Notification"}
                data={this.state.tableData}
                nextData={this.getData}
                totalCount={this.state.totalCount}
                sortValue={"Updated At"}
              />
            ) : (
              /***
               * Desktop View
               * **/
              <MUITable
                title={"Notification"}
                totalCount={this.state.totalCount}
                data={this.state.tableData.sort(sortByUpdatedAt)}
                columns={columns}
                accessRight={{ Create: false, false: true, Delete: false }}
                options={tableCustomizeToolBarSingleSelect}
                loading={this.state.loading}
                //onPageChange={this.getData}
              />
            )
          }
        </Grid>
      </Grid>
    );
  }

    // render() {
    //     return (
    //         <Grid container direction="row" wrap="wrap" spacing={2}>
    //             <Grid item lg={12}>
    //                 <Typography variant="h4" component="h4">
    //                     Notification
    //                 </Typography>
    //             </Grid>
    //             <Grid item xs={12} md={4}>
    //                 <NotificationCard
    //                     formName='DEGREASING'
    //                     title='DEGREASING(TANK 01)'
    //                 />
    //             </Grid>
    //             <Grid item xs={12} md={4}>
    //                 <NotificationCard
    //                     formName='RINSEONE'
    //                     title='WATER RINSE (TANK 2)'
    //                 />
    //             </Grid>
    //             <Grid item xs={12} md={4}>
    //                 <NotificationCard
    //                     formName='RINSETWO'
    //                     title='WATER RINSE (TANK 3)'
    //                 />
    //             </Grid>
    //             <Grid item xs={12} md={4}>
    //                 <NotificationCard
    //                     formName='RINSETHREE'
    //                     title='WATER RINSE (TANK 4)'
    //                 />
    //             </Grid>
    //             <Grid item xs={12} md={4}>
    //                 <NotificationCard
    //                     formName='DIRINSE'
    //                     title='DI WATER RINSE (TANK 5)'
    //                 />
    //             </Grid>
    //             <Grid item xs={12} md={4}>
    //                 <NotificationCard
    //                     formName='PASSIVATION'
    //                     title='PASSIVATION (TANK 6)'
    //                 />
    //             </Grid>
    //             <Grid item xs={12} md={4}>
    //                 <NotificationCard
    //                     formName='NEUEVAP'
    //                     title='NEUTRALIZATION (TANK 03-09)'
    //                 />
    //             </Grid>
    //             <Grid item xs={12} md={4}>
    //                 <NotificationCard
    //                     formName='CONVERSION'
    //                     title='DISTILLED WATER(TANK 05)'
    //                 />
    //             </Grid>
    //             <Grid item xs={12} md={4}>
    //                 <NotificationCard
    //                     formName='PAINTBOOTH'
    //                     title='PAINT BOOTH'
    //                 />
    //             </Grid>
    //             <Grid item xs={12} md={4}>
    //                 <NotificationCard
    //                     formName='PRIMERCABINETONE'
    //                     title='PRIMER CABINET 1'
    //                 />
    //             </Grid>
    //             <Grid item xs={12} md={4}>
    //                 <NotificationCard
    //                     formName='PRIMERCABINETTWO'
    //                     title='PRIMER CABINET 2'
    //                 />
    //             </Grid>
    //             <Grid item xs={12} md={4}>
    //                 <NotificationCard
    //                     formName='TOPCOATCABINETONE'
    //                     title='TOPCOAT CABINET 1'
    //                 />
    //             </Grid>
    //             <Grid item xs={12} md={4}>
    //                 <NotificationCard
    //                     formName='TOPCOATCABINETTWO'
    //                     title='TOPCOAT CABINET 2'
    //                 />
    //             </Grid>
    //         </Grid>
    //     )
    // }
}
export default compose(
  withWidth(),
)(Notification);
