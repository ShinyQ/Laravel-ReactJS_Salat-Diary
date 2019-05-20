import React, {Component} from 'react';
import {Col, Row} from 'antd'

import './style.less';

class Home extends Component {
    constructor(props) {
      super(props);
      var today = new Date();
      const months = ["Januari", "Februari", "Maret","April", "Mei", "Juni", "July", "Agustus", "September", "Oktober", "November", "Desember"];
      var sekarang = today.getDate() +' '+ months[today.getMonth()] +' '+  today.getFullYear();
      this.state = {
        date: sekarang
      };
    }
    render() {
        return (
            <div>
                <Row gutter={32}>
                    <Col md={24} lg={24} xl={12}>
                        <div className="headerHome">
                            <div className="container">
                                <h1>
                                    {this.state.date}
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
