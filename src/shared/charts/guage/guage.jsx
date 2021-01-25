import React, { Component, createRef } from "react";
import Dialogs from "../dialogs";
import Gauge from 'r-gauger';
import { loadDataByGivenDate, loadLatestValue } from '../../../appservices/mindsphere-iotapi-services';
import {withStyles} from "@material-ui/styles";
import {zonedTimeToUtc} from "date-fns-tz";
import {get} from "../../../middleware/axios-middleware";
import format from "date-fns/format";

const useStyles = theme => ({
    mainBorder: {
        border: '1px solid #0f3790',
        display: 'flex',
        flexFlow:'column',
        flexWrap:'wrap',
        backgroundColor:'white'
    },
    borderLess:{
        border: 'none',
        display: 'flex',
        flexFlow:'column',
        flexWrap:'wrap',
        backgroundColor:'white'
    }
});

class CircleGauge extends Component{

    constructor(props) {
        super(props);
        this.state = {
            isFetching: true,
            dialogOpen: false,
            data: 0.00
        }
    }


    componentDidMount() {
        this.loadData();
    }

    handleDiaglog = () => {
        this.setState({dialogOpen: !this.state.dialogOpen});
    }

    loadData = async () => {
        const now = new Date();
        this.setState(state => ({isFetching: true}));
        if(this.props.dataPoint === 'api'){
            const startDate = new Date(new Date(now.setDate(now.getDate() - 1)).setHours(23,59,59));
            const endDate = now;
            const from = format(startDate, 'yyyy-MM-dd\'T\'HH:mm:ss');
            const to = format(now, 'yyyy-MM-dd\'T\'HH:mm:ss');
            const response = await get(`${this.props.pathName}/${this.props.endPoint}/${from}/${to}/${this.props.limit}`);
            if(response && response.data && response.data.code && Array.isArray(response.data.data) && response.data.data.length > 0) {
                this.setState(state => ({data: response.data.data[0][this.props.variableName], isFetching: false}));
            }else{
                this.setState(state => ({isFetching: false, data: 0}));
            }
        }else{
            const response = await loadLatestValue(this.props.assetId, this.props.aspectName, this.props.parameterName);
            if(response && response.data && Array.isArray(response.data) && response.data.length > 0 ){
                this.setState(state => ({data: response.data[0][this.props.parameterName], isFetching: false}));
            }else{
                this.setState(state => ({isFetching: false, data: 0}));
            }
        }
    };

    render() {
        return (
            <div className={this.props.border ? this.props.classes.mainBorder:this.props.classes.borderLess}>
                <div
                    style={{
                        color: "#0F3790",
                        width: "100%",
                        fontWeight: "800",
                        padding: "0 2px 0 2px",
                    }}
                >
          <span
              style={{
                  float: "left",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  // width: "55px",ha
              }}
          >
            {this.props.title} ({this.props.LL} - {this.props.HH} {this.props.unit})
          </span>
                    <span
                        style={{
                            float: "right",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            width: "53px",
                        }}
                    >
            {this.props.subTitle}
          </span>
                </div>
                <div style={{display: 'flex', justifyContent:'center', backgroundColor: 'white'}} onClick={() => {this.handleDiaglog()}}>
                    <Gauge
                        start={this.props.min}
                        end={this.props.max}
                        ranges={this.props.range}
                        handle={[
                            {
                                value:this.state.data,
                                style:{
                                    width:12,
                                    height:-10,
                                    radius:0,
                                    offset:80,
                                    color:"black"
                                }
                            }
                        ]}
                        text={[{
                            value:this.state.data, //value of text, type=string or function(here use string)
                            style:{
                                fontSize:18, //font size of text, type=number, default=10
                                top:0, //top of text, type=number, default=20
                                left:0, //left of text, type=number, default=0
                                color: this.props.LL > this.state.data || this.props.data < this.state.currentValue ? "red":"#154a98", //color of text, type=string, default='#000'
                                rotate:0  //rotate angle of text, type=number between 0 and 360, default=0
                            }
                        }]}
                        position={['42%',100]}
                        style={{width:180,height:150, display: 'flex', justifiedContext: 'center'}}

                    />
                </div>
                {this.state.dialogOpen && <Dialogs
                    title={this.props.title}
                    showDialogChart={this.state.dialogOpen}
                    onClose={this.handleDiaglog}
                    assetId={this.props.assetId}
                    aspectName={this.props.aspectName}
                    parameterName={this.props.parameterName}
                    pathName={this.props.pathName}
                    endPoint={this.props.endPoint}
                    dataPoint={this.props.dataPoint}
                    limit={1000}
                    LL={this.props.LL}
                    HH={this.props.HH}
                />}

            </div>
        )
    }
}
export default withStyles(useStyles, { withTheme: true })(CircleGauge);
