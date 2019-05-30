import React from 'react';
import {Col, Row} from 'antd';
import Title from "../Title";

const ModalBody = () => {
    return (
        <Row gutter={32}>
            <Col span={12}>
                <Title judul="Subuh" level={4}/>
            </Col>
            <Col span={12}>

            </Col>
        </Row>
    );
};

export default ModalBody;