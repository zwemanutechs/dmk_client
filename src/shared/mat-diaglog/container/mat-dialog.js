import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { openDialog, closeDialog} from '../actions/maxDialog-action'
import {connect} from "react-redux";
import {useMediaQuery, useTheme} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        width: '100%',
    },
    formControl: {
        marginTop: theme.spacing(2),
        width: '100%',
        margin: 4
    },
    formControlLabel: {
        marginTop: theme.spacing(1),
    },
    paper: {
        minWidth: "500px",
        [theme.breakpoints.up('md')]: {
            position: 'absolute',
            left: '30%',
            right: '30%',
            top: 80
        },
    },
}));

function MaxWidthDialog(props) {
    const classes = useStyles();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    return (
        <div style={{minWidth: 400}}>
            <Dialog
                fullScreen={fullScreen}
                maxWidth = {'md'}
                open={props.digOpen}
                onClose={props.formClose}
                classes={{paper: classes.paper}}
                aria-labelledby="max-width-dialog-title"
            >
                <DialogTitle id="max-width-dialog-title" onClose={props.formClose}>{`${props.title} ${props.contentTitle}`}</DialogTitle>
                <DialogContent>
                    {props.content}
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={props.formClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={props.formSubmit} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
const mapStateToProps = state => ({
    digOpen: state.diagItemActions.digOpen,
    title: state.diagItemActions.title
});

export default connect(
    mapStateToProps,
    {openDialog, closeDialog}
)(MaxWidthDialog)
