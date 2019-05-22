import React, {Component} from 'react';
import {connect} from 'react-redux'
import {Col, Row, Typography} from 'antd';

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


    render() {
        return (
            <div>
                <div className="headerJadwal">
                    <h1>Salat Selanjutnya</h1>
                    <Row gutter={32}>
                        <Col span={12}>
                            <h5>{this.props.nextSalat}</h5>
                        </Col>
                        <Col span={12}>
                            <h4>{this.props.intervalNextSalat}</h4>
                        </Col>
                    </Row>
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