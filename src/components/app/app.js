import React, {Component} from 'react';
import {Container} from '@material-ui/core';
import Login from "../login/login";
import Dashboard from "../dashboard/dashboard";
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";


export default class App extends Component {


    state = {
        isLoggedIn: false
    };

    onLogin = () => {
        this.setState({
            isLoggedIn: true
        })
    };

    render() {

        const {isLoggedIn} = this.state;
        return (

            <Container>
                <Router>
                    <Switch>
                        <Route path='/' exact
                               render={() => (
                                   <Login
                                       isLoggedIn={isLoggedIn}
                                       onLogin={this.onLogin}/>
                               )}/>
                        <Route path='/dashboard'
                               render={() => (
                                   <Dashboard isLoggedIn={isLoggedIn}/>
                               )}/>


                        <Redirect to='/'/>
                    </Switch>
                </Router>
            </Container>

        );
    }
}

