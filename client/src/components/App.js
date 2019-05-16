import React, {Component} from 'react';
import {connect} from 'react-redux';
import {BrowserRouter, Route} from 'react-router-dom';
import {getGeoPosition} from "../actions/locationAction";

import Login from './Login';

class App extends Component {

    componentDidMount() {
        this.props.getGeoPosition();
    }

    render() {
        return (
            <div>
                <BrowserRouter>
                    <div>
                        <Route path="/login" exact component={Login}/>
                    </div>
                </BrowserRouter>
            </div>
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
