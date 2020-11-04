import React, {Component} from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import AppLineChart from "../../charts/line/container/lineChart";
import { startOfWeek, endOfWeek, zone } from 'date-fns';
import {get, getFromOtherOrigin} from "../../../middleware/axios-middleware";
import { zonedTimeToUtc } from 'date-fns-tz';
import format  from 'date-fns/format';
import {loadDataByGivenDate} from "../../../appservices/mindsphere-iotapi-services";

class MindAspectDashboard extends Component{

    constructor(props) {
        super(props);
        this.state = {
            isFetching: true,
            data: []
        }
    }

    componentDidMount() {
        this.loadData();
        setInterval(this.loadData, 30000);
    }

    loadData = async () => {
        //const weeklyStartDate = startOfWeek(new Date());
        //const weeklyEndDate = endOfWeek(new Date());

        const startDate = new Date(new Date().setHours(0,59,59,59));
        const endDate =new Date(new Date().setHours(23,59,59,59));
        const fromDate = zonedTimeToUtc(startDate, Intl.DateTimeFormat().resolvedOptions().timeZone);
        const toDate = zonedTimeToUtc(endDate, Intl.DateTimeFormat().resolvedOptions().timeZone);

        if(this.props.dataPoint === 'mindsphere'){
            const response = await loadDataByGivenDate(fromDate, toDate, this.props.assetId, this.props.assetName, this.props.variableName, this.props.limit);
            if(response && Array.isArray(response.data) && response.data.length > 0) {
                const chartData = response.data.reverse().map(data => {
                    return {
                        [this.props.variableName]: data[this.props.variableName],
                        [this.props.dataKey]:format(new Date(data[this.props.dataKey]), 'hh')
                    }
                });
                this.setState(state => ({data: chartData, isFetching: false}));
            }
        }else{
            const response = await get(`${this.props.pathName}/${this.props.endPoint}/${format(new Date(startDate), 'yyyy-MM-dd\'T\'HH:mm:ss')}/${format(new Date(endDate), 'yyyy-MM-dd\'T\'HH:mm:ss')}/${this.props.limit}`);
            if(response && response.data && response.data.code && Array.isArray(response.data.data) && response.data.data.length > 0) {
                const chartData = response.data.data.reverse().map(resData => {
                    return {
                        data: resData.data,
                        [this.props.dataKey]:format(new Date(resData.time), 'hh')
                    }
                });
                this.setState(state => ({data: chartData, isFetching: false}));
            }
        }
    };

    render() {
        return (
            <React.Fragment>
                <Grid item xs={12} style={{textAlign: "center"}}>
                    <Typography style={{color: 'blue'}} gutterBottom>
                        {this.props.title}
                    </Typography>
                </Grid>
                {
                    Array.isArray(this.state.data) && this.state.data.length > 0 ?
                        <AppLineChart
                            key={1}
                            data={this.state.data}
                            loading={this.state.isFetching}
                            keys={this.props.keys}
                            width={350}
                            height={300}
                            xDataKey={this.props.dataKey}
                            referenceLineData={this.props.referenceLineData}
                        />
                        :<div style={{width: 350, height: 300, textAlign: 'center'}}>
                        <h4>No Data</h4>
                        </div>
                }
                <Grid item xs={12} style={{textAlign: "center"}}>
                    <Typography variant="overline"  color="textSecondary" gutterBottom>
                        <strong>Current Value: {Array.isArray(this.state.data) && this.state.data.length > 0 ? this.state.data[this.state.data.length - 1][this.props.variableName] : 0}</strong>
                    </Typography>
                </Grid>
            </React.Fragment>
        );
    }
}
export default MindAspectDashboard;
