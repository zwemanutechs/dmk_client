import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import NumberFormat from "react-number-format";
import { withStyles } from "@material-ui/core/styles";
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

class PaintCabinetAddOrEdit extends Component {
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
      topCabinet2HardenerPressureTankTank3: {
        valid: true,
        errorMessage: "",
        value: this.props.dataSet.topCabinet2HardenerPressureTankTank3,
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
      topCabinet2CabinetTemperature: {
        valid: true,
        errorMessage: "",
        value: this.props.dataSet.topCabinet2CabinetTemperature,
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
      primerCabinet1UndonLightInspection: {
        valid: true,
        errorMessage: "",
        value: this.props.dataSet.primerCabinet1UndonLightInspection,
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
      },
      primerCabinet2UndonLightInspection: {
        valid: true,
        errorMessage: "",
        value: this.props.dataSet.primerCabinet2UndonLightInspection,
      },
      primerCabinet2R12Temperature: {
        valid: true,
        errorMessage: "",
        value: this.props.dataSet.primerCabinet2R12Temperature,
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
    };
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
              label="Top Cabinet1 Cabinet Temperature"
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
              label="Top Cabinet1 Cabinet Humidity"
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
              label="Top Cabinet1 Paint Test Visocity"
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
              label="Top Cabinet1 Paint Test Temperature"
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
              label="Top Cabinet1 DI Water Check"
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
              <Grid item>No</Grid>
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
              <Grid item>Yes</Grid>
            </Grid>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl className={this.props.classes.formControl}>
            <NumberFormat
              id="topCabinet1P600InletTank1"
              label="Top Cabinet1 P600 Inlet Tank1"
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
              label="Top Cabinet1 P600 Outlet Tank1"
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
              label="Top Cabinet1 P190 Inlet Tank2"
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
              label="Top Cabinet1 P190 Outlet Tank2"
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
              label="Top Cabinet1 P100 Inlet Tank3"
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
        <Grid item xs={12}>
          <FormControl className={this.props.classes.formControl}>
            <NumberFormat
              id="topCabinet2HardenerPressureTankTank3"
              label="Top Cabinet2 Hardener Pressure Tank Tank3"
              customInput={TextField}
              value={this.state.topCabinet2HardenerPressureTankTank3.value}
              fullWidth={true}
              defaultValue={0.0}
              onValueChange={(value) =>
                this.onChange(
                  "topCabinet2HardenerPressureTankTank3",
                  value.floatValue
                )
              }
              onBlur={(e) =>
                this.onBlur("topCabinet2HardenerPressureTankTank3")
              }
              onFocus={(event) => {
                event.target.select();
              }}
              decimalScale={2}
              thousandSeparator={false}
              fixedDecimalScale={true}
              error={!this.state.topCabinet2HardenerPressureTankTank3.valid}
              helperText={
                !this.state.topCabinet2HardenerPressureTankTank3.valid
                  ? this.state.topCabinet2HardenerPressureTankTank3.errorMessage
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
              label="Top Cabinet2 Hardener Tank3"
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
              label="Top Cabinet2 DI Water Check"
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
              label="Top Cabinet2 Cabinet Temperature"
              customInput={TextField}
              value={this.state.topCabinet2CabinetTemperature.value}
              fullWidth={true}
              defaultValue={0.0}
              onValueChange={(value) =>
                this.onChange("topCabinet2CabinetTemperature", value.floatValue)
              }
              onBlur={(e) => this.onBlur("topCabinet2CabinetTemperature")}
              onFocus={(event) => {
                event.target.select();
              }}
              decimalScale={2}
              thousandSeparator={false}
              fixedDecimalScale={true}
              error={!this.state.topCabinet2CabinetTemperature.valid}
              helperText={
                !this.state.topCabinet2CabinetTemperature.valid
                  ? this.state.topCabinet2CabinetTemperature.errorMessage
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
              label="Top Cabinet2 Cabinet Humidity"
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
              label="Top Cabinet2 Paint Test Visocity"
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
              id="topCabinet2PaintTestTemperature"
              label="Top Cabinet2 Paint Test Temperature"
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
              <Grid item>No</Grid>
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
              <Grid item>Yes</Grid>
            </Grid>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl className={this.props.classes.formControl}>
            <NumberFormat
              id="primerCabinet1DiWaterCheck"
              label="Primer Cabinet1 DI Water Check"
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
            <NumberFormat
              id="primerCabinet1BlackPrimerInletTank2"
              label="Primer Cabinet1 Black Primer Inlet Tank2"
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
              label="Primer Cabinet1 Black Primer Outlet Tank2"
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
              id="primerCabinet1PaintTestViscosity"
              label="Primer Cabinet1 Paint Test Viscosity"
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
              id="primerCabinet1R11Temperature"
              label="Primer Cabinet1 R11 Temperature"
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
              label="Primer Cabinet1 R11 Humidity"
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
              id="primerCabinet1HardenerPressureTank3"
              label="Primer Cabinet1 Hardener Pressure Tank3"
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
              label="Primer Cabinet1 Hardener Tank3"
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
        <Grid item xs={12}>
          <FormControl className={this.props.classes.formControl}>
            <FormLabel component="legend">
              Primer Cabinet1 Undon Light Inspection
            </FormLabel>
            <Grid component="label" container alignItems="center" spacing={1}>
              <Grid item>No</Grid>
              <Grid item>
                <Switch
                  checked={this.state.primerCabinet1UndonLightInspection.value}
                  onChange={(event) => {
                    this.onChange(
                      "primerCabinet1UndonLightInspection",
                      event.target.checked
                    );
                    this.onBlur("primerCabinet1UndonLightInspection");
                  }}
                  name="primerCabinet1UndonLightInspection"
                />
              </Grid>
              <Grid item>Yes</Grid>
            </Grid>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl className={this.props.classes.formControl}>
            <NumberFormat
              id="primerCabinet1PaintTestTemperature"
              label="Primer Cabinet1 Paint Test Temperature"
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
              id="primerCabinet1WhitePrimerInletTank1"
              label="Primer Cabinet1 White Primer Inlet Tank1"
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
              label="Primer Cabinet1 White Primer Outlet Tank1"
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
            <FormLabel component="legend">
              Primer Cabinet2 Undon Light Inspection
            </FormLabel>
            <Grid component="label" container alignItems="center" spacing={1}>
              <Grid item>No</Grid>
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
              <Grid item>Yes</Grid>
            </Grid>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl className={this.props.classes.formControl}>
            <NumberFormat
              id="primerCabinet2R12Temperature"
              label="Primer Cabinet2 R12 Temperature"
              customInput={TextField}
              value={this.state.primerCabinet2R12Temperature.value}
              fullWidth={true}
              defaultValue={0.0}
              onValueChange={(value) =>
                this.onChange("primerCabinet2R12Temperature", value.floatValue)
              }
              onBlur={(e) => this.onBlur("primerCabinet2R12Temperature")}
              onFocus={(event) => {
                event.target.select();
              }}
              decimalScale={2}
              thousandSeparator={false}
              fixedDecimalScale={true}
              error={!this.state.primerCabinet2R12Temperature.valid}
              helperText={
                !this.state.primerCabinet2R12Temperature.valid
                  ? this.state.primerCabinet2R12Temperature.errorMessage
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
              label="Primer Cabinet2 Hardener Tank3"
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
              id="primerCabinet2PaintTestTemperature"
              label="Primer Cabinet2 Paint Test Temperature"
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
              id="primerCabinet2BlackPrimerInletTank2"
              label="Primer Cabinet2 Black Primer Inlet Tank2"
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
              label="Primer Cabinet2 Black Primer Outlet Tank2"
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
              id="primerCabinet2PaintTestViscosity"
              label="Primer Cabinet2 Paint Test Viscosity"
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
              id="primerCabinet2WhitePrimerInletTank1"
              label="Primer Cabinet2 White Primer Inlet Tank1"
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
              label="Primer Cabinet2 White Primer Outlet Tank1"
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
              id="primerCabinet2DiWaterCheck"
              label="Primer Cabinet2 DI Water Check"
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
            <NumberFormat
              id="primerCabinet2HardenerPressureTank3"
              label="Primer Cabinet2 Hardener Pressure Tank3"
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
        <Grid item xs={12}>
          <FormControl className={this.props.classes.formControl}>
            <NumberFormat
              id="primerCabinet2R12Humidity"
              label="Primer Cabinet2 R12 Humidity"
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
      </form>
    );
  }
}

export default withStyles(useStyles, { withTheme: true })(
  PaintCabinetAddOrEdit
);
