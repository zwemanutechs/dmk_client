import React, {useState, useEffect, Component, PureComponent} from "react";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import NumberFormat from "react-number-format";
import {withStyles} from "@material-ui/core/styles";

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

class PaintBoothAddOrEdit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            paintPressureAtEsta2R11: {valid: true, errorMessage: '', value: this.props.dataSet.paintPressureAtEsta2R11},
            paintPressureAtEsta1R12: {valid: true, errorMessage: '', value: this.props.dataSet.paintPressureAtEsta1R12},
            highTensionEsta2R11: {valid: true, errorMessage: '', value: this.props.dataSet.highTensionEsta2R11},
            paintPressureAtEsta1R11: {valid: true, errorMessage: '', value: this.props.dataSet.paintPressureAtEsta1R11},
            highTensionEsta1R12: {valid: true, errorMessage: '', value: this.props.dataSet.highTensionEsta1R12},
            highTensionEsta1R11: {valid: true, errorMessage: '', value: this.props.dataSet.highTensionEsta1R11},
            touchUpRoom1AirFlow: {valid: true, errorMessage: '', value: this.props.dataSet.touchUpRoom1AirFlow},
            touchUpRoom2AirFlow: {valid: true, errorMessage: '', value: this.props.dataSet.touchUpRoom2AirFlow},
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
                {/** Paint Pressure At Esta2 R11 ***/}
                <Grid item xs={12}>
                    <FormControl className={this.props.classes.formControl}>
                        <NumberFormat
                            id="paintPressureAtEsta2R11"
                            label="Paint Pressure At Esta2 R11"
                            customInput={TextField}
                            value={this.state.paintPressureAtEsta2R11.value}
                            fullWidth={true}
                            defaultValue={0.00}
                            onValueChange={value => this.onChange('paintPressureAtEsta2R11', value.floatValue)}
                            onBlur={e => this.onBlur('paintPressureAtEsta2R11')}
                            onFocus={event => {
                                event.target.select();
                            }}
                            decimalScale={2}
                            thousandSeparator={false}
                            fixedDecimalScale={true}
                            error={!this.state.paintPressureAtEsta2R11.valid}
                            helperText={!this.state.paintPressureAtEsta2R11.valid ? this.state.paintPressureAtEsta2R11.errorMessage : ''}
                            disabled={this.props.onFormSubmit}
                        />
                    </FormControl>
                </Grid>
                {/** End Paint Pressure At Esta2 R11 **/}
                {/** Paint Pressure At Esta1 R12 ***/}
                <Grid item xs={12}>
                    <FormControl className={this.props.classes.formControl}>
                        <NumberFormat
                            id="paintPressureAtEsta1R12"
                            label="Paint Pressure At Esta1 R12"
                            customInput={TextField}
                            value={this.state.paintPressureAtEsta1R12.value}
                            fullWidth={true}
                            defaultValue={0.00}
                            onValueChange={value => this.onChange('paintPressureAtEsta1R12', value.floatValue)}
                            onBlur={e => this.onBlur('paintPressureAtEsta1R12')}
                            onFocus={event => {
                                event.target.select();
                            }}
                            decimalScale={2}
                            thousandSeparator={false}
                            fixedDecimalScale={true}
                            error={!this.state.paintPressureAtEsta1R12.valid}
                            helperText={!this.state.paintPressureAtEsta1R12.valid ? this.state.paintPressureAtEsta1R12.errorMessage : ''}
                            disabled={this.props.onFormSubmit}
                        />
                    </FormControl>
                </Grid>
                {/** End Paint Pressure At Esta1 R12 **/}
                {/** Paint Pressure At Esta1 R11 ***/}
                <Grid item xs={12}>
                    <FormControl className={this.props.classes.formControl}>
                        <NumberFormat
                            id="paintPressureAtEsta1R11"
                            label="Paint Pressure At Esta1 R11"
                            customInput={TextField}
                            value={this.state.paintPressureAtEsta1R11.value}
                            fullWidth={true}
                            defaultValue={0.00}
                            onValueChange={value => this.onChange('paintPressureAtEsta1R11', value.floatValue)}
                            onBlur={e => this.onBlur('paintPressureAtEsta1R11')}
                            onFocus={event => {
                                event.target.select();
                            }}
                            decimalScale={2}
                            thousandSeparator={false}
                            fixedDecimalScale={true}
                            error={!this.state.paintPressureAtEsta1R11.valid}
                            helperText={!this.state.paintPressureAtEsta1R11.valid ? this.state.paintPressureAtEsta1R11.errorMessage : ''}
                            disabled={this.props.onFormSubmit}
                        />
                    </FormControl>
                </Grid>
                {/** End Paint Pressure At Esta1 R11 **/}
                {/** High Tension Esta2 R11 ***/}
                <Grid item xs={12}>
                    <FormControl className={this.props.classes.formControl}>
                        <NumberFormat
                            id="highTensionEsta2R11"
                            label="High Tension Esta2 R11"
                            customInput={TextField}
                            value={this.state.highTensionEsta2R11.value}
                            fullWidth={true}
                            defaultValue={0.00}
                            onValueChange={value => this.onChange('highTensionEsta2R11', value.floatValue)}
                            onBlur={e => this.onBlur('highTensionEsta2R11')}
                            onFocus={event => {
                                event.target.select();
                            }}
                            decimalScale={2}
                            thousandSeparator={false}
                            fixedDecimalScale={true}
                            error={!this.state.highTensionEsta2R11.valid}
                            helperText={!this.state.highTensionEsta2R11.valid ? this.state.highTensionEsta2R11.errorMessage : ''}
                            disabled={this.props.onFormSubmit}
                        />
                    </FormControl>
                </Grid>
                {/** End High Tension Esta2 R11 **/}
                {/** High Tension Esta1 R12 ***/}
                <Grid item xs={12}>
                    <FormControl className={this.props.classes.formControl}>
                        <NumberFormat
                            id="highTensionEsta1R12"
                            label="High Tension Esta1 R12"
                            customInput={TextField}
                            value={this.state.highTensionEsta1R12.value}
                            fullWidth={true}
                            defaultValue={0.00}
                            onValueChange={value => this.onChange('highTensionEsta1R12', value.floatValue)}
                            onBlur={e => this.onBlur('highTensionEsta1R12')}
                            onFocus={event => {
                                event.target.select();
                            }}
                            decimalScale={2}
                            thousandSeparator={false}
                            fixedDecimalScale={true}
                            error={!this.state.highTensionEsta1R12.valid}
                            helperText={!this.state.highTensionEsta1R12.valid ? this.state.highTensionEsta1R12.errorMessage : ''}
                            disabled={this.props.onFormSubmit}
                        />
                    </FormControl>
                </Grid>
                {/** End High Tension Esta1 R12 **/}
                {/** High Tension Esta1 R11 ***/}
                <Grid item xs={12}>
                    <FormControl className={this.props.classes.formControl}>
                        <NumberFormat
                            id="highTensionEsta1R11"
                            label="High Tension Esta1 R11"
                            customInput={TextField}
                            value={this.state.highTensionEsta1R11.value}
                            fullWidth={true}
                            defaultValue={0.00}
                            onValueChange={value => this.onChange('highTensionEsta1R11', value.floatValue)}
                            onBlur={e => this.onBlur('highTensionEsta1R11')}
                            onFocus={event => {
                                event.target.select();
                            }}
                            decimalScale={2}
                            thousandSeparator={false}
                            fixedDecimalScale={true}
                            error={!this.state.highTensionEsta1R11.valid}
                            helperText={!this.state.highTensionEsta1R11.valid ? this.state.highTensionEsta1R11.errorMessage : ''}
                            disabled={this.props.onFormSubmit}
                        />
                    </FormControl>
                </Grid>
                {/** End High Tension Esta1 R11 **/}
                {/** Touch Up Room1 Air Flow ***/}
                <Grid item xs={12}>
                    <FormControl className={this.props.classes.formControl}>
                        <NumberFormat
                            id="touchUpRoom1AirFlow"
                            label="Touch Up Room1 Air Flow"
                            customInput={TextField}
                            value={this.state.touchUpRoom1AirFlow.value}
                            fullWidth={true}
                            defaultValue={0.00}
                            onValueChange={value => this.onChange('touchUpRoom1AirFlow', value.floatValue)}
                            onBlur={e => this.onBlur('touchUpRoom1AirFlow')}
                            onFocus={event => {
                                event.target.select();
                            }}
                            decimalScale={2}
                            thousandSeparator={false}
                            fixedDecimalScale={true}
                            error={!this.state.touchUpRoom1AirFlow.valid}
                            helperText={!this.state.touchUpRoom1AirFlow.valid ? this.state.touchUpRoom1AirFlow.errorMessage : ''}
                            disabled={this.props.onFormSubmit}
                        />
                    </FormControl>
                </Grid>
                {/** End Touch Up Room1 Air Flow **/}
                {/** Touch Up Room2 Air Flow ***/}
                <Grid item xs={12}>
                    <FormControl className={this.props.classes.formControl}>
                        <NumberFormat
                            id="touchUpRoom2AirFlow"
                            label="Touch Up Room2 Air Flow"
                            customInput={TextField}
                            value={this.state.touchUpRoom2AirFlow.value}
                            fullWidth={true}
                            defaultValue={0.00}
                            onValueChange={value => this.onChange('touchUpRoom2AirFlow', value.floatValue)}
                            onBlur={e => this.onBlur('touchUpRoom2AirFlow')}
                            onFocus={event => {
                                event.target.select();
                            }}
                            decimalScale={2}
                            thousandSeparator={false}
                            fixedDecimalScale={true}
                            error={!this.state.touchUpRoom2AirFlow.valid}
                            helperText={!this.state.touchUpRoom2AirFlow.valid ? this.state.touchUpRoom2AirFlow.errorMessage : ''}
                            disabled={this.props.onFormSubmit}
                        />
                    </FormControl>
                </Grid>
                {/** End Touch Up Room2 Air Flow **/}
            </form>
        )
    }
}

export default withStyles(useStyles, {withTheme: true})(PaintBoothAddOrEdit);
