import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getCurrentUser} from "../../../actions/authAction";
import {getKeySalat, getKeyStatus} from "../../../actions/salatAction";

import {Col, Divider, Row, Skeleton} from 'antd'

import './style.less';
import HeaderHome from "./HeaderHome";
import InputDataSalat from "./InputDataSalat";

class Home extends Component {
  
    state = {
        isLoading: true
    };

    async componentDidMount() {
        await this.props.getKeySalat();
        await this.props.getKeyStatus();
        await this.props.getCurrentUser();
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
                            Dasboard
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
        isLoading: state.global.isLoading
    }
};

export default connect(mapStateToProps, {getCurrentUser, getKeySalat, getKeyStatus})(Home);
