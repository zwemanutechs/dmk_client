import React, {Component, createRef, useRef} from 'react';
import AppLineChart from "../../../shared/charts/line/container/lineChart";
import "./home.css";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ErrorOutlineOutlinedIcon from '@material-ui/icons/ErrorOutlineOutlined';
import ListItemIcon from "@material-ui/core/ListItemIcon";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import ReactInterval from 'react-interval';
import {Animated} from "react-animated-css";
import NotificationCard from "../../../shared/notification-card/container/notificationCard";
import {get} from "../../../middleware/axios-middleware";
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import MindAspectDashboard from "../../../shared/mindsphere-aspect-dashboard/container/mindsphere-aspect-dashboard";
import SpeedMeter from "../../../shared/charts/speedmeter/speed-meter";
import format from "date-fns/format";
import IconButton from "@material-ui/core/IconButton";
import TemperatureMeter from "../../../shared/charts/temperature/temperature-meter";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayState: 1,
            slidePaused: false,
            transactionEnable: true,
            transactionTimeout: 15000,
            decreasing: {
                isFetching: true,
                data: {}
            }
        }
    }

    componentDidMount() {
        this.getDegreasing();
    }



    getDegreasing = async () => {
        // this.setState(state => ({decreasing: {...this.state.decreasing, isFetching: true}}));
        // const response = await get(`dashboard/degreasing/${new Date().toDateString()}`);
        // console.log(response);
        // if(response && response.data.code){
        //     this.setState(state => ({decreasing: {...this.state.decreasing, isFetching: false, data: response.data.data}}), () => console.log(this.state.decreasing));
        // }
        // // Make the request
        // fetch('https://covidapi.info/api/v1/country/SGP/timeseries/2020-03-15/2020-04-25')
        //     // convert the response to json
        //     .then(resp => resp.json())
        //     .then(json => {
        //         decreasing.data = json.result;
        //         decreasing.isFetching = false;
        //         this.setState({decreasing: decreasing});
        //     });
    };

    playTransaction = () => {
        if(!this.state.slidePaused){
            if (this.state.displayState === 4) {
                setTimeout(() => this.setState({displayState: 1}), 650);
            }else{
                setTimeout(() => this.setState({displayState: this.state.displayState + 1}), 650);
            }
        }
    };

    pauseSlide = () => {
        this.setState(state => ({slidePaused: !this.state.slidePaused}));
    };

    render() {
        return (
           <Grid container direction={"row"} spacing={2}>
               <ReactInterval
                   timeout={this.state.transactionTimeout}
                   enabled={this.state.transactionEnable}
                   callback={() => this.playTransaction()}
               />
               <Grid item xs={12}>
                   <Card style={{minWidth: 1420, width: '100%'}}>
                       <IconButton aria-label="Play" onClick={this.pauseSlide} color="secondary">
                           {this.state.slidePaused ?
                               <PauseCircleOutlineIcon fontSize="large" />
                               :<PlayCircleOutlineIcon fontSize="large" />
                           }
                       </IconButton>
                       <div>
                           {/** Degreasing **/}
                           <Animated
                               animationIn="lightSpeedIn"
                               animationOut="fadeInRight"
                               isVisible={this.state.displayState === 1}
                               style={this.state.displayState === 1 ? null : { display: "none" }}
                           >
                               <Card style={{margin: 3, minWidth: 1378}} className="container" elevation={0}>
                                   <CardHeader
                                       avatar={
                                           <Avatar aria-label="recipe">
                                               D
                                           </Avatar>
                                       }
                                       title="Degreasing"
                                       subheader={format(new Date(), 'MMMMMM dd \',\' yyyy')}
                                   />
                                   <CardContent>
                                       <Grid container direction="row" justify="center" spacing={2}>
                                           <Grid item xs={12} md={3} className="chartbox">
                                               <MindAspectDashboard
                                                   title='Degreasing Conductivity Tank 1'
                                                   assetId='bb2d6d60bed647beb3816fff37639de4'
                                                   assetName='Degreasing'
                                                   variableName='Degreasing_Conductivity'
                                                   referenceLineData={[]}
                                                   dataKey={'_time'}
                                                   keys={['Degreasing_Conductivity']}
                                                   limit={1000}
                                                   dataPoint='mindsphere'
                                               />
                                           </Grid>
                                           <Grid item xs={12} md={3} className="chartbox">
                                               <MindAspectDashboard
                                                   title='Degreasing Concentration Tank 1'
                                                   pathName='dashboard'
                                                   endPoint='degreasing/concentration'
                                                   keys={['data']}
                                                   referenceLineData={[]}
                                                   variableName='data'
                                                   dataKey={'time'}
                                                   limit={1000}
                                                   dataPoint='api'
                                               />
                                           </Grid>
                                           {/*<Grid item xs={12} md={3} className="chartbox">*/}
                                           {/*    <MindAspectDashboard*/}
                                           {/*        title='Degreasing PH Tank 1'*/}
                                           {/*        assetId='bb2d6d60bed647beb3816fff37639de4'*/}
                                           {/*        assetName='Degreasing'*/}
                                           {/*        variableName='Degreasing_Conductivity'*/}
                                           {/*        referenceLineData={[]}*/}
                                           {/*        dataKey={'_time'}*/}
                                           {/*        keys={['Degreasing_Conductivity']}*/}
                                           {/*        limit={1000}*/}
                                           {/*        dataPoint='mindsphere'*/}
                                           {/*    />*/}
                                           {/*</Grid>*/}
                                           <Grid item xs={12} md={3} className="chartbox">
                                               <MindAspectDashboard
                                                   title='Rinse 1 PH Tank 2'
                                                   pathName='dashboard'
                                                   endPoint='degreasing/rinseone'
                                                   referenceLineData={[]}
                                                   dataKey={'time'}
                                                   keys={['data']}
                                                   variableName='data'
                                                   limit={1000}
                                                   dataPoint='api'
                                               />
                                           </Grid>
                                           <Grid item xs={12} md={3} className="chartbox">
                                               <MindAspectDashboard
                                                   title='Rinse 2 PH Tank 3'
                                                   pathName='dashboard'
                                                   endPoint='degreasing/rinsetwo'
                                                   referenceLineData={[]}
                                                   dataKey={'time'}
                                                   variableName='data'
                                                   keys={['data']}
                                                   limit={1000}
                                                   dataPoint='api'
                                               />
                                           </Grid>
                                           <Grid item xs={12} md={3} className="chartbox">
                                               <MindAspectDashboard
                                                   title='Rinse 3 PH Tank 4'
                                                   pathName='dashboard'
                                                   endPoint='degreasing/rinsethree'
                                                   referenceLineData={[]}
                                                   dataKey={'time'}
                                                   variableName='data'
                                                   keys={['data']}
                                                   limit={1000}
                                                   dataPoint='api'
                                               />
                                           </Grid>
                                           <Grid item xs={12} md={3} className="chartbox">
                                               <MindAspectDashboard
                                                   title='Rinse 3 Conductivity Tank 4'
                                                   assetId='bb2d6d60bed647beb3816fff37639de4'
                                                   assetName='Rinse3'
                                                   variableName='Rinse3_Conductivity'
                                                   referenceLineData={[]}
                                                   dataKey={'_time'}
                                                   keys={['Rinse3_Conductivity']}
                                                   limit={1000}
                                                   dataPoint='mindsphere'
                                               />
                                           </Grid>
                                           <Grid item xs={12} md={3} className="chartbox">
                                               <MindAspectDashboard
                                                   title='Conversion PH Tank 5'
                                                   assetId='bb2d6d60bed647beb3816fff37639de4'
                                                   assetName='Conversion'
                                                   variableName='Conversion_pH'
                                                   referenceLineData={[]}
                                                   dataKey={'_time'}
                                                   keys={['Conversion_pH']}
                                                   limit={1000}
                                                   dataPoint='mindsphere'
                                               />
                                           </Grid>
                                           <Grid item xs={12} md={3} className="chartbox">
                                               <MindAspectDashboard
                                                   title='Conversion Conductivity Tank 5'
                                                   assetId='bb2d6d60bed647beb3816fff37639de4'
                                                   assetName='Conversion'
                                                   variableName='Conversion_Conductivity'
                                                   referenceLineData={[]}
                                                   dataKey={'_time'}
                                                   keys={['Conversion_Conductivity']}
                                                   limit={1000}
                                                   dataPoint='mindsphere'
                                               />
                                           </Grid>
                                           <Grid item xs={12} md={3} className="chartbox">
                                               <MindAspectDashboard
                                                   title='Passivation PH Tank 7'
                                                   assetId='bb2d6d60bed647beb3816fff37639de4'
                                                   assetName='Passivation'
                                                   variableName='Passivation_pH'
                                                   referenceLineData={[]}
                                                   dataKey={'_time'}
                                                   keys={['Passivation_pH']}
                                                   limit={1000}
                                                   dataPoint='mindsphere'
                                               />
                                           </Grid>
                                           <Grid item xs={12} md={3} className="chartbox">
                                               <MindAspectDashboard
                                                   title='Passivation Conductivity Tank 7'
                                                   assetId='bb2d6d60bed647beb3816fff37639de4'
                                                   assetName='Passivation'
                                                   variableName='Passivation_Conductivity'
                                                   referenceLineData={[]}
                                                   dataKey={'_time'}
                                                   keys={['Passivation_Conductivity']}
                                                   limit={1000}
                                                   dataPoint='mindsphere'
                                               />
                                           </Grid>
                                           <Grid item xs={12} md={3} className="chartbox">
                                               <MindAspectDashboard
                                                   title='Passivation Concentration Tank 7'
                                                   pathName='dashboard'
                                                   endPoint='degreasing/passivation'
                                                   referenceLineData={[]}
                                                   variableName='data'
                                                   dataKey={'time'}
                                                   keys={['data']}
                                                   limit={1000}
                                                   dataPoint='api'
                                               />
                                           </Grid>
                                       </Grid>
                                   </CardContent>
                               </Card>
                           </Animated>
                           {/*** Oven ***/}
                           <Animated
                               animationIn="lightSpeedIn"
                               animationOut="fadeInRight"
                               isVisible={this.state.displayState === 2}
                               style={this.state.displayState === 2 ? null : { display: "none" }}
                           >
                               <Card style={{margin: 3, minWidth: 1378}} className="container" elevation={0}>
                                   <CardHeader
                                       avatar={
                                           <Avatar aria-label="recipe">
                                               O
                                           </Avatar>
                                       }
                                       title="Oven"
                                       subheader={format(new Date(), 'MMMMMM dd \',\' yyyy')}
                                   />
                                   <CardContent>
                                       <Grid container direction="row" justify="center" spacing={2}>
                                           <Grid item xs={12} md={3} className="chartbox">
                                               <Grid item xs={12} style={{textAlign: 'center', paddingBottom: 5}}>
                                                   <Typography variant="caption" gutterBottom>
                                                       Water Dryer Room Temperature
                                                   </Typography>
                                               </Grid>
                                               <Grid item xs={12} style={{textAlign: 'center'}}>
                                                   <SpeedMeter
                                                       assetId='04427cfe799146e792ff3bf4f274feab'
                                                       aspectName='WaterDryer'
                                                       parameterName='WaterDryer_190_TT_01'
                                                       customSegmentStops={[0, 30, 45, 75]}
                                                       segmentColors={['#46ff25', '#e9c94b', '#ff162c']}
                                                       minValue={0}
                                                       segmentsLength={3}
                                                       maxValue={75}
                                                       unit='°C'
                                                       needleHeight={0.8}
                                                       segmentLabels={[
                                                           {
                                                               text: '30 °C',
                                                               position: 'OUTSIDE',
                                                               color: '#46ff25',
                                                           },
                                                           {
                                                               text: '45 °C',
                                                               position: 'OUTSIDE',
                                                               color: '#e9c94b',
                                                           },
                                                           {
                                                               text: '75 °C',
                                                               position: 'OUTSIDE',
                                                               color: '#ff162c',
                                                           },
                                                       ]}
                                                       ringWidth={45}

                                                   />
                                               </Grid>
                                           </Grid>
                                           <Grid item xs={12} md={3} className="chartbox">
                                               <Grid item xs={12} style={{textAlign: 'center', paddingBottom: 5}}>
                                                   <Typography variant="caption" gutterBottom>
                                                       Water Dryer Room Humidity
                                                   </Typography>
                                               </Grid>
                                               <Grid item xs={12} style={{textAlign: 'center'}}>
                                                   <SpeedMeter
                                                       assetId='04427cfe799146e792ff3bf4f274feab'
                                                       aspectName='WaterDryer'
                                                       parameterName='WaterDryer_190_THR_01'
                                                       customSegmentStops={[0, 17, 47, 100]}
                                                       segmentColors={['#6ee991', '#dee957', '#ff9545']}
                                                       minValue={0}
                                                       segmentsLength={3}
                                                       maxValue={100}
                                                       unit='%'
                                                       needleHeight={0.8}
                                                       dataPoint='mindsphere'
                                                       segmentLabels={[
                                                           {
                                                               text: '17%',
                                                               position: 'OUTSIDE',
                                                               color: '#6ee991',
                                                           },
                                                           {
                                                               text: '47%',
                                                               position: 'OUTSIDE',
                                                               color: '#dee957',
                                                           },
                                                           {
                                                               text: '70%',
                                                               position: 'OUTSIDE',
                                                               color: '#ff9545',
                                                           },
                                                       ]}
                                                       ringWidth={45}

                                                   />
                                               </Grid>
                                           </Grid>
                                           <Grid item xs={12} md={3} className="chartbox">
                                               <Grid item xs={12} style={{textAlign: 'center', paddingBottom: 5}}>
                                                   <Typography variant="caption" gutterBottom>
                                                       Intermediate Oven Room Temperature
                                                   </Typography>
                                               </Grid>
                                               <Grid item xs={12} style={{textAlign: 'center'}}>
                                                   <SpeedMeter
                                                       assetId='04427cfe799146e792ff3bf4f274feab'
                                                       aspectName='IntermediateOven'
                                                       parameterName='IntermediateOven_220_TT_02'
                                                       customSegmentStops={[0, 30, 45, 75]}
                                                       segmentColors={['#46ff25', '#e9c94b', '#ff162c']}
                                                       minValue={0}
                                                       segmentsLength={3}
                                                       maxValue={75}
                                                       unit='°C'
                                                       needleHeight={0.8}
                                                       segmentLabels={[
                                                           {
                                                               text: '30 °C',
                                                               position: 'OUTSIDE',
                                                               color: '#46ff25',
                                                           },
                                                           {
                                                               text: '45 °C',
                                                               position: 'OUTSIDE',
                                                               color: '#e9c94b',
                                                           },
                                                           {
                                                               text: '75 °C',
                                                               position: 'OUTSIDE',
                                                               color: '#ff162c',
                                                           },
                                                       ]}
                                                       ringWidth={45}

                                                   />
                                               </Grid>
                                           </Grid>
                                           <Grid item xs={12} md={3} className="chartbox">
                                               <Grid item xs={12} style={{textAlign: 'center', paddingBottom: 5}}>
                                                   <Typography variant="caption" gutterBottom>
                                                       Intermediate Oven Room Humidity
                                                   </Typography>
                                               </Grid>
                                               <Grid item xs={12} style={{textAlign: 'center'}}>
                                                   <SpeedMeter
                                                       assetId='04427cfe799146e792ff3bf4f274feab'
                                                       aspectName='IntermediateOven'
                                                       parameterName='IntermediateOven_220_THR_01'
                                                       customSegmentStops={[0, 17, 47, 100]}
                                                       segmentColors={['#6ee991', '#dee957', '#ff9545']}
                                                       minValue={0}
                                                       segmentsLength={3}
                                                       maxValue={100}
                                                       unit='%'
                                                       needleHeight={0.8}
                                                       dataPoint='mindsphere'
                                                       segmentLabels={[
                                                           {
                                                               text: '17%',
                                                               position: 'OUTSIDE',
                                                               color: '#6ee991',
                                                           },
                                                           {
                                                               text: '47%',
                                                               position: 'OUTSIDE',
                                                               color: '#dee957',
                                                           },
                                                           {
                                                               text: '70%',
                                                               position: 'OUTSIDE',
                                                               color: '#ff9545',
                                                           },
                                                       ]}
                                                       ringWidth={45}

                                                   />
                                               </Grid>
                                           </Grid>
                                           <Grid item xs={12} md={3} className="chartbox">
                                               <Grid item xs={12} style={{textAlign: 'center', paddingBottom: 5}}>
                                                   <Typography variant="caption" gutterBottom>
                                                       Final Oven 1 Room Temperature
                                                   </Typography>
                                               </Grid>
                                               <Grid item xs={12} style={{textAlign: 'center'}}>
                                                   <SpeedMeter
                                                       assetId='04427cfe799146e792ff3bf4f274feab'
                                                       aspectName='FinalOven'
                                                       parameterName='FinalOven1_251_TT_02'
                                                       customSegmentStops={[0, 30, 45, 75]}
                                                       segmentColors={['#46ff25', '#e9c94b', '#ff162c']}
                                                       minValue={0}
                                                       segmentsLength={3}
                                                       maxValue={75}
                                                       unit='°C'
                                                       needleHeight={0.8}
                                                       segmentLabels={[
                                                           {
                                                               text: '30 °C',
                                                               position: 'OUTSIDE',
                                                               color: '#46ff25',
                                                           },
                                                           {
                                                               text: '45 °C',
                                                               position: 'OUTSIDE',
                                                               color: '#e9c94b',
                                                           },
                                                           {
                                                               text: '75 °C',
                                                               position: 'OUTSIDE',
                                                               color: '#ff162c',
                                                           },
                                                       ]}
                                                       ringWidth={45}

                                                   />
                                               </Grid>
                                           </Grid>
                                           <Grid item xs={12} md={3} className="chartbox">
                                               <Grid item xs={12} style={{textAlign: 'center', paddingBottom: 5}}>
                                                   <Typography variant="caption" gutterBottom>
                                                       Final Oven 1 Room Humidity
                                                   </Typography>
                                               </Grid>
                                               <Grid item xs={12} style={{textAlign: 'center'}}>
                                                   <SpeedMeter
                                                       assetId='04427cfe799146e792ff3bf4f274feab'
                                                       aspectName='FinalOven'
                                                       parameterName='FinalOven1_251_THR_02'
                                                       customSegmentStops={[0, 17, 47, 100]}
                                                       segmentColors={['#6ee991', '#dee957', '#ff9545']}
                                                       minValue={0}
                                                       segmentsLength={3}
                                                       maxValue={100}
                                                       unit='%'
                                                       needleHeight={0.8}
                                                       dataPoint='mindsphere'
                                                       segmentLabels={[
                                                           {
                                                               text: '17%',
                                                               position: 'OUTSIDE',
                                                               color: '#6ee991',
                                                           },
                                                           {
                                                               text: '47%',
                                                               position: 'OUTSIDE',
                                                               color: '#dee957',
                                                           },
                                                           {
                                                               text: '70%',
                                                               position: 'OUTSIDE',
                                                               color: '#ff9545',
                                                           },
                                                       ]}
                                                       ringWidth={45}

                                                   />
                                               </Grid>
                                           </Grid>
                                           <Grid item xs={12} md={3} className="chartbox">
                                               <Grid item xs={12} style={{textAlign: 'center', paddingBottom: 5}}>
                                                   <Typography variant="caption" gutterBottom>
                                                       Final Oven 2 Room Temperature
                                                   </Typography>
                                               </Grid>
                                               <Grid item xs={12} style={{textAlign: 'center'}}>
                                                   <SpeedMeter
                                                       assetId='04427cfe799146e792ff3bf4f274feab'
                                                       aspectName='FinalOven'
                                                       parameterName='FinalOven2_252_TT_02'
                                                       customSegmentStops={[0, 30, 45, 75]}
                                                       segmentColors={['#46ff25', '#e9c94b', '#ff162c']}
                                                       minValue={0}
                                                       segmentsLength={3}
                                                       maxValue={75}
                                                       unit='°C'
                                                       needleHeight={0.8}
                                                       segmentLabels={[
                                                           {
                                                               text: '30 °C',
                                                               position: 'OUTSIDE',
                                                               color: '#46ff25',
                                                           },
                                                           {
                                                               text: '45 °C',
                                                               position: 'OUTSIDE',
                                                               color: '#e9c94b',
                                                           },
                                                           {
                                                               text: '75 °C',
                                                               position: 'OUTSIDE',
                                                               color: '#ff162c',
                                                           },
                                                       ]}
                                                       ringWidth={45}

                                                   />
                                               </Grid>
                                           </Grid>
                                           <Grid item xs={12} md={3} className="chartbox">
                                               <Grid item xs={12} style={{textAlign: 'center', paddingBottom: 5}}>
                                                   <Typography variant="caption" gutterBottom>
                                                       Final Oven 2 Room Humidity
                                                   </Typography>
                                               </Grid>
                                               <Grid item xs={12} style={{textAlign: 'center'}}>
                                                   <SpeedMeter
                                                       assetId='04427cfe799146e792ff3bf4f274feab'
                                                       aspectName='FinalOven'
                                                       parameterName='FinalOven2_252_THR_02'
                                                       customSegmentStops={[0, 17, 47, 100]}
                                                       segmentColors={['#6ee991', '#dee957', '#ff9545']}
                                                       minValue={0}
                                                       segmentsLength={2}
                                                       maxValue={100}
                                                       unit='%'
                                                       needleHeight={0.8}
                                                       dataPoint='mindsphere'
                                                       segmentLabels={[
                                                           {
                                                               text: '17%',
                                                               position: 'OUTSIDE',
                                                               color: '#6ee991',
                                                           },
                                                           {
                                                               text: '47%',
                                                               position: 'OUTSIDE',
                                                               color: '#dee957',
                                                           },
                                                           {
                                                               text: '70%',
                                                               position: 'OUTSIDE',
                                                               color: '#ff9545',
                                                           },
                                                       ]}
                                                       ringWidth={45}

                                                   />
                                               </Grid>
                                           </Grid>
                                       </Grid>
                                   </CardContent>
                               </Card>
                           </Animated>
                           {/*** Paint Booth ***/}
                           <Animated
                               animationIn="lightSpeedIn"
                               animationOut="fadeInRight"
                               isVisible={this.state.displayState === 3}
                               style={this.state.displayState === 3 ? null : { display: "none" }}
                           >
                               <Card style={{margin: 3, minWidth: 1378}} className="container" elevation={0}>
                                   <CardHeader
                                       avatar={
                                           <Avatar aria-label="recipe">
                                               PB
                                           </Avatar>
                                       }
                                       title="Paint Booth"
                                       subheader={format(new Date(), 'MMMMMM dd \',\' yyyy')}
                                   />
                                   <CardContent>
                                       <Grid container direction="row" justify="center" spacing={2}>
                                       {/*    /!*<Grid item xs={12} md={3} className="chartbox">*!/*/}
                                       {/*    /!*    <MindAspectDashboard*!/*/}
                                       {/*    /!*        title='Paint Booth ESTA 1 Room Air Flow'*!/*/}
                                       {/*    /!*        assetId='cbd91e78437f46f3a0452e4cf17dc17a'*!/*/}
                                       {/*    /!*        assetName='ESTA'*!/*/}
                                       {/*    /!*        variableName='ESTA_200_PDZA_01'*!/*/}
                                       {/*    /!*        referenceLineData={[]}*!/*/}
                                       {/*    /!*        dataKey={'_time'}*!/*/}
                                       {/*    /!*        keys={['ESTA_200_PDZA_01']}*!/*/}
                                       {/*    /!*        limit={1000}*!/*/}
                                       {/*    /!*        dataPoint='mindsphere'*!/*/}
                                       {/*    /!*    />*!/*/}
                                       {/*    /!*</Grid>*!/*/}

                                       {/*    /!***ESTA 1*!/*/}
                                           <Grid item xs={12} md={3} className="chartbox">
                                               <TemperatureMeter
                                                   title='Paint Booth ESTA 1 Room Temperature'
                                                   assetId='cbd91e78437f46f3a0452e4cf17dc17a'
                                                   aspectName='ESTA'
                                                   parameterName='ESTA_280_TT_02'
                                                   unit='°C'
                                                   dataPoint='mindsphere'
                                               />
                                           </Grid>
                                           <Grid item xs={12} md={3} className="chartbox">
                                               <Grid item xs={12} style={{textAlign: 'center', paddingBottom: 5}}>
                                                   <Typography variant="caption" gutterBottom>
                                                       Paint Booth ESTA 1 Room Humidity
                                                   </Typography>
                                               </Grid>
                                               <Grid item xs={12} style={{textAlign: 'center'}}>
                                                   <SpeedMeter
                                                       assetId='cbd91e78437f46f3a0452e4cf17dc17a'
                                                       aspectName='ESTA'
                                                       parameterName='ESTA_280_THR_02'
                                                       customSegmentStops={[0, 17, 47, 100]}
                                                       segmentColors={['#6ee991', '#dee957', '#ff9545']}
                                                       minValue={0}
                                                       segmentsLength={3}
                                                       maxValue={100}
                                                       unit='%'
                                                       needleHeight={0.8}
                                                       dataPoint='mindsphere'
                                                       segmentLabels={[
                                                           {
                                                               text: '17%',
                                                               position: 'OUTSIDE',
                                                               color: '#6ee991',
                                                           },
                                                           {
                                                               text: '47%',
                                                               position: 'OUTSIDE',
                                                               color: '#dee957',
                                                           },
                                                           {
                                                               text: '70%',
                                                               position: 'OUTSIDE',
                                                               color: '#ff9545',
                                                           },
                                                       ]}
                                                       ringWidth={45}

                                                   />
                                               </Grid>
                                           </Grid>

                                       {/*    /!***ESTA 2*!/*/}
                                           <Grid item xs={12} md={3} className="chartbox">
                                               <TemperatureMeter
                                                   title='Paint Booth ESTA 2 Room Temperature'
                                                   assetId='cbd91e78437f46f3a0452e4cf17dc17a'
                                                   aspectName='ESTA'
                                                   parameterName='ESTA_200_TT_02'
                                                   unit='°C'
                                                   dataPoint='mindsphere'
                                               />
                                           </Grid>
                                           <Grid item xs={12} md={3} className="chartbox">
                                               <Grid item xs={12} style={{textAlign: 'center', paddingBottom: 5}}>
                                                   <Typography variant="caption" gutterBottom>
                                                       Paint Booth ESTA 2 Room Humidity
                                                   </Typography>
                                               </Grid>
                                               <Grid item xs={12} style={{textAlign: 'center'}}>
                                                   <SpeedMeter
                                                       assetId='cbd91e78437f46f3a0452e4cf17dc17a'
                                                       aspectName='ESTA'
                                                       parameterName='ESTA_200_THR_02'
                                                       customSegmentStops={[0, 17, 47, 100]}
                                                       segmentColors={['#6ee991', '#dee957', '#ff9545']}
                                                       minValue={0}
                                                       segmentsLength={3}
                                                       maxValue={100}
                                                       unit='%'
                                                       needleHeight={0.8}
                                                       dataPoint='mindsphere'
                                                       segmentLabels={[
                                                           {
                                                               text: '17%',
                                                               position: 'OUTSIDE',
                                                               color: '#6ee991',
                                                           },
                                                           {
                                                               text: '47%',
                                                               position: 'OUTSIDE',
                                                               color: '#dee957',
                                                           },
                                                           {
                                                               text: '70%',
                                                               position: 'OUTSIDE',
                                                               color: '#ff9545',
                                                           },
                                                       ]}
                                                       ringWidth={45}

                                                   />
                                               </Grid>
                                           </Grid>

                                       {/*    /!*<Grid item xs={12} md={3} className="chartbox">*!/*/}
                                       {/*    /!*    <Grid item xs={12} style={{textAlign: "center"}}>*!/*/}
                                       {/*    /!*        <Typography style={{color: 'blue'}} gutterBottom>*!/*/}
                                       {/*    /!*            Paint Booth ESTA 1 Room Humidity*!/*/}
                                       {/*    /!*        </Typography>*!/*/}
                                       {/*    /!*    </Grid>*!/*/}
                                       {/*    /!*    <AppLineChart*!/*/}
                                       {/*    /!*        key={1}*!/*/}
                                       {/*    /!*        data={[]}*!/*/}
                                       {/*    /!*        loading={this.state.decreasing.isFetching}*!/*/}
                                       {/*    /!*        keys={[]}*!/*/}
                                       {/*    /!*        width={350}*!/*/}
                                       {/*    /!*        height={300}*!/*/}
                                       {/*    /!*        xDataKey={''}*!/*/}
                                       {/*    /!*        referenceLineData={[{value: 4000, label: 'Max'},{value: 3000, label: 'Min'}]}*!/*/}
                                       {/*    /!*    />*!/*/}
                                       {/*    /!*    <Grid item xs={12} style={{textAlign: "center"}}>*!/*/}
                                       {/*    /!*        <Typography variant="overline"  color="textSecondary" gutterBottom>*!/*/}
                                       {/*    /!*            <strong>Current Value: 0</strong>*!/*/}
                                       {/*    /!*        </Typography>*!/*/}
                                       {/*    /!*    </Grid>*!/*/}
                                       {/*    /!*</Grid>*!/*/}
                                       {/*    /!*<Grid item xs={12} md={3} className="chartbox">*!/*/}
                                       {/*    /!*    <Grid item xs={12} style={{textAlign: "center"}}>*!/*/}
                                       {/*    /!*        <Typography style={{color: 'blue'}} gutterBottom>*!/*/}
                                       {/*    /!*            Paint Booth ESTA 2 Room Air Flow*!/*/}
                                       {/*    /!*        </Typography>*!/*/}
                                       {/*    /!*    </Grid>*!/*/}
                                       {/*    /!*    <AppLineChart*!/*/}
                                       {/*    /!*        key={1}*!/*/}
                                       {/*    /!*        data={[]}*!/*/}
                                       {/*    /!*        loading={this.state.decreasing.isFetching}*!/*/}
                                       {/*    /!*        keys={[]}*!/*/}
                                       {/*    /!*        width={350}*!/*/}
                                       {/*    /!*        height={300}*!/*/}
                                       {/*    /!*        xDataKey={''}*!/*/}
                                       {/*    /!*        referenceLineData={[{value: 4000, label: 'Max'},{value: 3000, label: 'Min'}]}*!/*/}
                                       {/*    /!*    />*!/*/}
                                       {/*    /!*    <Grid item xs={12} style={{textAlign: "center"}}>*!/*/}
                                       {/*    /!*        <Typography variant="overline"  color="textSecondary" gutterBottom>*!/*/}
                                       {/*    /!*            <strong>Current Value: 0</strong>*!/*/}
                                       {/*    /!*        </Typography>*!/*/}
                                       {/*    /!*    </Grid>*!/*/}
                                       {/*    /!*</Grid>*!/*/}
                                       {/*    /!*<Grid item xs={12} md={3} className="chartbox">*!/*/}
                                       {/*    /!*    <Grid item xs={12} style={{textAlign: "center"}}>*!/*/}
                                       {/*    /!*        <Typography style={{color: 'blue'}} gutterBottom>*!/*/}
                                       {/*    /!*            Paint Booth Room ESTA2 Temperature*!/*/}
                                       {/*    /!*        </Typography>*!/*/}
                                       {/*    /!*    </Grid>*!/*/}
                                       {/*    /!*    <AppLineChart*!/*/}
                                       {/*    /!*        key={1}*!/*/}
                                       {/*    /!*        data={[]}*!/*/}
                                       {/*    /!*        loading={this.state.decreasing.isFetching}*!/*/}
                                       {/*    /!*        keys={[]}*!/*/}
                                       {/*    /!*        width={350}*!/*/}
                                       {/*    /!*        height={300}*!/*/}
                                       {/*    /!*        xDataKey={''}*!/*/}
                                       {/*    /!*        referenceLineData={[{value: 4000, label: 'Max'},{value: 3000, label: 'Min'}]}*!/*/}
                                       {/*    /!*    />*!/*/}
                                       {/*    /!*    <Grid item xs={12} style={{textAlign: "center"}}>*!/*/}
                                       {/*    /!*        <Typography variant="overline"  color="textSecondary" gutterBottom>*!/*/}
                                       {/*    /!*            <strong>Current Value: 0</strong>*!/*/}
                                       {/*    /!*        </Typography>*!/*/}
                                       {/*    /!*    </Grid>*!/*/}
                                       {/*    /!*</Grid>*!/*/}
                                       {/*    /!*<Grid item xs={12} md={3} className="chartbox">*!/*/}
                                       {/*    /!*    <Grid item xs={12} style={{textAlign: "center"}}>*!/*/}
                                       {/*    /!*        <Typography style={{color: 'blue'}} gutterBottom>*!/*/}
                                       {/*    /!*            Paint Booth ESTA 2 Room Humidity*!/*/}
                                       {/*    /!*        </Typography>*!/*/}
                                       {/*    /!*    </Grid>*!/*/}
                                       {/*    /!*    <AppLineChart*!/*/}
                                       {/*    /!*        key={1}*!/*/}
                                       {/*    /!*        data={[]}*!/*/}
                                       {/*    /!*        loading={this.state.decreasing.isFetching}*!/*/}
                                       {/*    /!*        keys={[]}*!/*/}
                                       {/*    /!*        width={350}*!/*/}
                                       {/*    /!*        height={300}*!/*/}
                                       {/*    /!*        xDataKey={''}*!/*/}
                                       {/*    /!*        referenceLineData={[{value: 4000, label: 'Max'},{value: 3000, label: 'Min'}]}*!/*/}
                                       {/*    /!*    />*!/*/}
                                       {/*    /!*    <Grid item xs={12} style={{textAlign: "center"}}>*!/*/}
                                       {/*    /!*        <Typography variant="overline"  color="textSecondary" gutterBottom>*!/*/}
                                       {/*    /!*            <strong>Current Value: 0</strong>*!/*/}
                                       {/*    /!*        </Typography>*!/*/}
                                       {/*    /!*    </Grid>*!/*/}
                                       {/*    /!*</Grid>*!/*/}
                                       {/*    /!*<Grid item xs={12} md={3} className="chartbox">*!/*/}
                                       {/*    /!*    <Grid item xs={12} style={{textAlign: "center"}}>*!/*/}
                                       {/*    /!*        <Typography style={{color: 'blue'}} gutterBottom>*!/*/}
                                       {/*    /!*            Primer Cabinet 1 Temperature*!/*/}
                                       {/*    /!*        </Typography>*!/*/}
                                       {/*    /!*    </Grid>*!/*/}
                                       {/*    /!*    <AppLineChart*!/*/}
                                       {/*    /!*        key={1}*!/*/}
                                       {/*    /!*        data={[]}*!/*/}
                                       {/*    /!*        loading={this.state.decreasing.isFetching}*!/*/}
                                       {/*    /!*        keys={[]}*!/*/}
                                       {/*    /!*        width={350}*!/*/}
                                       {/*    /!*        height={300}*!/*/}
                                       {/*    /!*        xDataKey={''}*!/*/}
                                       {/*    /!*        referenceLineData={[{value: 4000, label: 'Max'},{value: 3000, label: 'Min'}]}*!/*/}
                                       {/*    /!*    />*!/*/}
                                       {/*    /!*    <Grid item xs={12} style={{textAlign: "center"}}>*!/*/}
                                       {/*    /!*        <Typography variant="overline"  color="textSecondary" gutterBottom>*!/*/}
                                       {/*    /!*            <strong>Current Value: 0</strong>*!/*/}
                                       {/*    /!*        </Typography>*!/*/}
                                       {/*    /!*    </Grid>*!/*/}
                                       {/*    /!*</Grid>*!/*/}
                                       {/*    /!*<Grid item xs={12} md={3} className="chartbox">*!/*/}
                                       {/*    /!*    <Grid item xs={12} style={{textAlign: "center"}}>*!/*/}
                                       {/*    /!*        <Typography style={{color: 'blue'}} gutterBottom>*!/*/}
                                       {/*    /!*            Primer Cabinet 1 Humidity*!/*/}
                                       {/*    /!*        </Typography>*!/*/}
                                       {/*    /!*    </Grid>*!/*/}
                                       {/*    /!*    <AppLineChart*!/*/}
                                       {/*    /!*        key={1}*!/*/}
                                       {/*    /!*        data={[]}*!/*/}
                                       {/*    /!*        loading={this.state.decreasing.isFetching}*!/*/}
                                       {/*    /!*        keys={[]}*!/*/}
                                       {/*    /!*        width={350}*!/*/}
                                       {/*    /!*        height={300}*!/*/}
                                       {/*    /!*        xDataKey={''}*!/*/}
                                       {/*    /!*        referenceLineData={[{value: 4000, label: 'Max'},{value: 3000, label: 'Min'}]}*!/*/}
                                       {/*    /!*    />*!/*/}
                                       {/*    /!*    <Grid item xs={12} style={{textAlign: "center"}}>*!/*/}
                                       {/*    /!*        <Typography variant="overline"  color="textSecondary" gutterBottom>*!/*/}
                                       {/*    /!*            <strong>Current Value: 0</strong>*!/*/}
                                       {/*    /!*        </Typography>*!/*/}
                                       {/*    /!*    </Grid>*!/*/}
                                       {/*    /!*</Grid>*!/*/}
                                       {/*    /!*<Grid item xs={12} md={3} className="chartbox">*!/*/}
                                       {/*    /!*    <Grid item xs={12} style={{textAlign: "center"}}>*!/*/}
                                       {/*    /!*        <Typography style={{color: 'blue'}} gutterBottom>*!/*/}
                                       {/*    /!*            Primer Cabinet 1 Paint viscosity*!/*/}
                                       {/*    /!*        </Typography>*!/*/}
                                       {/*    /!*    </Grid>*!/*/}
                                       {/*    /!*    <AppLineChart*!/*/}
                                       {/*    /!*        key={1}*!/*/}
                                       {/*    /!*        data={[]}*!/*/}
                                       {/*    /!*        loading={this.state.decreasing.isFetching}*!/*/}
                                       {/*    /!*        keys={[]}*!/*/}
                                       {/*    /!*        width={350}*!/*/}
                                       {/*    /!*        height={300}*!/*/}
                                       {/*    /!*        xDataKey={''}*!/*/}
                                       {/*    /!*        referenceLineData={[{value: 4000, label: 'Max'},{value: 3000, label: 'Min'}]}*!/*/}
                                       {/*    /!*    />*!/*/}
                                       {/*    /!*    <Grid item xs={12} style={{textAlign: "center"}}>*!/*/}
                                       {/*    /!*        <Typography variant="overline"  color="textSecondary" gutterBottom>*!/*/}
                                       {/*    /!*            <strong>Current Value: 0</strong>*!/*/}
                                       {/*    /!*        </Typography>*!/*/}
                                       {/*    /!*    </Grid>*!/*/}
                                       {/*    /!*</Grid>*!/*/}
                                       {/*    /!*<Grid item xs={12} md={3} className="chartbox">*!/*/}
                                       {/*    /!*    <Grid item xs={12} style={{textAlign: "center"}}>*!/*/}
                                       {/*    /!*        <Typography style={{color: 'blue'}} gutterBottom>*!/*/}
                                       {/*    /!*            Primer Cabinet 2 Temperature*!/*/}
                                       {/*    /!*        </Typography>*!/*/}
                                       {/*    /!*    </Grid>*!/*/}
                                       {/*    /!*    <AppLineChart*!/*/}
                                       {/*    /!*        key={1}*!/*/}
                                       {/*    /!*        data={[]}*!/*/}
                                       {/*    /!*        loading={this.state.decreasing.isFetching}*!/*/}
                                       {/*    /!*        keys={[]}*!/*/}
                                       {/*    /!*        width={350}*!/*/}
                                       {/*    /!*        height={300}*!/*/}
                                       {/*    /!*        xDataKey={''}*!/*/}
                                       {/*    /!*        referenceLineData={[{value: 4000, label: 'Max'},{value: 3000, label: 'Min'}]}*!/*/}
                                       {/*    /!*    />*!/*/}
                                       {/*    /!*    <Grid item xs={12} style={{textAlign: "center"}}>*!/*/}
                                       {/*    /!*        <Typography variant="overline"  color="textSecondary" gutterBottom>*!/*/}
                                       {/*    /!*            <strong>Current Value: 0</strong>*!/*/}
                                       {/*    /!*        </Typography>*!/*/}
                                       {/*    /!*    </Grid>*!/*/}
                                       {/*    /!*</Grid>*!/*/}
                                       {/*    /!*<Grid item xs={12} md={3} className="chartbox">*!/*/}
                                       {/*    /!*    <Grid item xs={12} style={{textAlign: "center"}}>*!/*/}
                                       {/*    /!*        <Typography style={{color: 'blue'}} gutterBottom>*!/*/}
                                       {/*    /!*            Primer Cabinet 2 Humidity*!/*/}
                                       {/*    /!*        </Typography>*!/*/}
                                       {/*    /!*    </Grid>*!/*/}
                                       {/*    /!*    <AppLineChart*!/*/}
                                       {/*    /!*        key={1}*!/*/}
                                       {/*    /!*        data={[]}*!/*/}
                                       {/*    /!*        loading={this.state.decreasing.isFetching}*!/*/}
                                       {/*    /!*        keys={[]}*!/*/}
                                       {/*    /!*        width={350}*!/*/}
                                       {/*    /!*        height={300}*!/*/}
                                       {/*    /!*        xDataKey={''}*!/*/}
                                       {/*    /!*        referenceLineData={[{value: 4000, label: 'Max'},{value: 3000, label: 'Min'}]}*!/*/}
                                       {/*    /!*    />*!/*/}
                                       {/*    /!*    <Grid item xs={12} style={{textAlign: "center"}}>*!/*/}
                                       {/*    /!*        <Typography variant="overline"  color="textSecondary" gutterBottom>*!/*/}
                                       {/*    /!*            <strong>Current Value: 0</strong>*!/*/}
                                       {/*    /!*        </Typography>*!/*/}
                                       {/*    /!*    </Grid>*!/*/}
                                       {/*    /!*</Grid>*!/*/}
                                       {/*    /!*<Grid item xs={12} md={3} className="chartbox">*!/*/}
                                       {/*    /!*    <Grid item xs={12} style={{textAlign: "center"}}>*!/*/}
                                       {/*    /!*        <Typography style={{color: 'blue'}} gutterBottom>*!/*/}
                                       {/*    /!*            Primer Cabinet 2 Paint viscosity*!/*/}
                                       {/*    /!*        </Typography>*!/*/}
                                       {/*    /!*    </Grid>*!/*/}
                                       {/*    /!*    <AppLineChart*!/*/}
                                       {/*    /!*        key={1}*!/*/}
                                       {/*    /!*        data={[]}*!/*/}
                                       {/*    /!*        loading={this.state.decreasing.isFetching}*!/*/}
                                       {/*    /!*        keys={[]}*!/*/}
                                       {/*    /!*        width={350}*!/*/}
                                       {/*    /!*        height={300}*!/*/}
                                       {/*    /!*        xDataKey={''}*!/*/}
                                       {/*    /!*        referenceLineData={[{value: 4000, label: 'Max'},{value: 3000, label: 'Min'}]}*!/*/}
                                       {/*    /!*    />*!/*/}
                                       {/*    /!*    <Grid item xs={12} style={{textAlign: "center"}}>*!/*/}
                                       {/*    /!*        <Typography variant="overline"  color="textSecondary" gutterBottom>*!/*/}
                                       {/*    /!*            <strong>Current Value: 0</strong>*!/*/}
                                       {/*    /!*        </Typography>*!/*/}
                                       {/*    /!*    </Grid>*!/*/}
                                       {/*    /!*</Grid>*!/*/}
                                       {/*    /!*** Top Coat 1 ***!/*/}
                                       {/*    /!*<Grid item xs={12} md={3} className="chartbox">*!/*/}
                                       {/*    /!*    <Grid item xs={12} style={{textAlign: "center"}}>*!/*/}
                                       {/*    /!*        <Typography style={{color: 'blue'}} gutterBottom>*!/*/}
                                       {/*    /!*            Top Coat 1 Temperature*!/*/}
                                       {/*    /!*        </Typography>*!/*/}
                                       {/*    /!*    </Grid>*!/*/}
                                       {/*    /!*    <AppLineChart*!/*/}
                                       {/*    /!*        key={1}*!/*/}
                                       {/*    /!*        data={[]}*!/*/}
                                       {/*    /!*        loading={this.state.decreasing.isFetching}*!/*/}
                                       {/*    /!*        keys={[]}*!/*/}
                                       {/*    /!*        width={350}*!/*/}
                                       {/*    /!*        height={300}*!/*/}
                                       {/*    /!*        xDataKey={''}*!/*/}
                                       {/*    /!*        referenceLineData={[{value: 4000, label: 'Max'},{value: 3000, label: 'Min'}]}*!/*/}
                                       {/*    /!*    />*!/*/}
                                       {/*    /!*    <Grid item xs={12} style={{textAlign: "center"}}>*!/*/}
                                       {/*    /!*        <Typography variant="overline"  color="textSecondary" gutterBottom>*!/*/}
                                       {/*    /!*            <strong>Current Value: 0</strong>*!/*/}
                                       {/*    /!*        </Typography>*!/*/}
                                       {/*    /!*    </Grid>*!/*/}
                                       {/*    /!*</Grid>*!/*/}
                                       {/*    /!*<Grid item xs={12} md={3} className="chartbox">*!/*/}
                                       {/*    /!*    <Grid item xs={12} style={{textAlign: "center"}}>*!/*/}
                                       {/*    /!*        <Typography style={{color: 'blue'}} gutterBottom>*!/*/}
                                       {/*    /!*            Top Coat 1 Humidity*!/*/}
                                       {/*    /!*        </Typography>*!/*/}
                                       {/*    /!*    </Grid>*!/*/}
                                       {/*    /!*    <AppLineChart*!/*/}
                                       {/*    /!*        key={1}*!/*/}
                                       {/*    /!*        data={[]}*!/*/}
                                       {/*    /!*        loading={this.state.decreasing.isFetching}*!/*/}
                                       {/*    /!*        keys={[]}*!/*/}
                                       {/*    /!*        width={350}*!/*/}
                                       {/*    /!*        height={300}*!/*/}
                                       {/*    /!*        xDataKey={''}*!/*/}
                                       {/*    /!*        referenceLineData={[{value: 4000, label: 'Max'},{value: 3000, label: 'Min'}]}*!/*/}
                                       {/*    /!*    />*!/*/}
                                       {/*    /!*    <Grid item xs={12} style={{textAlign: "center"}}>*!/*/}
                                       {/*    /!*        <Typography variant="overline"  color="textSecondary" gutterBottom>*!/*/}
                                       {/*    /!*            <strong>Current Value: 0</strong>*!/*/}
                                       {/*    /!*        </Typography>*!/*/}
                                       {/*    /!*    </Grid>*!/*/}
                                       {/*    /!*</Grid>*!/*/}
                                       {/*    /!*** Top Coat 2 ***!/*/}
                                       {/*    /!*<Grid item xs={12} md={3} className="chartbox">*!/*/}
                                       {/*    /!*    <Grid item xs={12} style={{textAlign: "center"}}>*!/*/}
                                       {/*    /!*        <Typography style={{color: 'blue'}} gutterBottom>*!/*/}
                                       {/*    /!*            Top Coat 2 Temperature*!/*/}
                                       {/*    /!*        </Typography>*!/*/}
                                       {/*    /!*    </Grid>*!/*/}
                                       {/*    /!*    <AppLineChart*!/*/}
                                       {/*    /!*        key={1}*!/*/}
                                       {/*    /!*        data={[]}*!/*/}
                                       {/*    /!*        loading={this.state.decreasing.isFetching}*!/*/}
                                       {/*    /!*        keys={[]}*!/*/}
                                       {/*    /!*        width={350}*!/*/}
                                       {/*    /!*        height={300}*!/*/}
                                       {/*    /!*        xDataKey={''}*!/*/}
                                       {/*    /!*        referenceLineData={[{value: 4000, label: 'Max'},{value: 3000, label: 'Min'}]}*!/*/}
                                       {/*    /!*    />*!/*/}
                                       {/*    /!*    <Grid item xs={12} style={{textAlign: "center"}}>*!/*/}
                                       {/*    /!*        <Typography variant="overline"  color="textSecondary" gutterBottom>*!/*/}
                                       {/*    /!*            <strong>Current Value: 0</strong>*!/*/}
                                       {/*    /!*        </Typography>*!/*/}
                                       {/*    /!*    </Grid>*!/*/}
                                       {/*    /!*</Grid>*!/*/}
                                       {/*    /!*<Grid item xs={12} md={3} className="chartbox">*!/*/}
                                       {/*    /!*    <Grid item xs={12} style={{textAlign: "center"}}>*!/*/}
                                       {/*    /!*        <Typography style={{color: 'blue'}} gutterBottom>*!/*/}
                                       {/*    /!*            Top Coat 2 Humidity*!/*/}
                                       {/*    /!*        </Typography>*!/*/}
                                       {/*    /!*    </Grid>*!/*/}
                                       {/*    /!*    <AppLineChart*!/*/}
                                       {/*    /!*        key={1}*!/*/}
                                       {/*    /!*        data={[]}*!/*/}
                                       {/*    /!*        loading={this.state.decreasing.isFetching}*!/*/}
                                       {/*    /!*        keys={[]}*!/*/}
                                       {/*    /!*        width={350}*!/*/}
                                       {/*    /!*        height={300}*!/*/}
                                       {/*    /!*        xDataKey={''}*!/*/}
                                       {/*    /!*        referenceLineData={[{value: 4000, label: 'Max'},{value: 3000, label: 'Min'}]}*!/*/}
                                       {/*    /!*    />*!/*/}
                                       {/*    /!*    <Grid item xs={12} style={{textAlign: "center"}}>*!/*/}
                                       {/*    /!*        <Typography variant="overline"  color="textSecondary" gutterBottom>*!/*/}
                                       {/*    /!*            <strong>Current Value: 0</strong>*!/*/}
                                       {/*    /!*        </Typography>*!/*/}
                                       {/*    /!*    </Grid>*!/*/}
                                       {/*    /!*</Grid>*!/*/}
                                       </Grid>
                                   </CardContent>
                               </Card>
                           </Animated>
                           {/*** Wate Water Management **/}
                           <Animated
                               animationIn="lightSpeedIn"
                               animationOut="fadeInRight"
                               isVisible={this.state.displayState === 4}
                               style={this.state.displayState === 4 ? null : { display: "none" }}
                           >
                               <Card style={{margin: 3, minWidth: 1378}} className="container" elevation={0}>
                                   <CardHeader
                                       avatar={
                                           <Avatar aria-label="recipe">
                                               WT
                                           </Avatar>
                                       }
                                       title="Waste Water Treatment"
                                       subheader={format(new Date(), 'MMMMMM dd \',\' yyyy')}
                                   />
                                   <CardContent>
                                       <Grid container direction="row" justify="center" spacing={2}>
                                           <Grid item xs={12} md={3} className="chartbox">
                                               <MindAspectDashboard
                                                   title='Neutralization Tank 3 PH'
                                                   pathName='dashboard'
                                                   endPoint='wastewater/tank3PH'
                                                   keys={['data']}
                                                   referenceLineData={[]}
                                                   variableName='data'
                                                   dataKey={'time'}
                                                   limit={1000}
                                                   dataPoint='api'
                                               />
                                           </Grid>
                                           <Grid item xs={12} md={3} className="chartbox">
                                               <MindAspectDashboard
                                                   title='Distilled Water Tank 6 PH'
                                                   pathName='dashboard'
                                                   endPoint='wastewater/tank6PH'
                                                   keys={['data']}
                                                   referenceLineData={[]}
                                                   variableName='data'
                                                   dataKey={'time'}
                                                   limit={1000}
                                                   dataPoint='api'
                                               />
                                           </Grid>
                                           <Grid item xs={12} md={3} className="chartbox">
                                               <MindAspectDashboard
                                                   title='Demineralization Tank 6 Conductivity'
                                                   pathName='dashboard'
                                                   endPoint='wastewater/tank6Conductivity'
                                                   keys={['data']}
                                                   referenceLineData={[]}
                                                   variableName='data'
                                                   dataKey={'time'}
                                                   limit={1000}
                                                   dataPoint='api'
                                               />
                                           </Grid>
                                       </Grid>
                                   </CardContent>
                               </Card>
                           </Animated>
                       </div>
                   </Card>
               </Grid>
               <Grid item xs={12} md={4}>
                   <NotificationCard formName="Rinse1"/>
               </Grid>
               {/*<Grid item xs={12} md={4}>*/}
               {/*    <NotificationCard formName="Rinse2"/>*/}
               {/*</Grid>*/}
               {/*<Grid item xs={12} md={4}>*/}
               {/*    <NotificationCard formName="Rinse3"/>*/}
               {/*</Grid>*/}
               {/*<Grid item xs={12} md={4}>*/}
               {/*    <NotificationCard formName="Passivation"/>*/}
               {/*</Grid>*/}
               {/*<Grid item xs={12} md={4}>*/}
               {/*    <NotificationCard formName="PaintBooth"/>*/}
               {/*</Grid>*/}
               {/*<Grid item xs={12} md={4}>*/}
               {/*    <NotificationCard formName="PaintCabinet"/>*/}
               {/*</Grid>*/}
               {/*<Grid item xs={12} md={4}>*/}
               {/*    <NotificationCard formName="Conversion"/>*/}
               {/*</Grid>*/}
               {/*<Grid item xs={12} md={4}>*/}
               {/*    <NotificationCard formName="NeuEvaporator"/>*/}
               {/*</Grid>*/}
               {/*<Grid item xs={12} md={4}>*/}
               {/*    <NotificationCard formName="Degreasing"/>*/}
               {/*</Grid>*/}
           </Grid>
        );
    }
}

export default Home
