import React, { Component } from "react";
// import React, {useState, useEffect, Component, PureComponent} from "react";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import NumberFormat from "react-number-format";
import FormLabel from "@material-ui/core/FormLabel";
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

class RinseThreeAddOrEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ph: { valid: true, errorMessage: "", value: this.props.dataSet.ph },
      waterSupplyFromDiWaterTank: {
        valid: true,
        errorMessage: "",
        value: this.props.dataSet.waterSupplyFromDiWaterTank,
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
            <FormLabel component="legend">
              Ph Meter
            </FormLabel>
            <NumberFormat
              id="phmeter"
              label=""
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
        {/** Tank-3 Water Supply ***/}
        <Grid item xs={12}>
          <FormControl className={this.props.classes.formControl}>
            <FormLabel component="legend">
              DI Tank Water Supply, L/hr
            </FormLabel>
            <NumberFormat
              id="waterSupplyFromDiWaterTank"
              label=""
              customInput={TextField}
              value={this.state.waterSupplyFromDiWaterTank.value}
              defaultValue={0.0}
              onValueChange={(value) =>
                this.onChange("waterSupplyFromDiWaterTank", value.floatValue)
              }
              onBlur={(e) => this.onBlur("waterSupplyFromDiWaterTank")}
              onFocus={(event) => {
                event.target.select();
              }}
              decimalScale={2}
              thousandSeparator={false}
              fixedDecimalScale={true}
              error={!this.state.waterSupplyFromDiWaterTank.valid}
              helperText={
                !this.state.waterSupplyFromDiWaterTank.valid
                  ? this.state.waterSupplyFromDiWaterTank.errorMessage
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

export default withStyles(useStyles, { withTheme: true })(RinseThreeAddOrEdit);
