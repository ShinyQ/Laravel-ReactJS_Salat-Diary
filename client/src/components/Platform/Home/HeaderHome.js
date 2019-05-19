import React, {Fragment} from 'react';

const HeaderHome = (props) => {
    return (
        <Fragment>
            <h1>
                Senin, 19 Mei 2019
            </h1>
            <h3>Halo, {props.nama}</h3>
        </Fragment>
    );
};

export default HeaderHome;