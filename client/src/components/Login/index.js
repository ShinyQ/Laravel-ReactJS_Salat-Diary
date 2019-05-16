import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';

import {Button, Card, Col, Form, Icon, Input, Row} from 'antd';

import './style.less';
import {getLogin} from "../../actions/authAction";

class Login extends Component {

    renderInput = ({input, tipe, icon}) => {
        return (
            <Input
                {...input}
                type={tipe}
                prefix={<Icon type={icon} style={{color: 'rgba(0,0,0,.75)'}}/>}
                placeholder={input.name.charAt(0).toUpperCase() + input.name.slice(1)}
            />
        )
    };

    onSubmit = ({email, password}) => {
        console.log(email, password);
        this.props.getLogin(email, password)
    };

    render() {
        return (
            <Row>
                <Col span={12}>
                    <div className="login-decor vAlignParent">
                        <div className="vAlign">
                            <img src="" alt="shalatDiary"/>
                            <h1>Welcome to Salat Diary</h1>
                            <h4>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab asperiores aspernatur,
                                delectus deserunt dignissimos dolore error explicabo fuga impedit laboriosam minima
                                necessitatibus neque nihil, rem repellat sit vel veniam voluptas.</h4>
                        </div>
                    </div>
                </Col>
                <Col span={12}>
                    <div className="login-bound">
                        <div className="vAlign">
                            <Card className="login-card">
                                <img src="" alt=""/>
                                <Form onSubmit={this.props.handleSubmit(this.onSubmit)} className="login-form">
                                    <Form.Item>
                                        <Field name="email" component={this.renderInput} tipe="email" icon="user"/>
                                    </Form.Item>
                                    <Form.Item>
                                        <Field name="password" component={this.renderInput} tipe="password"
                                               icon="lock"/>
                                    </Form.Item>
                                    <Form.Item>
                                        <Button type="primary" htmlType="submit"
                                                className="login-form-button">Login</Button>
                                    </Form.Item>
                                </Form>

                                <p>Belum Punya Akun? Register</p>
                            </Card>
                            <p>Presented By: SSATeam</p>
                        </div>
                    </div>
                </Col>
            </Row>
        );
    }
}

const WrappedNormalLoginForm = Form.create({name: 'normal_login'})(Login);

const formWrapped = reduxForm({
    form: 'loginForm'
})(WrappedNormalLoginForm);

export default connect(null, {getLogin})(formWrapped)