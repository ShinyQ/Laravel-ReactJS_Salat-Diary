import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Avatar, Button, Divider} from 'antd';

import './style.less';


class ProfileDrawer extends Component {

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
                    <Button type="default" block>
                        Logout
                    </Button>
                </div>
                <Divider/>
            </div>
        );
    }
}

export default ProfileDrawer;