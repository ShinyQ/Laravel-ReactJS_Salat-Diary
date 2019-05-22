import React, {Component} from 'react';
import {connect} from 'react-redux'
import {Typography} from 'antd';

import {getCurrentUser} from "../../../actions/authAction";
import {countDownNextSalat, getJadwalShalat} from "../../../actions/jadwalShalatAction";

import './style.less';

const {Title} = Typography;

class JadwalShalat extends Component {

    async componentDidMount() {
        const todayDate = new Date();

        this.props.getCurrentUser();
        await this.props.getJadwalShalat(todayDate.getMonth() + 1);
        this.props.countDownNextSalat();
    }

    renderCountdown = () => {
        if (this.props.nextSalat == null || this.props.intervalNextSalat == null) {
            return <h5>Loading...</h5>
        } else {
            const nextSalat = this.props.nextSalat.charAt(0).toUpperCase() + this.props.nextSalat.slice(1);
            return (
                <h4>{nextSalat + " - " + this.props.intervalNextSalat}</h4>
            )
        }
    };

    render() {
        return (
            <div>
                <div className="headerJadwal">
                    <h1>Salat Selanjutnya</h1>
                    {this.renderCountdown()}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        jadwalSalat: state.dataSalat.jadwalSalat,
        nextSalat: state.dataSalat.nextSalat,
        intervalNextSalat: state.dataSalat.intervalNextSalat
    }
};

export default connect(mapStateToProps, {getCurrentUser, countDownNextSalat, getJadwalShalat})(JadwalShalat);