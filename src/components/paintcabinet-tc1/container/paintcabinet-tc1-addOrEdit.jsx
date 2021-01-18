import React, { useEffect, useState } from "react";
import {withStyles} from "@material-ui/core/styles";

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

class PaintCabinetTopCabinet1AddOrEdit extends React.PureComponent {

}
export default withStyles(useStyles, { withTheme: true })(PaintCabinetTopCabinet1AddOrEdit)
