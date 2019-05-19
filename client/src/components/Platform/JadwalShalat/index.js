import React, {Component} from 'react';
import {connect} from 'react-redux'

import {getJadwalShalat} from "../../../actions/jadwalShalatAction";
import {getCurrentUser} from "../../../actions/authAction";

class JadwalShalat extends Component {

    componentDidMount() {
        const todayDate = new Date();

        this.props.getJadwalShalat(todayDate.getMonth() + 1);
        this.props.getCurrentUser()
    }

    render() {
        return (
            <div>
                Meki
            </div>
        );
    }
}

export default connect(null, {getJadwalShalat, getCurrentUser})(JadwalShalat);