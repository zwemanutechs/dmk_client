import React, {Component} from 'react';
import {Route, withRouter } from 'react-router'
import './App.css';
import Main_layout from "./layout/container/main_layout";
import Home from "./components/home/home";
import RinseDi from "./components/rinse-di/container/rinse-di";
import Rinse1 from "./components/rinse1/container/rinse1";
import Rinse2 from "./components/rinse2/container/rinse2";
import Rinse3 from "./components/rinse3/container/rinse3";
import Degreasing from "./components/degreasing/container/degreasing";
import MuiSnackBar from "./shared/snackbar/container/snackbar";

class App extends Component {

  render() {
    return (
          <div>
              <Main_layout>
                  <Route exact path="/Home" render={() => <Home />}/>
                  <Route exact path="/RinseDI" render={() => <RinseDi />}/>
                  <Route exact path="/RinseOne" render={() => <Rinse1 />}/>
                  <Route exact path="/RinseTwo" render={() => <Rinse2 />}/>
                  <Route exact path="/RinseThree" render={() => <Rinse3 />}/>
                  <Route exact path="/Degreasing" render={() => <Degreasing />}/>
              </Main_layout>
              <MuiSnackBar/>
          </div>
    );
  }
}
export default withRouter(props => <App {...props}/>);
