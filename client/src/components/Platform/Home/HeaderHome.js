import React, {Fragment} from 'react';
import moment from 'moment';


const HeaderHome = (props) => {
    const dateNow = moment().format('dddd, Do MMMM YYYY');

    return (
        <Fragment>
            <h1>
                {dateNow}
            </h1>
            <h3>Halo, {props.nama}</h3>
        </Fragment>
    );
};

export default HeaderHome;
