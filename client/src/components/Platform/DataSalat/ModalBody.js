import React from 'react';
import {Col, Row} from 'antd';
import Title from "../Title";

const ModalBody = props => {
    const {status, salat, idSalat} = props;
    console.log(props);
    return (
        <Row gutter={32}>
            <Col span={12}>
                <Title judul={salat.charAt(0).toUpperCase() + salat.slice(1)} level={4}/>
            </Col>
            <Col span={12}>
                <p>Id {idSalat}</p>
                <p>Status {status}</p>
            </Col>
        </Row>
    );
};

export default ModalBody;