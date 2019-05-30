import React, {Component} from 'react';
import {Calendar, Col, Row, Skeleton, Table, Tag} from 'antd';
import {connect} from 'react-redux';
import moment from 'moment'

import {getDataSalatAll, getSalatByDate} from "../../../actions/salatAction";
import Title from "../Title";
import UpdateSalatForm from './UpdateSalatForm';


class DataSalat extends Component {

    state = {
        value: moment(),
        selectedDate: moment(),
        nama: "",
        status: null,
        idSalat: null,
        isModalOpen: false,
        isLoading: false
    };
    openModal = (nama, status, idSalat) => {
        this.setState({
            nama,
            status,
            idSalat,
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

    onUpdateSalat = () => {
        const form = this.formRef.props.form;
        form.validateFields((e, v) => {
            console.log(v);
        })
    };
    cancelModal = () => {
        this.setState({
            nama: "",
            status: null,
            idSalat: null,
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
                render: (text, record) => {
                    return (
                    <span>
                       <a href="javascript:"
                          onClick={() => this.openModal(record.nama, record.status, record.id)}>Edit</a>
                    </span>
                    )
                },
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

    saveFormRef = formRef => {
        this.formRef = formRef
    };

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

                <UpdateSalatForm
                    wrappedComponentRef={this.saveFormRef}
                    valueTanggal={this.state.value}
                    visible={this.state.isModalOpen}
                    onCancel={this.cancelModal}
                    onUpdate={this.onUpdateSalat}
                    salat={this.state.nama}
                    status={this.state.status}
                    idSalat={this.state.idSalat}
                />

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