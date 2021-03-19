import React, { Component } from "react";
// import React, {useState, useEffect, Component, PureComponent} from "react";
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
    width: "1000px",
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

class NotificationAddOrEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: { valid: true, errorMessage: "", value: this.props.dataSet.message },
      actualValue: {
        valid: true,
        errorMessage: "",
        value: this.props.dataSet.actualValue,
      },
      acknowledge: {
        valid: true,
        errorMessage: "",
        value: this.props.dataSet.acknowledge,
      }
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
        {/** Meter ***/}
        <Grid item xs={12}>
          <FormControl className={this.props.classes.formControl}>        
            <FormLabel component="legend">Message</FormLabel>
            <TextField
              id="message"
              label=""
              value={this.state.message.value}
              fullWidth={true}
              disabled={true}
            />
          </FormControl>
        </Grid>
        {/** End PH Meter **/}
        {/** Actual Value ***/}
        <Grid item xs={12}>
          <FormControl className={this.props.classes.formControl}>        
            <FormLabel component="legend">Actual Value</FormLabel>
            <NumberFormat
              id="actualValue"
              label=""
              customInput={TextField}
              value={this.state.actualValue.value}
              disabled={true}
            />
          </FormControl>
        </Grid>
        {/** End Actual Value **/}
        {/** Acknowledge ***/}
        <Grid item xs={12}>
          <FormControl className={this.props.classes.formControl}>            
            <FormLabel component="legend">Acknowledge</FormLabel>
              <Grid component="label" container alignItems="center" spacing={1}>
                <Grid item>No</Grid>
                <Grid item>
                  <Switch
                    checked={this.state.acknowledge.value}
                    onChange={(event) => {
                      this.onChange(
                        "acknowledge",
                        event.target.checked
                      );
                      this.onBlur("acknowledge");
                    }}
                    name="acknowledge"
                  />
                </Grid>
                <Grid item>Yes</Grid>
              </Grid>
          </FormControl>
        </Grid>
        {/** End Acknowledge **/}
      </form>
    );
  }
}

export default withStyles(useStyles, { withTheme: true })(NotificationAddOrEdit);
