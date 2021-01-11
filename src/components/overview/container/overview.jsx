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
                        <div style={{fontSize: 32, marginTop: 5,color:'#0f3790', fontWeight: 900}}> Ovens, Paint Booth, & Water Treatment Overview</div>
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
                            <Grid key={'Heater_Temperature'} item xs={12} sm={4} md={4} lg={4}>
                                <Graph
                                    assetId={OVEN_ASSETID}
                                    aspectName="WaterDryer"
                                    variableName="Heater_Temperature_degC"
                                    limit={3}
                                    dataKey={'_time'}
                                    dataPoint='mindsphere'
                                    title="Temperature"
                                />
                            </Grid>
                            {/** End*/}
                            {/** Water Dryer Humidity **/}
                            <Grid key={'Humidity'} item xs={12} sm={4} md={4} lg={4}>
                                <CircleGauge
                                    title={'Humidity'}
                                    assetId={OVEN_ASSETID}
                                    aspectName={'WaterDryer'}
                                    parameterName={'Room_Humidity_Pct'}
                                    border={true}
                                    subTitle={''}
                                />
                            </Grid>
                            {/** End **/}
                            {/** Water Dryer Air Flow **/}
                            <Grid key={'AirFlow'} item xs={12} sm={4} md={4} lg={4}>
                                <Graph
                                    assetId={OVEN_ASSETID}
                                    aspectName="WaterDryer"
                                    variableName="Inlet_Airflow_mpsec"
                                    limit={3}
                                    dataKey={'_time'}
                                    dataPoint='mindsphere'
                                    title="Air Flow"
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
                            <Grid key={'FinalOven1Temperature'} item xs={12} sm={4} md={4} lg={4}>
                                <Graph
                                    assetId={OVEN_ASSETID}
                                    aspectName="FinalOven1"
                                    variableName="Temperature_degC"
                                    limit={3}
                                    dataKey={'_time'}
                                    dataPoint='mindsphere'
                                    title="Temperature"
                                />
                            </Grid>
                            {/** End*/}
                            {/** Final Oven 1 Humidity **/}
                            <Grid key={'FinalOven1Humidity'} item xs={12} sm={4} md={4} lg={4}>
                                <CircleGauge
                                    title={'Humidity'}
                                    assetId={OVEN_ASSETID}
                                    aspectName={'FinalOven1'}
                                    parameterName={'Humidity_Pct'}
                                    border={true}
                                    subTitle={''}
                                />
                            </Grid>
                            {/** End **/}
                            {/** Final Oven 1 Air Flow **/}
                            <Grid key={'FinalOven1AirFlow'} item xs={12} sm={4} md={4} lg={4}>
                                <Graph
                                    assetId={OVEN_ASSETID}
                                    aspectName="FinalOven1"
                                    variableName="Airflow_m3ph"
                                    limit={3}
                                    dataKey={'_time'}
                                    dataPoint='mindsphere'
                                    title="Air Flow"
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
                            <Grid key={'ESTA1Temperature'} item xs={12} sm={4} md={4} lg={4}>
                                <Graph
                                    assetId={PAINTBOOTH_ASSETID}
                                    aspectName="ESTA1"
                                    variableName="Inlet_Temperature_degC"
                                    limit={3}
                                    dataKey={'_time'}
                                    dataPoint='mindsphere'
                                    title="Temperature"
                                />
                            </Grid>
                            {/** End*/}
                            {/** ESTA 1 Humidity **/}
                            <Grid key={'ESTA1Humidity'} item xs={12} sm={4} md={4} lg={4}>
                                <CircleGauge
                                    title={'Humidity'}
                                    assetId={PAINTBOOTH_ASSETID}
                                    aspectName={'ESTA1'}
                                    parameterName={'Inlet_Humidity_Pct'}
                                    border={true}
                                    subTitle={''}
                                />
                            </Grid>
                            {/** End **/}
                            {/** ESTA 1 Air Flow **/}
                            <Grid key={'ESTA1AirFlow'} item xs={12} sm={4} md={4} lg={4}>
                                <Graph
                                    assetId={PAINTBOOTH_ASSETID}
                                    aspectName="ESTA1"
                                    variableName="Intake_Airflow_m3ph"
                                    limit={3}
                                    dataKey={'_time'}
                                    dataPoint='mindsphere'
                                    title="Air Flow"
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
                            <Grid key={'PrimerCabinet1Temperature'} item xs={12} sm={4} md={4} lg={4}>
                                <Graph
                                    pathName='dashboard'
                                    endPoint='paintcabinet/cabinet1Temperature'
                                    variableName='data'
                                    dataKey={'time'}
                                    limit={1000}
                                    dataPoint='api'
                                    unit={'oC'}
                                    title="Temperature"
                                />
                            </Grid>
                            {/** End*/}
                            {/** Primer Cabinet 1 Humidity **/}
                            <Grid key={'PrimerCabinet1Humidity'} item xs={12} sm={4} md={4} lg={4}>
                                <CircleGauge
                                    title={'Humidity'}
                                    pathName='dashboard'
                                    endPoint='paintcabinet/cabinet1Temperature'
                                    variableName='data'
                                    limit={3}
                                    border={true}
                                    subTitle={''}
                                    dataPoint={'api'}
                                />
                            </Grid>
                            {/** End **/}
                            {/** Primer Cabinet 1 viscosity **/}
                            <Grid key={'PrimerCabinet1viscosity'} item xs={12} sm={4} md={4} lg={4}>
                                <Graph
                                    pathName='dashboard'
                                    endPoint='paintcabinet/cabinet1PaintTestViscosity'
                                    variableName='data'
                                    dataKey={'time'}
                                    limit={10}
                                    dataPoint='api'
                                    unit={'oC'}
                                    title="Paint viscosity"
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
                                <div style={{fontSize: 16,color:'#0f3790', fontWeight: 900}}>Top Coat 1</div>
                            </Grid>
                            {/** Primer Cabinet 1 Temperature */}
                            <Grid key={'TopCoat1Temperature'} item xs={12} sm={6} md={6} lg={6}>
                                <Graph
                                    pathName='dashboard'
                                    endPoint='paintcabinet/topcoat1Temperature'
                                    variableName='data'
                                    dataKey={'time'}
                                    limit={1000}
                                    dataPoint='api'
                                    unit={'oC'}
                                    title="Temperature"
                                />
                            </Grid>
                            {/** End*/}
                            {/** Primer Cabinet 1 Humidity **/}
                            <Grid key={'TopCoat1Humidity'} item xs={12} sm={6} md={6} lg={6}>
                                <CircleGauge
                                    title={'Humidity'}
                                    pathName='dashboard'
                                    endPoint='paintcabinet/topcoat1Humidity'
                                    variableName='data'
                                    limit={3}
                                    border={true}
                                    subTitle={''}
                                    dataPoint={'api'}
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
                                <div style={{fontSize: 16,color:'#0f3790', fontWeight: 900}}>Neutralization</div>
                            </Grid>
                            {/** Neutralization Tank 3 Ph */}
                            <Grid key={'NeutralizationPhTank3'} item xs={12} sm={6} md={6} lg={6}>
                                <CircleGauge
                                    title={'Tank 3 pH'}
                                    pathName='dashboard'
                                    endPoint='wastewater/tank3PH'
                                    variableName='data'
                                    limit={3}
                                    border={true}
                                    subTitle={''}
                                    dataPoint={'api'}
                                />
                            </Grid>
                            {/** End*/}
                            {/** Neutralization Tank 6 Ph */}
                            <Grid key={'NeutralizationPhTank6'} item xs={12} sm={6} md={6} lg={6}>
                                <CircleGauge
                                    title={'Tank 6 pH'}
                                    pathName='dashboard'
                                    endPoint='wastewater/tank6PH'
                                    variableName='data'
                                    limit={3}
                                    border={true}
                                    subTitle={''}
                                    dataPoint={'api'}
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
                            <Grid key={'IntermediateHeater_Temperature'} item xs={12} sm={4} md={4} lg={4}>
                                <Graph
                                    assetId={OVEN_ASSETID}
                                    aspectName="IntermediateOven"
                                    variableName="Heater_Temperature_degC"
                                    limit={3}
                                    dataKey={'_time'}
                                    dataPoint='mindsphere'
                                    title="Temperature"
                                />
                            </Grid>
                            {/** End*/}
                            {/** Intermediate Oven Humidity **/}
                            <Grid key={'IntermediateHumidity'} item xs={12} sm={4} md={4} lg={4}>
                                <CircleGauge
                                    title={'Humidity'}
                                    assetId={OVEN_ASSETID}
                                    aspectName={'IntermediateOven'}
                                    parameterName={'Room_Humidity_Pct'}
                                    border={true}
                                    subTitle={''}
                                />
                            </Grid>
                            {/** End **/}
                            {/** Intermediate Oven Air Flow **/}
                            <Grid key={'IntermediateAirFlow'} item xs={12} sm={4} md={4} lg={4}>
                                <Graph
                                    assetId={OVEN_ASSETID}
                                    aspectName="IntermediateOven"
                                    variableName="Inlet_Airflow_mpsec"
                                    limit={3}
                                    dataKey={'_time'}
                                    dataPoint='mindsphere'
                                    title="Air Flow"
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
                            <Grid key={'FinalOven2Temperature'} item xs={12} sm={4} md={4} lg={4}>
                                <Graph
                                    assetId={OVEN_ASSETID}
                                    aspectName="FinalOven2"
                                    variableName="Temperature_degC"
                                    limit={3}
                                    dataKey={'_time'}
                                    dataPoint='mindsphere'
                                    title="Temperature"
                                />
                            </Grid>
                            {/** End*/}
                            {/** Final Oven 2 Humidity **/}
                            <Grid key={'FinalOven2Humidity'} item xs={12} sm={4} md={4} lg={4}>
                                <CircleGauge
                                    title={'Humidity'}
                                    assetId={OVEN_ASSETID}
                                    aspectName={'FinalOven2'}
                                    parameterName={'Humidity_Pct'}
                                    border={true}
                                    subTitle={''}
                                />
                            </Grid>
                            {/** End **/}
                            {/** Final Oven 2 Air Flow **/}
                            <Grid key={'FinalOven2AirFlow'} item xs={12} sm={4} md={4} lg={4}>
                                <Graph
                                    assetId={OVEN_ASSETID}
                                    aspectName="FinalOven2"
                                    variableName="Airflow_m3ph"
                                    limit={3}
                                    dataKey={'_time'}
                                    dataPoint='mindsphere'
                                    title="Air Flow"
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
                            <Grid key={'ESTA2Temperature'} item xs={12} sm={4} md={4} lg={4}>
                                <Graph
                                    assetId={PAINTBOOTH_ASSETID}
                                    aspectName="ESTA2"
                                    variableName="Inlet_Temperature_degC"
                                    limit={3}
                                    dataKey={'_time'}
                                    dataPoint='mindsphere'
                                    title="Temperature"
                                />
                            </Grid>
                            {/** End*/}
                            {/** ESTA 1 Humidity **/}
                            <Grid key={'ESTA2Humidity'} item xs={12} sm={4} md={4} lg={4}>
                                <CircleGauge
                                    title={'Humidity'}
                                    assetId={PAINTBOOTH_ASSETID}
                                    aspectName={'ESTA2'}
                                    parameterName={'Inlet_Humidity_Pct'}
                                    border={true}
                                    subTitle={''}
                                />
                            </Grid>
                            {/** End **/}
                            {/** ESTA 1 Air Flow **/}
                            <Grid key={'ESTA2AirFlow'} item xs={12} sm={4} md={4} lg={4}>
                                <Graph
                                    assetId={PAINTBOOTH_ASSETID}
                                    aspectName="ESTA2"
                                    variableName="Intake_Airflow_m3ph"
                                    limit={3}
                                    dataKey={'_time'}
                                    dataPoint='mindsphere'
                                    title="Air Flow"
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
                            <Grid key={'PrimerCabinet2Temperature'} item xs={12} sm={4} md={4} lg={4}>
                                <Graph
                                    pathName='dashboard'
                                    endPoint='paintcabinet/cabinet2Temperature'
                                    variableName='data'
                                    dataKey={'time'}
                                    limit={1000}
                                    dataPoint='api'
                                    unit={'oC'}
                                    title="Temperature"
                                />
                            </Grid>
                            {/** End*/}
                            {/** Primer Cabinet 2 Humidity **/}
                            <Grid key={'PrimerCabinet2Humidity'} item xs={12} sm={4} md={4} lg={4}>
                                <CircleGauge
                                    title={'Humidity'}
                                    pathName='dashboard'
                                    endPoint='paintcabinet/cabinet2Humidity'
                                    variableName='data'
                                    limit={3}
                                    border={true}
                                    subTitle={''}
                                    dataPoint={'api'}
                                />
                            </Grid>
                            {/** End **/}
                            {/** Primer Cabinet 2 viscosity **/}
                            <Grid key={'PrimerCabinet2viscosity'} item xs={12} sm={4} md={4} lg={4}>
                                <Graph
                                    pathName='dashboard'
                                    endPoint='paintcabinet/cabinet2PaintTestViscosity'
                                    variableName='data'
                                    dataKey={'time'}
                                    limit={10}
                                    dataPoint='api'
                                    unit={'oC'}
                                    title="Paint viscosity"
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
                                <div style={{fontSize: 16,color:'#0f3790', fontWeight: 900}}>Top Coat 2</div>
                            </Grid>
                            {/** Primer Cabinet 2 Temperature */}
                            <Grid key={'TopCoat1Temperature'} item xs={12} sm={6} md={6} lg={6}>
                                <Graph
                                    pathName='dashboard'
                                    endPoint='paintcabinet/topcoat2Temperature'
                                    variableName='data'
                                    dataKey={'time'}
                                    limit={1000}
                                    dataPoint='api'
                                    unit={'oC'}
                                    title="Temperature"
                                />
                            </Grid>
                            {/** End*/}
                            {/** Primer Cabinet 2 Humidity **/}
                            <Grid key={'TopCoat1Humidity'} item xs={12} sm={6} md={6} lg={6}>
                                <CircleGauge
                                    title={'Humidity'}
                                    pathName='dashboard'
                                    endPoint='paintcabinet/topcoat2Humidity'
                                    variableName='data'
                                    limit={3}
                                    border={true}
                                    subTitle={''}
                                    dataPoint={'api'}
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
                                <div style={{fontSize: 16,color:'#0f3790', fontWeight: 900}}>Demineralization Tank 7</div>
                            </Grid>
                            {/** Demineralization Ph */}
                            <Grid key={'DemineralizationPh'} item xs={12} sm={6} md={6} lg={6}>
                                <CircleGauge
                                    title={'pH'}
                                    assetId={POWERWASH_ASSETID}
                                    aspectName={'Tank07_Demineralization'}
                                    parameterName={'pH'}
                                    border={true}
                                    subTitle={''}
                                />
                            </Grid>
                            {/** End*/}
                            {/** Demineralization Conductivity */}
                            <Grid key={'DemineralizationConductivity'} item xs={12} sm={6} md={6} lg={6}>
                                <CircleGauge
                                    title={'Conductivity'}
                                    assetId={POWERWASH_ASSETID}
                                    aspectName={'Tank07_Demineralization'}
                                    parameterName={'Conductivity_uS'}
                                    border={true}
                                    subTitle={''}
                                />
                            </Grid>
                            {/** End*/}
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
