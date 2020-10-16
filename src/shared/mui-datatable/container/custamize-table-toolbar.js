import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";
import { withStyles } from "@material-ui/core/styles";
import { openDialog, closeDialog} from '../../mat-diaglog/actions/maxDialog-action';
import {connect} from "react-redux";
import compose from "recompose/compose";

const defaultToolbarStyles = {
    iconButton: {
    },
};

class CustomTableToolbar extends React.Component {

    constructor(props) {
        super(props);
    }


    handleClick = () => {
        return this.props.openDialog(true, 'ADD');
    };

    render() {
        const { classes } = this.props;

        return (
            <React.Fragment>
                <Tooltip title={"add"}>
                    <IconButton className={classes.iconButton} onClick={this.handleClick}>
                        <AddIcon />
                    </IconButton>
                </Tooltip>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    digOpen: state.diagItemActions.digOpen,
    title: state.diagItemActions.title
});

export default compose(
    withStyles(defaultToolbarStyles, { name: "CustomTableToolbar" }),
    connect(
        mapStateToProps,
        { openDialog, closeDialog },
    ),
)(CustomTableToolbar);
