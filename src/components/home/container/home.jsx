import React, {Component} from 'react';
import AppLineChart from "../../../shared/charts/line/container/lineChart";
import InfiniteCarousel from 'react-leaf-carousel';
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

class Home extends Component{

    constructor(props) {
        super(props);
    }

    render() {
        return (
           <Grid container direction={"row"} spacing={2}>
               <Grid item xs={12}>
                   <Card style={{margin: 10, maxWidth: 1424}}>
                       <InfiniteCarousel
                           breakpoints={[
                               {
                                   breakpoint: 500,
                                   settings: {
                                       slidesToShow: 1,
                                       slidesToScroll: 1,
                                   },
                               },
                               {
                                   breakpoint: 768,
                                   settings: {
                                       slidesToShow: 1,
                                       slidesToScroll: 1,
                                   },
                               },
                               {
                                   breakpoint: 1024,
                                   settings: {
                                       slidesToShow: 5,
                                       slidesToScroll: 5,
                                   },
                               },
                               {
                                   breakpoint: 1200,
                                   settings: {
                                       slidesToShow: 5,
                                       slidesToScroll: 5,
                                   },
                               },
                               {
                                   breakpoint: 3000,
                                   settings: {
                                       slidesToShow: 5,
                                       slidesToScroll: 5,
                                   },
                               },
                           ]}
                           dots={false}
                           showSides={false}
                           sidesOpacity={0.1}
                           sideSize={0.1}
                           slidesToScroll={5}
                           slidesToShow={5}
                           scrollOnDevice={true}
                           autoCycle={true}
                           arrows={false}
                           slidesSpacing={10}
                           cycleInterval={5000}
                       >
                           <div>
                               <AppLineChart
                                   key={1}
                                   url={'https://covidapi.info/api/v1/country/SGP/timeseries/2020-03-15/2020-04-25'}
                                   keys={['confirmed', 'deaths', 'recovered']}
                                   width={280}
                                   height={280}
                                   xDataKey={'date'}
                                   referenceLineData={[{value: 5000, label: 'Max'},{value: 2000, label: 'Min'}]}
                               />
                           </div>
                           <div>
                               <AppLineChart
                                   key={2}
                                   url={'https://covidapi.info/api/v1/country/SGP/timeseries/2020-03-15/2020-04-25'}
                                   keys={['confirmed', 'deaths', 'recovered']}
                                   width={280}
                                   height={280}
                                   xDataKey={'date'}
                                   referenceLineData={[{value: 6000, label: 'Max'},{value: 1000, label: 'Min'}]}
                               />
                           </div>
                           <div>
                               <AppLineChart
                                   key={2}
                                   url={'https://covidapi.info/api/v1/country/SGP/timeseries/2020-03-15/2020-04-25'}
                                   keys={['confirmed', 'deaths', 'recovered']}
                                   width={280}
                                   height={280}
                                   xDataKey={'date'}
                                   referenceLineData={[{value: 6000, label: 'Max'},{value: 1000, label: 'Min'}]}
                               />
                           </div>
                           <div>
                               <AppLineChart
                                   key={2}
                                   url={'https://covidapi.info/api/v1/country/SGP/timeseries/2020-03-15/2020-04-25'}
                                   keys={['confirmed', 'deaths', 'recovered']}
                                   width={280}
                                   height={280}
                                   xDataKey={'date'}
                                   referenceLineData={[{value: 6000, label: 'Max'},{value: 1000, label: 'Min'}]}
                               />
                           </div>
                           <div>
                               <AppLineChart
                                   key={2}
                                   url={'https://covidapi.info/api/v1/country/SGP/timeseries/2020-03-15/2020-04-25'}
                                   keys={['confirmed', 'deaths', 'recovered']}
                                   width={280}
                                   height={280}
                                   xDataKey={'date'}
                                   referenceLineData={[{value: 6000, label: 'Max'},{value: 1000, label: 'Min'}]}
                               />
                           </div>
                           <div>
                               <AppLineChart
                                   key={2}
                                   url={'https://covidapi.info/api/v1/country/SGP/timeseries/2020-03-15/2020-04-25'}
                                   keys={['confirmed', 'deaths', 'recovered']}
                                   width={280}
                                   height={280}
                                   xDataKey={'date'}
                                   referenceLineData={[{value: 6000, label: 'Max'},{value: 1000, label: 'Min'}]}
                               />
                           </div>
                           <div>
                               <AppLineChart
                                   key={2}
                                   url={'https://covidapi.info/api/v1/country/SGP/timeseries/2020-03-15/2020-04-25'}
                                   keys={['confirmed', 'deaths', 'recovered']}
                                   width={280}
                                   height={280}
                                   xDataKey={'date'}
                                   referenceLineData={[{value: 6000, label: 'Max'},{value: 1000, label: 'Min'}]}
                               />
                           </div>
                           <div>
                               <AppLineChart
                                   key={2}
                                   url={'https://covidapi.info/api/v1/country/SGP/timeseries/2020-03-15/2020-04-25'}
                                   keys={['confirmed', 'deaths', 'recovered']}
                                   width={280}
                                   height={280}
                                   xDataKey={'date'}
                                   referenceLineData={[{value: 6000, label: 'Max'},{value: 1000, label: 'Min'}]}
                               />
                           </div>
                           <div>
                               <AppLineChart
                                   key={2}
                                   url={'https://covidapi.info/api/v1/country/SGP/timeseries/2020-03-15/2020-04-25'}
                                   keys={['confirmed', 'deaths', 'recovered']}
                                   width={280}
                                   height={280}
                                   xDataKey={'date'}
                                   referenceLineData={[{value: 6000, label: 'Max'},{value: 1000, label: 'Min'}]}
                               />
                           </div>
                           <div>
                               <AppLineChart
                                   key={2}
                                   url={'https://covidapi.info/api/v1/country/SGP/timeseries/2020-03-15/2020-04-25'}
                                   keys={['confirmed', 'deaths', 'recovered']}
                                   width={280}
                                   height={280}
                                   xDataKey={'date'}
                                   referenceLineData={[{value: 6000, label: 'Max'},{value: 1000, label: 'Min'}]}
                               />
                           </div>
                           <div>
                               <AppLineChart
                                   key={2}
                                   url={'https://covidapi.info/api/v1/country/SGP/timeseries/2020-03-15/2020-04-25'}
                                   keys={['confirmed', 'deaths', 'recovered']}
                                   width={280}
                                   height={280}
                                   xDataKey={'date'}
                                   referenceLineData={[{value: 6000, label: 'Max'},{value: 1000, label: 'Min'}]}
                               />
                           </div>
                       </InfiniteCarousel>
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
                   <Card style={{margin: 10}}>
                       <CardHeader
                           avatar={
                               <Avatar aria-label="recipe">
                                   O
                               </Avatar>
                           }
                           title="Oven"
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
                   <Card style={{margin: 10}}>
                       <CardHeader
                           avatar={
                               <Avatar aria-label="recipe">
                                   RDI
                               </Avatar>
                           }
                           title="Rinse DI"
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
           </Grid>
        );
    }
}

export default Home
