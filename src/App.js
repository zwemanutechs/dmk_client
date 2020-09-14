import React, {Component} from 'react';
import {Route, withRouter } from 'react-router'
import './App.css';
import Main_layout from "./layout/container/main_layout";
import Home from "./components/home/home";
import RinseDi from "./components/rinse-di/container/rinse-di";
import MuiSnackBar from "./shared/snackbar/container/snackbar";

class App extends Component {

  render() {
    return (
          <div>
              <Main_layout>
                  <Route exact path="/Home" render={() => <Home />}/>
                  <Route exact path="/RinseDI" render={() => <RinseDi />}/>
              </Main_layout>
              <MuiSnackBar/>
          </div>
    );
  }
}
export default withRouter(props => <App {...props}/>);
