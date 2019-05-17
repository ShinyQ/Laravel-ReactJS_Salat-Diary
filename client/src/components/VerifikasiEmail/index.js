import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

class VerifikasiEmail extends Component {
    render() {
        console.log(this.props.match.params.token);
        return (
            <div>

            </div>
        );
    }
}

export default withRouter(VerifikasiEmail);