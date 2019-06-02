import React, {Component} from 'react';
import {Col, Form, Modal, Row, Select} from 'antd';
import Title from "../Title";

const {Option} = Select;

const UpdateSalatForm = Form.create({name: 'formUpdateSalat'})(
    class extends Component {
        state = {
            valueSalat: ""
        };

        handleSelectChange = value => {
            this.setState({
                valueSalat: value
            });
            console.log(value);
        };

        render() {
            const {visible, onCancel, onUpdate, form, valueTanggal, status, salat, idSalat} = this.props;

            console.log(this.props);

            return (
                <Modal
                    title={`Update Salat -  ${valueTanggal.format('Do MMMM YYYY')}`}
                    visible={visible}
                    onCancel={onCancel}
                    onOk={onUpdate}
                >
                    <Row gutter={32}>
                        <Col span={12}>
                            <Title judul={salat.charAt(0).toUpperCase() + salat.slice(1)} level={4}/>
                        </Col>
                        <Col span={12}>
                            <Form>
                                <Form.Item>
                                    {form.getFieldDecorator('statusSalat', {
                                        initialValue: status
                                    })(
                                        <Select
                                        >
                                            <Option value="Salat Berjamaah">Salat Berjamaah</Option>
                                            <Option value="Terlambat Salat">Terlambat Salat</Option>
                                            <Option value="Tidak Salat">Tidak Salat</Option>
                                            <Option value="Salat Sendiri">Salat Sendiri</Option>
                                        </Select>
                                    )}
                                </Form.Item>
                            </Form>
                        </Col>
                    </Row>
                </Modal>
            )
        }
    }
);

export default UpdateSalatForm