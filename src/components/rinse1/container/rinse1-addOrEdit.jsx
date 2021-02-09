import React, { Component } from "react";
// import React, {useState, useEffect, Component, PureComponent} from "react";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import NumberFormat from "react-number-format";
import { withStyles } from "@material-ui/core/styles";

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

class RinseOneAddOrEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ph: { valid: true, errorMessage: "", value: this.props.dataSet.ph },
      waterOverflowToWasteWaterTank1: {
        valid: true,
        errorMessage: "",
        value: this.props.dataSet.waterOverflowToWasteWaterTank1,
      },
      waterSupplyFromTank3: {
        valid: true,
        errorMessage: "",
        value: this.props.dataSet.waterSupplyFromTank3,
      },
      waterSupplyFromTank6: {
        valid: true,
        errorMessage: "",
        value: this.props.dataSet.waterSupplyFromTank6,
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
        {/** PH Meter ***/}
        <Grid item xs={12}>
          <FormControl className={this.props.classes.formControl}>
            <NumberFormat
              id="phmeter"
              label="PH"
              customInput={TextField}
              value={this.state.ph.value}
              fullWidth={true}
              defaultValue={0.0}
              onValueChange={(value) => this.onChange("ph", value.floatValue)}
              onBlur={(e) => this.onBlur("ph")}
              onFocus={(event) => {
                event.target.select();
              }}
              decimalScale={2}
              thousandSeparator={false}
              fixedDecimalScale={true}
              error={!this.state.ph.valid}
              helperText={
                !this.state.ph.valid ? this.state.ph.errorMessage : ""
              }
              disabled={this.props.onFormSubmit}
            />
          </FormControl>
        </Grid>
        {/** End PH Meter **/}
        {/** Water Overflow Waste Water From Tank 1 ***/}
        <Grid item xs={12}>
          <FormControl className={this.props.classes.formControl}>
            <NumberFormat
              id="waterOverflowToWasteWaterTank1"
              label="Tank-1 Waste Water, L/hr"
              customInput={TextField}
              value={this.state.waterOverflowToWasteWaterTank1.value}
              defaultValue={0.0}
              onValueChange={(value) =>
                this.onChange(
                  "waterOverflowToWasteWaterTank1",
                  value.floatValue
                )
              }
              onBlur={(e) => this.onBlur("waterOverflowToWasteWaterTank1")}
              onFocus={(event) => {
                event.target.select();
              }}
              decimalScale={2}
              thousandSeparator={false}
              fixedDecimalScale={true}
              error={!this.state.waterOverflowToWasteWaterTank1.valid}
              helperText={
                !this.state.waterOverflowToWasteWaterTank1.valid
                  ? this.state.waterOverflowToWasteWaterTank1.errorMessage
                  : ""
              }
              disabled={this.props.onFormSubmit}
            />
          </FormControl>
        </Grid>
        {/** End Water Overflow Waste Water From Tank 1 **/}
        {/** Tank-6 Water Supply ***/}
        <Grid item xs={12}>
          <FormControl className={this.props.classes.formControl}>
            <NumberFormat
                id="waterSupplyFromTank6"
                label="Tank-6 Water Supply, L/hr"
                customInput={TextField}
                value={this.state.waterSupplyFromTank6.value}
                defaultValue={0.0}
                onValueChange={(value) =>
                    this.onChange("waterSupplyFromTank6", value.floatValue)
                }
                onBlur={(e) => this.onBlur("waterSupplyFromTank6")}
                onFocus={(event) => {
                  event.target.select();
                }}
                decimalScale={2}
                thousandSeparator={false}
                fixedDecimalScale={true}
                error={!this.state.waterSupplyFromTank6.valid}
                helperText={
                  !this.state.waterSupplyFromTank6.valid
                      ? this.state.waterSupplyFromTank6.errorMessage
                      : ""
                }
                disabled={this.props.onFormSubmit}
            />
          </FormControl>
        </Grid>
        {/** End Tank-6 Water Supply **/}
        {/** Tank-3 Water Supply ***/}
        <Grid item xs={12}>
          <FormControl className={this.props.classes.formControl}>
            <NumberFormat
              id="waterSupplyFromTank3"
              label="Tank-3 Water Supply, L/hr"
              customInput={TextField}
              value={this.state.waterSupplyFromTank3.value}
              defaultValue={0.0}
              onValueChange={(value) =>
                this.onChange("waterSupplyFromTank3", value.floatValue)
              }
              onBlur={(e) => this.onBlur("waterSupplyFromTank3")}
              onFocus={(event) => {
                event.target.select();
              }}
              decimalScale={2}
              thousandSeparator={false}
              fixedDecimalScale={true}
              error={!this.state.waterSupplyFromTank3.valid}
              helperText={
                !this.state.waterSupplyFromTank3.valid
                  ? this.state.waterSupplyFromTank3.errorMessage
                  : ""
              }
              disabled={this.props.onFormSubmit}
            />
          </FormControl>
        </Grid>
        {/** End Tank-3 Water Supply **/}
      </form>
    );
  }
}

export default withStyles(useStyles, { withTheme: true })(RinseOneAddOrEdit);
