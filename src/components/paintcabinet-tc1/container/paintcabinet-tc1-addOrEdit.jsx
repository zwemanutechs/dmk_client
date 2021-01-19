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
            topCabinet1PaintTestVisocity: {
                valid: true,
                errorMessage: "",
                value: this.props.dataSet.topCabinet1PaintTestVisocity,
            },
            topCabinet1PaintTestTemperature: {
                valid: true,
                errorMessage: "",
                value: this.props.dataSet.topCabinet1PaintTestTemperature,
            },
            topCabinet1DiWaterCheck: {
                valid: true,
                errorMessage: "",
                value: this.props.dataSet.topCabinet1DiWaterCheck,
            },
            topCabinet1AndonLightInspection: {
                valid: true,
                errorMessage: "",
                value: this.props.dataSet.topCabinet1AndonLightInspection,
            },
            topCabinet1P600InletTank1: {
                valid: true,
                errorMessage: "",
                value: this.props.dataSet.topCabinet1P600InletTank1,
            },
            topCabinet1P600OutletTank1: {
                valid: true,
                errorMessage: "",
                value: this.props.dataSet.topCabinet1P600OutletTank1,
            },
            topCabinet1P190InletTank2: {
                valid: true,
                errorMessage: "",
                value: this.props.dataSet.topCabinet1P190InletTank2,
            },
            topCabinet1P190OutletTank2: {
                valid: true,
                errorMessage: "",
                value: this.props.dataSet.topCabinet1P190OutletTank2,
            },
            topCabinet1P100InletTank3: {
                valid: true,
                errorMessage: "",
                value: this.props.dataSet.topCabinet1P100InletTank3,
            },
            topCabinet1P100OutletTank3: {
                valid: true,
                errorMessage: "",
                value: this.props.dataSet.topCabinet1P100OutletTank3,
            },
            topCabinet1P020InletTank4: {
                valid: true,
                errorMessage: "",
                value: this.props.dataSet.topCabinet1P020InletTank4,
            },
            topCabinet1P020OutletTank2: {
                valid: true,
                errorMessage: "",
                value: this.props.dataSet.topCabinet1P020OutletTank2,
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
                            id="topCabinet1CabinetTemperature"
                            label="Top Cabinet1 Cabinet Temperature, oC"
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
                        <NumberFormat
                            id="topCabinet1CabinetHumidity"
                            label="Top Cabinet1 Cabinet Humidity, %"
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
                        <NumberFormat
                            id="topCabinet1PaintTestVisocity"
                            label="Top Cabinet1 Paint Test Visocity, sec"
                            customInput={TextField}
                            value={this.state.topCabinet1PaintTestVisocity.value}
                            fullWidth={true}
                            defaultValue={0.0}
                            onValueChange={(value) =>
                                this.onChange("topCabinet1PaintTestVisocity", value.floatValue)
                            }
                            onBlur={(e) => this.onBlur("topCabinet1PaintTestVisocity")}
                            onFocus={(event) => {
                                event.target.select();
                            }}
                            decimalScale={2}
                            thousandSeparator={false}
                            fixedDecimalScale={true}
                            error={!this.state.topCabinet1PaintTestVisocity.valid}
                            helperText={
                                !this.state.topCabinet1PaintTestVisocity.valid
                                    ? this.state.topCabinet1PaintTestVisocity.errorMessage
                                    : ""
                            }
                            disabled={this.props.onFormSubmit}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl className={this.props.classes.formControl}>
                        <NumberFormat
                            id="topCabinet1PaintTestTemperature"
                            label="Top Cabinet1 Paint Test Temperature, oC"
                            customInput={TextField}
                            value={this.state.topCabinet1PaintTestTemperature.value}
                            fullWidth={true}
                            defaultValue={0.0}
                            onValueChange={(value) =>
                                this.onChange(
                                    "topCabinet1PaintTestTemperature",
                                    value.floatValue
                                )
                            }
                            onBlur={(e) => this.onBlur("topCabinet1PaintTestTemperature")}
                            onFocus={(event) => {
                                event.target.select();
                            }}
                            decimalScale={2}
                            thousandSeparator={false}
                            fixedDecimalScale={true}
                            error={!this.state.topCabinet1PaintTestTemperature.valid}
                            helperText={
                                !this.state.topCabinet1PaintTestTemperature.valid
                                    ? this.state.topCabinet1PaintTestTemperature.errorMessage
                                    : ""
                            }
                            disabled={this.props.onFormSubmit}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl className={this.props.classes.formControl}>
                        <NumberFormat
                            id="topCabinet1DiWaterCheck"
                            label="Top Cabinet1 DI Water Check, uS/cm"
                            customInput={TextField}
                            value={this.state.topCabinet1DiWaterCheck.value}
                            fullWidth={true}
                            defaultValue={0.0}
                            onValueChange={(value) =>
                                this.onChange("topCabinet1DiWaterCheck", value.floatValue)
                            }
                            onBlur={(e) => this.onBlur("topCabinet1DiWaterCheck")}
                            onFocus={(event) => {
                                event.target.select();
                            }}
                            decimalScale={2}
                            thousandSeparator={false}
                            fixedDecimalScale={true}
                            error={!this.state.topCabinet1DiWaterCheck.valid}
                            helperText={
                                !this.state.topCabinet1DiWaterCheck.valid
                                    ? this.state.topCabinet1DiWaterCheck.errorMessage
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
                                    checked={this.state.topCabinet1AndonLightInspection.value}
                                    onChange={(event) => {
                                        this.onChange(
                                            "topCabinet1AndonLightInspection",
                                            event.target.checked
                                        );
                                        this.onBlur("topCabinet1AndonLightInspection");
                                    }}
                                    name="topCabinet1AndonLightInspection"
                                />
                            </Grid>
                            <Grid item>Ok</Grid>
                        </Grid>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl className={this.props.classes.formControl}>
                        <NumberFormat
                            id="topCabinet1P600InletTank1"
                            label="Top Cabinet1 P600 Inlet Tank1, bar"
                            customInput={TextField}
                            value={this.state.topCabinet1P600InletTank1.value}
                            fullWidth={true}
                            defaultValue={0.0}
                            onValueChange={(value) =>
                                this.onChange("topCabinet1P600InletTank1", value.floatValue)
                            }
                            onBlur={(e) => this.onBlur("topCabinet1P600InletTank1")}
                            onFocus={(event) => {
                                event.target.select();
                            }}
                            decimalScale={2}
                            thousandSeparator={false}
                            fixedDecimalScale={true}
                            error={!this.state.topCabinet1P600InletTank1.valid}
                            helperText={
                                !this.state.topCabinet1P600InletTank1.valid
                                    ? this.state.topCabinet1P600InletTank1.errorMessage
                                    : ""
                            }
                            disabled={this.props.onFormSubmit}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl className={this.props.classes.formControl}>
                        <NumberFormat
                            id="topCabinet1P600OutletTank1"
                            label="Top Cabinet1 P600 Outlet Tank1, bar"
                            customInput={TextField}
                            value={this.state.topCabinet1P600OutletTank1.value}
                            fullWidth={true}
                            defaultValue={0.0}
                            onValueChange={(value) =>
                                this.onChange("topCabinet1P600OutletTank1", value.floatValue)
                            }
                            onBlur={(e) => this.onBlur("topCabinet1P600OutletTank1")}
                            onFocus={(event) => {
                                event.target.select();
                            }}
                            decimalScale={2}
                            thousandSeparator={false}
                            fixedDecimalScale={true}
                            error={!this.state.topCabinet1P600OutletTank1.valid}
                            helperText={
                                !this.state.topCabinet1P600OutletTank1.valid
                                    ? this.state.topCabinet1P600OutletTank1.errorMessage
                                    : ""
                            }
                            disabled={this.props.onFormSubmit}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl className={this.props.classes.formControl}>
                        <NumberFormat
                            id="topCabinet1P190InletTank2"
                            label="Top Cabinet1 P190 Inlet Tank2, bar"
                            customInput={TextField}
                            value={this.state.topCabinet1P190InletTank2.value}
                            fullWidth={true}
                            defaultValue={0.0}
                            onValueChange={(value) =>
                                this.onChange("topCabinet1P190InletTank2", value.floatValue)
                            }
                            onBlur={(e) => this.onBlur("topCabinet1P190InletTank2")}
                            onFocus={(event) => {
                                event.target.select();
                            }}
                            decimalScale={2}
                            thousandSeparator={false}
                            fixedDecimalScale={true}
                            error={!this.state.topCabinet1P190InletTank2.valid}
                            helperText={
                                !this.state.topCabinet1P190InletTank2.valid
                                    ? this.state.topCabinet1P190InletTank2.errorMessage
                                    : ""
                            }
                            disabled={this.props.onFormSubmit}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl className={this.props.classes.formControl}>
                        <NumberFormat
                            id="topCabinet1P190OutletTank2"
                            label="Top Cabinet1 P190 Outlet Tank2, bar"
                            customInput={TextField}
                            value={this.state.topCabinet1P190OutletTank2.value}
                            fullWidth={true}
                            defaultValue={0.0}
                            onValueChange={(value) =>
                                this.onChange("topCabinet1P190OutletTank2", value.floatValue)
                            }
                            onBlur={(e) => this.onBlur("topCabinet1P190OutletTank2")}
                            onFocus={(event) => {
                                event.target.select();
                            }}
                            decimalScale={2}
                            thousandSeparator={false}
                            fixedDecimalScale={true}
                            error={!this.state.topCabinet1P190OutletTank2.valid}
                            helperText={
                                !this.state.topCabinet1P190OutletTank2.valid
                                    ? this.state.topCabinet1P190OutletTank2.errorMessage
                                    : ""
                            }
                            disabled={this.props.onFormSubmit}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl className={this.props.classes.formControl}>
                        <NumberFormat
                            id="topCabinet1P100InletTank3"
                            label="Top Cabinet1 P100 Inlet Tank3, bar"
                            customInput={TextField}
                            value={this.state.topCabinet1P100InletTank3.value}
                            fullWidth={true}
                            defaultValue={0.0}
                            onValueChange={(value) =>
                                this.onChange("topCabinet1P100InletTank3", value.floatValue)
                            }
                            onBlur={(e) => this.onBlur("topCabinet1P100InletTank3")}
                            onFocus={(event) => {
                                event.target.select();
                            }}
                            decimalScale={2}
                            thousandSeparator={false}
                            fixedDecimalScale={true}
                            error={!this.state.topCabinet1P100InletTank3.valid}
                            helperText={
                                !this.state.topCabinet1P100InletTank3.valid
                                    ? this.state.topCabinet1P100InletTank3.errorMessage
                                    : ""
                            }
                            disabled={this.props.onFormSubmit}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl className={this.props.classes.formControl}>
                        <NumberFormat
                            id="topCabinet1P100OutletTank3"
                            label="Top Cabinet1 P100 Outlet Tank3"
                            customInput={TextField}
                            value={this.state.topCabinet1P100OutletTank3.value}
                            fullWidth={true}
                            defaultValue={0.0}
                            onValueChange={(value) =>
                                this.onChange("topCabinet1P100OutletTank3", value.floatValue)
                            }
                            onBlur={(e) => this.onBlur("topCabinet1P100OutletTank3")}
                            onFocus={(event) => {
                                event.target.select();
                            }}
                            decimalScale={2}
                            thousandSeparator={false}
                            fixedDecimalScale={true}
                            error={!this.state.topCabinet1P100OutletTank3.valid}
                            helperText={
                                !this.state.topCabinet1P100OutletTank3.valid
                                    ? this.state.topCabinet1P100OutletTank3.errorMessage
                                    : ""
                            }
                            disabled={this.props.onFormSubmit}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl className={this.props.classes.formControl}>
                        <NumberFormat
                            id="topCabinet1P020InletTank4"
                            label="Top Cabinet1 P020 Inlet Tank4"
                            customInput={TextField}
                            value={this.state.topCabinet1P020InletTank4.value}
                            fullWidth={true}
                            defaultValue={0.0}
                            onValueChange={(value) =>
                                this.onChange("topCabinet1P020InletTank4", value.floatValue)
                            }
                            onBlur={(e) => this.onBlur("topCabinet1P020InletTank4")}
                            onFocus={(event) => {
                                event.target.select();
                            }}
                            decimalScale={2}
                            thousandSeparator={false}
                            fixedDecimalScale={true}
                            error={!this.state.topCabinet1P020InletTank4.valid}
                            helperText={
                                !this.state.topCabinet1P020InletTank4.valid
                                    ? this.state.topCabinet1P020InletTank4.errorMessage
                                    : ""
                            }
                            disabled={this.props.onFormSubmit}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl className={this.props.classes.formControl}>
                        <NumberFormat
                            id="topCabinet1P020OutletTank2"
                            label="Top Cabinet1 P020 Outlet Tank2"
                            customInput={TextField}
                            value={this.state.topCabinet1P020OutletTank2.value}
                            fullWidth={true}
                            defaultValue={0.0}
                            onValueChange={(value) =>
                                this.onChange("topCabinet1P020OutletTank2", value.floatValue)
                            }
                            onBlur={(e) => this.onBlur("topCabinet1P020OutletTank2")}
                            onFocus={(event) => {
                                event.target.select();
                            }}
                            decimalScale={2}
                            thousandSeparator={false}
                            fixedDecimalScale={true}
                            error={!this.state.topCabinet1P020OutletTank2.valid}
                            helperText={
                                !this.state.topCabinet1P020OutletTank2.valid
                                    ? this.state.topCabinet1P020OutletTank2.errorMessage
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
