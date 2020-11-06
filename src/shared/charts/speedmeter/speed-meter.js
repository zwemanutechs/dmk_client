import React, {Component} from "react";
import {loadLatestValue} from "../../../appservices/mindsphere-iotapi-services";
import ReactSpeedometer from "react-d3-speedometer";
import Skeleton from "@material-ui/lab/Skeleton";

class SpeedMeter extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isFetching: true,
            data: 0.00
        }
    }

    componentDidMount() {
        this.loadData();
        setInterval(this.loadData, 30000);
    }

    loadData = async () => {
        this.setState(state => ({isFetching: true}));
        const response = await loadLatestValue(this.props.assetId, this.props.aspectName, this.props.parameterName);
        if(response && response.data && Array.isArray(response.data) && response.data.length > 0 ){
            this.setState(state => ({data: response.data[0][this.props.parameterName], isFetching: false}));
        }else{
            this.setState(state => ({isFetching: false}));
        }
    }

    render() {
        return (
                    <ReactSpeedometer
                    width={this.props.width}
                    needleHeightRatio={this.props.needleHeight}
                    value={this.state.data.toFixed(2)}
                    minValue={this.props.minValue}
                    maxValue={this.props.maxValue}
                    segments={this.props.segmentsLength}
                    customSegmentStops={this.props.customSegmentStops}
                    segmentColors={this.props.segmentColors}
                    currentValueText={`${this.state.data.toFixed(2)} ${this.props.unit}`}
                    customSegmentLabels={this.props.segmentLabels}
                    maxSegmentLabels={this.props.segmentsLength}
                    ringWidth={this.props.ringWidth}
                    needleTransitionDuration={3333}
                    needleTransition="easeElastic"
                    needleColor={'#5365ff'}
                    textColor={'#000000'}
                    paddingVertical={5}
                    />
        );
    }
}
export default SpeedMeter;
