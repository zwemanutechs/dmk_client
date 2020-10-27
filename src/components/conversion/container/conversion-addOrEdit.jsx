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

class ConversionAddOrEdit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            waterSupplyFromDiTank: {valid: true, errorMessage: '', value: this.props.dataSet.waterSupplyFromDiTank}
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
                {/** Water Supply From Di Tank ***/}
                <Grid item xs={12}>
                    <FormControl className={this.props.classes.formControl}>
                        <NumberFormat
                            id="waterSupplyFromDiTank"
                            label="Water Supply From Di Tank"
                            customInput={TextField}
                            value={this.state.waterSupplyFromDiTank.value}
                            fullWidth={true}
                            defaultValue={0.00}
                            onValueChange={value => this.onChange('waterSupplyFromDiTank', value.floatValue)}
                            onBlur={e => this.onBlur('waterSupplyFromDiTank')}
                            onFocus={event => {
                                event.target.select();
                            }}
                            decimalScale={2}
                            thousandSeparator={false}
                            fixedDecimalScale={true}
                            error={!this.state.waterSupplyFromDiTank.valid}
                            helperText={!this.state.waterSupplyFromDiTank.valid ? this.state.waterSupplyFromDiTank.errorMessage : ''}
                            disabled={this.props.onFormSubmit}
                        />
                    </FormControl>
                </Grid>
                {/** End Water Supply From Di Tank **/}
            </form>
        )
    }
}

export default withStyles(useStyles, {withTheme: true})(ConversionAddOrEdit);
