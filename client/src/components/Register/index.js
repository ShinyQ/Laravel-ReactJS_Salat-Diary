import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {Link} from "react-router-dom";

import {Button, Card, Col, Form, Input, Radio, Row} from 'antd';

import './style.less';
import {getRegister} from "../../actions/authAction";
import AuthDecorPage from "../Other/AuthDecorPage";


class Register extends Component {

    state = {
        isLoading: false
    };

    renderInputText = ({input, tipe, icon}) => {
        return (
            <Input
                {...input}
                type={tipe}
                placeholder={input.name.charAt(0).toUpperCase() + input.name.slice(1)}
            />
        )
    };
    renderInputPassword = ({input}) => {
        return (
            <Input.Password
                {...input}
                placeholder={input.name.charAt(0).toUpperCase() + input.name.slice(1)}
            />
        )
    };
    renderInputRadio = ({input, meta, children}) => {
        return (
            <Radio.Group {...input}>
                {children}
            </Radio.Group>
        )
    };
    onSubmit = formValues => {
        this.props.getRegister(formValues)
    };

    render() {
        return (
            <Row>
                <Col span={12}>
                    <AuthDecorPage/>
                </Col>
                <Col span={12}>
                    <div className="login-bound">
                        <div className="vAlign">
                            <Card className="login-card">
                                <h1>Register</h1>
                                <Form onSubmit={this.props.handleSubmit(this.onSubmit)} className="login-form">
                                    <Form.Item label="Name" className="formItemRegister">
                                        <Field name="name" component={this.renderInputText} tipe="text" icon="user"/>
                                    </Form.Item>
                                    <Form.Item label="Gender" className="formItemRegister">
                                        <Field name="jenis_kelamin" component={this.renderInputRadio}>
                                            <Radio value="akhi">Akhi</Radio>
                                            <Radio value="ukhti">Ukhti</Radio>
                                        </Field>
                                    </Form.Item>
                                    <Form.Item label="Email" className="formItemRegister">
                                        <Field name="email" component={this.renderInputText} tipe="email" icon="mail"/>
                                    </Form.Item>

                                    <Form.Item label="Password" className="formItemRegister">
                                        <Field name="password" component={this.renderInputPassword} tipe="password"
                                               icon="lock"/>
                                    </Form.Item>
                                    <Form.Item className="formItemRegister">
                                        <Button type="primary" htmlType="submit"
                                                className="login-form-button">Register</Button>
                                    </Form.Item>
                                </Form>

                                <p>Sudah Punya Akun? <Link to="/login">Login</Link></p>
                            </Card>
                            <p>Presented By: SSATeam</p>
                        </div>
                    </div>
                </Col>
            </Row>
        );
    }
}

const WrappedNormalLoginForm = Form.create({name: 'register_form'})(Register);

const formWrapped = reduxForm({
    form: 'registerForm'
})(WrappedNormalLoginForm);

export default connect(null, {getRegister})(formWrapped)