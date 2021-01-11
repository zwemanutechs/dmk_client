import React, {useEffect} from "react";
import PropTypes from "prop-types";
import { makeStyles, createStyles } from "@material-ui/core/styles";
// import { SvgIconProps } from '@material-ui/core/SvgIcon'

import List from "@material-ui/core/List";

import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Collapse from "@material-ui/core/Collapse";
import IconWrap from "@material-ui/core/Icon";

import IconExpandLess from "@material-ui/icons/ExpandLess";
import IconExpandMore from "@material-ui/icons/ExpandMore";

import AppMenuItemComponent from "./AppMenuItemComponent";

const AppMenuItem = (props) => {
    const { name, link, Icon, iconImg, items = [] } = props;
    const classes = useStyles();
    const isExpandable = items && items.length > 0;
    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        if(!props.isOpenMenu){
            setOpen(false);
        }
    }, [props.isOpenMenu]);

    function handleClick() {
        setOpen(!open);
        props.onMenuOpen(true);
    }

    const MenuItemRoot = (
        <AppMenuItemComponent
            className={classes.menuItem}
            link={link}
            onClick={handleClick}
        >
            {/* Display an icon if any */}
            {(Icon || iconImg) && (
                <ListItemIcon>
                    {iconImg ? (
                        <IconWrap>
                            <img alt="img" src={iconImg} width="25" height="25" />
                        </IconWrap>
                    ) : (
                        <Icon />
                    )}
                </ListItemIcon>
            )}
            <ListItemText primary={name} inset={!(Icon || iconImg)} />
            {/* Display the expand menu if the item has children */}
            {isExpandable && !open && <IconExpandMore />}
            {isExpandable && open && <IconExpandLess />}
        </AppMenuItemComponent>
    );

    const MenuItemChildren = isExpandable ? (
        <Collapse in={open} timeout="auto" unmountOnExit>
            <Divider />
            <List component="div" disablePadding>
                {items.map((item, index) => (
                    <AppMenuItem {...item} key={index} />
                ))}
            </List>
        </Collapse>
    ) : null;

    return (
        <>
            {MenuItemRoot}
            {MenuItemChildren}
        </>
    );
};

const useStyles = makeStyles((theme) =>
    createStyles({
        menuItem: {
            "&.active": {
                background: "rgba(0, 0, 0, 0.08)",
                "& .MuiListItemIcon-root": {
                    color: "#0F3790",
                },
            },
        },
        menuItemIcon: {
            color: "#97c05c",
        },
    })
);

export default AppMenuItem;
