import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';

import {getEmailValidation} from "../../actions/authAction";

class VerifikasiEmail extends Component {
    componentDidMount() {
        this.props.getEmailValidation(this.props.match.params.token);
    }

    render() {
        console.log(this.props.match.params.token);
        return (
            <div>
                <Link to="/login">
                    Masuk gan
                </Link>
            </div>
        );
    }
}

const connectWrapped = connect(null, {getEmailValidation})(VerifikasiEmail);

export default withRouter(connectWrapped);
