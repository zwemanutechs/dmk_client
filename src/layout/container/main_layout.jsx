import React, {Component} from 'react';
import clsx from 'clsx';
import { connect } from "react-redux";
import { openMenu, closeMenu } from "../actions/main-menu";
import {withStyles, useTheme} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import compose from 'recompose/compose'
import {withRouter} from "react-router";
import {Link} from "react-router-dom";
import SimpleBreadCrumbs from "../../shared/breadcum/breadcrumbs"
import CompanyLogo from "../../assets/images/logo/dormakaba_transparent.png"
import WavesIcon from '@material-ui/icons/Waves';
import TimerIcon from '@material-ui/icons/Timer';

const drawerWidth = 240;

const useStyles = theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        background: 'lightslategray'
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(2),
        marginTop: 50,
    },
    typo: {
        flexGrow: 1,
        align: "center",
        [theme.breakpoints.up("sm")]: {},
        paddingTop: 5,
        paddingBottom: 20,
        //marginLeft: -48,
    },
});

class MainLayout extends Component {

    constructor(props) {
        super(props);

    }

    handelMenuOpen = (value) => {
        return value ? this.props.openMenu(true) : this.props.closeMenu(false);
    };

    render() {
        return (
            <div className={this.props.classes.root}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    className={clsx(this.props.classes.appBar, {
                        [this.props.classes.appBarShift]: this.props.Open,
                    })}
                >
                    <Toolbar>
                        <IconButton
                            color="default"
                            aria-label="open drawer"
                            onClick={e => this.handelMenuOpen(true)}
                            edge="start"
                            className={clsx(this.props.classes.menuButton, {
                                [this.props.classes.hide]: this.props.Open,
                            })}
                        >
                            <MenuIcon />
                        </IconButton>
                        <img src={CompanyLogo} className={clsx({[this.props.classes.hide]: this.props.Open})} alt="Kitten" height="40" width="170" />
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    className={clsx(this.props.classes.drawer, {
                        [this.props.classes.drawerOpen]: this.props.Open,
                        [this.props.classes.drawerClose]: !this.props.Open,
                    })}
                    classes={{
                        paper: clsx({
                            [this.props.classes.drawerOpen]: this.props.Open,
                            [this.props.classes.drawerClose]: !this.props.Open,
                        }),
                    }}
                >
                    <div className={this.props.classes.toolbar}>
                        <IconButton onClick={e => this.handelMenuOpen(false)}>
                            {this.props.theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                        </IconButton>
                        <img src={CompanyLogo} className={clsx({[this.props.classes.hide]: !this.props.Open})} alt="Kitten" height="40" width="170" />
                    </div>
                    <Divider />
                    <List component="div" disablePadding dense={true} >
                        <ListItem key={1} button component={Link} to="/Home" style={{minHeight: 45,}}>
                            <ListItemIcon><HomeIcon /> </ListItemIcon>
                            <ListItemText primary={"Home"} />
                        </ListItem>
                        <Divider/>
                        <ListItem key={2} button component={Link} to="/RinseDI" style={{minHeight: 45,}}>
                            <ListItemIcon><WavesIcon /> </ListItemIcon>
                            <ListItemText primary={"Rinse DI"} />
                        </ListItem>
                        <Divider/>
                        <ListItem key={3} button component={Link} to="/RinseOne" style={{minHeight: 45,}}>
                            <ListItemIcon><TimerIcon /> </ListItemIcon>
                            <ListItemText primary={"Rinse One"} />
                        </ListItem>
                        <Divider/>
                    </List>
                </Drawer>
                <main className={this.props.classes.content}>
                    <div className={this.props.classes.typo} align="left">
                        <SimpleBreadCrumbs />
                    </div>
                    {this.props.children}
                </main>
            </div>
        );
    }

}

const mapStateToProps = state => ({
    Open: state.itemActions.Open
});

export default compose(
    withStyles(useStyles, { withTheme: true }),
    connect(
        mapStateToProps,
        { openMenu, closeMenu },
    ),
)(withRouter(MainLayout));
