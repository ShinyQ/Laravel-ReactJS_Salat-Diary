import React from 'react';
import {Typography} from 'antd'

const Title = (props) => {
    return (
        <Typography.Title {...props} style={{marginBottom: '32px'}}>
            {props.judul}
        </Typography.Title>
    );
};

export default Title;