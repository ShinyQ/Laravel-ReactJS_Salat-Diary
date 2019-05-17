import React, {Component} from 'react';
import {Layout} from 'antd';

import './style.less';
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const {Content} = Layout;



class Platform extends Component {


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

export default Platform;