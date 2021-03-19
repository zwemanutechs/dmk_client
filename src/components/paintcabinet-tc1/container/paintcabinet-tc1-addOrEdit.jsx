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

class PaintCabinetTopCabinet1AddOrEdit extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            topCabinet1CabinetTemperature: {
                valid: true,
                errorMessage: "",
                value: this.props.dataSet.topCabinet1CabinetTemperature,
            },
            topCabinet1CabinetHumidity: {
                valid: true,
                errorMessage: "",
                value: this.props.dataSet.topCabinet1CabinetHumidity,
            },
            topCabinet1CabinetTestVisocity: {
                valid: true,
                errorMessage: "",
                value: this.props.dataSet.topCabinet1CabinetTestVisocity,
            },
            topCabinet1CabinetTestTemperature: {
                valid: true,
                errorMessage: "",
                value: this.props.dataSet.topCabinet1CabinetTestTemperature,
            },
            topCabinet1CabinetDiWaterCheck: {
                valid: true,
                errorMessage: "",
                value: this.props.dataSet.topCabinet1CabinetDiWaterCheck,
            },
            topCabinet1CabinetAndonLightInspection: {
                valid: true,
                errorMessage: "",
                value: this.props.dataSet.topCabinet1CabinetAndonLightInspection,
            },
            topCabinet1CabinetP600InletTank1: {
                valid: true,
                errorMessage: "",
                value: this.props.dataSet.topCabinet1CabinetP600InletTank1,
            },
            topCabinet1CabinetP600OutletTank1: {
                valid: true,
                errorMessage: "",
                value: this.props.dataSet.topCabinet1CabinetP600OutletTank1,
            },
            topCabinet1CabinetP190InletTank2: {
                valid: true,
                errorMessage: "",
                value: this.props.dataSet.topCabinet1CabinetP190InletTank2,
            },
            topCabinet1CabinetP190OutletTank2: {
                valid: true,
                errorMessage: "",
                value: this.props.dataSet.topCabinet1CabinetP190OutletTank2,
            },
            topCabinet1CabinetP100InletTank3: {
                valid: true,
                errorMessage: "",
                value: this.props.dataSet.topCabinet1CabinetP100InletTank3,
            },
            topCabinet1CabinetP100OutletTank3: {
                valid: true,
                errorMessage: "",
                value: this.props.dataSet.topCabinet1CabinetP100OutletTank3,
            },
            topCabinet1CabinetP020InletTank4: {
                valid: true,
                errorMessage: "",
                value: this.props.dataSet.topCabinet1CabinetP020InletTank4,
            },
            topCabinet1CabinetP020OutletTank2: {
                valid: true,
                errorMessage: "",
                value: this.props.dataSet.topCabinet1CabinetP020OutletTank2,
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
                        <FormLabel component="legend">
                            Top Cabinet1 Cabinet Temperature, oC
                        </FormLabel>
                        <NumberFormat
                            id="topCabinet1CabinetTemperature"
                            label=""
                            customInput={TextField}
                            value={this.state.topCabinet1CabinetTemperature.value}
                            fullWidth={true}
                            defaultValue={0.0}
                            onValueChange={(value) =>
                                this.onChange("topCabinet1CabinetTemperature", value.floatValue)
                            }
                            onBlur={(e) => this.onBlur("topCabinet1CabinetTemperature")}
                            onFocus={(event) => {
                                event.target.select();
                            }}
                            decimalScale={2}
                            thousandSeparator={false}
                            fixedDecimalScale={true}
                            error={!this.state.topCabinet1CabinetTemperature.valid}
                            helperText={
                                !this.state.topCabinet1CabinetTemperature.valid
                                    ? this.state.topCabinet1CabinetTemperature.errorMessage
                                    : ""
                            }
                            disabled={this.props.onFormSubmit}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl className={this.props.classes.formControl}>
                        <FormLabel component="legend">
                            Top Cabinet1 Cabinet Humidity, %
                        </FormLabel>
                        <NumberFormat
                            id="topCabinet1CabinetHumidity"
                            label=""
                            customInput={TextField}
                            value={this.state.topCabinet1CabinetHumidity.value}
                            fullWidth={true}
                            defaultValue={0.0}
                            onValueChange={(value) =>
                                this.onChange("topCabinet1CabinetHumidity", value.floatValue)
                            }
                            onBlur={(e) => this.onBlur("topCabinet1CabinetHumidity")}
                            onFocus={(event) => {
                                event.target.select();
                            }}
                            decimalScale={2}
                            thousandSeparator={false}
                            fixedDecimalScale={true}
                            error={!this.state.topCabinet1CabinetHumidity.valid}
                            helperText={
                                !this.state.topCabinet1CabinetHumidity.valid
                                    ? this.state.topCabinet1CabinetHumidity.errorMessage
                                    : ""
                            }
                            disabled={this.props.onFormSubmit}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl className={this.props.classes.formControl}>
                        <FormLabel component="legend">
                            Top Cabinet1 Paint Test Visocity, sec
                        </FormLabel>
                        <NumberFormat
                            id="topCabinet1CabinetTestVisocity"
                            label=""
                            customInput={TextField}
                            value={this.state.topCabinet1CabinetTestVisocity.value}
                            fullWidth={true}
                            defaultValue={0.0}
                            onValueChange={(value) =>
                                this.onChange("topCabinet1CabinetTestVisocity", value.floatValue)
                            }
                            onBlur={(e) => this.onBlur("topCabinet1CabinetTestVisocity")}
                            onFocus={(event) => {
                                event.target.select();
                            }}
                            decimalScale={2}
                            thousandSeparator={false}
                            fixedDecimalScale={true}
                            error={!this.state.topCabinet1CabinetTestVisocity.valid}
                            helperText={
                                !this.state.topCabinet1CabinetTestVisocity.valid
                                    ? this.state.topCabinet1CabinetTestVisocity.errorMessage
                                    : ""
                            }
                            disabled={this.props.onFormSubmit}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl className={this.props.classes.formControl}>
                        <FormLabel component="legend">
                            Top Cabinet1 Paint Test Temperature, oC
                        </FormLabel>
                        <NumberFormat
                            id="topCabinet1CabinetTestTemperature"
                            label=""
                            customInput={TextField}
                            value={this.state.topCabinet1CabinetTestTemperature.value}
                            fullWidth={true}
                            defaultValue={0.0}
                            onValueChange={(value) =>
                                this.onChange(
                                    "topCabinet1CabinetTestTemperature",
                                    value.floatValue
                                )
                            }
                            onBlur={(e) => this.onBlur("topCabinet1CabinetTestTemperature")}
                            onFocus={(event) => {
                                event.target.select();
                            }}
                            decimalScale={2}
                            thousandSeparator={false}
                            fixedDecimalScale={true}
                            error={!this.state.topCabinet1CabinetTestTemperature.valid}
                            helperText={
                                !this.state.topCabinet1CabinetTestTemperature.valid
                                    ? this.state.topCabinet1CabinetTestTemperature.errorMessage
                                    : ""
                            }
                            disabled={this.props.onFormSubmit}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl className={this.props.classes.formControl}>
                        <FormLabel component="legend">
                            Top Cabinet1 DI Water Check, uS/cm
                        </FormLabel>
                        <NumberFormat
                            id="topCabinet1CabinetDiWaterCheck"
                            label=""
                            customInput={TextField}
                            value={this.state.topCabinet1CabinetDiWaterCheck.value}
                            fullWidth={true}
                            defaultValue={0.0}
                            onValueChange={(value) =>
                                this.onChange("topCabinet1CabinetDiWaterCheck", value.floatValue)
                            }
                            onBlur={(e) => this.onBlur("topCabinet1CabinetDiWaterCheck")}
                            onFocus={(event) => {
                                event.target.select();
                            }}
                            decimalScale={2}
                            thousandSeparator={false}
                            fixedDecimalScale={true}
                            error={!this.state.topCabinet1CabinetDiWaterCheck.valid}
                            helperText={
                                !this.state.topCabinet1CabinetDiWaterCheck.valid
                                    ? this.state.topCabinet1CabinetDiWaterCheck.errorMessage
                                    : ""
                            }
                            disabled={this.props.onFormSubmit}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl className={this.props.classes.formControl}>
                        <FormLabel component="legend">
                            Top Cabinet1 Andon Light Inspection
                        </FormLabel>
                        <Grid component="label" container alignItems="center" spacing={1}>
                            <Grid item>Not Ok</Grid>
                            <Grid item>
                                <Switch
                                    checked={this.state.topCabinet1CabinetAndonLightInspection.value}
                                    onChange={(event) => {
                                        this.onChange(
                                            "topCabinet1CabinetAndonLightInspection",
                                            event.target.checked
                                        );
                                        this.onBlur("topCabinet1CabinetAndonLightInspection");
                                    }}
                                    name="topCabinet1CabinetAndonLightInspection"
                                />
                            </Grid>
                            <Grid item>Ok</Grid>
                        </Grid>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl className={this.props.classes.formControl}>
                        <FormLabel component="legend">
                            Top Cabinet1 P600 Inlet Tank1, bar
                        </FormLabel>
                        <NumberFormat
                            id="topCabinet1P600InletTank1"
                            label=""
                            customInput={TextField}
                            value={this.state.topCabinet1CabinetP600InletTank1.value}
                            fullWidth={true}
                            defaultValue={0.0}
                            onValueChange={(value) =>
                                this.onChange("topCabinet1CabinetP600InletTank1", value.floatValue)
                            }
                            onBlur={(e) => this.onBlur("topCabinet1CabinetP600InletTank1")}
                            onFocus={(event) => {
                                event.target.select();
                            }}
                            decimalScale={2}
                            thousandSeparator={false}
                            fixedDecimalScale={true}
                            error={!this.state.topCabinet1CabinetP600InletTank1.valid}
                            helperText={
                                !this.state.topCabinet1CabinetP600InletTank1.valid
                                    ? this.state.topCabinet1CabinetP600InletTank1.errorMessage
                                    : ""
                            }
                            disabled={this.props.onFormSubmit}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl className={this.props.classes.formControl}>
                        <FormLabel component="legend">
                            Top Cabinet1 P600 Outlet Tank1, bar
                        </FormLabel>
                        <NumberFormat
                            id="topCabinet1P600OutletTank1"
                            label=""
                            customInput={TextField}
                            value={this.state.topCabinet1CabinetP600OutletTank1.value}
                            fullWidth={true}
                            defaultValue={0.0}
                            onValueChange={(value) =>
                                this.onChange("topCabinet1CabinetP600OutletTank1", value.floatValue)
                            }
                            onBlur={(e) => this.onBlur("topCabinet1CabinetP600OutletTank1")}
                            onFocus={(event) => {
                                event.target.select();
                            }}
                            decimalScale={2}
                            thousandSeparator={false}
                            fixedDecimalScale={true}
                            error={!this.state.topCabinet1CabinetP600OutletTank1.valid}
                            helperText={
                                !this.state.topCabinet1CabinetP600OutletTank1.valid
                                    ? this.state.topCabinet1CabinetP600OutletTank1.errorMessage
                                    : ""
                            }
                            disabled={this.props.onFormSubmit}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl className={this.props.classes.formControl}>
                        <FormLabel component="legend">
                            Top Cabinet1 P190 Inlet Tank2, bar
                        </FormLabel>
                        <NumberFormat
                            id="topCabinet1P190InletTank2"
                            label=""
                            customInput={TextField}
                            value={this.state.topCabinet1CabinetP190InletTank2.value}
                            fullWidth={true}
                            defaultValue={0.0}
                            onValueChange={(value) =>
                                this.onChange("topCabinet1CabinetP190InletTank2", value.floatValue)
                            }
                            onBlur={(e) => this.onBlur("topCabinet1CabinetP190InletTank2")}
                            onFocus={(event) => {
                                event.target.select();
                            }}
                            decimalScale={2}
                            thousandSeparator={false}
                            fixedDecimalScale={true}
                            error={!this.state.topCabinet1CabinetP190InletTank2.valid}
                            helperText={
                                !this.state.topCabinet1CabinetP190InletTank2.valid
                                    ? this.state.topCabinet1CabinetP190InletTank2.errorMessage
                                    : ""
                            }
                            disabled={this.props.onFormSubmit}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl className={this.props.classes.formControl}>
                        <FormLabel component="legend">
                            Top Cabinet1 P190 Outlet Tank2, bar
                        </FormLabel>
                        <NumberFormat
                            id="topCabinet1P190OutletTank2"
                            label=""
                            customInput={TextField}
                            value={this.state.topCabinet1CabinetP190OutletTank2.value}
                            fullWidth={true}
                            defaultValue={0.0}
                            onValueChange={(value) =>
                                this.onChange("topCabinet1CabinetP190OutletTank2", value.floatValue)
                            }
                            onBlur={(e) => this.onBlur("topCabinet1CabinetP190OutletTank2")}
                            onFocus={(event) => {
                                event.target.select();
                            }}
                            decimalScale={2}
                            thousandSeparator={false}
                            fixedDecimalScale={true}
                            error={!this.state.topCabinet1CabinetP190OutletTank2.valid}
                            helperText={
                                !this.state.topCabinet1CabinetP190OutletTank2.valid
                                    ? this.state.topCabinet1CabinetP190OutletTank2.errorMessage
                                    : ""
                            }
                            disabled={this.props.onFormSubmit}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl className={this.props.classes.formControl}>
                        <FormLabel component="legend">
                            Top Cabinet1 P100 Inlet Tank3, bar
                        </FormLabel>
                        <NumberFormat
                            id="topCabinet1P100InletTank3"
                            label=""
                            customInput={TextField}
                            value={this.state.topCabinet1CabinetP100InletTank3.value}
                            fullWidth={true}
                            defaultValue={0.0}
                            onValueChange={(value) =>
                                this.onChange("topCabinet1CabinetP100InletTank3", value.floatValue)
                            }
                            onBlur={(e) => this.onBlur("topCabinet1CabinetP100InletTank3")}
                            onFocus={(event) => {
                                event.target.select();
                            }}
                            decimalScale={2}
                            thousandSeparator={false}
                            fixedDecimalScale={true}
                            error={!this.state.topCabinet1CabinetP100InletTank3.valid}
                            helperText={
                                !this.state.topCabinet1CabinetP100InletTank3.valid
                                    ? this.state.topCabinet1CabinetP100InletTank3.errorMessage
                                    : ""
                            }
                            disabled={this.props.onFormSubmit}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl className={this.props.classes.formControl}>
                        <FormLabel component="legend">
                            Top Cabinet1 P100 Outlet Tank3
                        </FormLabel>
                        <NumberFormat
                            id="topCabinet1P100OutletTank3"
                            label=""
                            customInput={TextField}
                            value={this.state.topCabinet1CabinetP100OutletTank3.value}
                            fullWidth={true}
                            defaultValue={0.0}
                            onValueChange={(value) =>
                                this.onChange("topCabinet1CabinetP100OutletTank3", value.floatValue)
                            }
                            onBlur={(e) => this.onBlur("topCabinet1CabinetP100OutletTank3")}
                            onFocus={(event) => {
                                event.target.select();
                            }}
                            decimalScale={2}
                            thousandSeparator={false}
                            fixedDecimalScale={true}
                            error={!this.state.topCabinet1CabinetP100OutletTank3.valid}
                            helperText={
                                !this.state.topCabinet1CabinetP100OutletTank3.valid
                                    ? this.state.topCabinet1CabinetP100OutletTank3.errorMessage
                                    : ""
                            }
                            disabled={this.props.onFormSubmit}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl className={this.props.classes.formControl}>
                        <FormLabel component="legend">
                            Top Cabinet1 P020 Inlet Tank4
                        </FormLabel>
                        <NumberFormat
                            id="topCabinet1P020InletTank4"
                            label=""
                            customInput={TextField}
                            value={this.state.topCabinet1CabinetP020InletTank4.value}
                            fullWidth={true}
                            defaultValue={0.0}
                            onValueChange={(value) =>
                                this.onChange("topCabinet1CabinetP020InletTank4", value.floatValue)
                            }
                            onBlur={(e) => this.onBlur("topCabinet1CabinetP020InletTank4")}
                            onFocus={(event) => {
                                event.target.select();
                            }}
                            decimalScale={2}
                            thousandSeparator={false}
                            fixedDecimalScale={true}
                            error={!this.state.topCabinet1CabinetP020InletTank4.valid}
                            helperText={
                                !this.state.topCabinet1CabinetP020InletTank4.valid
                                    ? this.state.topCabinet1CabinetP020InletTank4.errorMessage
                                    : ""
                            }
                            disabled={this.props.onFormSubmit}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl className={this.props.classes.formControl}>
                        <FormLabel component="legend">
                            Top Cabinet1 P020 Outlet Tank4
                        </FormLabel>
                        <NumberFormat
                            id="topCabinet1P020OutletTank2"
                            label=""
                            customInput={TextField}
                            value={this.state.topCabinet1CabinetP020OutletTank2.value}
                            fullWidth={true}
                            defaultValue={0.0}
                            onValueChange={(value) =>
                                this.onChange("topCabinet1CabinetP020OutletTank2", value.floatValue)
                            }
                            onBlur={(e) => this.onBlur("topCabinet1CabinetP020OutletTank2")}
                            onFocus={(event) => {
                                event.target.select();
                            }}
                            decimalScale={2}
                            thousandSeparator={false}
                            fixedDecimalScale={true}
                            error={!this.state.topCabinet1CabinetP020OutletTank2.valid}
                            helperText={
                                !this.state.topCabinet1CabinetP020OutletTank2.valid
                                    ? this.state.topCabinet1CabinetP020OutletTank2.errorMessage
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
export default withStyles(useStyles, { withTheme: true })(PaintCabinetTopCabinet1AddOrEdit)
