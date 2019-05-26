import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Pie} from 'react-chartjs-2';
import {getCurrentUser} from "../../../actions/authAction";
import {getKeySalat, getKeyStatus, getSalatToday} from "../../../actions/salatAction";

import {Col, Divider, Row, Skeleton} from 'antd'

import './style.less';
import HeaderHome from "./HeaderHome";
import InputDataSalat from "./InputDataSalat";
import Title from "../Title";

const data = {
    labels: [
        'Berjamaah',
        'Sendiri',
        'Telat',
        'Tidak Salat',
        'Belum Mengisi',
    ],
    datasets: [{
        data: [5, 5, 6, 9, 15],
        backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#8C14FC',
            '#D91E18',
        ],
        hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
        ]
    }]
};


class Home extends Component {
  
    state = {
        isLoading: true
    };

    async componentDidMount() {
        await this.props.getKeySalat();
        await this.props.getKeyStatus();
        await this.props.getCurrentUser();
        this.props.getSalatToday();
        this.setState({
            isLoading: false
        })

    }

    render() {

        if (this.state.isLoading) {
            return (
                <Skeleton/>
            )
        } else {
            return (
                <div>
                    <Row gutter={32}>
                        <Col md={24} lg={24} xl={10}>
                            <Title judul="Dashboard" level={2}/>
                            <div className="headerHome">
                                <div className="container">
                                    <HeaderHome nama={this.props.user.name}/>
                                </div>
                            </div>
                            <div className="container">
                                <h2>Bagaimana salat <b>{this.props.salatNow}</b> hari ini ?</h2>
                                <InputDataSalat salatNow={this.props.salatNow}/>
                            </div>
                            <Divider/>
                        </Col>
                        <Col md={24} lg={24} xl={14}>
                            <Title judul="Overview Bulan Ini" level={2}/>
                            <div className="container">
                                <Row>
                                    <Col span={12}>
                                    </Col>
                                </Row>
                                <Pie data={data}/>
                            </div>
                        </Col>
                    </Row>
                </div>
            );
        }
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        salatNow: state.dataSalat.salatNow,
        todaySalat: state.dataSalat.todaySalat,
        isLoading: state.global.isLoading
    }
};

export default connect(mapStateToProps, {getCurrentUser, getKeySalat, getKeyStatus, getSalatToday})(Home);
