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
import Degreasing from '../../assets/images/svg/degreasing.svg';
import Rinse1 from '../../assets/images/svg/rinse_1.svg';
import Rinse2 from '../../assets/images/svg/rinse_2.svg'
import Rinse3 from '../../assets/images/svg/rinse_3.svg'
import RinseDIIcon from '../../assets/images/svg/rinse_di.svg'
import Oven from '../../assets/images/svg/oven.svg'
import PaintBooth from '../../assets/images/svg/painting_booth.svg'
import Evaporator from '../../assets/images/svg/evaporator.svg'
import Icon from "@material-ui/core/Icon";
import AutorenewOutlinedIcon from '@material-ui/icons/AutorenewOutlined';
import FilterTiltShiftOutlinedIcon from '@material-ui/icons/FilterTiltShiftOutlined';
import KitchenOutlinedIcon from '@material-ui/icons/KitchenOutlined';
import Hidden from "@material-ui/core/Hidden";

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
        [theme.breakpoints.between('md', 'xl')]:{
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
    },
    menuButton: {
        [theme.breakpoints.between('md', 'xl')]:{
            marginRight: 36,
        },
        [theme.breakpoints.between('xs', 'sm')]:{
            marginRight: 5,
        }
    },
    menuButtonHide: {
        [theme.breakpoints.between('md', 'xl')]:{
            display: 'none',
        },
        [theme.breakpoints.between('xs', 'sm')]:{
            display: 'inline',
        }
    },
    logoHide:{
        [theme.breakpoints.between('md', 'xl')]:{
            display: 'none',
        },
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
        [theme.breakpoints.between('md', 'xl')]:{
            width: drawerWidth,
        },
        [theme.breakpoints.between('xs', 'sm')]:{
            width: 240,
        },
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        [theme.breakpoints.between('md', 'xl')]:{
            width: theme.spacing(7) + 1,
        },
        [theme.breakpoints.between('xs', 'sm')]:{
            width: 0,
        },
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),

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

    onMenuSelect = (to, formId) => {
        localStorage.setItem('FormID', formId);
        this.props.history.push(to);
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
                            onClick={e => this.handelMenuOpen(!this.props.Open)}
                            edge="start"
                            className={clsx(this.props.classes.menuButton, {
                                [this.props.classes.menuButtonHide]: this.props.Open,
                            })}
                        >
                            <MenuIcon />
                        </IconButton>
                        <img src={CompanyLogo} className={clsx({[this.props.classes.logoHide]: this.props.Open})} alt="Kitten" height="40" width="170" />
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
                        <Hidden mdDown>
                            <img src={CompanyLogo} className={clsx({[this.props.classes.hide]: !this.props.Open})} alt="Kitten" height="40" width="170" />
                        </Hidden>
                    </div>
                    <Divider />
                    <List component="div" disablePadding dense={true} >
                        <ListItem key={1} button component={Link} to="/Home" style={{minHeight: 47,}}>
                            <ListItemIcon><HomeIcon /> </ListItemIcon>
                            <ListItemText primary={"Home"} />
                        </ListItem>
                        <Divider/>
                        <ListItem key={2} button component={Link} to="/RinseDI" style={{minHeight: 47}}>
                            <ListItemIcon><Icon><img src={RinseDIIcon} width="25" height="25"/></Icon></ListItemIcon>
                            <ListItemText primary={"Rinse DI"} />
                        </ListItem>
                        <Divider/>
                        <ListItem key={3} button component={Link} to="/RinseOne" style={{minHeight: 47}}>
                            <ListItemIcon><Icon><img src={Rinse1} width="25" height="25"/></Icon></ListItemIcon>
                            <ListItemText primary={"Rinse 1"} />
                        </ListItem>
                        <Divider/>
                        <ListItem key={4} button component={Link} to="/RinseTwo" style={{minHeight: 47}}>
                            <ListItemIcon><Icon><img src={Rinse2} width="25" height="25"/></Icon></ListItemIcon>
                            <ListItemText primary={"Rinse Two"} />
                        </ListItem>
                        <Divider/>
                        <ListItem key={5} button component={Link} to="/RinseThree" style={{minHeight: 47,}}>
                            <ListItemIcon><Icon><img src={Rinse3} width="25" height="25"/></Icon></ListItemIcon>
                            <ListItemText primary={"Rinse Three"} />
                        </ListItem>
                        <Divider/>
                        <ListItem key={6} button component={Link} to="/Degreasing" style={{minHeight: 47,}}>
                            <ListItemIcon><Icon><img src={Degreasing} width="25" height="25"/></Icon></ListItemIcon>
                            <ListItemText primary={"Degreasing"} />
                        </ListItem>
                        <Divider/>
                        <ListItem key={7} button component={Link} to="/PaintBooth" style={{minHeight: 47,}}>
                            <ListItemIcon><Icon><img src={PaintBooth} width="25" height="25"/></Icon></ListItemIcon>
                            <ListItemText primary={"Paint Booth"} />
                        </ListItem>
                        {/*<Divider/>*/}
                        {/*<ListItem key={4} button component={Link} to="/PaintBooth" style={{minHeight: 47,}}>*/}
                        {/*    <ListItemIcon><Icon><img src={Oven} width="25" height="25"/></Icon></ListItemIcon>*/}
                        {/*    <ListItemText primary={"Oven"} />*/}
                        {/*</ListItem>*/}
                        <Divider/>
                        <ListItem key={8} button component={Link} to="/NeuEvaporator" style={{minHeight: 47,}}>
                            <ListItemIcon><Icon><img src={Evaporator} width="25" height="25"/></Icon></ListItemIcon>
                            <ListItemText primary={"Neu & Evaporator"} />
                        </ListItem>
                        <Divider/>
                        <ListItem key={9} button component={Link} to="/Conversion" style={{minHeight: 47,}}>
                            <ListItemIcon><AutorenewOutlinedIcon/></ListItemIcon>
                            <ListItemText primary={"Conversion"} />
                        </ListItem>
                        <Divider/>
                        <ListItem key={10} button component={Link} to="/Passivation" style={{minHeight: 47,}}>
                            <ListItemIcon><FilterTiltShiftOutlinedIcon/></ListItemIcon>
                            <ListItemText primary={"Passivation"} />
                        </ListItem>
                        <Divider/>
                        <ListItem key={11} button component={Link} to="/PaintCabinet" style={{minHeight: 47,}}>
                            <ListItemIcon><KitchenOutlinedIcon/></ListItemIcon>
                            <ListItemText primary={"Paint Cabinet"} />
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
