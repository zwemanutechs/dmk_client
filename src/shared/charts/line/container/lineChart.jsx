import React, { Component, useEffect } from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import { lineChartFetchData } from '../actions/lineChart-actions';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import {colours} from '../../chart-constants';
import {connect} from "react-redux";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

function AppLineChart(props) {

    useEffect(() => {
        fetchData();
    }, []);

    function fetchData () {
        props.lineChartFetchData('https://covidapi.info/api/v1/country/SGP/timeseries/2020-03-15/2020-04-25', ['confirmed', 'deaths', 'recovered'])
    }

    return (
        props.loading
            ? <Skeleton variant="rect" width={300} height={300} />
            :<Card style={{maxWidth: 300}}>
                    <LineChart width={290} height={300} data={props.data} style={{margin: 5}}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        {
                            props.legendKeys.map((dataKey, i) => <Line key={i} type="monotone" dataKey={dataKey} stroke={colours[i]}  activeDot={{ r: 8 }}/>)
                        }

                    </LineChart>
            </Card>
    );
}

const mapStateToProps = state => ({
    data: state.lineChartItemActions.data,
    loading: state.lineChartItemActions.loading,
    legendKeys: state.lineChartItemActions.legendKeys
});

export default connect(
    mapStateToProps,
    {lineChartFetchData}
)(AppLineChart)
