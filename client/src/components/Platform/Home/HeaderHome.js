import React, {Fragment} from 'react';

const HeaderHome = (props) => {
  var today = new Date();
  const months = ["Januari", "Februari", "Maret","April", "Mei", "Juni", "July", "Agustus", "September", "Oktober", "November", "Desember"];
  var sekarang = today.getDate() +' '+ months[today.getMonth()] +' '+  today.getFullYear();

    return (
        <Fragment>
            <h1>
                {sekarang}
            </h1>
            <h3>Halo, {props.nama}</h3>
        </Fragment>
    );
};

export default HeaderHome;
