import React from "react";
// import { makeStyles } from '@material-ui/core/styles';
import { CircleLoading } from "react-loadingg";
import { openSpinner, closeSpinner } from "../actions/spinner-actions";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";
function Spinner(props) {
  return (
    <Grid
      item
      style={{ display: props.spinnerOpen ? "block" : "none" }}
      className={"loading"}
    >
      <CircleLoading color="#88fced" />
    </Grid>
  );
}
const mapStateToProps = (state) => ({
  spinnerOpen: state.spinnerItemActions.spinnerOpen,
});

export default connect(mapStateToProps, { openSpinner, closeSpinner })(Spinner);
