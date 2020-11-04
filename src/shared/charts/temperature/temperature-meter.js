import {Tvoc }  from 'react-environment-chart';
import React, {Component} from "react";
import {loadLatestValue} from "../../../appservices/mindsphere-iotapi-services";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

class TemperatureMeter extends Component{
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
        const response = await loadLatestValue(this.props.assetId, this.props.aspectName, this.props.parameterName);
        if(response && response.data && Array.isArray(response.data) && response.data.length > 0 ){
            this.setState(state => ({data: response.data[0][this.props.parameterName].toFixed(2), isFetching: false}));
        }else{
            this.setState(state => ({isFetching: false}));
        }
    }

    render() {
        return (
            <React.Fragment>
                <Grid item xs={12} style={{textAlign: "center"}}>
                    <Typography style={{color: 'blue'}} gutterBottom>
                        {this.props.title}
                    </Typography>
                </Grid>
                <div style={{textAlign: 'center', marginLeft: 175}}>
                    <Tvoc
                        height={320}
                        value={this.state.data/100}
                    />
                </div>
                <Grid item xs={12} style={{textAlign: "center"}}>
                    <Typography variant="overline"  color="textSecondary" gutterBottom>
                        <strong>Current Value: {this.state.data} {this.props.unit}</strong>
                    </Typography>
                </Grid>
            </React.Fragment>
        );
    }
}
export default TemperatureMeter;
