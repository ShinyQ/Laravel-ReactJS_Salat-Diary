import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Field, reduxForm} from 'redux-form';
import {Button, Card, Col, Form, Icon, Input, notification, Row} from 'antd';

import './style.less';
import {getLogin, resetIsJustRegister} from "../../actions/authAction";
import AuthDecorPage from "../Other/AuthDecorPage";

class Login extends Component {

    componentDidMount() {
        if (this.props.isJustRegister) {
            notification.open({
                message: 'Berhasil Registrasi',
                description: 'Silahkan buka E-mail untuk melaukan verifikasi',
                icon: <Icon type="check" style={{color: '#108ee9'}}/>,
            });
            this.props.resetIsJustRegister();
        }
    }


    renderInput = ({input, tipe, icon}) => {
        return (
            <Input
                {...input}
                type={tipe}
                prefix={<Icon type={icon} style={{color: 'rgba(0,0,0,.25)'}}/>}
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
            <Fragment>
                <Row>
                    <Col span={12}>
                        <AuthDecorPage/>
                    </Col>
                    <Col span={12}>
                        <div className="login-bound">
                            <div className="vAlign">
                                <Card className="login-card">
                                    <h1>Login</h1>
                                    <Form onSubmit={this.props.handleSubmit(this.onSubmit)} className="login-form">
                                        <Form.Item>
                                            <Field name="email" component={this.renderInput} tipe="email" icon="mail"/>
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

                                    <p>Belum Punya Akun? <Link to="/register">Register</Link></p>
                                </Card>
                                <p>Presented By: SSATeam</p>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Fragment>
        );
    }
}

const WrappedNormalLoginForm = Form.create({name: 'normal_login'})(Login);

const formWrapped = reduxForm({
    form: 'loginForm'
})(WrappedNormalLoginForm);

const mapStateToProps = state => {
    return {
        isJustRegister: state.auth.isJustRegister
    }
};

export default connect(mapStateToProps, {getLogin, resetIsJustRegister})(formWrapped)