import React, {Component} from 'react';
import {Layout} from 'antd';
import {connect} from 'react-redux'

import {checkLoggedIn} from "../../actions/authAction";

import './style.less';
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

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
                    <Content
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            background: '#fff',
                            minHeight: 280,
                        }}
                    >

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