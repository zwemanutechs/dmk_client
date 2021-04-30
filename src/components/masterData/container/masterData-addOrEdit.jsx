import React, { Component } from "react";
// import React, {useState, useEffect, Component, PureComponent} from "react";
import Grid from "@material-ui/core/Grid";
import Switch from "@material-ui/core/Switch";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import TextField from "@material-ui/core/TextField";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
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

class MasterDataAddOrEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: {
        valid: true,
        errorMessage: "",
        value: this.props.dataSet.number,
      },
      description: {
        valid: true,
        errorMessage: "",
        value: this.props.dataSet.description,
      },
      type: {
        valid: true,
        errorMessage: "",
        value: this.props.dataSet.type,
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
        {/** Number ***/}
        <Grid item xs={12}>
          <FormControl className={this.props.classes.formControl}>
            <FormLabel component="legend">
              Code
            </FormLabel>
            <TextField
              id="number"
              label=""
              value={this.state.number.value}
              fullWidth={true}
              defaultValue={0.0}
              onChange={(event) =>
                this.onChange("number", event.target.value)
              }
              onBlur={(e) => this.onBlur("number")}
              onFocus={(event) => {
                event.target.select();
              }}
              error={!this.state.number.valid}
              helperText={
                !this.state.number.valid
                  ? this.state.number.errorMessage
                  : ""
              }
              disabled={this.props.onFormSubmit}
            />
          </FormControl>
        </Grid>
        {/** End Number **/}
        {/** Description ***/}
        <Grid item xs={12}>
          <FormControl className={this.props.classes.formControl}>
            <FormLabel component="legend">
              Description
            </FormLabel>
            <TextField
              id="description"
              label=""
              value={this.state.description.value}
              fullWidth={true}
              defaultValue={0.0}
              onChange={(event) =>
                this.onChange("description", event.target.value)
              }
              onBlur={(e) => this.onBlur("description")}
              onFocus={(event) => {
                event.target.select();
              }}
              error={!this.state.description.valid}
              helperText={
                !this.state.description.valid
                  ? this.state.description.errorMessage
                  : ""
              }
              disabled={this.props.onFormSubmit}
            />
          </FormControl>
        </Grid>
        {/** End Description **/}
        {/** Type ***/}
        <Grid item xs={12}>
          <FormControl className={this.props.classes.formControl}>
            <FormLabel component="legend">
              Type
            </FormLabel>
            <Select
              labelId=""
              id="type"
              value={this.state.type.value}
              onChange={(event) =>
                this.onChange("type", event.target.value)
              }
              onBlur={(e) => this.onBlur("type")}
              error={!this.state.type.valid}
              helperText={
                !this.state.type.valid
                  ? this.state.type.errorMessage
                  : ""
              }
              disabled={this.props.onFormSubmit}
            >
              <MenuItem value={'Color Code'}>Color Code</MenuItem>
              <MenuItem value={'Program'}>Program</MenuItem>
              <MenuItem value={'Sales Articel'}>Sales Articel</MenuItem>
            </Select> 
            {
                !this.state.type.valid
                  ? <FormHelperText className={this.props.classes.formControl} error>{this.state.type.errorMessage}</FormHelperText>  
                  : ""
            }                     
          </FormControl>
        </Grid>
        {/** End Type **/}
      </form>
    );
  }
}

export default withStyles(useStyles, { withTheme: true })(MasterDataAddOrEdit);
