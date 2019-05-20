import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getCurrentUser} from "../../../actions/authAction";

import {Col, Row, Skeleton} from 'antd'

import './style.less';
import HeaderHome from "./HeaderHome";

class Home extends Component {

    state = {
        isLoading: true
    };

    async componentDidMount() {
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
                        <Col md={24} lg={24} xl={12}>
                            <div className="headerHome">
                                <div className="container">
                                    <HeaderHome nama={this.props.user.name}/>
                                </div>
                            </div>
                            <div className="container">
                                <h2>Bagaimana salat {this.props.salatNow} hari ini?</h2>
                            </div>
                        </Col>
                        <Col md={24} lg={24} xl={12}>

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

export default connect(mapStateToProps, {getCurrentUser})(Home);
