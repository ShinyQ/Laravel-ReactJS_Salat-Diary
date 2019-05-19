import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {Icon, Layout, Menu} from "antd";

import './style.less';

const {Sider} = Layout;

class Sidebar extends Component {
    render() {
        return (
            <Sider breakpoint="md" collapsedWidth={0} className="sider">
                <div className="logo"/>
                <Menu theme="dark" mode="inline" activeKey={this.props.location.pathname}
                      selectedKeys={[this.props.location.pathname]}>
                    <Menu.Item key="/dashboard">
                        <Icon type="user"/>
                        <span>Home</span>
                        <Link to={`${this.props.match.url}`}/>
                    </Menu.Item>
                    <Menu.Item key="/dashboard/salat">
                        <Icon type="video-camera"/>
                        <span>Data Salat</span>
                        <Link to={`${this.props.match.url}/salat`}/>
                    </Menu.Item>
                    <Menu.Item key="/dashboard/jadwal">
                        <Icon type="upload"/>
                        <span>Jadwal Salat</span>
                        <Link to={`${this.props.match.url}/jadwal`}/>
                    </Menu.Item>
                </Menu>
            </Sider>
        );
    }
}

export default withRouter(Sidebar);