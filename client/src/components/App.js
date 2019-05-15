import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getGeoPosition} from "../actions/locationAction";

class App extends Component {

    componentDidMount() {
        this.props.getGeoPosition();
    }

    render() {
        return (
            <div>
                Shalat Diary gan
                <p>{this.props.lat}</p>
                <p>{this.props.long}</p>
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