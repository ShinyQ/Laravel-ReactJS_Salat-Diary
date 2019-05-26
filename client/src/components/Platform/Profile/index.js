import React, {Component} from 'react';
import {Avatar, Card, Col, Form, Input, Row} from 'antd';
import Title from "../Title";

class Profile extends Component {
    render() {
        return (
            <div className="container">
                <Title judul="Profile" level={2}/>
                <Card style={{padding: '0 64px', margin: '0 auto'}}>
                    <center>
                        <Avatar shape="circle" size={120} icon="user"/>
                    </center>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item label="Nama">
                            <Input
                                disabled
                                value="Muhammad Ilham Mubarak"
                            />
                        </Form.Item>
                        <Form.Item label="Email">
                            <Input
                                disabled
                                value="m.ilham.mubarak@gmail.com"
                            />
                        </Form.Item>
                        <Row gutter={32}>
                            <Col span={12}>
                                <Form.Item label="Provinsi">
                                    <Input
                                        disabled
                                        value="Jawa Barat"
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Kabupaten">
                                    <Input
                                        disabled
                                        value="Majalengka"
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Form.Item label="Password">
                            <Input
                                type="password"
                                disabled
                                value="m.ilham.mubarak@gmail.com"
                            />
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        );
    }
}

export default Profile;