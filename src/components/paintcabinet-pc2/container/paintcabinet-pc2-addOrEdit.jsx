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

class PaintCabinetPrimerCabinet2AddOrEdit extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            primerCabinet2UndonLightInspection: {
                valid: true,
                errorMessage: "",
                value: this.props.dataSet.primerCabinet2UndonLightInspection,
            },
            primerCabinet2R12Temperture: {
                valid: true,
                errorMessage: "",
                value: this.props.dataSet.primerCabinet2R12Temperture,
            },
            primerCabinet2HardenerTank3: {
                valid: true,
                errorMessage: "",
                value: this.props.dataSet.primerCabinet2HardenerTank3,
            },
            primerCabinet2PaintTestTemperature: {
                valid: true,
                errorMessage: "",
                value: this.props.dataSet.primerCabinet2PaintTestTemperature,
            },
            primerCabinet2BlackPrimerInletTank2: {
                valid: true,
                errorMessage: "",
                value: this.props.dataSet.primerCabinet2BlackPrimerInletTank2,
            },
            primerCabinet2BlackPrimerOutletTank2: {
                valid: true,
                errorMessage: "",
                value: this.props.dataSet.primerCabinet2BlackPrimerOutletTank2,
            },
            primerCabinet2PaintTestViscosity: {
                valid: true,
                errorMessage: "",
                value: this.props.dataSet.primerCabinet2PaintTestViscosity,
            },
            primerCabinet2WhitePrimerInletTank1: {
                valid: true,
                errorMessage: "",
                value: this.props.dataSet.primerCabinet2WhitePrimerInletTank1,
            },
            primerCabinet2WhitePrimerOutletTank1: {
                valid: true,
                errorMessage: "",
                value: this.props.dataSet.primerCabinet2WhitePrimerOutletTank1,
            },
            primerCabinet2DiWaterCheck: {
                valid: true,
                errorMessage: "",
                value: this.props.dataSet.primerCabinet2DiWaterCheck,
            },
            primerCabinet2HardenerPressureTank3: {
                valid: true,
                errorMessage: "",
                value: this.props.dataSet.primerCabinet2HardenerPressureTank3,
            },
            primerCabinet2R12Humidity: {
                valid: true,
                errorMessage: "",
                value: this.props.dataSet.primerCabinet2R12Humidity,
            },
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
                            id="primerCabinet2R12Temperature"
                            label="Primer Cabinet2 R12 Temperature, oC"
                            customInput={TextField}
                            value={this.state.primerCabinet2R12Temperture.value}
                            fullWidth={true}
                            defaultValue={0.0}
                            onValueChange={(value) =>
                                this.onChange("primerCabinet2R12Temperture", value.floatValue)
                            }
                            onBlur={(e) => this.onBlur("primerCabinet2R12Temperture")}
                            onFocus={(event) => {
                                event.target.select();
                            }}
                            decimalScale={2}
                            thousandSeparator={false}
                            fixedDecimalScale={true}
                            error={!this.state.primerCabinet2R12Temperture.valid}
                            helperText={
                                !this.state.primerCabinet2R12Temperture.valid
                                    ? this.state.primerCabinet2R12Temperture.errorMessage
                                    : ""
                            }
                            disabled={this.props.onFormSubmit}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl className={this.props.classes.formControl}>
                        <NumberFormat
                            id="primerCabinet2R12Humidity"
                            label="Primer Cabinet2 R12 Humidity, %"
                            customInput={TextField}
                            value={this.state.primerCabinet2R12Humidity.value}
                            fullWidth={true}
                            defaultValue={0.0}
                            onValueChange={(value) =>
                                this.onChange("primerCabinet2R12Humidity", value.floatValue)
                            }
                            onBlur={(e) => this.onBlur("primerCabinet2R12Humidity")}
                            onFocus={(event) => {
                                event.target.select();
                            }}
                            decimalScale={2}
                            thousandSeparator={false}
                            fixedDecimalScale={true}
                            error={!this.state.primerCabinet2R12Humidity.valid}
                            helperText={
                                !this.state.primerCabinet2R12Humidity.valid
                                    ? this.state.primerCabinet2R12Humidity.errorMessage
                                    : ""
                            }
                            disabled={this.props.onFormSubmit}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl className={this.props.classes.formControl}>
                        <NumberFormat
                            id="primerCabinet2PaintTestViscosity"
                            label="Primer Cabinet2 Paint Test Viscosity, sec"
                            customInput={TextField}
                            value={this.state.primerCabinet2PaintTestViscosity.value}
                            fullWidth={true}
                            defaultValue={0.0}
                            onValueChange={(value) =>
                                this.onChange(
                                    "primerCabinet2PaintTestViscosity",
                                    value.floatValue
                                )
                            }
                            onBlur={(e) => this.onBlur("primerCabinet2PaintTestViscosity")}
                            onFocus={(event) => {
                                event.target.select();
                            }}
                            decimalScale={2}
                            thousandSeparator={false}
                            fixedDecimalScale={true}
                            error={!this.state.primerCabinet2PaintTestViscosity.valid}
                            helperText={
                                !this.state.primerCabinet2PaintTestViscosity.valid
                                    ? this.state.primerCabinet2PaintTestViscosity.errorMessage
                                    : ""
                            }
                            disabled={this.props.onFormSubmit}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl className={this.props.classes.formControl}>
                        <NumberFormat
                            id="primerCabinet2PaintTestTemperature"
                            label="Primer Cabinet2 Paint Test Temperature, oC"
                            customInput={TextField}
                            value={this.state.primerCabinet2PaintTestTemperature.value}
                            fullWidth={true}
                            defaultValue={0.0}
                            onValueChange={(value) =>
                                this.onChange(
                                    "primerCabinet2PaintTestTemperature",
                                    value.floatValue
                                )
                            }
                            onBlur={(e) => this.onBlur("primerCabinet2PaintTestTemperature")}
                            onFocus={(event) => {
                                event.target.select();
                            }}
                            decimalScale={2}
                            thousandSeparator={false}
                            fixedDecimalScale={true}
                            error={!this.state.primerCabinet2PaintTestTemperature.valid}
                            helperText={
                                !this.state.primerCabinet2PaintTestTemperature.valid
                                    ? this.state.primerCabinet2PaintTestTemperature.errorMessage
                                    : ""
                            }
                            disabled={this.props.onFormSubmit}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl className={this.props.classes.formControl}>
                        <NumberFormat
                            id="primerCabinet2DiWaterCheck"
                            label="Primer Cabinet2 DI Water Check, bar"
                            customInput={TextField}
                            value={this.state.primerCabinet2DiWaterCheck.value}
                            fullWidth={true}
                            defaultValue={0.0}
                            onValueChange={(value) =>
                                this.onChange("primerCabinet2DiWaterCheck", value.floatValue)
                            }
                            onBlur={(e) => this.onBlur("primerCabinet2DiWaterCheck")}
                            onFocus={(event) => {
                                event.target.select();
                            }}
                            decimalScale={2}
                            thousandSeparator={false}
                            fixedDecimalScale={true}
                            error={!this.state.primerCabinet2DiWaterCheck.valid}
                            helperText={
                                !this.state.primerCabinet2DiWaterCheck.valid
                                    ? this.state.primerCabinet2DiWaterCheck.errorMessage
                                    : ""
                            }
                            disabled={this.props.onFormSubmit}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl className={this.props.classes.formControl}>
                        <FormLabel component="legend">
                            Primer Cabinet2 Undon Light Inspection
                        </FormLabel>
                        <Grid component="label" container alignItems="center" spacing={1}>
                            <Grid item>No Ok</Grid>
                            <Grid item>
                                <Switch
                                    checked={this.state.primerCabinet2UndonLightInspection.value}
                                    onChange={(event) => {
                                        this.onChange(
                                            "primerCabinet2UndonLightInspection",
                                            event.target.checked
                                        );
                                        this.onBlur("primerCabinet2UndonLightInspection");
                                    }}
                                    name="primerCabinet2UndonLightInspection"
                                />
                            </Grid>
                            <Grid item>Ok</Grid>
                        </Grid>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl className={this.props.classes.formControl}>
                        <NumberFormat
                            id="primerCabinet2WhitePrimerInletTank1"
                            label="Primer Cabinet2 White Primer Inlet Tank1, bar"
                            customInput={TextField}
                            value={this.state.primerCabinet2WhitePrimerInletTank1.value}
                            fullWidth={true}
                            defaultValue={0.0}
                            onValueChange={(value) =>
                                this.onChange(
                                    "primerCabinet2WhitePrimerInletTank1",
                                    value.floatValue
                                )
                            }
                            onBlur={(e) => this.onBlur("primerCabinet2WhitePrimerInletTank1")}
                            onFocus={(event) => {
                                event.target.select();
                            }}
                            decimalScale={2}
                            thousandSeparator={false}
                            fixedDecimalScale={true}
                            error={!this.state.primerCabinet2WhitePrimerInletTank1.valid}
                            helperText={
                                !this.state.primerCabinet2WhitePrimerInletTank1.valid
                                    ? this.state.primerCabinet2WhitePrimerInletTank1.errorMessage
                                    : ""
                            }
                            disabled={this.props.onFormSubmit}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl className={this.props.classes.formControl}>
                        <NumberFormat
                            id="primerCabinet2WhitePrimerOutletTank1"
                            label="Primer Cabinet2 White Primer Outlet Tank1, bar"
                            customInput={TextField}
                            value={this.state.primerCabinet2WhitePrimerOutletTank1.value}
                            fullWidth={true}
                            defaultValue={0.0}
                            onValueChange={(value) =>
                                this.onChange(
                                    "primerCabinet2WhitePrimerOutletTank1",
                                    value.floatValue
                                )
                            }
                            onBlur={(e) =>
                                this.onBlur("primerCabinet2WhitePrimerOutletTank1")
                            }
                            onFocus={(event) => {
                                event.target.select();
                            }}
                            decimalScale={2}
                            thousandSeparator={false}
                            fixedDecimalScale={true}
                            error={!this.state.primerCabinet2WhitePrimerOutletTank1.valid}
                            helperText={
                                !this.state.primerCabinet2WhitePrimerOutletTank1.valid
                                    ? this.state.primerCabinet2WhitePrimerOutletTank1.errorMessage
                                    : ""
                            }
                            disabled={this.props.onFormSubmit}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl className={this.props.classes.formControl}>
                        <NumberFormat
                            id="primerCabinet2BlackPrimerInletTank2"
                            label="Primer Cabinet2 Black Primer Inlet Tank2, bar"
                            customInput={TextField}
                            value={this.state.primerCabinet2BlackPrimerInletTank2.value}
                            fullWidth={true}
                            defaultValue={0.0}
                            onValueChange={(value) =>
                                this.onChange(
                                    "primerCabinet2BlackPrimerInletTank2",
                                    value.floatValue
                                )
                            }
                            onBlur={(e) => this.onBlur("primerCabinet2BlackPrimerInletTank2")}
                            onFocus={(event) => {
                                event.target.select();
                            }}
                            decimalScale={2}
                            thousandSeparator={false}
                            fixedDecimalScale={true}
                            error={!this.state.primerCabinet2BlackPrimerInletTank2.valid}
                            helperText={
                                !this.state.primerCabinet2BlackPrimerInletTank2.valid
                                    ? this.state.primerCabinet2BlackPrimerInletTank2.errorMessage
                                    : ""
                            }
                            disabled={this.props.onFormSubmit}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl className={this.props.classes.formControl}>
                        <NumberFormat
                            id="primerCabinet2BlackPrimerOutletTank2"
                            label="Primer Cabinet2 Black Primer Outlet Tank2, bar"
                            customInput={TextField}
                            value={this.state.primerCabinet2BlackPrimerOutletTank2.value}
                            fullWidth={true}
                            defaultValue={0.0}
                            onValueChange={(value) =>
                                this.onChange(
                                    "primerCabinet2BlackPrimerOutletTank2",
                                    value.floatValue
                                )
                            }
                            onBlur={(e) =>
                                this.onBlur("primerCabinet2BlackPrimerOutletTank2")
                            }
                            onFocus={(event) => {
                                event.target.select();
                            }}
                            decimalScale={2}
                            thousandSeparator={false}
                            fixedDecimalScale={true}
                            error={!this.state.primerCabinet2BlackPrimerOutletTank2.valid}
                            helperText={
                                !this.state.primerCabinet2BlackPrimerOutletTank2.valid
                                    ? this.state.primerCabinet2BlackPrimerOutletTank2.errorMessage
                                    : ""
                            }
                            disabled={this.props.onFormSubmit}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl className={this.props.classes.formControl}>
                        <NumberFormat
                            id="primerCabinet2HardenerTank3"
                            label="Primer Cabinet2 Hardener Tank3, bar"
                            customInput={TextField}
                            value={this.state.primerCabinet2HardenerTank3.value}
                            fullWidth={true}
                            defaultValue={0.0}
                            onValueChange={(value) =>
                                this.onChange("primerCabinet2HardenerTank3", value.floatValue)
                            }
                            onBlur={(e) => this.onBlur("primerCabinet2HardenerTank3")}
                            onFocus={(event) => {
                                event.target.select();
                            }}
                            decimalScale={2}
                            thousandSeparator={false}
                            fixedDecimalScale={true}
                            error={!this.state.primerCabinet2HardenerTank3.valid}
                            helperText={
                                !this.state.primerCabinet2HardenerTank3.valid
                                    ? this.state.primerCabinet2HardenerTank3.errorMessage
                                    : ""
                            }
                            disabled={this.props.onFormSubmit}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl className={this.props.classes.formControl}>
                        <NumberFormat
                            id="primerCabinet2HardenerPressureTank3"
                            label="Primer Cabinet2 Hardener Pressure Tank3, bar"
                            customInput={TextField}
                            value={this.state.primerCabinet2HardenerPressureTank3.value}
                            fullWidth={true}
                            defaultValue={0.0}
                            onValueChange={(value) =>
                                this.onChange(
                                    "primerCabinet2HardenerPressureTank3",
                                    value.floatValue
                                )
                            }
                            onBlur={(e) => this.onBlur("primerCabinet2HardenerPressureTank3")}
                            onFocus={(event) => {
                                event.target.select();
                            }}
                            decimalScale={2}
                            thousandSeparator={false}
                            fixedDecimalScale={true}
                            error={!this.state.primerCabinet2HardenerPressureTank3.valid}
                            helperText={
                                !this.state.primerCabinet2HardenerPressureTank3.valid
                                    ? this.state.primerCabinet2HardenerPressureTank3.errorMessage
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
export default withStyles(useStyles, { withTheme: true })(PaintCabinetPrimerCabinet2AddOrEdit)
