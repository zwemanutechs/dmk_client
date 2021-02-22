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
import Conversion from "./components/conversion/container/conversion";
import axios from "axios";
import ForbiddenPage from "./components/errorPages/403";
import FactoryLoader from "./assets/images/icons/factoryloader.gif";
import Grid from "@material-ui/core/Grid";
import Dashboard from "./components/home/container/dashboard";
import PaintCabinetTopCabinet1 from "./components/paintcabinet-tc1/container/paintcabinet-tc1";
import PaintCabinetTopCabinet2 from "./components/paintcabinet-tc2/container/paintcabinet-tc2";
import PaintCabinetPrimerCabinet1 from "./components/paintcabinet-pc1/container/paintcabinet-pc1";
import PaintCabinetPrimerCabinet2 from "./components/paintcabinet-pc2/container/paintcabinet-pc2";
import {BASEURI} from "./constants/api-constants";
import Notification from "./components/notification/container/notification";

class App extends Component {
    constructor(props) {
        super(props);
        localStorage.clear();
        this.state = {
            accessToken: null,
        };
        //localStorage.setItem("access-data", 'eyJJZCI6ImUzYzZmODNmLTI0ZjMtNDUzNy05MTE3LWY1ZmJkMGYxMmRmMCIsIlJvbGUiOiI2ODdkOGJlMi0wNDAzLTQ0NTctOWIxYi0xMGQ4YTljNGYxMjcifQ==');
    }

    componentDidMount() {
        const httpClient = axios.create({
            baseURL: BASEURI,
        });
        httpClient
            .get("Auth/AuthRequest")
            .then((response) => {
                if (response && response.status === 200 && response.data.code) {
                    localStorage.setItem("access-data", response.data.data);
                    this.setState({accessToken: response.data.data});
                } else if (response && response.status === 403) {
                    this.props.history.push("/Forbidden");
                }
            })
            .catch((err) => {
                this.props.history.push("/Forbidden");
            });
    }

    render() {
        return (
            <React.Fragment>
                <Switch>
                    <Route exact path="/Forbidden" render={() => <ForbiddenPage />} />
                    {this.state.accessToken === null ? (
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
                            <Route path="/Notification" render={() => <Notification />} />
                            <Route path="/Overview" render={() => <Overview />} />
                            <Route path="/RinseDI" render={() => <RinseDi />} />
                            <Route path="/RinseOne" render={() => <Rinse1 />} />
                            <Route path="/RinseTwo" render={() => <Rinse2 />} />
                            <Route path="/RinseThree" render={() => <Rinse3 />} />
                            <Route path="/Degreasing" render={() => <Degreasing />} />
                            <Route path="/PaintBooth" render={() => <PaintBooth />} />
                            <Route path="/NeuEvaporator" render={() => <NeuEvaporator />} />
                            <Route path="/Passivation" render={() => <Passivation />} />
                            <Route path="/Conversion" render={() => <Conversion />} />
                            <Route path="/TopCabinetOne" render={() => <PaintCabinetTopCabinet1 />} />
                            <Route path="/TopCabinetTwo" render={() => <PaintCabinetTopCabinet2 />} />
                            <Route path="/PrimerCabinetOne" render={() => <PaintCabinetPrimerCabinet1 />} />
                            <Route path="/PrimerCabinetTwo" render={() => <PaintCabinetPrimerCabinet2 />} />
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
