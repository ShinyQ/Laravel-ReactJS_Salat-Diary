import React, {Component} from 'react';
import {Avatar, Drawer, Layout} from "antd";
import {connect} from 'react-redux';

import {toggleDrawer} from "../../../actions/widgetAction";
import ProfileDrawer from "../ProfileDrawer";

const {Header, Sider, Content} = Layout;


class Navbar extends Component {

    toggleDrawer = () => {
        this.props.toggleDrawer();
    };

    componentDidMount() {

    }

    render() {
        return (
            <Header style={{background: '#fff', padding: 0}}>
                <div className="trigger">
                    <Avatar shape="circle" size="large" icon="user" onClick={this.toggleDrawer}/>
                </div>
                <Drawer
                    title="Profile"
                    placement="right"
                    width={500}
                    closable={false}
                    onClose={this.toggleDrawer}
                    visible={this.props.isDrawerOpen}
                >
                    <ProfileDrawer/>
                </Drawer>
            </Header>
        );
    }
}

const mapStateToProps = state => {
    return {
        isDrawerOpen: state.widget.isDrawerOpen
    }
};
export default connect(mapStateToProps, {toggleDrawer})(Navbar);