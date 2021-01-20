import React, { useEffect, useState } from "react";
import {withStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import NumberFormat from "react-number-format";
import TextField from "@material-ui/core/TextField";
import FormLabel from "@material-ui/core/FormLabel";
import Switch from "@material-ui/core/Switch";

const useStyles = (theme) => ({
    form: {
        display: "flex",
        flexDirection: "column",
        margin: "auto",
        width: "100%",
    },
    formControl: {
        marginTop: theme.spacing(2),
        width: "100%",
        margin: 4,
    },
    formControlLabel: {
        marginTop: theme.spacing(1),
    },
    paper: {
        minWidth: "500px",
        [theme.breakpoints.up("md")]: {
            position: "absolute",
            left: "30%",
            right: "30%",
            top: 80,
        },
    },
});

class PaintCabinetPrimerCabinet1AddOrEdit extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            primerCabinet1DiWaterCheck: {
                valid: true,
                errorMessage: "",
                value: this.props.dataSet.primerCabinet1DiWaterCheck,
            },
            primerCabinet1BlackPrimerInletTank2: {
                valid: true,
                errorMessage: "",
                value: this.props.dataSet.primerCabinet1BlackPrimerInletTank2,
            },
            primerCabinet1BlackPrimerOutletTank2: {
                valid: true,
                errorMessage: "",
                value: this.props.dataSet.primerCabinet1BlackPrimerOutletTank2,
            },
            primerCabinet1PaintTestViscosity: {
                valid: true,
                errorMessage: "",
                value: this.props.dataSet.primerCabinet1PaintTestViscosity,
            },
            primerCabinet1R11Temperature: {
                valid: true,
                errorMessage: "",
                value: this.props.dataSet.primerCabinet1R11Temperature,
            },
            primerCabinet1R11Humidity: {
                valid: true,
                errorMessage: "",
                value: this.props.dataSet.primerCabinet1R11Humidity,
            },
            primerCabinet1HardenerPressureTank3: {
                valid: true,
                errorMessage: "",
                value: this.props.dataSet.primerCabinet1HardenerPressureTank3,
            },
            primerCabinet1HardenerTank3: {
                valid: true,
                errorMessage: "",
                value: this.props.dataSet.primerCabinet1HardenerTank3,
            },
            primerCabinet1UndonLightInscpection: {
                valid: true,
                errorMessage: "",
                value: this.props.dataSet.primerCabinet1UndonLightInscpection,
            },
            primerCabinet1PaintTestTemperature: {
                valid: true,
                errorMessage: "",
                value: this.props.dataSet.primerCabinet1PaintTestTemperature,
            },
            primerCabinet1WhitePrimerInletTank1: {
                valid: true,
                errorMessage: "",
                value: this.props.dataSet.primerCabinet1WhitePrimerInletTank1,
            },
            primerCabinet1WhitePrimerOutletTank1: {
                valid: true,
                errorMessage: "",
                value: this.props.dataSet.primerCabinet1WhitePrimerOutletTank1,
            }
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.formError !== this.props.formError) {
            let invalidState = { ...this.state };
            this.props.formError.errors.forEach((err) => {
                invalidState[err.property].valid = false;
                invalidState[err.property].errorMessage = err.message;
            });
            this.setState((state) => ({ invalidState }));
        }
    }

    onChange = (propertyName, propertyValue) => {
        let validState = { ...this.state };
        if (!this.props.formError.valid) {
            if (propertyValue > 0) {
                validState[propertyName].valid = true;
                validState[propertyName].message = "";
            }
        }
        validState[propertyName].value = propertyValue;
        this.setState((state) => ({ validState }));
    };

    onBlur = (propertyName) => {
        this.props.handelChange(propertyName, this.state[propertyName].value);
    };

    render() {
        return (
            <form className={this.props.classes.form}>
                <Grid item xs={12}>
                    <FormControl className={this.props.classes.formControl}>
                        <NumberFormat
                            id="primerCabinet1R11Temperature"
                            label="Primer Cabinet1 R11 Temperature, oC"
                            customInput={TextField}
                            value={this.state.primerCabinet1R11Temperature.value}
                            fullWidth={true}
                            defaultValue={0.0}
                            onValueChange={(value) =>
                                this.onChange("primerCabinet1R11Temperature", value.floatValue)
                            }
                            onBlur={(e) => this.onBlur("primerCabinet1R11Temperature")}
                            onFocus={(event) => {
                                event.target.select();
                            }}
                            decimalScale={2}
                            thousandSeparator={false}
                            fixedDecimalScale={true}
                            error={!this.state.primerCabinet1R11Temperature.valid}
                            helperText={
                                !this.state.primerCabinet1R11Temperature.valid
                                    ? this.state.primerCabinet1R11Temperature.errorMessage
                                    : ""
                            }
                            disabled={this.props.onFormSubmit}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl className={this.props.classes.formControl}>
                        <NumberFormat
                            id="primerCabinet1R11Humidity"
                            label="Primer Cabinet1 R11 Humidity, %"
                            customInput={TextField}
                            value={this.state.primerCabinet1R11Humidity.value}
                            fullWidth={true}
                            defaultValue={0.0}
                            onValueChange={(value) =>
                                this.onChange("primerCabinet1R11Humidity", value.floatValue)
                            }
                            onBlur={(e) => this.onBlur("primerCabinet1R11Humidity")}
                            onFocus={(event) => {
                                event.target.select();
                            }}
                            decimalScale={2}
                            thousandSeparator={false}
                            fixedDecimalScale={true}
                            error={!this.state.primerCabinet1R11Humidity.valid}
                            helperText={
                                !this.state.primerCabinet1R11Humidity.valid
                                    ? this.state.primerCabinet1R11Humidity.errorMessage
                                    : ""
                            }
                            disabled={this.props.onFormSubmit}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl className={this.props.classes.formControl}>
                        <NumberFormat
                            id="primerCabinet1PaintTestViscosity"
                            label="Primer Cabinet1 Paint Test Viscosity, sec"
                            customInput={TextField}
                            value={this.state.primerCabinet1PaintTestViscosity.value}
                            fullWidth={true}
                            defaultValue={0.0}
                            onValueChange={(value) =>
                                this.onChange(
                                    "primerCabinet1PaintTestViscosity",
                                    value.floatValue
                                )
                            }
                            onBlur={(e) => this.onBlur("primerCabinet1PaintTestViscosity")}
                            onFocus={(event) => {
                                event.target.select();
                            }}
                            decimalScale={2}
                            thousandSeparator={false}
                            fixedDecimalScale={true}
                            error={!this.state.primerCabinet1PaintTestViscosity.valid}
                            helperText={
                                !this.state.primerCabinet1PaintTestViscosity.valid
                                    ? this.state.primerCabinet1PaintTestViscosity.errorMessage
                                    : ""
                            }
                            disabled={this.props.onFormSubmit}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl className={this.props.classes.formControl}>
                        <NumberFormat
                            id="primerCabinet1PaintTestTemperature"
                            label="Primer Cabinet1 Paint Test Temperature, oC"
                            customInput={TextField}
                            value={this.state.primerCabinet1PaintTestTemperature.value}
                            fullWidth={true}
                            defaultValue={0.0}
                            onValueChange={(value) =>
                                this.onChange(
                                    "primerCabinet1PaintTestTemperature",
                                    value.floatValue
                                )
                            }
                            onBlur={(e) => this.onBlur("primerCabinet1PaintTestTemperature")}
                            onFocus={(event) => {
                                event.target.select();
                            }}
                            decimalScale={2}
                            thousandSeparator={false}
                            fixedDecimalScale={true}
                            error={!this.state.primerCabinet1PaintTestTemperature.valid}
                            helperText={
                                !this.state.primerCabinet1PaintTestTemperature.valid
                                    ? this.state.primerCabinet1PaintTestTemperature.errorMessage
                                    : ""
                            }
                            disabled={this.props.onFormSubmit}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl className={this.props.classes.formControl}>
                        <NumberFormat
                            id="primerCabinet1DiWaterCheck"
                            label="Primer Cabinet1 DI Water Check, uS/cm"
                            customInput={TextField}
                            value={this.state.primerCabinet1DiWaterCheck.value}
                            fullWidth={true}
                            defaultValue={0.0}
                            onValueChange={(value) =>
                                this.onChange("primerCabinet1DiWaterCheck", value.floatValue)
                            }
                            onBlur={(e) => this.onBlur("primerCabinet1DiWaterCheck")}
                            onFocus={(event) => {
                                event.target.select();
                            }}
                            decimalScale={2}
                            thousandSeparator={false}
                            fixedDecimalScale={true}
                            error={!this.state.primerCabinet1DiWaterCheck.valid}
                            helperText={
                                !this.state.primerCabinet1DiWaterCheck.valid
                                    ? this.state.primerCabinet1DiWaterCheck.errorMessage
                                    : ""
                            }
                            disabled={this.props.onFormSubmit}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl className={this.props.classes.formControl}>
                        <FormLabel component="legend">
                            Primer Cabinet1 Undon Light Inspection
                        </FormLabel>
                        <Grid component="label" container alignItems="center" spacing={1}>
                            <Grid item>Not Ok</Grid>
                            <Grid item>
                                <Switch
                                    checked={this.state.primerCabinet1UndonLightInscpection.value}
                                    onChange={(event) => {
                                        this.onChange(
                                            "primerCabinet1UndonLightInscpection",
                                            event.target.checked
                                        );
                                        this.onBlur("primerCabinet1UndonLightInscpection");
                                    }}
                                    name="primerCabinet1UndonLightInscpection"
                                />
                            </Grid>
                            <Grid item>Ok</Grid>
                        </Grid>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl className={this.props.classes.formControl}>
                        <NumberFormat
                            id="primerCabinet1WhitePrimerInletTank1"
                            label="Primer Cabinet1 White Primer Inlet Tank1, bar"
                            customInput={TextField}
                            value={this.state.primerCabinet1WhitePrimerInletTank1.value}
                            fullWidth={true}
                            defaultValue={0.0}
                            onValueChange={(value) =>
                                this.onChange(
                                    "primerCabinet1WhitePrimerInletTank1",
                                    value.floatValue
                                )
                            }
                            onBlur={(e) => this.onBlur("primerCabinet1WhitePrimerInletTank1")}
                            onFocus={(event) => {
                                event.target.select();
                            }}
                            decimalScale={2}
                            thousandSeparator={false}
                            fixedDecimalScale={true}
                            error={!this.state.primerCabinet1WhitePrimerInletTank1.valid}
                            helperText={
                                !this.state.primerCabinet1WhitePrimerInletTank1.valid
                                    ? this.state.primerCabinet1WhitePrimerInletTank1.errorMessage
                                    : ""
                            }
                            disabled={this.props.onFormSubmit}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl className={this.props.classes.formControl}>
                        <NumberFormat
                            id="primerCabinet1WhitePrimerOutletTank1"
                            label="Primer Cabinet1 White Primer Outlet Tank1, bar"
                            customInput={TextField}
                            value={this.state.primerCabinet1WhitePrimerOutletTank1.value}
                            fullWidth={true}
                            defaultValue={0.0}
                            onValueChange={(value) =>
                                this.onChange(
                                    "primerCabinet1WhitePrimerOutletTank1",
                                    value.floatValue
                                )
                            }
                            onBlur={(e) =>
                                this.onBlur("primerCabinet1WhitePrimerOutletTank1")
                            }
                            onFocus={(event) => {
                                event.target.select();
                            }}
                            decimalScale={2}
                            thousandSeparator={false}
                            fixedDecimalScale={true}
                            error={!this.state.primerCabinet1WhitePrimerOutletTank1.valid}
                            helperText={
                                !this.state.primerCabinet1WhitePrimerOutletTank1.valid
                                    ? this.state.primerCabinet1WhitePrimerOutletTank1.errorMessage
                                    : ""
                            }
                            disabled={this.props.onFormSubmit}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl className={this.props.classes.formControl}>
                        <NumberFormat
                            id="primerCabinet1BlackPrimerInletTank2"
                            label="Primer Cabinet1 Black Primer Inlet Tank2, bar"
                            customInput={TextField}
                            value={this.state.primerCabinet1BlackPrimerInletTank2.value}
                            fullWidth={true}
                            defaultValue={0.0}
                            onValueChange={(value) =>
                                this.onChange(
                                    "primerCabinet1BlackPrimerInletTank2",
                                    value.floatValue
                                )
                            }
                            onBlur={(e) => this.onBlur("primerCabinet1BlackPrimerInletTank2")}
                            onFocus={(event) => {
                                event.target.select();
                            }}
                            decimalScale={2}
                            thousandSeparator={false}
                            fixedDecimalScale={true}
                            error={!this.state.primerCabinet1BlackPrimerInletTank2.valid}
                            helperText={
                                !this.state.primerCabinet1BlackPrimerInletTank2.valid
                                    ? this.state.primerCabinet1BlackPrimerInletTank2.errorMessage
                                    : ""
                            }
                            disabled={this.props.onFormSubmit}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl className={this.props.classes.formControl}>
                        <NumberFormat
                            id="primerCabinet1BlackPrimerOutletTank2"
                            label="Primer Cabinet1 Black Primer Outlet Tank2, bar"
                            customInput={TextField}
                            value={this.state.primerCabinet1BlackPrimerOutletTank2.value}
                            fullWidth={true}
                            defaultValue={0.0}
                            onValueChange={(value) =>
                                this.onChange(
                                    "primerCabinet1BlackPrimerOutletTank2",
                                    value.floatValue
                                )
                            }
                            onBlur={(e) =>
                                this.onBlur("primerCabinet1BlackPrimerOutletTank2")
                            }
                            onFocus={(event) => {
                                event.target.select();
                            }}
                            decimalScale={2}
                            thousandSeparator={false}
                            fixedDecimalScale={true}
                            error={!this.state.primerCabinet1BlackPrimerOutletTank2.valid}
                            helperText={
                                !this.state.primerCabinet1BlackPrimerOutletTank2.valid
                                    ? this.state.primerCabinet1BlackPrimerOutletTank2.errorMessage
                                    : ""
                            }
                            disabled={this.props.onFormSubmit}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl className={this.props.classes.formControl}>
                        <NumberFormat
                            id="primerCabinet1HardenerPressureTank3"
                            label="Primer Cabinet1 Hardener Pressure Tank3, bar"
                            customInput={TextField}
                            value={this.state.primerCabinet1HardenerPressureTank3.value}
                            fullWidth={true}
                            defaultValue={0.0}
                            onValueChange={(value) =>
                                this.onChange(
                                    "primerCabinet1HardenerPressureTank3",
                                    value.floatValue
                                )
                            }
                            onBlur={(e) => this.onBlur("primerCabinet1HardenerPressureTank3")}
                            onFocus={(event) => {
                                event.target.select();
                            }}
                            decimalScale={2}
                            thousandSeparator={false}
                            fixedDecimalScale={true}
                            error={!this.state.primerCabinet1HardenerPressureTank3.valid}
                            helperText={
                                !this.state.primerCabinet1HardenerPressureTank3.valid
                                    ? this.state.primerCabinet1HardenerPressureTank3.errorMessage
                                    : ""
                            }
                            disabled={this.props.onFormSubmit}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl className={this.props.classes.formControl}>
                        <NumberFormat
                            id="primerCabinet1HardenerTank3"
                            label="Primer Cabinet1 Hardener Tank3, bar"
                            customInput={TextField}
                            value={this.state.primerCabinet1HardenerTank3.value}
                            fullWidth={true}
                            defaultValue={0.0}
                            onValueChange={(value) =>
                                this.onChange("primerCabinet1HardenerTank3", value.floatValue)
                            }
                            onBlur={(e) => this.onBlur("primerCabinet1HardenerTank3")}
                            onFocus={(event) => {
                                event.target.select();
                            }}
                            decimalScale={2}
                            thousandSeparator={false}
                            fixedDecimalScale={true}
                            error={!this.state.primerCabinet1HardenerTank3.valid}
                            helperText={
                                !this.state.primerCabinet1HardenerTank3.valid
                                    ? this.state.primerCabinet1HardenerTank3.errorMessage
                                    : ""
                            }
                            disabled={this.props.onFormSubmit}
                        />
                    </FormControl>
                </Grid>
            </form>
        )
    }
}
export default withStyles(useStyles, { withTheme: true })(PaintCabinetPrimerCabinet1AddOrEdit)
