import React, {Component} from 'react';
import {connect} from 'react-redux'

import {getCurrentUser} from "../../../actions/authAction";

class JadwalShalat extends Component {

    componentDidMount() {
        this.props.getCurrentUser()
    }

    render() {
        console.log(this.props.jadwalSalat);
        return (
            <div>
                Meki
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        jadwalSalat: state.dataSalat.jadwalSalat
    }
};

export default connect(mapStateToProps, {getCurrentUser})(JadwalShalat);