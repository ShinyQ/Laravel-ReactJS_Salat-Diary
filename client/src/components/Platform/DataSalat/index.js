import React, {Component} from 'react';
import {Calendar, Col, Row, Skeleton} from 'antd';
import {connect} from 'react-redux';
import moment from 'moment'

import {getSalatByDate} from "../../../actions/salatAction";

class DataSalat extends Component {
    state = {
        value: moment(),
        selectedDate: moment(),
        isLoading: false
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
    onPanelChange = value => {
        this.setState({value});
    };
    renderStatistikSalat = () => {
        if (this.state.isLoading) {
            return (
                <Skeleton/>
            )
        } else {
            return (
                <p>
                    {JSON.stringify(this.props.selectedDateSalat)}
                </p>
            )
        }
    };

    componentDidMount() {
        this.props.getSalatByDate(moment())
    }

    render() {
        return (
            <div>
                <Row gutter={32}>
                    <Col xl={8} sm={12}>
                        <h1>Kalender Salat</h1>
                        <Calendar value={this.state.value} onSelect={this.onSelect} onPanelChange={this.onPanelChange}/>
                    </Col>
                    <Col xl={16} sm={12}>
                        <h1>Statistik Salat - {moment(this.state.value).format('dddd, Do MMMM YYYY')}</h1>
                        {this.renderStatistikSalat()}
                    </Col>
                </Row>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        selectedDateSalat: state.dataSalat.selectedDateSalat
    }
};

export default connect(mapStateToProps, {getSalatByDate})(DataSalat);