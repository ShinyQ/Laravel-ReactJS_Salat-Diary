import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {BrowserRouter, Route} from 'react-router-dom';
import {getGeoPosition} from "../actions/locationAction";
import {getJadwalShalat} from "../actions/jadwalShalatAction";

import Login from './Login';
import Register from './Register'
import Platform from './Platform'
import VerifikasiEmail from "./VerifikasiEmail";


class App extends Component {

    componentDidMount() {
        const todayDate = new Date();

        this.props.getGeoPosition();
        this.props.getJadwalShalat(todayDate.getMonth() + 1);
    }

    render() {
        return (
            <Fragment>
                <BrowserRouter>
                    <Fragment>
                        <Route path="/login" exact component={Login}/>
                        <Route path="/register" exact component={Register}/>
                        <Route path="/dashboard" component={Platform}/>
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

export default connect(mapStateToProps, {getGeoPosition, getJadwalShalat})(App);