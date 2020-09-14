import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from "@material-ui/core/Snackbar";
import {openSnack, closeSnack}  from '../actions/snackbar-actions';
import {connect} from "react-redux";

function MuiSnackBar(props) {
    console.log(props);
    const handelSnackClose = () =>{
        return props.closeSnack(false);
    };

    return(
        <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            open={props.snackOpen}
            onClose={handelSnackClose}
            message={props.message}
            className={props.snackType}
            key={'h1'}
        />
    );
}
const mapStateToProps = state => ({
    snackOpen: state.snackItemActions.snackOpen,
    message: state.snackItemActions.message,
    snackType: state.snackItemActions.snackType,
});

export default connect(
    mapStateToProps,
    {openSnack, closeSnack}
)(MuiSnackBar)
