import React, {Component, PureComponent, useEffect} from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import { lineChartFetchData } from '../actions/lineChart-actions';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine } from 'recharts';
import {colours} from '../../chart-constants';
import {connect} from "react-redux";

class CustomizedLabel extends PureComponent {
    render() {
        const {
            x, y, stroke, value,
        } = this.props;

        return <text x={x} y={y} dy={-4} fill={stroke} fontSize={12} textAnchor="middle">{value}</text>;
    }
}

class CustomizedAxisTick extends PureComponent {
    render() {
        const {
            x, y, stroke, payload,
        } = this.props;

        return (
            <g transform={`translate(${x},${y})`}>
                <text x={0} y={0} dy={3} textAnchor="end" fill="#666" transform="rotate(-35)">{payload.value}</text>
            </g>
        );
    }
}

function AppLineChart(props) {

    // useEffect(() => fetchData(), []);
    //
    // function fetchData () {
    //     props.lineChartFetchData(props.url, props.keys)
    // }
    return (
        props.loading
            ? <Skeleton variant="rect" width={props.width} height={props.height}/>
            :<LineChart width={props.width} height={props.height} data={props.data} margin={{top: 10, right: 10, left: 10, bottom: 10}}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey={props.xDataKey} fontSize={12} height={60} allowDuplicatedCategory={false} tick={<CustomizedAxisTick />}/>
                        <YAxis/>
                        {
                            Array.isArray(props.referenceLineData) && props.referenceLineData.length > 0
                                ? props.referenceLineData.map((refLine, ri) => ( <ReferenceLine key={`r${ri}`} y={refLine.value} label={refLine.label} stroke="red" />))
                                : null
                        }
                        <Tooltip />
                        {
                            props.keys.map((dataKey, i) => <Line key={`l${i}`} type="monotone" dataKey={dataKey} stroke={colours[i]} strokeWidth={1} label={<CustomizedLabel />}/>)
                        }

            </LineChart>
    );
}

const mapStateToProps = state => ({
    // data: state.lineChartItemActions.data,
    // legendKeys: state.lineChartItemActions.legendKeys,
    // loading: state.lineChartItemActions.loading,
});

export default AppLineChart;
