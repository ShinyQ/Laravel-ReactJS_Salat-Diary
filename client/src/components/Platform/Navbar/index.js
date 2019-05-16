import React, {Component} from 'react';
import {Avatar, Dropdown, Layout, Menu} from "antd";

const {Header, Sider, Content} = Layout;


class Navbar extends Component {

    menu = () => (
        <Menu style={{minWidth: '200px'}}>
            <div style={{padding: '11px'}}>
                bukanavatar
            </div>
            <Menu.Divider/>
            <Menu.Item key="0">
                <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
                    Account
                </a>
            </Menu.Item>
            <Menu.Item key="1">
                <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
                    Logout
                </a>
            </Menu.Item>
        </Menu>
    );

    render() {
        return (
            <Header style={{background: '#fff', padding: 0}}>
                <div className="trigger">
                    <Dropdown overlay={this.menu}>
                        <Avatar shape="circle" size="large" icon="user"/>
                    </Dropdown>

                </div>
            </Header>
        );
    }
}

export default Navbar;