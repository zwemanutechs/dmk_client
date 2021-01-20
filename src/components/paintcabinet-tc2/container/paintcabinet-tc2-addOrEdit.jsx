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

class PaintCabinetTopCabinet2AddOrEdit extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            topCabinet2HardenerPressureTank3: {
                valid: true,
                errorMessage: "",
                value: this.props.dataSet.topCabinet2HardenerPressureTank3,
            },
            topCabinet2HardenerTank3: {
                valid: true,
                errorMessage: "",
                value: this.props.dataSet.topCabinet2HardenerTank3,
            },
            topCabinet2DiWaterCheck: {
                valid: true,
                errorMessage: "",
                value: this.props.dataSet.topCabinet2DiWaterCheck,
            },
            topCabinet2CabinetTemperture: {
                valid: true,
                errorMessage: "",
                value: this.props.dataSet.topCabinet2CabinetTemperture,
            },
            topCabinet2CabinetHumidity: {
                valid: true,
                errorMessage: "",
                value: this.props.dataSet.topCabinet2CabinetHumidity,
            },
            topCabinet2PaintTestVisocity: {
                valid: true,
                errorMessage: "",
                value: this.props.dataSet.topCabinet2PaintTestVisocity,
            },
            topCabinet2PaintTestTemperature: {
                valid: true,
                errorMessage: "",
                value: this.props.dataSet.topCabinet2PaintTestTemperature,
            },
            topCabinet2AndonLightInspection: {
                valid: true,
                errorMessage: "",
                value: this.props.dataSet.topCabinet2AndonLightInspection,
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
                            id="topCabinet2HardenerPressureTank3"
                            label="Top Cabinet2 Hardener Pressure Tank 3, bar"
                            customInput={TextField}
                            value={this.state.topCabinet2HardenerPressureTank3.value}
                            fullWidth={true}
                            defaultValue={0.0}
                            onValueChange={(value) =>
                                this.onChange(
                                    "topCabinet2HardenerPressureTank3",
                                    value.floatValue
                                )
                            }
                            onBlur={(e) =>
                                this.onBlur("topCabinet2HardenerPressureTank3")
                            }
                            onFocus={(event) => {
                                event.target.select();
                            }}
                            decimalScale={2}
                            thousandSeparator={false}
                            fixedDecimalScale={true}
                            error={!this.state.topCabinet2HardenerPressureTank3.valid}
                            helperText={
                                !this.state.topCabinet2HardenerPressureTank3.valid
                                    ? this.state.topCabinet2HardenerPressureTank3.errorMessage
                                    : ""
                            }
                            disabled={this.props.onFormSubmit}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl className={this.props.classes.formControl}>
                        <NumberFormat
                            id="topCabinet2HardenerTank3"
                            label="Top Cabinet2 Hardener Tank3, bar"
                            customInput={TextField}
                            value={this.state.topCabinet2HardenerTank3.value}
                            fullWidth={true}
                            defaultValue={0.0}
                            onValueChange={(value) =>
                                this.onChange("topCabinet2HardenerTank3", value.floatValue)
                            }
                            onBlur={(e) => this.onBlur("topCabinet2HardenerTank3")}
                            onFocus={(event) => {
                                event.target.select();
                            }}
                            decimalScale={2}
                            thousandSeparator={false}
                            fixedDecimalScale={true}
                            error={!this.state.topCabinet2HardenerTank3.valid}
                            helperText={
                                !this.state.topCabinet2HardenerTank3.valid
                                    ? this.state.topCabinet2HardenerTank3.errorMessage
                                    : ""
                            }
                            disabled={this.props.onFormSubmit}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl className={this.props.classes.formControl}>
                        <NumberFormat
                            id="topCabinet2DiWaterCheck"
                            label="Top Cabinet2 DI Water Check, uS/cm"
                            customInput={TextField}
                            value={this.state.topCabinet2DiWaterCheck.value}
                            fullWidth={true}
                            defaultValue={0.0}
                            onValueChange={(value) =>
                                this.onChange("topCabinet2DiWaterCheck", value.floatValue)
                            }
                            onBlur={(e) => this.onBlur("topCabinet2DiWaterCheck")}
                            onFocus={(event) => {
                                event.target.select();
                            }}
                            decimalScale={2}
                            thousandSeparator={false}
                            fixedDecimalScale={true}
                            error={!this.state.topCabinet2DiWaterCheck.valid}
                            helperText={
                                !this.state.topCabinet2DiWaterCheck.valid
                                    ? this.state.topCabinet2DiWaterCheck.errorMessage
                                    : ""
                            }
                            disabled={this.props.onFormSubmit}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl className={this.props.classes.formControl}>
                        <NumberFormat
                            id="topCabinet2CabinetTemperature"
                            label="Top Cabinet2 Cabinet Temperature, oC"
                            customInput={TextField}
                            value={this.state.topCabinet2CabinetTemperture.value}
                            fullWidth={true}
                            defaultValue={0.0}
                            onValueChange={(value) =>
                                this.onChange("topCabinet2CabinetTemperture", value.floatValue)
                            }
                            onBlur={(e) => this.onBlur("topCabinet2CabinetTemperture")}
                            onFocus={(event) => {
                                event.target.select();
                            }}
                            decimalScale={2}
                            thousandSeparator={false}
                            fixedDecimalScale={true}
                            error={!this.state.topCabinet2CabinetTemperture.valid}
                            helperText={
                                !this.state.topCabinet2CabinetTemperture.valid
                                    ? this.state.topCabinet2CabinetTemperture.errorMessage
                                    : ""
                            }
                            disabled={this.props.onFormSubmit}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl className={this.props.classes.formControl}>
                        <NumberFormat
                            id="topCabinet2CabinetHumidity"
                            label="Top Cabinet2 Cabinet Humidity, %"
                            customInput={TextField}
                            value={this.state.topCabinet2CabinetHumidity.value}
                            fullWidth={true}
                            defaultValue={0.0}
                            onValueChange={(value) =>
                                this.onChange("topCabinet2CabinetHumidity", value.floatValue)
                            }
                            onBlur={(e) => this.onBlur("topCabinet2CabinetHumidity")}
                            onFocus={(event) => {
                                event.target.select();
                            }}
                            decimalScale={2}
                            thousandSeparator={false}
                            fixedDecimalScale={true}
                            error={!this.state.topCabinet2CabinetHumidity.valid}
                            helperText={
                                !this.state.topCabinet2CabinetHumidity.valid
                                    ? this.state.topCabinet2CabinetHumidity.errorMessage
                                    : ""
                            }
                            disabled={this.props.onFormSubmit}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl className={this.props.classes.formControl}>
                        <NumberFormat
                            id="topCabinet2PaintTestVisocity"
                            label="Top Cabinet2 Paint Test Visocity, sec"
                            customInput={TextField}
                            value={this.state.topCabinet2PaintTestVisocity.value}
                            fullWidth={true}
                            defaultValue={0.0}
                            onValueChange={(value) =>
                                this.onChange("topCabinet2PaintTestVisocity", value.floatValue)
                            }
                            onBlur={(e) => this.onBlur("topCabinet2PaintTestVisocity")}
                            onFocus={(event) => {
                                event.target.select();
                            }}
                            decimalScale={2}
                            thousandSeparator={false}
                            fixedDecimalScale={true}
                            error={!this.state.topCabinet2PaintTestVisocity.valid}
                            helperText={
                                !this.state.topCabinet2PaintTestVisocity.valid
                                    ? this.state.topCabinet2PaintTestVisocity.errorMessage
                                    : ""
                            }
                            disabled={this.props.onFormSubmit}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl className={this.props.classes.formControl}>
                        <NumberFormat
                            id="topCabinet2CabinetTestTemperature"
                            label="Top Cabinet2 Paint Test Temperature, oC"
                            customInput={TextField}
                            value={this.state.topCabinet2PaintTestTemperature.value}
                            fullWidth={true}
                            defaultValue={0.0}
                            onValueChange={(value) =>
                                this.onChange(
                                    "topCabinet2PaintTestTemperature",
                                    value.floatValue
                                )
                            }
                            onBlur={(e) => this.onBlur("topCabinet2PaintTestTemperature")}
                            onFocus={(event) => {
                                event.target.select();
                            }}
                            decimalScale={2}
                            thousandSeparator={false}
                            fixedDecimalScale={true}
                            error={!this.state.topCabinet2PaintTestTemperature.valid}
                            helperText={
                                !this.state.topCabinet2PaintTestTemperature.valid
                                    ? this.state.topCabinet2PaintTestTemperature.errorMessage
                                    : ""
                            }
                            disabled={this.props.onFormSubmit}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl className={this.props.classes.formControl}>
                        <FormLabel component="legend">
                            Top Cabinet2 Andon Light Inspection
                        </FormLabel>
                        <Grid component="label" container alignItems="center" spacing={1}>
                            <Grid item>Not Ok</Grid>
                            <Grid item>
                                <Switch
                                    checked={this.state.topCabinet2AndonLightInspection.value}
                                    onChange={(event) => {
                                        this.onChange(
                                            "topCabinet2AndonLightInspection",
                                            event.target.checked
                                        );
                                        this.onBlur("topCabinet2AndonLightInspection");
                                    }}
                                    name="topCabinet2AndonLightInspection"
                                />
                            </Grid>
                            <Grid item>Ok</Grid>
                        </Grid>
                    </FormControl>
                </Grid>
            </form>
        )
    }
}
export default withStyles(useStyles, { withTheme: true })(PaintCabinetTopCabinet2AddOrEdit)
