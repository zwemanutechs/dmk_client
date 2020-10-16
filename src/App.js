import React, {Component} from 'react';
import { Route, Switch, withRouter } from "react-router-dom";
import './App.css';
import Main_layout from "./layout/container/main_layout";
import Home from "./components/home/container/home";
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
import {client} from "./middleware/axios-middleware";
import ForbiddenPage from "./components/errorPages/403";

class App extends Component {

    constructor(props) {
        super(props);
        localStorage.clear();
    }

    componentDidMount() {
        client.get('Auth/AuthRequest')
            .then(response => {
                if(response && response.status === 200 && response.data.code){
                    localStorage.setItem('access-data', response.data.data);
                }else if(response && response.status === 403){
                    this.props.history.push('/Forbidden');
                }
            }).catch((err) => {
                this.props.history.push('/Forbidden');
        });
    }

    render() {
    return (
        <div>
            <Switch>
                <Route exact path="/Forbidden" render={() => <ForbiddenPage />}/>
                <Main_layout>
                    <Route exact path="/" render={() => <Home />}/>
                    <Route path="/Home" render={() => <Home />}/>
                    <Route path="/RinseDI" render={() => <RinseDi />}/>
                    <Route path="/RinseOne" render={() => <Rinse1 />}/>
                    <Route path="/RinseTwo" render={() => <Rinse2 />}/>
                    <Route path="/RinseThree" render={() => <Rinse3 />}/>
                    <Route path="/Degreasing" render={() => <Degreasing />}/>
                    <Route path="/PaintBooth" render={() => <PaintBooth />}/>
                    <Route path="/NeuEvaporator" render={() => <NeuEvaporator />}/>
                    <Route path="/Passivation" render={() => <Passivation />}/>
                    <Route path="/PaintCabinet" render={() => <PaintCabinet />}/>
                    <Route path="/Conversion" render={() => <Conversion />}/>
                </Main_layout>
                <Spinner/>
                <MuiSnackBar/>
            </Switch>
        </div>

    );
  }
}
export default withRouter(props => <App {...props}/>);
