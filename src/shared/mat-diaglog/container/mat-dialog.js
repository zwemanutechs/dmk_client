import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import { openDialog, closeDialog} from '../actions/maxDialog-action'
import {connect} from "react-redux";

const useStyles = makeStyles((theme) => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        width: 'fit-content',
    },
    formControl: {
        marginTop: theme.spacing(2),
        minWidth: 120,
    },
    formControlLabel: {
        marginTop: theme.spacing(1),
    },
}));

function MaxWidthDialog(props) {
    const classes = useStyles();

    const handelClose = () =>{
        return props.closeDialog(false);
    };

    return (
        <Dialog
            fullWidth={false}
            maxWidth={'md'}
            open={props.digOpen}
            onClose={handelClose}
            aria-labelledby="max-width-dialog-title"
        >
            <DialogTitle id="max-width-dialog-title">Add</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <form className={classes.form} noValidate>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="max-width">PH Meter</InputLabel>
                        </FormControl>
                    </form>
                </DialogContentText>
            </DialogContent>
        </Dialog>
    )
}
const mapStateToProps = state => ({
    digOpen: state.diagItemActions.digOpen
});

export default connect(
    mapStateToProps,
    {openDialog, closeDialog}
)(MaxWidthDialog)
