import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {Avatar, Button, Divider} from 'antd';
import {connect} from 'react-redux';

import './style.less';
import {getLogout} from "../../../actions/authAction";
import {toggleDrawer} from "../../../actions/widgetAction";


class ProfileDrawer extends Component {

    handleLogout = async () => {
        await localStorage.removeItem('token');
        await this.props.getLogout();
        this.props.toggleDrawer();
        this.props.history.push('/login');
    };

    renderEditLink = () => {
        return (
            <Link to="/profile" className="linkToEdit">
                Edit Profile
            </Link>
        )
    };

    render() {
        return (
            <div>
                {this.renderEditLink()}
                <div className="profileDrawer">
                    <Avatar shape="circle" size={120} icon="user"/>
                    <h3>Muhammad Ilham Mubarak</h3>
                    <h4>m.ilham.mubarak@gmail.com</h4>
                </div>
                <div className="logoutDrawer">
                    <Button type="default" block onClick={this.handleLogout}>
                        Logout
                    </Button>
                </div>
                <Divider/>
            </div>
        );
    }
}

const connectWrapped = connect(null, {getLogout, toggleDrawer})(ProfileDrawer);

export default withRouter(connectWrapped)