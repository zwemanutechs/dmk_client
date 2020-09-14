import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import DialogContent from "@material-ui/core/DialogContent";


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

function RinseDIAddOrEdit(props) {
    const classes = useStyles();
    return (
        <form className={classes.form} noValidate>
            <FormControl className={classes.formControl}>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="PH Meter"
                    value={props.dataSet.phMeter}
                    onChange={ e => props.handelChange('phMeter', e.target.value)}
                    fullWidth
                />
            </FormControl>
            <FormControl className={classes.formControl}>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Water Guage"
                    value={props.dataSet.waterGuage}
                    onChange={ e => props.handelChange('waterGuage', e.target.value)}
                    fullWidth
                />
            </FormControl>
        </form>
    );
}

export default RinseDIAddOrEdit;
