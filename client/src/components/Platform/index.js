import React, {Component} from 'react';
import {Layout} from 'antd';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux'

import {checkLoggedIn} from "../../actions/authAction";

import './style.less';
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import JadwalShalat from "./JadwalShalat";
import Home from "./Home";
import DataSalat from "./DataSalat";
import Profile from "./Profile";

const {Content} = Layout;



class Platform extends Component {

    checkLoggedIn = async () => {
        //Check If User is Already Logged In

        await this.props.checkLoggedIn();
        this.isLoggedIn = this.props.isLoggedIn;

        if (!this.isLoggedIn) {
            this.props.history.push('/login');
        }
    };

    componentDidMount() {
        this.checkLoggedIn()
    }

    render() {
        return (
            <Layout style={{minHeight: '100vh'}}>
                <Sidebar/>
                <Layout>
                    <Navbar/>
                    <Content className="platformContainer">
                        {/*<Route path={`${this.props.match.url}`} exact component={Topic}/>*/}
                        <Route path={`${this.props.match.url}/jadwal`} exact component={JadwalShalat}/>
                        <Route path={`${this.props.match.url}`} exact component={Home}/>
                        <Route path={`${this.props.match.url}/salat`} exact component={DataSalat}/>
                        <Route path={`${this.props.match.url}/profile`} exact component={Profile}/>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.auth.isLoggedIn
    }
};


export default connect(mapStateToProps, {checkLoggedIn})(Platform);