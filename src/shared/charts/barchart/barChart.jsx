import React, {Component, PureComponent, useEffect, useState} from 'react';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import {zonedTimeToUtc} from "date-fns-tz";
import {loadDataByGivenDate, loadLatestValue} from "../../../appservices/mindsphere-iotapi-services";
import format from "date-fns/format";
import {get} from "../../../middleware/axios-middleware";
import {withStyles} from "@material-ui/styles";

const useStyles = theme => ({

});

function ReactBarChart (props){
    const[data, setData] = useState([]);
    const[isFetching, setIsFetching] = useState(true);
    const defaultColors = ['#154a98', '#ff1029', '#b2b2b2', '#E9C94B'];

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const now = new Date();
        if(props.dataPoint === 'mindsphere'){
            if(props.chartType === 'single'){
                const startDate = new Date(new Date().setHours(now.getHours() - 4,0,0,0));
                const endDate = now;
                const fromDate = zonedTimeToUtc(startDate, Intl.DateTimeFormat().resolvedOptions().timeZone);
                const toDate = zonedTimeToUtc(endDate, Intl.DateTimeFormat().resolvedOptions().timeZone);
                const response = await loadDataByGivenDate(fromDate, toDate, props.assetId, props.aspectName, props.variableName, props.limit);
                if(response && Array.isArray(response.data) && response.data.length > 0) {
                    const chartData = response.data.map(data => {
                        let chartObj = {};
                        props.labels.forEach(lbl => {
                            chartObj.name = lbl.label;
                            chartObj[lbl.variable] = data[lbl.variable];
                        });
                        return chartObj;
                    });
                    setData(chartData);
                }else{
                    const dataSet = props.labels.map(lbl => {
                        return {name:  lbl.label, [lbl.variable] : 0};
                    });
                    setData(dataSet);
                }
            }
            else{
                let chartDataSet = [];
                for (let lbl of props.labels){
                    const response = await loadLatestValue(lbl.assetId, lbl.aspectName, lbl.variable);
                    if(response && response.data && Array.isArray(response.data) && response.data.length > 0 ){
                        chartDataSet.push({name: lbl.label, [lbl.variable]: response.data[0][lbl.variable]});
                    }else{
                        chartDataSet.push({name: lbl.label, [lbl.variable]: 0});
                    }
                }
                setData(chartDataSet);
            }
            setIsFetching(false);
        }else{
            const startDate = new Date(new Date(now.setDate(now.getDate() - 1)).setHours(23,59,59));
            const endDate = now;
            const from = zonedTimeToUtc(startDate, Intl.DateTimeFormat().resolvedOptions().timeZone);
            const to = zonedTimeToUtc(endDate, Intl.DateTimeFormat().resolvedOptions().timeZone);
            const response = await get(`${props.pathName}/${props.endPoint}/${format(new Date(from), 'yyyy-MM-dd\'T\'HH:mm:ss')}/${format(new Date(to), 'yyyy-MM-dd\'T\'HH:mm:ss')}/${props.limit}`);
            if(response && response.data && response.data.code && Array.isArray(response.data.data) && response.data.data.length > 0) {
                const chartData = response.data.map(data => {
                    let chartObj = {};
                    props.labels.forEach(lbl => {
                        chartObj.name = lbl.label;
                        chartObj[lbl.variable] = data.data;
                    });
                    return chartObj;
                });
                setData(chartData);
            }
            else{
                const dataSet = props.labels.map(lbl => {
                    return {name:  lbl.label, [lbl.variable] : 0};
                });
                setData(dataSet);
            }
        }
    };

    return (
        <ResponsiveContainer width={props.width} height={props.height}>
            <BarChart data={data} margin={{top: 15, right: 15, left: 15, bottom: 5}}>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="name"/>
                <Tooltip/>
                {
                    Array.isArray(data) && data.length > 0 && <Bar dataKey={props.labels[0].variable} fill={defaultColors[0]} label={{ position: 'top' }}/>
                }
            </BarChart>
        </ResponsiveContainer>
    )
}

export default withStyles(useStyles, { withTheme: true })(ReactBarChart);
