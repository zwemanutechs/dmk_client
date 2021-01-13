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
            lastHour: '0%',
            dialogOpen: false,
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
                const lastValue = response.data[0][this.props.variableName] > 0 ? parseFloat(response.data[0][this.props.variableName]).toFixed(2) : response.data[0][this.props.variableName];
                const firstValue = response.data[response.data.length - 1][this.props.variableName];
                let lhDif = '0';
                if (lastValue > 0 && firstValue > 0){
                    const lastHourDif = Math.abs((lastValue - firstValue)/firstValue) * 100;
                    lhDif = `${parseFloat(lastHourDif).toFixed(2)}%`;
                }

                const chartData = response.data.map(data => data[this.props.variableName]);
                this.setState(state => ({data: chartData, currentValue: lastValue , isFetching: false, lastHour: lhDif}));
            }
        }else{
            const startDate = new Date(new Date(new Date().setDate(now.getDate() - 1)).setHours(23,59,59));
            const endDate = now;
            const from = format(startDate, 'yyyy-MM-dd\'T\'HH:mm:ss');
            const to = format(now, 'yyyy-MM-dd\'T\'HH:mm:ss');
            const response = await get(`${this.props.pathName}/${this.props.endPoint}/${from}/${to}/${this.props.limit}`);
            if(response && response.data && response.data.code && Array.isArray(response.data.data) && response.data.data.length > 0) {
                const lastValue =  response.data.data[0][this.props.variableName] > 0 ? parseFloat(response.data.data[0][this.props.variableName]).toFixed(2):response.data.data[0][this.props.variableName];
                const firstValue = response.data.data[response.data.data.length - 1][this.props.variableName];
                let lhDif = '0';
                if (lastValue > 0 && firstValue > 0){
                    const lastHourDif = Math.abs((lastValue - firstValue)/firstValue) * 100;
                    lhDif = `${parseFloat(lastHourDif).toFixed(2)}%`;
                }
                const chartData = response.data.data.map(resData => resData.data);
                this.setState(state => ({data: chartData,currentValue: lastValue, isFetching: false, lastHour: lhDif}));
            }
        }
    };

    /**
     * Daryl Code
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
     */

    handleDialog = () => {
        this.setState({dialogOpen: !this.state.dialogOpen});
    }

    render() {

        return (
            <Grid container direction="row" justify="center" alignItems="center">
                <Grid item xs={12} style={{ border: `1px solid ${COLOR.blue}` }}>
                    <Card
                        style={{
                            height: 170,
                            color: COLOR.blue,
                        }}
                        onClick={this.handleDialog}
                    >
                        <Grid container spacing={1}>
                            <Grid item xs={6}>
                                <div
                                    style={{
                                        width: "100%",
                                        textAlign: "left",
                                        fontSize: "12.5px",
                                        padding: "3px 0 0 3px",
                                    }}
                                >
                                    Target: <strong>{this.props.target}</strong>
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
                                            color: this.props.LL > this.state.currentValue || this.props.HH < this.state.currentValue ? COLOR.red:COLOR.blue,
                                            fontSize: 28,
                                            fontWeight: "bold",
                                        }}
                                    >
                                        <NumberFormat
                                            value={this.state.currentValue}
                                            displayType={"text"}
                                            thousandSeparator
                                            fixedDecimalScale
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
                {this.state.dialogOpen && <Dialogs
                    title={this.props.title}
                    showDialogChart={this.state.dialogOpen}
                    onClose={this.handleDialog}
                    assetId={this.props.assetId}
                    aspectName={this.props.aspectName}
                    parameterName={this.props.variableName}
                    pathName={this.props.pathName}
                    endPoint={this.props.endPoint}
                    dataPoint={this.props.dataPoint}
                    limit={1000}
                    LL={this.props.LL}
                    HH={this.props.HH}
                />}

            </Grid>
        );
    }
}
