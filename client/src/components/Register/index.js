import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {Link, withRouter} from "react-router-dom";

import {Button, Card, Col, Form, Input, Radio, Row, Select} from 'antd';

import {getRegister} from "../../actions/authAction";
import {getKabupaten, getProvinsi} from "../../actions/locationAction";
import AuthDecorPage from "../Other/AuthDecorPage";
import './style.less';


class Register extends Component {

    // Redirect when register is successful
    handleRedirect = () => {
        this.props.history.push('/login')
    };
    // Rendering input type text for Redux Form
    renderInputText = ({input, tipe, icon}) => {
        return (
            <Input
                {...input}
                type={tipe}
                placeholder={input.name.charAt(0).toUpperCase() + input.name.slice(1)}
            />
        )
    };
    // Rendering input type password for Redux Form
    renderInputPassword = ({input}) => {
        return (
            <Input.Password
                {...input}
                placeholder={input.name.charAt(0).toUpperCase() + input.name.slice(1)}
            />
        )
    };
    // Rendering input type Radio for Redux Form
    renderInputRadio = ({input, meta, children}) => {
        return (
            <Radio.Group {...input}>
                {children}
            </Radio.Group>
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

    componentDidMount() {
        this.props.getProvinsi();
    }

    render() {
        const isKabupaten = !!!this.props.kabupaten;
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
                                    <Row gutter={16}>
                                        <Col span={12}>
                                            <Form.Item label="Provinsi">
                                                <Field name="provinsi" component={this.renderInputSelect}
                                                       disabled={false}>
                                                    {this.renderListProvinsi()}
                                                </Field>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label="Kota/Kabupaten" className="formItemRegister">
                                                <Field name="kota" component={this.renderInputSelect}
                                                       disabled={isKabupaten}>
                                                    {this.renderListKabupaten()}
                                                </Field>
                                            </Form.Item>
                                        </Col>
                                    </Row>
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

const mapStateToProps = state => {
    return {
        provinsi: state.location.provinsi,
        kabupaten: state.location.kabupaten,
    }
};

export default withRouter(connect(mapStateToProps, {getRegister, getKabupaten, getProvinsi})(formWrapped))