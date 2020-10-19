import React, {useState, useEffect} from "react";
import { makeStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import NumberFormat from "react-number-format";

const useStyles = makeStyles((theme) => ({
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
}));

function RinseOneAddOrEdit(props) {
    const classes = useStyles();
    const [formFields, setformFields] = useState({
        ph:{valid: true, errorMessage: ''},
        waterOverflowToWasteWaterTank1:{valid: true, errorMessage: ''},
        waterSupplyFromTank3:{valid: true, errorMessage: ''},
        waterSupplyFromTank6:{valid: true, errorMessage: ''},
    });

    useEffect(() => {
        if(props.formError && !props.formError.valid && Array.isArray(props.formError.errors)){
            let invalidState = formFields;
            props.formError.errors.forEach((err) => {
                invalidState[err.property].valid = false;
                invalidState[err.property].errorMessage = err.message;
            });
            setformFields(prevformFields => ({...prevformFields, ...invalidState}));
        }
    }, [props.formError]);

    const onChange = (propertyName, propertyValue) => {
        let validState = formFields;
        if(propertyValue && propertyValue > 0){
            validState[propertyName].valid = true;
            validState[propertyName].message = '';
        }
        setformFields(prevformFields => ({...prevformFields, ...validState}));
        props.handelChange(propertyName, propertyValue);
    };

    return (
        <form className={classes.form}>
            {/** PH Meter ***/}
            <Grid item xs={12}>
                <FormControl className={classes.formControl}>
                    <NumberFormat
                        id="phmeter"
                        label="PH Meter"
                        customInput={TextField}
                        value={props.dataSet.ph}
                        fullWidth={true}
                        defaultValue={0.00}
                        onValueChange={ value => onChange('ph', value.floatValue)}
                        onFocus={event => {event.target.select();}}
                        decimalScale={2}
                        thousandSeparator={false}
                        fixedDecimalScale={true}
                        error={!formFields.ph.valid}
                        helperText={!formFields.ph.valid ? formFields.ph.errorMessage : ''}
                        disabled={props.onFormSubmit}
                    />
                </FormControl>
            </Grid>
            {/** End PH Meter **/}
            {/** Water Overflow Waste Water From Tank 1 ***/}
            <Grid item xs={12}>
                <FormControl className={classes.formControl}>
                    <NumberFormat
                        id="waterOverflowToWasteWaterTank1"
                        label="Tank-1 Waste Water"
                        customInput={TextField}
                        value={props.dataSet.waterOverflowToWasteWaterTank1}
                        defaultValue={0.00}
                        onValueChange={ value => onChange('waterOverflowToWasteWaterTank1', value.floatValue)}
                        onFocus={event => {event.target.select();}}
                        decimalScale={2}
                        thousandSeparator={false}
                        fixedDecimalScale={true}
                        error={!formFields.waterOverflowToWasteWaterTank1.valid}
                        helperText={!formFields.waterOverflowToWasteWaterTank1.valid ? formFields.waterOverflowToWasteWaterTank1.errorMessage : ''}
                        disabled={props.onFormSubmit}
                    />
                </FormControl>
            </Grid>
            {/** End Water Overflow Waste Water From Tank 1 **/}
            {/** Tank-3 Water Supply ***/}
            <Grid item xs={12}>
                <FormControl className={classes.formControl}>
                    <NumberFormat
                        id="waterSupplyFromTank3"
                        label="Tank-3 Water Supply"
                        customInput={TextField}
                        value={props.dataSet.waterSupplyFromTank3}
                        defaultValue={0.00}
                        onValueChange={ value => onChange('waterSupplyFromTank3', value.floatValue)}
                        onFocus={event => {event.target.select();}}
                        decimalScale={2}
                        thousandSeparator={false}
                        fixedDecimalScale={true}
                        error={!formFields.waterSupplyFromTank3.valid}
                        helperText={!formFields.waterSupplyFromTank3.valid ? formFields.waterSupplyFromTank3.errorMessage : ''}
                        disabled={props.onFormSubmit}
                    />
                </FormControl>
            </Grid>
            {/** End Tank-3 Water Supply **/}
            {/** Tank-3 Water Supply ***/}
            <Grid item xs={12}>
                <FormControl className={classes.formControl}>
                    <NumberFormat
                        id="waterSupplyFromTank6"
                        label="Tank-3 Water Supply"
                        customInput={TextField}
                        value={props.dataSet.waterSupplyFromTank6}
                        defaultValue={0.00}
                        onValueChange={ value => onChange('waterSupplyFromTank6', value.floatValue)}
                        onFocus={event => {event.target.select();}}
                        decimalScale={2}
                        thousandSeparator={false}
                        fixedDecimalScale={true}
                        error={!formFields.waterSupplyFromTank6.valid}
                        helperText={!formFields.waterSupplyFromTank6.valid ? formFields.waterSupplyFromTank6.errorMessage : ''}
                        disabled={props.onFormSubmit}
                    />
                </FormControl>
            </Grid>
            {/** End Tank-3 Water Supply **/}
        </form>
    )
}
export default RinseOneAddOrEdit;
