import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {Link, withRouter} from "react-router-dom";
import {email, length, required} from 'redux-form-validators';


import {Alert, Button, Card, Col, Form, Icon, Input, notification, Radio, Row, Select} from 'antd';

import {checkLoggedIn, getRegister} from "../../actions/authAction";
import {getKabupaten, getProvinsi} from "../../actions/locationAction";
import AuthDecorPage from "../Other/AuthDecorPage";
import './style.less';


class Register extends Component {

    checkLoggedIn = async () => {

        //Check If User is Already Logged In
        await this.props.checkLoggedIn();
        this.isLoggedIn = this.props.isLoggedIn;

        if (this.isLoggedIn) {
            this.props.history.push('/dashboard');
        }
    };

    // Redirect when register is successful
    handleRedirect = () => {
        this.props.history.push('/login')
    };


    // Rendering input type text for Redux Form
    renderInputText = ({input, tipe, icon, meta: {touched, error}}) => {
        return (
            <Fragment>
                {touched && ((error && <Alert
                    message={`${input.name} ${error}`}
                    type="error"
                />))}
                <Input
                    {...input}
                    type={tipe}
                    placeholder={input.name.charAt(0).toUpperCase() + input.name.slice(1)}
                />
            </Fragment>
        )
    };
    // Rendering input type password for Redux Form
    renderInputPassword = ({input, meta: {touched, error}}) => {
        return (
            <Fragment>
                {touched && ((error && <Alert
                    message={`${input.name} ${error}`}
                    type="error"
                />))}
                <Input.Password
                    {...input}
                    placeholder={input.name.charAt(0).toUpperCase() + input.name.slice(1)}
                />
            </Fragment>
        )
    };
    // Rendering input type Radio for Redux Form
    renderInputRadio = ({input, meta, children, meta: {touched, error}}) => {
        console.log(touched);
        return (
            <Fragment>
                {touched && ((error && <Alert
                    message={`gender ${error}`}
                    type="error"
                />))}
                <Radio.Group {...input}>
                    {children}
                </Radio.Group>
            </Fragment>
        )
    };

    //Helper Function to filter provinsi
    filterIdFromProvinsi = (provinsi) => {
        if (this.props.provinsi !== null) {
            const idProv = this.props.provinsi.find(prov => prov.nama === provinsi);
            if (idProv !== undefined) {
                this.props.getKabupaten(idProv.id);
            }
        }
    };

    renderInputSelect = ({input, meta, children, disabled}) => {
        this.filterIdFromProvinsi(input.value);
        return (
            <Select {...input} disabled={disabled}>
                {children}
            </Select>
        )
    };

    renderListProvinsi = () => {
        if (this.props.provinsi !== null) {
            return this.props.provinsi.map(prov => (
                <Select.Option value={prov.nama} key={prov.id}>
                    {prov.nama}
                </Select.Option>
            ))
        }
    };
    renderListKabupaten = () => {
        if (this.props.kabupaten !== null) {
            return this.props.kabupaten.map(kab => (
                <Select.Option value={kab.nama} key={kab.id}>
                    {kab.nama}
                </Select.Option>
            ))
        }
    };
    //Callback when Register Button is clicked
    onSubmit = (formValues) => {
        this.props.getRegister(formValues, this.handleRedirect)
    };
    renderButtonRegister = () => {
        if (this.props.isLoading) {
            return (
                <Button type="primary" htmlType="submit"
                        className="login-form-button" loading>Register</Button>
            )
        } else {
            return (
                <Button type="primary" htmlType="submit"
                        className="login-form-button">Register</Button>
            )
        }
    };

    async componentDidMount() {
        await this.checkLoggedIn();
        this.props.getProvinsi();
    }

    render() {
        const isKabupaten = !!!this.props.kabupaten;

        //Send Error Notification
        if (this.props.errorAuth !== null) {
            notification.open({
                message: 'Error',
                description: this.props.errorAuth,
                icon: <Icon type="warning" style={{color: '#FF0000'}}/>,
            });
        }

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
                                        <Field name="name" component={this.renderInputText} tipe="text" icon="user"
                                               validate={[required()]}/>
                                    </Form.Item>
                                    <Form.Item label="Gender" className="formItemRegister">
                                        <Field name="jenis_kelamin" component={this.renderInputRadio}
                                               validate={[required()]}>
                                            <Radio value="akhi">Akhi</Radio>
                                            <Radio value="ukhti">Ukhti</Radio>
                                        </Field>
                                    </Form.Item>
                                    <Row gutter={16}>
                                        <Col span={12}>
                                            <Form.Item label="Provinsi">
                                                <Field name="provinsi" component={this.renderInputSelect}
                                                       disabled={false} validate={[required()]}>
                                                    {this.renderListProvinsi()}
                                                </Field>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label="Kota/Kabupaten" className="formItemRegister">
                                                <Field name="kota" component={this.renderInputSelect}
                                                       disabled={isKabupaten} validate={[required()]}>
                                                    {this.renderListKabupaten()}
                                                </Field>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Form.Item label="Email" className="formItemRegister">
                                        <Field name="email" component={this.renderInputText} tipe="email" icon="mail"
                                               validate={[required(), email()]}/>
                                    </Form.Item>

                                    <Form.Item label="Password" className="formItemRegister">
                                        <Field name="password" component={this.renderInputPassword} tipe="password"
                                               icon="lock" validate={[required(), length({min: 8})]}/>
                                    </Form.Item>
                                    <Form.Item className="formItemRegister">
                                        {this.renderButtonRegister()}
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

const mapStateToProps = state => {
    return {
        isLoading: state.global.isLoading,
        errorAuth: state.auth.error,
        provinsi: state.location.provinsi,
        kabupaten: state.location.kabupaten,
        isLoggedIn: state.auth.isLoggedIn
    }
};

export default withRouter(connect(mapStateToProps, {
    getRegister,
    getKabupaten,
    getProvinsi,
    checkLoggedIn
})(formWrapped))