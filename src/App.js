import React, {Component} from 'react';
import {Route, withRouter } from 'react-router'
import './App.css';
import Main_layout from "./layout/container/main_layout";
import Home from "./components/home/home";
import RinseDi from "./components/rinse-di/container/rinse-di";
import MaxWidthDialog from "./shared/mat-diaglog/container/mat-dialog";

class App extends Component {

  render() {
    return (
          <Main_layout>
            <Route exact path="/Home" render={() => <Home />}/>
            <Route exact path="/RinseDI" render={() => <RinseDi />}/>
            <MaxWidthDialog/>
          </Main_layout>
    );
  }
}
export default withRouter(props => <App {...props}/>);
