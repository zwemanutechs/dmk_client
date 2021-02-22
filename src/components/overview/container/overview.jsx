import React, { useEffect, useState } from "react";
import {makeStyles, withStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Graph from "../../../shared/charts/graph";
import "./index.css";
import {OVEN_ASSETID, PAINTBOOTH_ASSETID, POWERWASH_ASSETID} from "../../../constants/mindsphere-constants";
import CircleGauge from "../../../shared/charts/guage/guage";

const COLOR = {
    blue: "#0F3790",
    red: "#EA4E49",
    grey: "#D9D9D9",
};

const useStyles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(0),
        textAlign: "center",
        COLOR: theme.palette.text.secondary,
    },
});

class OverView extends React.PureComponent{
    render() {
        return (
            <div className={this.props.classes.root}>
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <div style={{fontSize: 32, marginTop: 5,color:'#0f3790', fontWeight: 900}}>Overview-Paint Dashboard</div>
                    </Grid>
                    {/**Row**/}
                    <Grid item xs={12} md={6} lg={6}>
                        <Grid container spacing={1}>
                            {/***
                             WATER DRYER
                             **/}
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <div style={{fontSize: 16,color:'#0f3790', fontWeight: 900}}>Water Dryer</div>
                            </Grid>
                            {/** Water Dryer Heater_Temperature */}
                            <Grid key={'Heater_Temperature'} item xs={12} sm={12} md={4} lg={4}>
                                <Graph
                                    assetId={OVEN_ASSETID}
                                    aspectName="WaterDryer"
                                    variableName="RoomTemperature_degC"
                                    limit={3}
                                    unit={'oC'}
                                    dataKey={'_time'}
                                    dataPoint='mindsphere'
                                    title="Temperature"
                                    target={'55-65'}
                                    LL={55}
                                    HH={65}
                                />
                            </Grid>
                            {/** End*/}
                            {/** Water Dryer Humidity **/}
                            <Grid key={'Humidity'} item xs={12} sm={12} md={4} lg={4}>
                                <CircleGauge
                                    title={'Humidity'}
                                    assetId={OVEN_ASSETID}
                                    aspectName={'WaterDryer'}
                                    parameterName={'Room_Humidity_Pct'}
                                    dataPoint='mindsphere'
                                    border={true}
                                    subTitle={''}
                                    range={[
                                        {value:17,color:"#b2b2b2"},
                                        {value:24,color:"#154a98"},
                                        {value:31,color:"#ff1029"}
                                    ]}
                                    unit={'%'}
                                    min={10}
                                    max={31}
                                    LL={17}
                                    HH={22}
                                />
                            </Grid>
                            {/** End **/}
                            {/** Water Dryer Air Flow **/}
                            <Grid key={'AirFlow'} item xs={12} sm={12} md={4} lg={4}>
                                <Graph
                                    assetId={OVEN_ASSETID}
                                    aspectName="WaterDryer"
                                    variableName="Inlet_Airflow_mpsec"
                                    limit={3}
                                    unit={'m/sec'}
                                    dataKey={'_time'}
                                    dataPoint='mindsphere'
                                    title="Air Flow"
                                    target={'0.75-0.95'}
                                    LL={0.75}
                                    HH={0.95}
                                />
                            </Grid>
                            {/** End **/}
                            {/***
                             END
                             **/}
                            {/****
                             FINAL OVEN
                             ***/}
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <div style={{fontSize: 16,color:'#0f3790', fontWeight: 900}}>Final Oven 1</div>
                            </Grid>
                            {/** Final Oven 1 Temperature */}
                            <Grid key={'FinalOven1Temperature'} item xs={12} sm={12} md={4} lg={4}>
                                <Graph
                                    assetId={OVEN_ASSETID}
                                    aspectName="FinalOven1"
                                    variableName="Temperature_degC"
                                    limit={3}
                                    unit={'oC'}
                                    dataKey={'_time'}
                                    dataPoint='mindsphere'
                                    title="Temperature"
                                    target={'58-62'}
                                    LL={58}
                                    HH={62}
                                />
                            </Grid>
                            {/** End*/}
                            {/** Final Oven 1 Humidity **/}
                            <Grid key={'FinalOven1Humidity'} item xs={12} sm={12} md={4} lg={4}>
                                <CircleGauge
                                    title={'Humidity'}
                                    assetId={OVEN_ASSETID}
                                    aspectName={'FinalOven1'}
                                    parameterName={'Humidity_Pct'}
                                    dataPoint='mindsphere'
                                    border={true}
                                    subTitle={''}
                                    range={[
                                        {value:18,color:"#b2b2b2"},
                                        {value:25,color:"#154a98"},
                                        {value:31,color:"#ff1029"}
                                    ]}
                                    unit={'%'}
                                    min={12}
                                    max={31}
                                    LL={18}
                                    HH={28}
                                />
                            </Grid>
                            {/** End **/}
                            {/** Final Oven 1 Air Flow **/}
                            <Grid key={'FinalOven1AirFlow'} item xs={12} sm={12} md={4} lg={4}>
                                <Graph
                                    assetId={OVEN_ASSETID}
                                    aspectName="FinalOven1"
                                    variableName="Airflow_m3ph"
                                    limit={3}
                                    dataKey={'_time'}
                                    unit={'m3/hr'}
                                    dataPoint='mindsphere'
                                    title="Air Flow"
                                    target={'39k-42k'}
                                    LL={39000}
                                    HH={42000}
                                />
                            </Grid>
                            {/** End **/}
                            {/***
                             END
                             **/}
                            {/****
                             ESTA BOOTH 1
                             ***/}
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <div style={{fontSize: 16,color:'#0f3790', fontWeight: 900}}>ESTA Booth 1</div>
                            </Grid>
                            {/** ESTA 1 Temperature */}
                            <Grid key={'ESTA1Temperature'} item xs={12} sm={12} md={4} lg={4}>
                                <Graph
                                    assetId={PAINTBOOTH_ASSETID}
                                    aspectName="ESTA1"
                                    variableName="Room_Temperature_DegC"
                                    limit={3}
                                    dataKey={'_time'}
                                    unit={'oC'}
                                    dataPoint='mindsphere'
                                    title="Temperature"
                                    target={'23-25'}
                                    LL={23}
                                    HH={25}
                                />
                            </Grid>
                            {/** End*/}
                            {/** ESTA 1 Humidity **/}
                            <Grid key={'ESTA1Humidity'} item xs={12} sm={12} md={4} lg={4}>
                                <CircleGauge
                                    title={'Humidity'}
                                    assetId={PAINTBOOTH_ASSETID}
                                    aspectName={'ESTA1'}
                                    parameterName={'Inlet_Humidity_Pct'}
                                    dataPoint='mindsphere'
                                    border={true}
                                    subTitle={''}
                                    range={[
                                        {value:57,color:"#b2b2b2"},
                                        {value:64,color:"#154a98"},
                                        {value:71,color:"#ff1029"}
                                    ]}
                                    unit={'%'}
                                    min={50}
                                    max={71}
                                    LL={55}
                                    HH={65}
                                />
                            </Grid>
                            {/** End **/}
                            {/** ESTA 1 Air Flow **/}
                            <Grid key={'ESTA1AirFlow'} item xs={12} sm={12} md={4} lg={4}>
                                <Graph
                                    assetId={PAINTBOOTH_ASSETID}
                                    aspectName="ESTA1"
                                    variableName="Airflow_mpsec"
                                    limit={3}
                                    dataKey={'_time'}
                                    unit={'m/sec'}
                                    dataPoint='mindsphere'
                                    title="Air Flow"
                                    target={'0.4-0.6'}
                                    LL={0.4}
                                    HH={0.6}
                                />
                            </Grid>
                            {/** End **/}
                            {/***
                             END
                             **/}
                            {/****
                             Primer Cabinet 1
                             ***/}
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <div style={{fontSize: 16,color:'#0f3790', fontWeight: 900}}>Primer Cabinet 1</div>
                            </Grid>
                            {/** Primer Cabinet 1 Temperature */}
                            <Grid key={'PrimerCabinet1Temperature'} item xs={12} sm={12} md={4} lg={4}>
                                <Graph
                                    pathName='dashboard'
                                    endPoint='paintcabinet/cabinet1Temperature'
                                    variableName='data'
                                    dataKey={'time'}
                                    limit={1000}
                                    dataPoint='api'
                                    unit={'oC'}
                                    title="Temperature"
                                    target={'22-24'}
                                    LL={22}
                                    HH={24}
                                />
                            </Grid>
                            {/** End*/}
                            {/** Primer Cabinet 1 Humidity **/}
                            <Grid key={'PrimerCabinet1Humidity'} item xs={12} sm={12} md={4} lg={4}>
                                <CircleGauge
                                    title={'Humidity'}
                                    pathName='dashboard'
                                    endPoint='paintcabinet/cabinet1Humidity'
                                    variableName='data'
                                    limit={3}
                                    border={true}
                                    subTitle={''}
                                    dataPoint={'api'}
                                    range={[
                                        {value:60,color:"#b2b2b2"},
                                        {value:70,color:"#154a98"},
                                        {value:80,color:"#ff1029"}
                                    ]}
                                    unit={'%'}
                                    min={50}
                                    max={80}
                                    LL={60}
                                    HH={70}
                                />
                            </Grid>
                            {/** End **/}
                            {/** Primer Cabinet 1 viscosity **/}
                            <Grid key={'PrimerCabinet1viscosity'} item xs={12} sm={12} md={4} lg={4}>
                                <Graph
                                    pathName='dashboard'
                                    endPoint='paintcabinet/cabinet1PaintTestViscosity'
                                    variableName='data'
                                    dataKey={'time'}
                                    limit={10}
                                    dataPoint='api'
                                    unit={'sec'}
                                    title="Paint Viscosity"
                                    target={'45-55'}
                                    LL={45}
                                    HH={55}
                                />
                            </Grid>
                            {/** End **/}
                            {/***
                             END
                             **/}
                            {/****
                             Top Coat Cabinet 1
                             ***/}
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <div style={{fontSize: 16,color:'#0f3790', fontWeight: 900}}>Top Coat Cabinet 1</div>
                            </Grid>
                            {/** Primer Cabinet 1 Temperature */}
                            <Grid key={'TopCoat1Temperature'} item xs={12} sm={12} md={4} lg={4}>
                                <Graph
                                    pathName='dashboard'
                                    endPoint='paintcabinet/topcoat1Temperature'
                                    variableName='data'
                                    dataKey={'time'}
                                    limit={1000}
                                    dataPoint='api'
                                    unit={'oC'}
                                    title="Temperature"
                                    target={'22-24'}
                                    LL={22}
                                    HH={24}
                                />
                            </Grid>
                            {/** End*/}
                            {/** Primer Cabinet 1 Humidity **/}
                            <Grid key={'TopCoat1Humidity'} item xs={12} sm={12} md={4} lg={4}>
                                <CircleGauge
                                    title={'Humidity'}
                                    pathName='dashboard'
                                    endPoint='paintcabinet/topcoat1Humidity'
                                    variableName='data'
                                    limit={3}
                                    border={true}
                                    subTitle={''}
                                    dataPoint={'api'}
                                    range={[
                                        {value:60,color:"#b2b2b2"},
                                        {value:70,color:"#154a98"},
                                        {value:80,color:"#ff1029"}
                                    ]}
                                    unit={'%'}
                                    min={50}
                                    max={80}
                                    LL={60}
                                    HH={70}
                                />
                            </Grid>
                            <Grid key={'TopCoat1Humidity'} item xs={12} sm={12} md={4} lg={4}></Grid>
                            {/** End **/}
                            {/***
                             END
                             **/}
                            {/****
                             Neutralization
                             ***/}
                            <Grid item xs={12} sm={12} md={4} lg={4}>
                                <div style={{fontSize: 16,color:'#0f3790', fontWeight: 900}}>Neutralization (Tank 03)</div>
                            </Grid>
                            <Grid item xs={12} sm={12} md={4} lg={4}>
                                <div style={{fontSize: 16,color:'#0f3790', fontWeight: 900}}>Distilled Water (Tank 06)</div>
                            </Grid>
                            <Grid item xs={12} sm={12} md={4} lg={4}>
                                <div style={{fontSize: 16,color:'#0f3790', fontWeight: 900}}></div>
                            </Grid>
                            {/** Neutralization Tank 3 Ph */}
                            <Grid key={'NeutralizationPhTank3'} item xs={12} sm={12} md={4} lg={4}>
                                <CircleGauge
                                    title={'pH'}
                                    pathName='dashboard'
                                    endPoint='wastewater/tank3PH'
                                    variableName='data'
                                    limit={3}
                                    border={true}
                                    subTitle={''}
                                    dataPoint={'api'}
                                    range={[
                                        {value:8.0,color:"#b2b2b2"},
                                        {value:13.0,color:"#154a98"},
                                        {value:18.0,color:"#ff1029"}
                                    ]}
                                    unit={''}
                                    min={3.0}
                                    max={18.0}
                                    LL={7.0}
                                    HH={10.0}
                                />
                            </Grid>
                            {/** End*/}
                            {/** Neutralization Tank 6 Ph */}
                            <Grid key={'NeutralizationPhTank6'} item xs={12} sm={12} md={4} lg={4}>
                                <CircleGauge
                                    title={'pH'}
                                    pathName='dashboard'
                                    endPoint='wastewater/tank6PH'
                                    variableName='data'
                                    limit={3}
                                    border={true}
                                    subTitle={''}
                                    dataPoint={'api'}
                                    range={[
                                        {value:7.0,color:"#b2b2b2"},
                                        {value:8.0,color:"#154a98"},
                                        {value:9.0,color:"#ff1029"}
                                    ]}
                                    unit={''}
                                    min={6.0}
                                    max={9.0}
                                    LL={7.0}
                                    HH={8.0}
                                />
                            </Grid>
                            {/** End*/}
                            {/***
                             END
                             **/}
                        </Grid>
                    </Grid>
                    {/**End**/}
                    {/** Row 2**/}
                    <Grid item xs={12} md={6} lg={6}>
                        <Grid container spacing={1}>
                            {/***
                             Intermediate Oven
                             **/}
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <div style={{fontSize: 16,color:'#0f3790', fontWeight: 900}}>Intermediate Oven</div>
                            </Grid>
                            {/** Intermediate Oven Temperature */}
                            <Grid key={'IntermediateHeater_Temperature'} item xs={12} sm={12} md={4} lg={4}>
                                <Graph
                                    assetId={OVEN_ASSETID}
                                    aspectName="IntermediateOven"
                                    variableName="RoomTemperature_degC"
                                    limit={3}
                                    dataKey={'_time'}
                                    unit={'oC'}
                                    dataPoint='mindsphere'
                                    title="Temperature"
                                    target={'50-60'}
                                    LL={50}
                                    HH={60}
                                />
                            </Grid>
                            {/** End*/}
                            {/** Intermediate Oven Humidity **/}
                            <Grid key={'IntermediateHumidity'} item xs={12} sm={12} md={4} lg={4}>
                                <CircleGauge
                                    title={'Humidity'}
                                    assetId={OVEN_ASSETID}
                                    aspectName={'IntermediateOven'}
                                    parameterName={'Room_Humidity_Pct'}
                                    dataPoint='mindsphere'
                                    border={true}
                                    subTitle={''}
                                    range={[
                                        {value:23,color:"#b2b2b2"},
                                        {value:29,color:"#154a98"},
                                        {value:35,color:"#ff1029"}
                                    ]}
                                    unit={'%'}
                                    min={15}
                                    max={35}
                                    LL={23}
                                    HH={28}
                                />
                            </Grid>
                            {/** End **/}
                            {/** Intermediate Oven Air Flow **/}
                            <Grid key={'IntermediateAirFlow'} item xs={12} sm={12} md={4} lg={4}>
                                <Graph
                                    assetId={OVEN_ASSETID}
                                    aspectName="IntermediateOven"
                                    variableName="Inlet_Airflow_mpsec"
                                    limit={3}
                                    dataKey={'_time'}
                                    unit={'m/sec'}
                                    dataPoint='mindsphere'
                                    title="Air Flow"
                                    target={'1.4-1.8'}
                                    LL={1.4}
                                    HH={1.8}
                                />
                            </Grid>
                            {/** End **/}
                            {/***
                             END
                             **/}
                            {/****
                             FINAL OVEN 2
                             ***/}
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <div style={{fontSize: 16,color:'#0f3790', fontWeight: 900}}>Final Oven 2</div>
                            </Grid>
                            {/** Final Oven 2 Temperature */}
                            <Grid key={'FinalOven2Temperature'} item xs={12} sm={12} md={4} lg={4}>
                                <Graph
                                    assetId={OVEN_ASSETID}
                                    aspectName="FinalOven2"
                                    variableName="Temperature_degC"
                                    limit={3}
                                    dataKey={'_time'}
                                    unit={'oC'}
                                    dataPoint='mindsphere'
                                    title="Temperature"
                                    target={'58-62'}
                                    LL={58}
                                    HH={62}
                                />
                            </Grid>
                            {/** End*/}
                            {/** Final Oven 2 Humidity **/}
                            <Grid key={'FinalOven2Humidity'} item xs={12} sm={12} md={4} lg={4}>
                                <CircleGauge
                                    title={'Humidity'}
                                    assetId={OVEN_ASSETID}
                                    aspectName={'FinalOven2'}
                                    parameterName={'Humidity_Pct'}
                                    dataPoint='mindsphere'
                                    border={true}
                                    subTitle={''}
                                    range={[
                                        {value:17,color:"#b2b2b2"},
                                        {value:24,color:"#154a98"},
                                        {value:31,color:"#ff1029"}
                                    ]}
                                    unit={'%'}
                                    min={10}
                                    max={31}
                                    LL={18}
                                    HH={23}
                                />
                            </Grid>
                            {/** End **/}
                            {/** Final Oven 2 Air Flow **/}
                            <Grid key={'FinalOven2AirFlow'} item xs={12} sm={12} md={4} lg={4}>
                                <Graph
                                    assetId={OVEN_ASSETID}
                                    aspectName="FinalOven2"
                                    variableName="Airflow_m3ph"
                                    limit={3}
                                    dataKey={'_time'}
                                    unit={'m3/hr'}
                                    dataPoint='mindsphere'
                                    title="Air Flow"
                                    target={'20k-24k'}
                                    LL={20000}
                                    HH={24000}
                                />
                            </Grid>
                            {/** End **/}
                            {/***
                             END
                             **/}
                            {/****
                             ESTA BOOTH 2
                             ***/}
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <div style={{fontSize: 16,color:'#0f3790', fontWeight: 900}}>ESTA Booth 2</div>
                            </Grid>
                            {/** ESTA 1 Temperature */}
                            <Grid key={'ESTA2Temperature'} item xs={12} sm={12} md={4} lg={4}>
                                <Graph
                                    assetId={PAINTBOOTH_ASSETID}
                                    aspectName="ESTA2"
                                    variableName="Room_Temperature_DegC"
                                    limit={3}
                                    dataKey={'_time'}
                                    unit={'oC'}
                                    dataPoint='mindsphere'
                                    title="Temperature"
                                    target={'23-25'}
                                    LL={25}
                                    HH={23}
                                />
                            </Grid>
                            {/** End*/}
                            {/** ESTA 1 Humidity **/}
                            <Grid key={'ESTA2Humidity'} item xs={12} sm={12} md={4} lg={4}>
                                <CircleGauge
                                    title={'Humidity'}
                                    assetId={PAINTBOOTH_ASSETID}
                                    aspectName={'ESTA2'}
                                    parameterName={'Inlet_Humidity_Pct'}
                                    dataPoint='mindsphere'
                                    border={true}
                                    subTitle={''}
                                    range={[
                                        {value:60,color:"#b2b2b2"},
                                        {value:70,color:"#154a98"},
                                        {value:80,color:"#ff1029"}
                                    ]}
                                    unit={'%'}
                                    min={50}
                                    max={80}
                                    LL={55}
                                    HH={65}
                                />
                            </Grid>
                            {/** End **/}
                            {/** ESTA 1 Air Flow **/}
                            <Grid key={'ESTA2AirFlow'} item xs={12} sm={12} md={4} lg={4}>
                                <Graph
                                    assetId={PAINTBOOTH_ASSETID}
                                    aspectName="ESTA2"
                                    variableName="Airflow_mpsec"
                                    limit={3}
                                    dataKey={'_time'}
                                    unit={'m3/hr'}
                                    dataPoint='mindsphere'
                                    title="Air Flow"
                                    target={'0.4-0.6'}
                                    LL={0.4}
                                    HH={0.6}
                                />
                            </Grid>
                            {/** End **/}
                            {/***
                             END
                             **/}
                            {/****
                             Primer Cabinet 2
                             ***/}
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <div style={{fontSize: 16,color:'#0f3790', fontWeight: 900}}>Primer Cabinet 2</div>
                            </Grid>
                            {/** Primer Cabinet 2 Temperature */}
                            <Grid key={'PrimerCabinet2Temperature'} item xs={12} sm={12} md={4} lg={4}>
                                <Graph
                                    pathName='dashboard'
                                    endPoint='paintcabinet/cabinet2Temperature'
                                    variableName='data'
                                    dataKey={'time'}
                                    limit={1000}
                                    dataPoint='api'
                                    unit={'oC'}
                                    title="Temperature"
                                    target={'22-24'}
                                    LL={22}
                                    HH={24}
                                />
                            </Grid>
                            {/** End*/}
                            {/** Primer Cabinet 2 Humidity **/}
                            <Grid key={'PrimerCabinet2Humidity'} item xs={12} sm={12} md={4} lg={4}>
                                <CircleGauge
                                    title={'Humidity'}
                                    pathName='dashboard'
                                    endPoint='paintcabinet/cabinet2Humidity'
                                    variableName='data'
                                    limit={3}
                                    border={true}
                                    subTitle={''}
                                    dataPoint={'api'}
                                    range={[
                                        {value:60,color:"#b2b2b2"},
                                        {value:70,color:"#154a98"},
                                        {value:80,color:"#ff1029"}
                                    ]}
                                    unit={'%'}
                                    min={50}
                                    max={80}
                                    LL={60}
                                    HH={70}
                                />
                            </Grid>
                            {/** End **/}
                            {/** Primer Cabinet 2 viscosity **/}
                            <Grid key={'PrimerCabinet2viscosity'} item xs={12} sm={12} md={4} lg={4}>
                                <Graph
                                    pathName='dashboard'
                                    endPoint='paintcabinet/cabinet2PaintTestViscosity'
                                    variableName='data'
                                    dataKey={'time'}
                                    limit={10}
                                    dataPoint='api'
                                    unit={'sec'}
                                    title="Paint Viscosity"
                                    target={'45-55'}
                                    LL={45}
                                    HH={55}
                                />
                            </Grid>
                            {/** End **/}
                            {/***
                             END
                             **/}
                            {/****
                             Top Coat Cabinet 2
                             ***/}
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <div style={{fontSize: 16,color:'#0f3790', fontWeight: 900}}>Top Coat Cabinet 2</div>
                            </Grid>
                            {/** Primer Cabinet 2 Temperature */}
                            <Grid key={'TopCoat1Temperature'} item xs={12} sm={12} md={4} lg={4}>
                                <Graph
                                    pathName='dashboard'
                                    endPoint='paintcabinet/topcoat2Temperature'
                                    variableName='data'
                                    dataKey={'time'}
                                    limit={1000}
                                    dataPoint='api'
                                    unit={'oC'}
                                    title="Temperature"
                                    target={'22-24'}
                                    LL={22}
                                    HH={24}
                                />
                            </Grid>
                            {/** End*/}
                            {/** Primer Cabinet 2 Humidity **/}
                            <Grid key={'TopCoat1Humidity'} item xs={12} sm={12} md={4} lg={4}>
                                <CircleGauge
                                    title={'Humidity'}
                                    pathName='dashboard'
                                    endPoint='paintcabinet/topcoat2Humidity'
                                    variableName='data'
                                    limit={3}
                                    border={true}
                                    subTitle={''}
                                    dataPoint={'api'}
                                    range={[
                                        {value:60,color:"#b2b2b2"},
                                        {value:70,color:"#154a98"},
                                        {value:80,color:"#ff1029"}
                                    ]}
                                    unit={'%'}
                                    min={50}
                                    max={80}
                                    LL={60}
                                    HH={70}
                                />
                            </Grid>
                            {/** End **/}
                            {/***
                             END
                             **/}
                            {/****
                             Neutralization
                             ***/}
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <div style={{fontSize: 16,color:'#0f3790', fontWeight: 900}}>Demineralization (Tank 07)</div>
                            </Grid>
                            {/** Demineralization Ph */}
                            <Grid key={'DemineralizationPh'} item xs={12} sm={12} md={4} lg={4}>
                                <CircleGauge
                                    title={'pH'}
                                    assetId={POWERWASH_ASSETID}
                                    aspectName={'Tank07_Demineralization'}
                                    parameterName={'pH'}
                                    dataPoint='mindsphere'
                                    border={true}
                                    subTitle={''}
                                    range={[
                                        {value:7.0,color:"#b2b2b2"},
                                        {value:8.0,color:"#154a98"},
                                        {value:9.0,color:"#ff1029"}
                                    ]}
                                    unit={''}
                                    min={6.0}
                                    max={9.0}
                                    LL={7.0}
                                    HH={8.0}
                                />
                            </Grid>
                            {/** End*/}
                            {/** Demineralization Conductivity */}
                            <Grid key={'DemineralizationConductivity'} item xs={12} sm={12} md={4} lg={4}>
                                <CircleGauge
                                    title={'Conductivity (< 10K uS)'}
                                    assetId={POWERWASH_ASSETID}
                                    aspectName={'Tank07_Demineralization'}
                                    parameterName={'Conductivity_uS'}
                                    dataPoint='mindsphere'
                                    border={true}
                                    subTitle={''}
                                    range={[
                                        {value:6,color:"#b2b2b2"},
                                        {value:12,color:"#154a98"},
                                        {value:18,color:"#ff1029"}
                                    ]}
                                    unit={'uS'}
                                    min={0}
                                    max={18.0}
                                />
                            </Grid>
                            {/** End*/}
                            <Grid key={'DemineralizationConductivity'} item xs={12} sm={12} md={4} lg={4}></Grid>
                            {/***
                             END
                             **/}
                        </Grid>
                    </Grid>
                    {/** End**/}
                </Grid>
            </div>
        )
    }
}
export default withStyles(useStyles, { withTheme: true })(OverView)
