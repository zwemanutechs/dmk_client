import React, {useState, useEffect, Component, PureComponent} from "react";
import Grid from "@material-ui/core/Grid";
import Switch from "@material-ui/core/Switch";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
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

class PassivationAddOrEdit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            concentration:{valid: true, errorMessage: '', value: this.props.dataSet.concentration},
            concentrationBelowTopUp:{valid: true, errorMessage: '', value: this.props.dataSet.concentrationBelowTopUp}
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.formError !== this.props.formError){
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
        if(!this.props.formError.valid){
            if(propertyValue > 0){
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
                {/** PH Meter ***/}
                <Grid item xs={12}>
                    <FormControl className={this.props.classes.formControl}>
                        <NumberFormat
                            id="concentration"
                            label="Concentration"
                            customInput={TextField}
                            value={this.state.concentration.value}
                            fullWidth={true}
                            defaultValue={0.00}
                            onValueChange={ value => this.onChange('concentration', value.floatValue)}
                            onBlur={e => this.onBlur('concentration')}
                            onFocus={event => {event.target.select();}}
                            decimalScale={2}
                            thousandSeparator={false}
                            fixedDecimalScale={true}
                            error={!this.state.concentration.valid}
                            helperText={!this.state.concentration.valid ? this.state.concentration.errorMessage : ''}
                            disabled={this.props.onFormSubmit}
                        />
                    </FormControl>
                </Grid>
                {/** End PH Meter **/}
                {/** If Concentration Below Top Up 0.5% Top-up Chemical ***/}
                <Grid item xs={12}>
                    <FormControl className={this.props.classes.formControl}>
                        <FormLabel component="legend">If concentration below 0.5% top-up chemical</FormLabel>
                        <Grid component="label" container alignItems="center" spacing={1}>
                            <Grid item>No</Grid>
                            <Grid item>
                                <Switch checked={this.state.concentrationBelowTopUp.value} onChange={event => {this.onChange('concentrationBelowTopUp', event.target.checked);this.onBlur('concentrationBelowTopUp');}} name="concentrationBelowTopUp" />
                            </Grid>
                            <Grid item>Yes</Grid>
                        </Grid>
                    </FormControl>
                </Grid>
                {/** If Concentration Below Top Up 0.5% Chemical **/}
            </form>
        )
    }
}

export default withStyles(useStyles, { withTheme: true })(PassivationAddOrEdit);
