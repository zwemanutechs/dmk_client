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
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import NotificationCard from "../../../shared/notification-card/container/notificationCard";
// import  from "../../../middleware/custom-apiMiddleware"

class Home extends Component{

    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    getDegreasing= () => {

    }

    render() {
        return (
           <Grid container direction={"row"} spacing={2}>
               <Grid item xs={12}>
                   <Card style={{minWidth: 1400}}>
                       <InfiniteCarousel
                           responsive={true}
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
                                       slidesToShow: 1,
                                       slidesToScroll: 1,
                                   },
                               },
                               {
                                   breakpoint: 1200,
                                   settings: {
                                       slidesToShow: 1,
                                       slidesToScroll: 1,
                                   },
                               },
                               {
                                   breakpoint: 3000,
                                   settings: {
                                       slidesToShow: 1,
                                       slidesToScroll: 1,
                                   },
                               },
                           ]}
                           dots={false}
                           showSides={false}
                           sidesOpacity={0.1}
                           sideSize={0.1}
                           slidesToScroll={1}
                           slidesToShow={1}
                           scrollOnDevice={true}
                           autoCycle={true}
                           arrows={false}
                           slidesSpacing={10}
                           cycleInterval={5000}
                       >
                           <div style={{minWidth: 1387}}>
                               <Card style={{margin: 3, minWidth: 1378}} elevation={0}>
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
                                       <Grid container direction="row" justify="center" spacing={2}>
                                           <Grid item xs={12} md={3}>
                                               <Grid item xs={12} style={{textAlign: "center"}}>
                                                   <Typography  color="textSecondary" gutterBottom>
                                                       PH
                                                   </Typography>
                                               </Grid>
                                               <AppLineChart
                                                   key={1}
                                                   url={'https://covidapi.info/api/v1/country/SGP/timeseries/2020-03-15/2020-04-25'}
                                                   keys={['confirmed', 'deaths', 'recovered']}
                                                   width={280}
                                                   height={200}
                                                   xDataKey={'date'}
                                                   referenceLineData={[{value: 5000, label: 'Max'},{value: 2000, label: 'Min'}]}
                                               />
                                               <Grid item xs={12} style={{textAlign: "center"}}>
                                                   <Typography  color="textSecondary" gutterBottom>
                                                       12
                                                   </Typography>
                                               </Grid>
                                           </Grid>
                                           <Grid item xs={12} md={3}>
                                               <Grid item xs={12} style={{textAlign: "center"}}>
                                                   <Typography  color="textSecondary" gutterBottom>
                                                       PH
                                                   </Typography>
                                               </Grid>
                                               <AppLineChart
                                                   key={1}
                                                   url={'https://covidapi.info/api/v1/country/SGP/timeseries/2020-03-15/2020-04-25'}
                                                   keys={['confirmed', 'deaths', 'recovered']}
                                                   width={280}
                                                   height={200}
                                                   xDataKey={'date'}
                                                   referenceLineData={[{value: 5000, label: 'Max'},{value: 2000, label: 'Min'}]}
                                               />
                                               <Grid item xs={12} style={{textAlign: "center"}}>
                                                   <Typography  color="textSecondary" gutterBottom>
                                                       12
                                                   </Typography>
                                               </Grid>
                                           </Grid>
                                           <Grid item xs={12} md={3}>
                                               <Grid item xs={12} style={{textAlign: "center"}}>
                                                   <Typography  color="textSecondary" gutterBottom>
                                                       PH
                                                   </Typography>
                                               </Grid>
                                               <AppLineChart
                                                   key={1}
                                                   url={'https://covidapi.info/api/v1/country/SGP/timeseries/2020-03-15/2020-04-25'}
                                                   keys={['confirmed', 'deaths', 'recovered']}
                                                   width={280}
                                                   height={200}
                                                   xDataKey={'date'}
                                                   referenceLineData={[{value: 5000, label: 'Max'},{value: 2000, label: 'Min'}]}
                                               />
                                               <Grid item xs={12} style={{textAlign: "center"}}>
                                                   <Typography  color="textSecondary" gutterBottom>
                                                       12
                                                   </Typography>
                                               </Grid>
                                           </Grid>
                                           <Grid item xs={12} md={3}>
                                               <Grid item xs={12} style={{textAlign: "center"}}>
                                                   <Typography  color="textSecondary" gutterBottom>
                                                       PH
                                                   </Typography>
                                               </Grid>
                                               <AppLineChart
                                                   key={1}
                                                   url={'https://covidapi.info/api/v1/country/SGP/timeseries/2020-03-15/2020-04-25'}
                                                   keys={['confirmed', 'deaths', 'recovered']}
                                                   width={280}
                                                   height={200}
                                                   xDataKey={'date'}
                                                   referenceLineData={[{value: 5000, label: 'Max'},{value: 2000, label: 'Min'}]}
                                               />
                                               <Grid item xs={12} style={{textAlign: "center"}}>
                                                   <Typography  color="textSecondary" gutterBottom>
                                                       12
                                                   </Typography>
                                               </Grid>
                                           </Grid>
                                           <Grid item xs={12} md={3}>
                                               <Grid item xs={12} style={{textAlign: "center"}}>
                                                   <Typography  color="textSecondary" gutterBottom>
                                                       PH
                                                   </Typography>
                                               </Grid>
                                               <AppLineChart
                                                   key={1}
                                                   url={'https://covidapi.info/api/v1/country/SGP/timeseries/2020-03-15/2020-04-25'}
                                                   keys={['confirmed', 'deaths', 'recovered']}
                                                   width={280}
                                                   height={200}
                                                   xDataKey={'date'}
                                                   referenceLineData={[{value: 5000, label: 'Max'},{value: 2000, label: 'Min'}]}
                                               />
                                               <Grid item xs={12} style={{textAlign: "center"}}>
                                                   <Typography  color="textSecondary" gutterBottom>
                                                       12
                                                   </Typography>
                                               </Grid>
                                           </Grid>
                                           <Grid item xs={12} md={3}>
                                               <Grid item xs={12} style={{textAlign: "center"}}>
                                                   <Typography  color="textSecondary" gutterBottom>
                                                       PH
                                                   </Typography>
                                               </Grid>
                                               <AppLineChart
                                                   key={1}
                                                   url={'https://covidapi.info/api/v1/country/SGP/timeseries/2020-03-15/2020-04-25'}
                                                   keys={['confirmed', 'deaths', 'recovered']}
                                                   width={280}
                                                   height={200}
                                                   xDataKey={'date'}
                                                   referenceLineData={[{value: 5000, label: 'Max'},{value: 2000, label: 'Min'}]}
                                               />
                                               <Grid item xs={12} style={{textAlign: "center"}}>
                                                   <Typography  color="textSecondary" gutterBottom>
                                                       12
                                                   </Typography>
                                               </Grid>
                                           </Grid>
                                           <Grid item xs={12} md={3}>
                                               <Grid item xs={12} style={{textAlign: "center"}}>
                                                   <Typography  color="textSecondary" gutterBottom>
                                                       PH
                                                   </Typography>
                                               </Grid>
                                               <AppLineChart
                                                   key={1}
                                                   url={'https://covidapi.info/api/v1/country/SGP/timeseries/2020-03-15/2020-04-25'}
                                                   keys={['confirmed', 'deaths', 'recovered']}
                                                   width={280}
                                                   height={200}
                                                   xDataKey={'date'}
                                                   referenceLineData={[{value: 5000, label: 'Max'},{value: 2000, label: 'Min'}]}
                                               />
                                               <Grid item xs={12} style={{textAlign: "center"}}>
                                                   <Typography  color="textSecondary" gutterBottom>
                                                       12
                                                   </Typography>
                                               </Grid>
                                           </Grid>
                                           <Grid item xs={12} md={3}>
                                               <Grid item xs={12} style={{textAlign: "center"}}>
                                                   <Typography  color="textSecondary" gutterBottom>
                                                       PH
                                                   </Typography>
                                               </Grid>
                                               <AppLineChart
                                                   key={1}
                                                   url={'https://covidapi.info/api/v1/country/SGP/timeseries/2020-03-15/2020-04-25'}
                                                   keys={['confirmed', 'deaths', 'recovered']}
                                                   width={280}
                                                   height={200}
                                                   xDataKey={'date'}
                                                   referenceLineData={[{value: 5000, label: 'Max'},{value: 2000, label: 'Min'}]}
                                               />
                                               <Grid item xs={12} style={{textAlign: "center"}}>
                                                   <Typography  color="textSecondary" gutterBottom>
                                                       12
                                                   </Typography>
                                               </Grid>
                                           </Grid>
                                       </Grid>
                                   </CardContent>
                               </Card>
                           </div>
                           <div style={{width: 1387}}>
                               <Card style={{margin: 3, minWidth: 1378}} elevation={0}>
                                   <CardHeader
                                       avatar={
                                           <Avatar aria-label="recipe">
                                               O
                                           </Avatar>
                                       }
                                       title="Oven"
                                       subheader="September 14, 2020"
                                   />
                                   <CardContent>
                                       <Grid container direction="row" justify="flex-start" spacing={2}>
                                           <Grid item xs={12} md={3}>
                                               <Grid item xs={12} style={{textAlign: "center"}}>
                                                   <Typography  color="textSecondary" gutterBottom>
                                                       PH
                                                   </Typography>
                                               </Grid>
                                               <AppLineChart
                                                   key={1}
                                                   url={'https://covidapi.info/api/v1/country/SGP/timeseries/2020-03-15/2020-04-25'}
                                                   keys={['confirmed', 'deaths', 'recovered']}
                                                   width={280}
                                                   height={200}
                                                   xDataKey={'date'}
                                                   referenceLineData={[{value: 5000, label: 'Max'},{value: 2000, label: 'Min'}]}
                                               />
                                               <Grid item xs={12} style={{textAlign: "center"}}>
                                                   <Typography  color="textSecondary" gutterBottom>
                                                       12
                                                   </Typography>
                                               </Grid>
                                           </Grid>
                                           <Grid item xs={12} md={3}>
                                               <Grid item xs={12} style={{textAlign: "center"}}>
                                                   <Typography  color="textSecondary" gutterBottom>
                                                       PH
                                                   </Typography>
                                               </Grid>
                                               <AppLineChart
                                                   key={1}
                                                   url={'https://covidapi.info/api/v1/country/SGP/timeseries/2020-03-15/2020-04-25'}
                                                   keys={['confirmed', 'deaths', 'recovered']}
                                                   width={280}
                                                   height={200}
                                                   xDataKey={'date'}
                                                   referenceLineData={[{value: 5000, label: 'Max'},{value: 2000, label: 'Min'}]}
                                               />
                                               <Grid item xs={12} style={{textAlign: "center"}}>
                                                   <Typography  color="textSecondary" gutterBottom>
                                                       12
                                                   </Typography>
                                               </Grid>
                                           </Grid>
                                           <Grid item xs={12} md={3}>
                                               <Grid item xs={12} style={{textAlign: "center"}}>
                                                   <Typography  color="textSecondary" gutterBottom>
                                                       PH
                                                   </Typography>
                                               </Grid>
                                               <AppLineChart
                                                   key={1}
                                                   url={'https://covidapi.info/api/v1/country/SGP/timeseries/2020-03-15/2020-04-25'}
                                                   keys={['confirmed', 'deaths', 'recovered']}
                                                   width={280}
                                                   height={200}
                                                   xDataKey={'date'}
                                                   referenceLineData={[{value: 5000, label: 'Max'},{value: 2000, label: 'Min'}]}
                                               />
                                               <Grid item xs={12} style={{textAlign: "center"}}>
                                                   <Typography  color="textSecondary" gutterBottom>
                                                       12
                                                   </Typography>
                                               </Grid>
                                           </Grid>
                                           <Grid item xs={12} md={3}>
                                               <Grid item xs={12} style={{textAlign: "center"}}>
                                                   <Typography  color="textSecondary" gutterBottom>
                                                       PH
                                                   </Typography>
                                               </Grid>
                                               <AppLineChart
                                                   key={1}
                                                   url={'https://covidapi.info/api/v1/country/SGP/timeseries/2020-03-15/2020-04-25'}
                                                   keys={['confirmed', 'deaths', 'recovered']}
                                                   width={280}
                                                   height={200}
                                                   xDataKey={'date'}
                                                   referenceLineData={[{value: 5000, label: 'Max'},{value: 2000, label: 'Min'}]}
                                               />
                                               <Grid item xs={12} style={{textAlign: "center"}}>
                                                   <Typography  color="textSecondary" gutterBottom>
                                                       12
                                                   </Typography>
                                               </Grid>
                                           </Grid>
                                           <Grid item xs={12} md={3}>
                                               <Grid item xs={12} style={{textAlign: "center"}}>
                                                   <Typography  color="textSecondary" gutterBottom>
                                                       PH
                                                   </Typography>
                                               </Grid>
                                               <AppLineChart
                                                   key={1}
                                                   url={'https://covidapi.info/api/v1/country/SGP/timeseries/2020-03-15/2020-04-25'}
                                                   keys={['confirmed', 'deaths', 'recovered']}
                                                   width={280}
                                                   height={200}
                                                   xDataKey={'date'}
                                                   referenceLineData={[{value: 5000, label: 'Max'},{value: 2000, label: 'Min'}]}
                                               />
                                               <Grid item xs={12} style={{textAlign: "center"}}>
                                                   <Typography  color="textSecondary" gutterBottom>
                                                       12
                                                   </Typography>
                                               </Grid>
                                           </Grid>
                                           <Grid item xs={12} md={3}>
                                               <Grid item xs={12} style={{textAlign: "center"}}>
                                                   <Typography  color="textSecondary" gutterBottom>
                                                       PH
                                                   </Typography>
                                               </Grid>
                                               <AppLineChart
                                                   key={1}
                                                   url={'https://covidapi.info/api/v1/country/SGP/timeseries/2020-03-15/2020-04-25'}
                                                   keys={['confirmed', 'deaths', 'recovered']}
                                                   width={280}
                                                   height={200}
                                                   xDataKey={'date'}
                                                   referenceLineData={[{value: 5000, label: 'Max'},{value: 2000, label: 'Min'}]}
                                               />
                                               <Grid item xs={12} style={{textAlign: "center"}}>
                                                   <Typography  color="textSecondary" gutterBottom>
                                                       12
                                                   </Typography>
                                               </Grid>
                                           </Grid>
                                           <Grid item xs={12} md={3}>
                                               <Grid item xs={12} style={{textAlign: "center"}}>
                                                   <Typography  color="textSecondary" gutterBottom>
                                                       PH
                                                   </Typography>
                                               </Grid>
                                               <AppLineChart
                                                   key={1}
                                                   url={'https://covidapi.info/api/v1/country/SGP/timeseries/2020-03-15/2020-04-25'}
                                                   keys={['confirmed', 'deaths', 'recovered']}
                                                   width={280}
                                                   height={200}
                                                   xDataKey={'date'}
                                                   referenceLineData={[{value: 5000, label: 'Max'},{value: 2000, label: 'Min'}]}
                                               />
                                               <Grid item xs={12} style={{textAlign: "center"}}>
                                                   <Typography  color="textSecondary" gutterBottom>
                                                       12
                                                   </Typography>
                                               </Grid>
                                           </Grid>
                                           <Grid item xs={12} md={3}>
                                               <Grid item xs={12} style={{textAlign: "center"}}>
                                                   <Typography  color="textSecondary" gutterBottom>
                                                       PH
                                                   </Typography>
                                               </Grid>
                                               <AppLineChart
                                                   key={1}
                                                   url={'https://covidapi.info/api/v1/country/SGP/timeseries/2020-03-15/2020-04-25'}
                                                   keys={['confirmed', 'deaths', 'recovered']}
                                                   width={280}
                                                   height={200}
                                                   xDataKey={'date'}
                                                   referenceLineData={[{value: 5000, label: 'Max'},{value: 2000, label: 'Min'}]}
                                               />
                                               <Grid item xs={12} style={{textAlign: "center"}}>
                                                   <Typography  color="textSecondary" gutterBottom>
                                                       12
                                                   </Typography>
                                               </Grid>
                                           </Grid>
                                       </Grid>
                                   </CardContent>
                               </Card>
                           </div>
                       </InfiniteCarousel>
                   </Card>
               </Grid>

               <Grid item xs={12} md={4}>
                   <NotificationCard formName="RinseDI"/>
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
