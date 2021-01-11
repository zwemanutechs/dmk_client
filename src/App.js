import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import "./App.css";
import MainLayout from "./layout/container/main_layout";
import Overview from "./components/overview/container/overview";
import RinseDi from "./components/rinse-di/container/rinse-di";
import Rinse1 from "./components/rinse1/container/rinse1";
import Rinse2 from "./components/rinse2/container/rinse2";
import Rinse3 from "./components/rinse3/container/rinse3";
import Degreasing from "./components/degreasing/container/degreasing";
import MuiSnackBar from "./shared/snackbar/container/snackbar";
import Spinner from "./shared/spinner/container/spinner";
import PaintBooth from "./components/paintBooth/container/paintBooth";
import NeuEvaporator from "./components/neuEvaporator/container/neuEvaporator";
import Passivation from "./components/passivation/container/passivation";
import PaintCabinet from "./components/paintCabinet/container/paintCabinet";
import Conversion from "./components/conversion/container/conversion";
import { client } from "./middleware/axios-middleware";
import ForbiddenPage from "./components/errorPages/403";
import FactoryLoader from "./assets/images/icons/factoryloader.gif";
import Grid from "@material-ui/core/Grid";
import Dashboard from "./components/home/container/dashboard";

class App extends Component {
    constructor(props) {
        super(props);
        localStorage.clear();
        this.state = {
            accessToken: "1",
        };
    }

    componentDidMount() {
        // client
        //     .get("Auth/AuthRequest")
        //     .then((response) => {
        //         if (response && response.status === 200 && response.data.code) {
        //             localStorage.setItem("access-data", response.data.data);
        //             // Wait for local storage
        //             setTimeout(
        //                 function () {
        //                     this.setState({
        //                         accessToken: localStorage.getItem("access-data"),
        //                     });
        //                 }.bind(this),
        //                 4000
        //             );
        //         } else if (response && response.status === 403) {
        //             this.props.history.push("/Forbidden");
        //         }
        //     })
        //     .catch((err) => {
        //         this.props.history.push("/Forbidden");
        //     });
    }

    render() {
        return (
            <React.Fragment>
                <Switch>
                    <Route exact path="/Forbidden" render={() => <ForbiddenPage />} />
                    {this.state.accessToken === "" ? (
                        <Grid
                            container
                            direction="column"
                            alignItems="center"
                            justify="center"
                            style={{ minHeight: "100vh", height: "100%" }}
                        >
                            <img src={FactoryLoader} width={150} height={150} alt="loader" />
                        </Grid>
                    ) : (
                        <MainLayout>
                            <Route exact path="/" render={() => <Dashboard />} />
                            <Route path="/Home" render={() => <Dashboard />} />
                            <Route path="/Overview" render={() => <Overview />} />
                            <Route path="/RinseDI" render={() => <RinseDi />} />
                            <Route path="/RinseOne" render={() => <Rinse1 />} />
                            <Route path="/RinseTwo" render={() => <Rinse2 />} />
                            <Route path="/RinseThree" render={() => <Rinse3 />} />
                            <Route path="/Degreasing" render={() => <Degreasing />} />
                            <Route path="/PaintBooth" render={() => <PaintBooth />} />
                            <Route path="/NeuEvaporator" render={() => <NeuEvaporator />} />
                            <Route path="/Passivation" render={() => <Passivation />} />
                            <Route path="/PaintCabinet" render={() => <PaintCabinet />} />
                            <Route path="/Conversion" render={() => <Conversion />} />
                        </MainLayout>
                    )}
                </Switch>
                <Spinner />
                <MuiSnackBar />
            </React.Fragment>
        );
    }
}
export default withRouter((props) => <App {...props} />);
