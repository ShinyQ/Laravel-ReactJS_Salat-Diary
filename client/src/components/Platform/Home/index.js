import React, {Component} from 'react';
import {Col, Row} from 'antd'

import './style.less';

class Home extends Component {
    render() {
        return (
            <div>
                <Row gutter={32}>
                    <Col md={24} lg={24} xl={12}>
                        <div className="headerHome">
                            <div className="container">
                                <h1>
                                    Senin, 19 Mei 2019
                                </h1>
                                <h3>Halo, Muhammad Ilham Mubarak</h3>
                            </div>
                        </div>
                        <div className="container">
                            <h2>Bagaimana Shalat ... hari ini?</h2>
                        </div>
                    </Col>
                    <Col md={24} lg={24} xl={12}>

                    </Col>
                </Row>
            </div>
        );
    }
}

export default Home;
