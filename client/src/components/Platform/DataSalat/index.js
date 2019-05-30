import React, {Component} from 'react';
import {Calendar, Col, Modal, Row, Skeleton, Table, Tag} from 'antd';
import {connect} from 'react-redux';
import moment from 'moment'

import {getDataSalatAll, getSalatByDate} from "../../../actions/salatAction";
import Title from "../Title";
import ModalBody from "./ModalBody";


class DataSalat extends Component {

    state = {
        value: moment(),
        selectedDate: moment(),
        nama: null,
        status: null,
        isModalOpen: false,
        isLoading: false
    };
    openModal = (nama, status) => {
        this.setState({
            nama,
            status,
            isModalOpen: true
        })
    };

    onSelect = async (value) => {
        await this.setState({
            isLoading: true
        });
        await this.props.getSalatByDate(value);
        this.setState({
            value,
            isLoading: false,
            selectedValue: value,
        });
    };
    cancelModal = () => {
        this.setState({
            nama: null,
            status: null,
            isModalOpen: false
        })
    };
    renderStatistikSalat = () => {
        this.columns = [
            {
                title: 'Salat',
                dataIndex: 'nama',
                key: 'nama',
                render: text => <p>{text.charAt(0).toUpperCase() + text.slice(1)}</p>
            },
            {
                title: 'Status',
                dataIndex: 'status',
                key: 'status',
                render: tags => {
                    console.log(tags);
                    let color;
                    switch (tags) {
                        case "Salat Berjamaah":
                            color = 'green';
                            break;
                        case "Tidak Salat":
                            color = "red";
                            break;
                        case "Salat Sendiri":
                            color = "purple";
                            break;
                        case "Terlambat Salat":
                            color = "gold";
                            break;
                        default:
                            color = 'cyan'
                    }
                    return (
                        <Tag color={color}>
                            {tags}
                        </Tag>
                    )
                }
            },
            {
                title: 'Action',
                key: 'action',
                render: (text, record) => (
                    <span>
                       <a href="javascript:" onClick={() => this.openModal(record.nama, record.status)}>Edit</a>
                    </span>
                ),
            },
        ];
        if (this.state.isLoading) {
            return (
                <Skeleton/>
            )
        } else {
            return <Table columns={this.columns} dataSource={this.props.selectedDateSalat} bordered/>
            // return this.props.selectedDateSalat.map((a, i) => (
            //     <div key={i}>
            //         <h1>{a.nama}</h1>
            //         <h5>{a.status}</h5>
            //     </div>
            // ))
        }
    };

    onPanelChange = value => {
        this.setState({value});
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getSalatByDate(moment());
        this.props.getDataSalatAll();
    }

    render() {
        return (
            <div>
                <Row gutter={32}>
                    <Col xl={8} sm={12}>
                        <Title judul="Kalender Salat" level={2}/>
                        <Calendar value={this.state.value} onSelect={this.onSelect} onPanelChange={this.onPanelChange}/>
                    </Col>
                    <Col xl={16} sm={12}>
                        <Title judul={`Statistik Salat - ${moment(this.state.value).format('dddd, Do MMMM YYYY')}`}
                               level={2}/>

                        {this.renderStatistikSalat()}
                    </Col>
                </Row>
                <Modal
                    title={`Update Salat -  ${this.state.value.format('Do MMMM YYYY')}`}
                    visible={this.state.isModalOpen}
                    onCancel={this.cancelModal}
                >
                    <ModalBody salat={this.props.nama}/>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        selectedDateSalat: state.dataSalat.selectedDateSalat
    }
};

export default connect(mapStateToProps, {getSalatByDate, getDataSalatAll})(DataSalat);