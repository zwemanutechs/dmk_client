import React, { Component } from "react";
import {
  Dialog,
  DialogContent,
  Typography,
  IconButton,
  Tab,
  Tabs,
  Box
} from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import {withStyles} from "@material-ui/styles";
import AppLineChart from "../line/container/lineChart";
import {get} from "../../../middleware/axios-middleware";
import {lastDayOfMonth} from 'date-fns'
import {loadAggregateData, loadAggregateDataV2, loadDataByGivenDate} from "../../../appservices/mindsphere-iotapi-services";
import format from "date-fns/format";
import {zonedTimeToUtc} from "date-fns-tz";

const useStyles = theme => ({
    root: {
        flexGrow: 1,
        display: 'flex',
    },
    tabs: {
        borderRight: `1px solid grey`,
    },
});


class Dialogs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      tabIndex: 0,
      xDataKey:'',
      keys:[],
      referenceLineData:[]
    }
  }

  componentDidMount() {
      this.loadData();
      this.loadReferenceLineData();
  }

  loadReferenceLineData = () => {
      let refData = this.state.referenceLineData;
      if(this.props.LL && !this.props.title.includes('Conductivity')){
          refData.push({label: `LL (${this.props.LL})`, color:'red', value:this.props.LL});
      }
      if(this.props.HH){
          refData.push({label: `HH (${this.props.HH})`, color:'red', value:this.props.HH})
      }
      this.setState({referenceLineData: refData});
  };

  loadData = async () => {
      let from = new Date();
      let to = new Date();
      let limit = this.props.limit;
      let intervalUnit = 'day';
      let intervalValue = 1;
      let fromDate = new Date();
      let toDate = new Date();
      if(this.state.tabIndex === 0){
          from = fromDate.setDate(fromDate.getDate() - 7);
          to = toDate.setHours(toDate.getHours() - 1);
          limit = parseInt(limit * 4);
          intervalUnit = 'hour';
          this.fetchAgreegateData(from,to, limit, intervalUnit, intervalValue);
          //this.fetchTimeSeriesData(from,to, limit);
      }else if(this.state.tabIndex === 1){
          from = fromDate.setDate(fromDate.getDate() - 30);
          to = toDate.setDate(toDate.getDate() - 1);
          limit = parseInt(limit * 4);
          this.fetchAgreegateData(from,to, limit, intervalUnit, intervalValue);
          //this.fetchTimeSeriesData(from,to, limit);
      }else if(this.state.tabIndex === 2){
          from = fromDate.setMonth(fromDate.getMonth() - 3);
          to = toDate.setDate(toDate.getDate() - 1);
          limit = parseInt(limit * 4);
          this.fetchAgreegateData(from,to, limit, intervalUnit, intervalValue);
          //this.fetchTimeSeriesData(from,to, limit);
      }else{
          from = new Date(new Date().setMonth(new Date().getMonth()-2));
          to = toDate.setHours(toDate.getHours() - 1);
          limit = parseInt(limit * 4);
          this.fetchAgreegateData(from,to, limit, intervalUnit, intervalValue);
      }

  }

  fetchTimeSeriesData= async (from, to, limit) => {
      const fromDate = format(from, 'yyyy-MM-dd\'T\'HH:mm:ss');
      const toDate = format(to, 'yyyy-MM-dd\'T\'HH:mm:ss');
      if(this.props.dataPoint === 'mindsphere'){
          const fromDate = zonedTimeToUtc(from, Intl.DateTimeFormat().resolvedOptions().timeZone);
          const toDate = zonedTimeToUtc(to, Intl.DateTimeFormat().resolvedOptions().timeZone);
          const response  = await loadDataByGivenDate(from, to,this.props.assetId, this.props.aspectName,this.props.parameterName, limit);
          if(response && response.data && Array.isArray(response.data) && response.data.length > 0) {
              const yDataKeys = [...this.state.keys, this.props.parameterName];
              this.setState({data: response.data.reverse(), xDataKey: '_time', keys: yDataKeys});
          }
      }else{
          const fromDate = format(from, 'yyyy-MM-dd\'T\'HH:mm:ss');
          const toDate = format(to, 'yyyy-MM-dd\'T\'HH:mm:ss');
          const response = await get(`${this.props.pathName}/${this.props.endPoint}/${fromDate}/${toDate}/${limit}`);
          if(response && response.data && response.data.code && Array.isArray(response.data.data) && response.data.data.length > 0) {
              const yDataKeys = [...this.state.keys, 'data'];
              this.setState({data: response.data.data, xDataKey: 'time', keys: yDataKeys});
          }
      }
  }

  fetchAgreegateData = async(from, to, limit, intervalUnit, intervalValue) => {
      if(this.props.dataPoint === 'mindsphere'){
          const fromDate = zonedTimeToUtc(from, Intl.DateTimeFormat().resolvedOptions().timeZone);
          const toDate = zonedTimeToUtc(to, Intl.DateTimeFormat().resolvedOptions().timeZone);
          const response  = await loadAggregateDataV2(from, to,this.props.assetId, this.props.aspectName,this.props.parameterName, intervalUnit, intervalValue);
          if(response && response.data && Array.isArray(response.data.aggregates) && response.data.aggregates.length > 0) {
              const yDataKeys = [...this.state.keys, 'data'];
              const aggreateData = response.data.aggregates.map((ag) => {
                  return {data: ag[this.props.parameterName]['lastvalue'], time: ag.endtime}
              })
              this.setState({data: aggreateData.reverse(), xDataKey: 'time', keys:yDataKeys});
          }
      }else{
          const fromDate = format(from, 'yyyy-MM-dd\'T\'HH:mm:ss');
          const toDate = format(to, 'yyyy-MM-dd\'T\'HH:mm:ss');
          const response = await get(`${this.props.pathName}/${this.props.endPoint}/${fromDate}/${toDate}/${limit}`);
          if(response && response.data && response.data.code && Array.isArray(response.data.data) && response.data.data.length > 0) {
              const yDataKeys = [...this.state.keys, 'data'];
              this.setState({data: response.data.data, xDataKey: 'time', keys:yDataKeys});
          }
      }
  }


  onTabChange = (event, newValue) => {
      this.setState({tabIndex: newValue, keys: []}, () => this.loadData());
  }

  render() {
    return (
      <Dialog
        open={this.props.showDialogChart}
        onClose={this.props.onClose}
        keepMounted
        aria-labelledby=""
        maxWidth='lg'
      >
        <MuiDialogTitle disableTypography>
          <Typography variant="h6">{this.props.title} Trend Chart</Typography>
              <IconButton
                  aria-label="close"
                  style={{ position: "absolute", top: 8, right: 8 }}
                  onClick={this.props.onClose}
              >
                <CloseIcon />
              </IconButton>
        </MuiDialogTitle>
        <DialogContent>
          <div className={this.props.classes.root}>
              <Tabs
                  orientation='vertical'
                  variant='scrollable'
                  value={this.state.tabIndex}
                  onChange={this.onTabChange}
                  aria-label='char-tab'
                  className={this.props.classes.tabs}>
                  <Tab label='Seven Day' id='seven' aria-controls='v-seven' />
                  <Tab label='One Month' id='one' aria-controls='v-one' />
                  <Tab label='Three Month' id='three' aria-controls='v-three' />
                  {/* <Tab label='Six Month' id='six' aria-controls='v-six' /> */}
              </Tabs>
              <div
                  role='tabpanel'
                  id='tab-0'>
                  <Typography variant='h6' style={{paddingLeft: 10}}>{this.state.tabIndex === 0 ? 'Seven Day': this.state.tabIndex === 1 ?'One Month' : 'Three Month'}</Typography>
                  {/* <Typography variant='h6' style={{paddingLeft: 10}}>{this.state.tabIndex === 0 ? 'Seven Day': this.state.tabIndex === 1 ?'One Month' : this.state.tabIndex === 2 ? 'Three Month' : 'Six Month'}</Typography> */}
                  <Box p={3}>
                      <AppLineChart
                          width={730}
                          height={480}
                          data={this.state.data.reverse()}
                          keys={this.state.keys}
                          xDataKey={this.state.xDataKey}
                          referenceLineData={this.state.referenceLineData}
                      />
                  </Box>
              </div>
          </div>

        </DialogContent>
      </Dialog>
    );
  }
}
export default withStyles(useStyles, { withTheme: true })(Dialogs);
