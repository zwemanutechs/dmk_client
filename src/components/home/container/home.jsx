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
import {Temperature, Humidity} from 'react-environment-chart';
import ReactInterval from 'react-interval';
import {Animated} from "react-animated-css";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayState: 1,
            transactionEnable: true,
            transactionTimeout: 5000,
            decreasing: {
                isFetching: true,
                data: []
            }
        }
    }

    componentDidMount() {
        this.getDegreasing();
    }

    getDegreasing = () => {
        let decreasing = this.state.decreasing;
        // Make the request
        fetch('https://covidapi.info/api/v1/country/SGP/timeseries/2020-03-15/2020-04-25')
            // convert the response to json
            .then(resp => resp.json())
            .then(json => {
                decreasing.data = json.result;
                decreasing.isFetching = false;
                this.setState({decreasing: decreasing});
            });
    };

    playTransaction = () => {
        if (this.state.displayState === 2) {
            setTimeout(() => this.setState({displayState: 1}), 650);
        }else{
            setTimeout(() => this.setState({displayState: this.state.displayState + 1}), 650);
        }
    };

    render() {
        return (
           <Grid container direction={"row"} spacing={2}>
               <ReactInterval timeout={this.state.transactionTimeout} enabled={this.state.transactionEnable}
                              callback={() => this.playTransaction()} />
               <Grid item xs={12}>
                   <Card style={{minWidth: 1420}}>
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
                                   subheader="September 14, 2020"
                               />
                               <CardContent>
                                   <Grid container direction="row" justify="center" spacing={2} ref={this.containerRef}>
                                       <Grid item xs={12} md={3} className="chartbox">
                                           <Grid item xs={12} style={{textAlign: "center"}}>
                                               <Typography  color="textSecondary" gutterBottom>
                                                   PH
                                               </Typography>
                                           </Grid>
                                           <AppLineChart
                                               key={1}
                                               data={this.state.decreasing.data}
                                               loading={this.state.decreasing.isFetching}
                                               keys={['confirmed', 'deaths', 'recovered']}
                                               width={280}
                                               height={200}
                                               xDataKey={'date'}
                                               referenceLineData={[{value: 4000, label: 'Max'},{value: 3000, label: 'Min'}]}
                                           />
                                           <Grid item xs={12} style={{textAlign: "center"}}>
                                               <Typography variant="overline"  color="textSecondary" gutterBottom>
                                                   <strong>Current Value: 12</strong>
                                               </Typography>
                                           </Grid>
                                       </Grid>
                                       <Grid item xs={12} md={3} className="chartbox">
                                           <Grid item xs={12} style={{textAlign: "center"}}>
                                               <Typography  color="textSecondary" gutterBottom>
                                                   PH - 2
                                               </Typography>
                                           </Grid>
                                           <AppLineChart
                                               key={1}
                                               data={this.state.decreasing.data}
                                               loading={this.state.decreasing.isFetching}
                                               keys={['confirmed', 'deaths', 'recovered']}
                                               width={280}
                                               height={200}
                                               xDataKey={'date'}
                                               referenceLineData={[{value: 4000, label: 'Max'},{value: 3000, label: 'Min'}]}
                                           />
                                           <Grid item xs={12} style={{textAlign: "center"}}>
                                               <Typography variant="overline"  color="textSecondary" gutterBottom>
                                                   <strong>Current Value: 12</strong>
                                               </Typography>
                                           </Grid>
                                       </Grid>
                                   </Grid>
                               </CardContent>
                           </Card>
                       </Animated>
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
                                           D
                                       </Avatar>
                                   }
                                   title="Degreasing"
                                   subheader="September 14, 2020"
                               />
                               <CardContent>
                                   <Grid container direction="row" justify="center" spacing={2} ref={this.containerRef}>
                                       <Grid item xs={12} md={3} className="chartbox">
                                           <Grid item xs={12} style={{textAlign: "center"}}>
                                               <Typography  color="textSecondary" gutterBottom>
                                                   PH
                                               </Typography>
                                           </Grid>
                                           <AppLineChart
                                               key={1}
                                               data={this.state.decreasing.data}
                                               loading={this.state.decreasing.isFetching}
                                               keys={['confirmed', 'deaths', 'recovered']}
                                               width={280}
                                               height={200}
                                               xDataKey={'date'}
                                               referenceLineData={[{value: 4000, label: 'Max'},{value: 3000, label: 'Min'}]}
                                           />
                                           <Grid item xs={12} style={{textAlign: "center"}}>
                                               <Typography variant="overline"  color="textSecondary" gutterBottom>
                                                   <strong>Current Value: 12</strong>
                                               </Typography>
                                           </Grid>
                                       </Grid>
                                   </Grid>
                               </CardContent>
                           </Card>
                       </Animated>
                   </Card>
               </Grid>

               <Grid item xs={12} md={4}>
                   <Card style={{margin: 10}}>
                       <CardHeader
                           avatar={
                               <Avatar aria-label="recipe">
                                   D
                               </Avatar>
                           }
                           title="Degreasing"
                           subheader="September 14, 2020"
                       />
                       <List dense={true}>
                           <ListItem>
                               <ListItemIcon>
                                   <ErrorOutlineOutlinedIcon color="secondary"/>
                               </ListItemIcon>
                               <ListItemText
                                   primary="System detect the high value."
                               />
                           </ListItem>
                       </List>
                   </Card>
               </Grid>
               <Grid item xs={12} md={4}>
                   <NotificationCard formName="Rinse1"/>
               </Grid>
               <Grid item xs={12} md={4}>
                   <NotificationCard formName="Rinse2"/>
               </Grid>
               <Grid item xs={12} md={4}>
                   <NotificationCard formName="Rinse3"/>
               </Grid>
               <Grid item xs={12} md={4}>
                   <NotificationCard formName="Passivation"/>
               </Grid>
               <Grid item xs={12} md={4}>
                   <NotificationCard formName="PaintBooth"/>
               </Grid>
               <Grid item xs={12} md={4}>
                   <NotificationCard formName="PaintCabinet"/>
               </Grid>
               <Grid item xs={12} md={4}>
                   <NotificationCard formName="Conversion"/>
               </Grid>
               <Grid item xs={12} md={4}>
                   <NotificationCard formName="NeuEvaporator"/>
               </Grid>
               <Grid item xs={12} md={4}>
                   <NotificationCard formName="Degreasing"/>
               </Grid>
           </Grid>
        );
    }
}

export default Home
