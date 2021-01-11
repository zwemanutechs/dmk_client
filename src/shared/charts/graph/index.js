import React, { Component } from "react";
import NumberFormat from "react-number-format";
import {
    Sparklines,
    SparklinesLine,
    SparklinesReferenceLine,
} from "react-sparklines";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import { loadDataByGivenDate, loadLatestValue } from '../../../appservices/mindsphere-iotapi-services';
import {get} from "../../../middleware/axios-middleware";
import ChangeHistoryIcon from "@material-ui/icons/ChangeHistory";
import DetailsIcon from "@material-ui/icons/Details";
// import CardContent from "@material-ui/core/CardContent";
// import { makeStyles } from "@material-ui/core/styles";
// import { ArrowUpwardOutlined, ArrowDownwardOutlined } from "@material-ui/icons";
// import dashboardTileServices from "../../../appservices/dashboardTileServices/dashboardTileServices";
// import { CircularProgress } from "@material-ui/core";
import Dialogs from "../dialogs";
import {zonedTimeToUtc} from "date-fns-tz";
import format from "date-fns/format";

const COLOR = {
    blue: "#0F3790",
    red: "#EA4E49",
    grey: "#D9D9D9",
};


export default class Graph extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            // chartopen: false,
            target: 90,
            // chartLabels: this.getChartLabels(this.props.trendInterval),
            lastHour: '45%',
            showDialogChart: false,
            currentValue: 0,
            data: [],
            chartData: [],
        };
    }

    componentDidMount() {
        this.loadData();
    }

    loadData = async () => {
        //const weeklyStartDate = startOfWeek(new Date());
        //const weeklyEndDate = endOfWeek(new Date());

        const now = new Date();
        if(this.props.dataPoint === 'mindsphere'){
            const startDate = new Date(new Date().setHours(now.getHours() - 4,0,0,0));
            const endDate = now;
            const fromDate = zonedTimeToUtc(startDate, Intl.DateTimeFormat().resolvedOptions().timeZone);
            const toDate = zonedTimeToUtc(endDate, Intl.DateTimeFormat().resolvedOptions().timeZone);
            const response = await loadDataByGivenDate(fromDate, toDate, this.props.assetId, this.props.aspectName, this.props.variableName, this.props.limit);
            if(response && Array.isArray(response.data) && response.data.length > 0) {
                const lastValue =  response.data[0][this.props.variableName];
                const chartData = response.data.map(data => {
                    return {
                        [this.props.variableName]: data[this.props.variableName],
                        [this.props.dataKey]:format(new Date(data[this.props.dataKey]), 'hh')
                    }
                });
                this.setState(state => ({data: chartData, currentValue: lastValue, isFetching: false}));
            }
        }else{
            const startDate = new Date(new Date(now.setDate(now.getDate() - 1)).setHours(23,59,59));
            const endDate = now;
            const from = zonedTimeToUtc(startDate, Intl.DateTimeFormat().resolvedOptions().timeZone);
            const to = zonedTimeToUtc(endDate, Intl.DateTimeFormat().resolvedOptions().timeZone);
            const response = await get(`${this.props.pathName}/${this.props.endPoint}/${format(new Date(from), 'yyyy-MM-dd\'T\'HH:mm:ss')}/${format(new Date(to), 'yyyy-MM-dd\'T\'HH:mm:ss')}/${this.props.limit}`);
            if(response && response.data && response.data.code && Array.isArray(response.data.data) && response.data.data.length > 0) {
                const lastValue =  response.data.data[0];
                const chartData = response.data.data.map(resData => {
                    return {
                        data: resData.data,
                        [this.props.dataKey]:format(new Date(resData.time), 'hh')
                    }
                });
                this.setState(state => ({data: chartData,currentValue: lastValue, isFetching: false}));
            }
        }
    };

    getChartLabels = (interval) => {
        const today = new Date();
        let labels = [];
        for (let i = 7; i > 0; i--) {
            if (interval === "day") {
                labels.push(
                    new Date(
                        today.getFullYear(),
                        today.getMonth(),
                        today.getDate() - i
                    ).toLocaleString("en-GB", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                    })
                );
            } else if (interval === "month") {
                labels.push(
                    new Date(today.getFullYear(), today.getMonth() - i).toLocaleString(
                        "en-GB",
                        {
                            year: "numeric",
                            month: "short",
                        }
                    )
                );
            }
        }
        return labels;
    };

    render() {

        return (
            <Grid container direction="row" justify="center" alignItems="center">
                <Grid item xs={12} style={{ border: `1px solid ${COLOR.blue}` }}>
                    <Card
                        style={{
                            height: 170,
                            color: COLOR.blue,
                        }}
                        onClick={() => {this.setState({ showDialogChart: !this.state.showDialogChart });}}
                    >
                        <Grid container spacing={1}>
                            <Grid item xs={6}>
                                <div
                                    style={{
                                        width: "100%",
                                        textAlign: "left",
                                        fontSize: "15px",
                                        padding: "3px 0 0 3px",
                                    }}
                                >
                                    Target {this.state.target}
                                </div>
                                <div
                                    style={{
                                        width: "100%",
                                        padding: "3px 0 0 8px",
                                        marginTop: '24px'
                                    }}
                                >
                                    <label
                                        style={{
                                            color: COLOR.blue,
                                            fontSize: 28,
                                            fontWeight: "bold",
                                        }}
                                    >
                                        <NumberFormat
                                            value={this.state.currentValue}
                                            displayType={"text"}
                                            thousandSeparator
                                            fixedDecimalScale={true}
                                            // decimalScale={this.props.decimal}
                                        />
                                    </label>
                                </div>
                                <div
                                    style={{
                                        width: "100%",
                                        textAlign: "left",
                                        fontSize: "15px",
                                        padding: "3px 0 0 3px",
                                    }}
                                >
                                    {this.props.unit}
                                </div>
                            </Grid>
                            <Grid item xs={6}>
                                <div>Last hr</div>
                                <div>
                                    {false ? (
                                        <ChangeHistoryIcon style={{ marginBottom: "-7px" }} />
                                    ) : (
                                        <DetailsIcon
                                            style={{ marginBottom: "-7px", color: COLOR.red }}
                                        />
                                    )}
                                    {this.state.lastHour}
                                </div>
                                <Sparklines data={this.state.data} limit={3}>
                                    <SparklinesLine
                                        style={{ strokeWidth: 3, stroke: COLOR.blue }}
                                    />
                                    <SparklinesReferenceLine
                                        type="mean"
                                        style={{ strokeWidth: 2, stroke: COLOR.red }}
                                    />
                                </Sparklines>
                            </Grid>
                            <Grid item xs={12}>
                                <div
                                    style={{
                                        textAlign: "right",
                                        paddingRight: "4px",
                                        width: "100%",
                                        fontWeight: "900",
                                        fontSize: "23px",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                    }}
                                >
                                    {this.props.title}
                                </div>
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
                <Dialogs
                    data={this.state.chartData}
                    showDialogChart={this.state.showDialogChart}
                    onClose={(showDialogChart) => this.setState({ showDialogChart })}
                />
            </Grid>
        );
    }
}
