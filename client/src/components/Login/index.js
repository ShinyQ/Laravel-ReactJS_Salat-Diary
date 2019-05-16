import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';

import {Button} from 'antd';

import {getLogin} from "../../actions/authAction";

class Login extends Component {

    renderInput = ({input, tipe}) => {
        return (
            <input {...input} autoComplete="off" type={tipe}/>
        )
    };

    onSubmit = ({email, password}) => {
        this.props.getLogin(email, password)
    };

    render() {
        return (
            <div>
                <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                    <Field name="email" component={this.renderInput} tipe="email"/>
                    <Field name="password" component={this.renderInput} tipe="password"/>
                    <Button type="primary">Login</Button>
                </form>
            </div>
        );
    }
}

const formWrapped = reduxForm({
    form: 'loginForm'
})(Login);

export default connect(null, {getLogin})(formWrapped)