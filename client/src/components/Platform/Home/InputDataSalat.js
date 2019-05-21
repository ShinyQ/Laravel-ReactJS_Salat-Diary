import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {required} from 'redux-form-validators';

import {Button, Col, Form, Radio, Row} from 'antd'

import {submitStatusSalat} from "../../../actions/salatAction";

class InputDataSalat extends React.Component {


    onStatusSubmit = formValues => {
        console.log(formValues);
        this.props.submitStatusSalat(this.props.salatNow, formValues.statusSalat);
    };

    renderInputRadioStatus = ({input, meta: {touched, error}, children, meta}) => {
        return (
            <Fragment>
                <Radio.Group {...input} className="radioSubmitContainer" buttonStyle="solid">
                    <Row gutter={8}>
                        {children}
                    </Row>
                </Radio.Group>
            </Fragment>

        )
    };

    render() {
        return (
            <Fragment>
                <Form onSubmit={this.props.handleSubmit(this.onStatusSubmit)}>
                    <Form.Item>
                        <Field name="statusSalat" component={this.renderInputRadioStatus} validate={[required()]}>
                            {
                                this.props.status.map(a => (
                                    <Col span={12} key={a.id}>
                                        <Radio.Button value={a.nama} className="radioSubmiStatus">
                                            {a.nama}
                                        </Radio.Button>
                                    </Col>
                                ))
                            }
                        </Field>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="buttonSubmitStatus">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Fragment>
        );
    }
}

const WrappedNormalForm = Form.create({name: 'inputDataSalat'})(InputDataSalat);

const formWrapped = reduxForm({
    form: 'inputDataSalatForm'
})(WrappedNormalForm);

const mapStateToProps = state => {
    return {
        status: state.dataSalat.keyStatus
    }
};

export default connect(mapStateToProps, {submitStatusSalat})(formWrapped);