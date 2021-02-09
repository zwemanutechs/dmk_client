import React, { Component } from "react";
import clsx from "clsx";
import { connect } from "react-redux";
import { openMenu, closeMenu, getMenu } from "../actions/main-menu";
// import {withStyles, useTheme} from '@material-ui/core/styles';
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import HomeIcon from "@material-ui/icons/Home";
import compose from "recompose/compose";
import { Link, withRouter } from "react-router-dom";
import SimpleBreadCrumbs from "../../shared/breadcum/breadcrumbs";
import CompanyLogo from "../../assets/images/logo/dormakaba_transparent.png";
import MntLogo from "../../assets/images/logo/manutechs_logo.png";
import Degreasing from "../../assets/images/svg/degreasing.svg";
import RinseDIIcon from "../../assets/images/svg/rinse_di.svg";
import PaintBooth from "../../assets/images/svg/painting_booth.svg";
import KitchenOutlinedIcon from "@material-ui/icons/KitchenOutlined";
import Hidden from "@material-ui/core/Hidden";
import IconDashboard from "@material-ui/icons/Dashboard";
import NotificationsActiveOutlinedIcon from '@material-ui/icons/NotificationsActiveOutlined';
import AppMenuItem from "./AppMenuItem";

const useStyles = (theme) => ({
  root: {
    display: "flex",
  },
  appMenu: {
    width: "100%",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    background: "lightslategray",
    top: 40
  },
  appBarShift: {
    [theme.breakpoints.between("md", "xl")]: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    top: 40
  },
  menuButton: {
    [theme.breakpoints.between("md", "xl")]: {
      marginRight: 36,
    },
    [theme.breakpoints.between("xs", "sm")]: {
      marginRight: 5,
    },
  },
  menuButtonHide: {
    [theme.breakpoints.between("md", "xl")]: {
      display: "none",
    },
    [theme.breakpoints.between("xs", "sm")]: {
      display: "inline",
    },
  },
  logoHide: {
    [theme.breakpoints.between("md", "xl")]: {
      display: "none",
    },
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    top:40
  },
  drawerOpen: {
    [theme.breakpoints.between("md", "xl")]: {
      width: drawerWidth,
    },
    [theme.breakpoints.between("xs", "sm")]: {
      position: "Fixed",
      zIndex: 999,
    },
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    top: 40
  },
  drawerClose: {
    [theme.breakpoints.between("md", "xl")]: {
      width: theme.spacing(7) + 1,
    },
    [theme.breakpoints.between("xs", "sm")]: {
      display: "none",
    },
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    top: 40
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
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

const drawerWidth = 240;

const MENU_ITEMS = [
  {
    Icon: HomeIcon,
    name: "Power Wash Dash",
    link: "/Home",
  },
  {
    Icon: IconDashboard,
    name: "Overview-Paint Dash",
    link: "/Overview",
  },
  {
    Icon: NotificationsActiveOutlinedIcon,
    name: "Notification",
    link: "/Notification",
  },
  {
    iconImg: RinseDIIcon,
    name: "Power Wash",
    items: [
      {
        name: "Degreasing (T1)",
        link: "/Degreasing",
      },
      {
        name: "Rinse 1 (T2)",
        link: "/RinseOne",
      },
      {
        name: "Rinse 2 (T3)",
        link: "/RinseTwo",
      },
      {
        name: "Rinse 3 (T4)",
        link: "/RinseThree",
      },
      {
        name: "Di Rinse (T5)",
        link: "/RinseDI",
      },
      {
        name: "Passivation (T6)",
        link: "/Passivation",
      },
    ],
  },
  {
    iconImg: Degreasing,
    name: "Water Treatment",
    items: [
      {
        name: "Neu & Evap (T03-T09)",
        link: "/NeuEvaporator",
      },
      {
        name: "Distilled Water (T05)",
        link: "/Conversion",
      },
      // {
      //   name: "Demineralization",
      //   link: "/Conversion",
      // },
      // {
      //   name: "DI Water (Tank 07)",
      //   link: "/Conversion",
      // },
      // {
      //   name: "Sulphuric Acid",
      //   link: "/Conversion",
      // },
      // {
      //   name: "Sodium Hydroxide",
      //   link: "/Conversion",
      // },
    ],
  },
  {
    iconImg: PaintBooth,
    name: "Paint Booth",
    items: [
      {
        name: "Paint Booth",
        link: "/PaintBooth",
      },
      // {
      //   name: "ESTA Booth 2",
      //   link: "/PaintBooth",
      // },
      // {
      //   name: "Touch Up Booth",
      //   link: "/PaintBooth",
      // },
    ],
  },
  {
    Icon: KitchenOutlinedIcon,
    name: "Paint Cabinet",
    items: [
      {
        name: "Primer Cabinet 1",
        link: "/PrimerCabinetOne",
      },
      {
        name: "Primer Cabinet 2",
        link: "/PrimerCabinetTwo",
      },
      {
        name: "Topcoat Cabinet 1",
        link: "/TopCabinetOne",
      },
      {
        name: "Topcoat Cabinet 2",
        link: "/TopCabinetTwo",
      },
    ],
  },
  // {
  //   iconImg: RinseDIIcon,
  //   name: "Rinse DI",
  //   link: "/RinseDI",
  // },
  // {
  //   iconImg: Rinse1,
  //   name: "Rinse One",
  //   link: "/RinseOne",
  // },
  // {
  //   iconImg: Rinse2,
  //   name: "Rinse Two",
  //   link: "/RinseTwo",
  // },
  // {
  //   iconImg: Rinse3,
  //   name: "Rinse Three",
  //   link: "/RinseThree",
  // },
  // {
  //   iconImg: Degreasing,
  //   name: "Degreasing",
  //   link: "/Degreasing",
  // },
  // {
  //   iconImg: PaintBooth,
  //   name: "Paint Booth",
  //   link: "/PaintBooth",
  // },
  // {
  //   iconImg: Evaporator,
  //   name: "Neu & Evaporator",
  //   link: "/NeuEvaporator",
  // },
  // {
  //   Icon: AutorenewOutlinedIcon,
  //   name: "Conversion",
  //   link: "/Conversion",
  // },
  // {
  //   Icon: FilterTiltShiftOutlinedIcon,
  //   name: "Passivation",
  //   link: "/Passivation",
  // },
  // {
  //   Icon: KitchenOutlinedIcon,
  //   name: "Paint Cabinet",
  //   link: "/PaintCabinet",
  // },
];

class MainLayout extends Component {

  componentDidMount() {
    //this.props.getMenu();
  }

  handelMenuOpen = (value) => {
    return value ? this.props.openMenu(true) : this.props.closeMenu(false);
  };

  onMenuSelect = (to, formId) => {
    localStorage.setItem("FormID", formId);
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
                  onClick={(e) => this.handelMenuOpen(!this.props.Open)}
                  edge="start"
                  className={clsx(this.props.classes.menuButton, {
                    [this.props.classes.menuButtonHide]: this.props.Open,
                  })}
              >
                <MenuIcon />
              </IconButton>
              <img
                  src={CompanyLogo}
                  className={clsx({
                    [this.props.classes.logoHide]: this.props.Open,
                  })}
                  alt="dormakaba"
                  height="40"
                  width="250"
              />
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
              <IconButton onClick={(e) => this.handelMenuOpen(false)}>
                {this.props.theme.direction === "rtl" ? (
                    <ChevronRightIcon />
                ) : (
                    <ChevronLeftIcon />
                )}
              </IconButton>
              <Hidden mdDown>
                <img
                    src={CompanyLogo}
                    className={clsx({
                      [this.props.classes.hide]: !this.props.Open,
                    })}
                    alt="Kitten"
                    height="28"
                    width="170"
                />
              </Hidden>
            </div>
            <Divider />
            <List
                component="nav"
                className={this.props.classes.appMenu}
                disablePadding
            >
              {MENU_ITEMS.map((item, index) => (
                  <AppMenuItem {...item} key={index} onMenuOpen={this.handelMenuOpen} isOpenMenu={this.props.Open}/>
              ))}
              <img
                  alt="manutechs"
                  src={MntLogo}
                  width="120"
                  height="20"
                  style={{
                    transform: "rotate(-90deg)",
                    marginTop: "200px",
                    marginLeft: "18px",
                    transformOrigin: "top left",
                  }}
              />
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

const mapStateToProps = (state) => ({
  Open: state.itemActions.Open,
  menus: state.itemActions.menus,
  error: state.itemActions.error,
});

export default compose(
    withRouter,
    withStyles(useStyles, { withTheme: true }),
    connect(mapStateToProps, { openMenu, closeMenu, getMenu })
)(MainLayout);
