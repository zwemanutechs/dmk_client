import React, {useState, useEffect, Component, PureComponent} from "react";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import NumberFormat from "react-number-format";
import {withStyles} from "@material-ui/core/styles";
import FormLabel from "@material-ui/core/FormLabel";
import Switch from "@material-ui/core/Switch";

const useStyles = theme => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        width: '100%',
    },
    formControl: {
        marginTop: theme.spacing(2),
        width: '100%',
        margin: 4
    },
    formControlLabel: {
        marginTop: theme.spacing(1),
    },
    paper: {
        minWidth: "500px",
        [theme.breakpoints.up('md')]: {
            position: 'absolute',
            left: '30%',
            right: '30%',
            top: 80
        },
    },
});

class NeuEvaporatorAddOrEdit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            phTank6: {valid: true, errorMessage: '', value: this.props.dataSet.phTank6},
            feedRateEvaporatorTank3: {valid: true, errorMessage: '', value: this.props.dataSet.feedRateEvaporatorTank3},
            phTank3: {valid: true, errorMessage: '', value: this.props.dataSet.phTank3},
            phHmiTank3: {valid: true, errorMessage: '', value: this.props.dataSet.phHmiTank3},
            waterSampleInBottleTank6: {valid: true, errorMessage: '', value: this.props.dataSet.waterSampleInBottleTank6},
            monthlyCalibrationOfPhMeterTank3: {valid: true, errorMessage: '', value: this.props.dataSet.monthlyCalibrationOfPhMeterTank3},
            conductivity: {valid: true, errorMessage: '', value: this.props.dataSet.conductivity},
            waterLevelTank6: {valid: true, errorMessage: '', value: this.props.dataSet.waterLevelTank6},
            flowRateTank6: {valid: true, errorMessage: '', value: this.props.dataSet.flowRateTank6},
            waterQualityTank7: {valid: true, errorMessage: '', value: this.props.dataSet.waterQualityTank7},
            waterLevelTank7: {valid: true, errorMessage: '', value: this.props.dataSet.waterLevelTank7},
            waterLevelLitreTank8: {valid: true, errorMessage: '', value: this.props.dataSet.waterLevelLitreTank8},
            anyAbnormalUsageTank8: {valid: true, errorMessage: '', value: this.props.dataSet.anyAbnormalUsageTank8},
            waterLevelTank9: {valid: true, errorMessage: '', value: this.props.dataSet.waterLevelTank9},
            anyAbnormalUsageTank9: {valid: true, errorMessage: '', value: this.props.dataSet.anyAbnormalUsageTank9},
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.formError !== this.props.formError) {
            let invalidState = {...this.state};
            this.props.formError.errors.forEach((err) => {
                invalidState[err.property].valid = false;
                invalidState[err.property].errorMessage = err.message;
            });
            this.setState(state => ({invalidState}));
        }
    }

    onChange = (propertyName, propertyValue) => {
        let validState = {...this.state};
        if (!this.props.formError.valid) {
            if (propertyValue > 0) {
                validState[propertyName].valid = true;
                validState[propertyName].message = '';
            }
        }
        validState[propertyName].value = propertyValue;
        this.setState(state => ({validState}));
    };

    onBlur = (propertyName) => {
        this.props.handelChange(propertyName, this.state[propertyName].value);
    };

    render() {
        return (
            <form className={this.props.classes.form}>
                {/** pH Tank6 ***/}
                <Grid item xs={12}>
                    <FormControl className={this.props.classes.formControl}>
                        <NumberFormat
                            id="phTank6"
                            label="pH Tank6"
                            customInput={TextField}
                            value={this.state.phTank6.value}
                            fullWidth={true}
                            defaultValue={0.00}
                            onValueChange={value => this.onChange('phTank6', value.floatValue)}
                            onBlur={e => this.onBlur('phTank6')}
                            onFocus={event => {
                                event.target.select();
                            }}
                            decimalScale={2}
                            thousandSeparator={false}
                            fixedDecimalScale={true}
                            error={!this.state.phTank6.valid}
                            helperText={!this.state.phTank6.valid ? this.state.phTank6.errorMessage : ''}
                            disabled={this.props.onFormSubmit}
                        />
                    </FormControl>
                </Grid>
                {/** End pH Tank6 **/}
                {/** Feed Rate Evaporator Tank3 ***/}
                <Grid item xs={12}>
                    <FormControl className={this.props.classes.formControl}>
                        <NumberFormat
                            id="feedRateEvaporatorTank3"
                            label="Feed Rate Evaporator Tank3"
                            customInput={TextField}
                            value={this.state.feedRateEvaporatorTank3.value}
                            fullWidth={true}
                            defaultValue={0.00}
                            onValueChange={value => this.onChange('feedRateEvaporatorTank3', value.floatValue)}
                            onBlur={e => this.onBlur('feedRateEvaporatorTank3')}
                            onFocus={event => {
                                event.target.select();
                            }}
                            decimalScale={2}
                            thousandSeparator={false}
                            fixedDecimalScale={true}
                            error={!this.state.feedRateEvaporatorTank3.valid}
                            helperText={!this.state.feedRateEvaporatorTank3.valid ? this.state.feedRateEvaporatorTank3.errorMessage : ''}
                            disabled={this.props.onFormSubmit}
                        />
                    </FormControl>
                </Grid>
                {/** End Feed Rate Evaporator Tank3 **/}
                {/** pH Tank3 ***/}
                <Grid item xs={12}>
                    <FormControl className={this.props.classes.formControl}>
                        <NumberFormat
                            id="phTank3"
                            label="pH Tank3"
                            customInput={TextField}
                            value={this.state.phTank3.value}
                            fullWidth={true}
                            defaultValue={0.00}
                            onValueChange={value => this.onChange('phTank3', value.floatValue)}
                            onBlur={e => this.onBlur('phTank3')}
                            onFocus={event => {
                                event.target.select();
                            }}
                            decimalScale={2}
                            thousandSeparator={false}
                            fixedDecimalScale={true}
                            error={!this.state.phTank3.valid}
                            helperText={!this.state.phTank3.valid ? this.state.phTank3.errorMessage : ''}
                            disabled={this.props.onFormSubmit}
                        />
                    </FormControl>
                </Grid>
                {/** End pH Tank3 **/}
                {/** pH HMI Tank3 ***/}
                <Grid item xs={12}>
                    <FormControl className={this.props.classes.formControl}>
                        <TextField
                            id="phHmiTank3"
                            label="pH HMI Tank3"
                            value={this.state.phHmiTank3.value}
                            fullWidth={true}
                            defaultValue={0.00}
                            onChange={event => this.onChange('phHmiTank3', event.target.value)}
                            onBlur={e => this.onBlur('phHmiTank3')}
                            onFocus={event => {
                                event.target.select();
                            }}
                            error={!this.state.phHmiTank3.valid}
                            helperText={!this.state.phHmiTank3.valid ? this.state.phHmiTank3.errorMessage : ''}
                            disabled={this.props.onFormSubmit}
                        />
                    </FormControl>
                </Grid>
                {/** End pH HMI Tank3 **/}
                {/** Water Sample In Bottle Tank6 ***/}
                <Grid item xs={12}>
                    <FormControl className={this.props.classes.formControl}>
                        <FormLabel component="legend">Water Sample In Bottle Tank6</FormLabel>
                        <Grid component="label" container alignItems="center" spacing={1}>
                            <Grid item>Bad</Grid>
                            <Grid item>
                                <Switch checked={this.state.waterSampleInBottleTank6.value} onChange={event => {
                                    this.onChange('waterSampleInBottleTank6', event.target.checked);
                                    this.onBlur('waterSampleInBottleTank6');
                                }} name="waterSampleInBottleTank6"/>
                            </Grid>
                            <Grid item>Good</Grid>
                        </Grid>
                    </FormControl>
                </Grid>
                {/** End Water Sample In Bottle Tank6 **/}
                {/** Monthly Calibration Of Ph Meter Tank3 ***/}
                <Grid item xs={12}>
                    <FormControl className={this.props.classes.formControl}>
                        <FormLabel component="legend">Monthly Calibration Of Ph Meter Tank3</FormLabel>
                        <Grid component="label" container alignItems="center" spacing={1}>
                            <Grid item>Not Done</Grid>
                            <Grid item>
                                <Switch checked={this.state.monthlyCalibrationOfPhMeterTank3.value} onChange={event => {
                                    this.onChange('monthlyCalibrationOfPhMeterTank3', event.target.checked);
                                    this.onBlur('monthlyCalibrationOfPhMeterTank3');
                                }} name="monthlyCalibrationOfPhMeterTank3"/>
                            </Grid>
                            <Grid item>Done</Grid>
                        </Grid>
                    </FormControl>
                </Grid>
                {/** End Monthly Calibration Of Ph Meter Tank3 **/}
                {/** Conductivity ***/}
                <Grid item xs={12}>
                    <FormControl className={this.props.classes.formControl}>
                        <NumberFormat
                            id="conductivity"
                            label="Conductivity"
                            customInput={TextField}
                            value={this.state.conductivity.value}
                            fullWidth={true}
                            defaultValue={0.00}
                            onValueChange={value => this.onChange('conductivity', value.floatValue)}
                            onBlur={e => this.onBlur('conductivity')}
                            onFocus={event => {
                                event.target.select();
                            }}
                            decimalScale={2}
                            thousandSeparator={false}
                            fixedDecimalScale={true}
                            error={!this.state.conductivity.valid}
                            helperText={!this.state.conductivity.valid ? this.state.conductivity.errorMessage : ''}
                            disabled={this.props.onFormSubmit}
                        />
                    </FormControl>
                </Grid>
                {/** End Conductivity **/}
                {/** Water Level Tank6 ***/}
                <Grid item xs={12}>
                    <FormControl className={this.props.classes.formControl}>
                        <NumberFormat
                            id="waterLevelTank6"
                            label="Water Level Tank6"
                            customInput={TextField}
                            value={this.state.waterLevelTank6.value}
                            fullWidth={true}
                            defaultValue={0.00}
                            onValueChange={value => this.onChange('waterLevelTank6', value.floatValue)}
                            onBlur={e => this.onBlur('waterLevelTank6')}
                            onFocus={event => {
                                event.target.select();
                            }}
                            decimalScale={2}
                            thousandSeparator={false}
                            fixedDecimalScale={true}
                            error={!this.state.waterLevelTank6.valid}
                            helperText={!this.state.waterLevelTank6.valid ? this.state.waterLevelTank6.errorMessage : ''}
                            disabled={this.props.onFormSubmit}
                        />
                    </FormControl>
                </Grid>
                {/** End Water Level Tank6 **/}
                {/** Flow Rate Tank6 ***/}
                <Grid item xs={12}>
                    <FormControl className={this.props.classes.formControl}>
                        <NumberFormat
                            id="flowRateTank6"
                            label="Flow Rate Tank6"
                            customInput={TextField}
                            value={this.state.flowRateTank6.value}
                            fullWidth={true}
                            defaultValue={0.00}
                            onValueChange={value => this.onChange('flowRateTank6', value.floatValue)}
                            onBlur={e => this.onBlur('flowRateTank6')}
                            onFocus={event => {
                                event.target.select();
                            }}
                            decimalScale={2}
                            thousandSeparator={false}
                            fixedDecimalScale={true}
                            error={!this.state.flowRateTank6.valid}
                            helperText={!this.state.flowRateTank6.valid ? this.state.flowRateTank6.errorMessage : ''}
                            disabled={this.props.onFormSubmit}
                        />
                    </FormControl>
                </Grid>
                {/** End Flow Rate Tank6 **/}
                {/** Water Quality Tank7 ***/}
                <Grid item xs={12}>
                    <FormControl className={this.props.classes.formControl}>
                        <FormLabel component="legend">Water Quality Tank7</FormLabel>
                        <Grid component="label" container alignItems="center" spacing={1}>
                            <Grid item>Bad</Grid>
                            <Grid item>
                                <Switch checked={this.state.waterQualityTank7.value} onChange={event => {
                                    this.onChange('waterQualityTank7', event.target.checked);
                                    this.onBlur('waterQualityTank7');
                                }} name="waterQualityTank7"/>
                            </Grid>
                            <Grid item>Good</Grid>
                        </Grid>
                    </FormControl>
                </Grid>
                {/** End Water Quality Tank7 **/}
                {/** Water Level Tank7 ***/}
                <Grid item xs={12}>
                    <FormControl className={this.props.classes.formControl}>
                        <TextField
                            id="waterLevelTank7"
                            label="Water Level Tank7"
                            value={this.state.waterLevelTank7.value}
                            fullWidth={true}
                            defaultValue={0.00}
                            onChange={event => this.onChange('waterLevelTank7', event.target.value)}
                            onBlur={e => this.onBlur('waterLevelTank7')}
                            onFocus={event => {
                                event.target.select();
                            }}
                            error={!this.state.waterLevelTank7.valid}
                            helperText={!this.state.waterLevelTank7.valid ? this.state.waterLevelTank7.errorMessage : ''}
                            disabled={this.props.onFormSubmit}
                        />
                    </FormControl>
                </Grid>
                {/** End Water Level Tank7 **/}
                {/** Water Level Litre Tank8 ***/}
                <Grid item xs={12}>
                    <FormControl className={this.props.classes.formControl}>
                        <NumberFormat
                            id="waterLevelLitreTank8"
                            label="Water Level Litre Tank8"
                            customInput={TextField}
                            value={this.state.waterLevelLitreTank8.value}
                            fullWidth={true}
                            defaultValue={0.00}
                            onValueChange={value => this.onChange('waterLevelLitreTank8', value.floatValue)}
                            onBlur={e => this.onBlur('waterLevelLitreTank8')}
                            onFocus={event => {
                                event.target.select();
                            }}
                            decimalScale={2}
                            thousandSeparator={false}
                            fixedDecimalScale={true}
                            error={!this.state.waterLevelLitreTank8.valid}
                            helperText={!this.state.waterLevelLitreTank8.valid ? this.state.waterLevelLitreTank8.errorMessage : ''}
                            disabled={this.props.onFormSubmit}
                        />
                    </FormControl>
                </Grid>
                {/** End Water Level Litre Tank8 **/}
                {/** Any Abnormal Usage Tank8 ***/}
                <Grid item xs={12}>
                    <FormControl className={this.props.classes.formControl}>
                        <FormLabel component="legend">Any Abnormal Usage Tank8</FormLabel>
                        <Grid component="label" container alignItems="center" spacing={1}>
                            <Grid item>No</Grid>
                            <Grid item>
                                <Switch checked={this.state.anyAbnormalUsageTank8.value} onChange={event => {
                                    this.onChange('anyAbnormalUsageTank8', event.target.checked);
                                    this.onBlur('anyAbnormalUsageTank8');
                                }} name="anyAbnormalUsageTank8"/>
                            </Grid>
                            <Grid item>Yes</Grid>
                        </Grid>
                    </FormControl>
                </Grid>
                {/** End Any Abnormal Usage Tank8 **/}
                {/** Water Level Tank9 ***/}
                <Grid item xs={12}>
                    <FormControl className={this.props.classes.formControl}>
                        <NumberFormat
                            id="waterLevelTank9"
                            label="Water Level Tank9"
                            customInput={TextField}
                            value={this.state.waterLevelTank9.value}
                            fullWidth={true}
                            defaultValue={0.00}
                            onValueChange={value => this.onChange('waterLevelTank9', value.floatValue)}
                            onBlur={e => this.onBlur('waterLevelTank9')}
                            onFocus={event => {
                                event.target.select();
                            }}
                            decimalScale={2}
                            thousandSeparator={false}
                            fixedDecimalScale={true}
                            error={!this.state.waterLevelTank9.valid}
                            helperText={!this.state.waterLevelTank9.valid ? this.state.waterLevelTank9.errorMessage : ''}
                            disabled={this.props.onFormSubmit}
                        />
                    </FormControl>
                </Grid>
                {/** End Water Level Tank9 **/}
                {/** Any Abnormal Usage Tank9 ***/}
                <Grid item xs={12}>
                    <FormControl className={this.props.classes.formControl}>
                        <FormLabel component="legend">Any Abnormal Usage Tank9</FormLabel>
                        <Grid component="label" container alignItems="center" spacing={1}>
                            <Grid item>No</Grid>
                            <Grid item>
                                <Switch checked={this.state.anyAbnormalUsageTank9.value} onChange={event => {
                                    this.onChange('anyAbnormalUsageTank9', event.target.checked);
                                    this.onBlur('anyAbnormalUsageTank9');
                                }} name="anyAbnormalUsageTank9"/>
                            </Grid>
                            <Grid item>Yes</Grid>
                        </Grid>
                    </FormControl>
                </Grid>
                {/** End Any Abnormal Usage Tank9 **/}
            </form>
        )
    }
}

export default withStyles(useStyles, {withTheme: true})(NeuEvaporatorAddOrEdit);
