import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {BrowserRouter, Route} from 'react-router-dom';
import {getGeoPosition} from "../actions/locationAction";

import Login from './Login';
import Register from './Register'
import Platform from './Platform'
import VerifikasiEmail from "./VerifikasiEmail";

class App extends Component {

    componentDidMount() {
        this.props.getGeoPosition();
    }

    render() {
        return (
            <Fragment>
                <BrowserRouter>
                    <Fragment>
                        <Route path="/login" exact component={Login}/>
                        <Route path="/register" exact component={Register}/>
                        <Route path="/dashboard" exact component={Platform}/>
                        <Route path="/verifikasi/:token" exact component={VerifikasiEmail}/>
                    </Fragment>
                </BrowserRouter>
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        lat: state.location.lat,
        long: state.location.long
    }
};

export default connect(mapStateToProps, {getGeoPosition})(App);