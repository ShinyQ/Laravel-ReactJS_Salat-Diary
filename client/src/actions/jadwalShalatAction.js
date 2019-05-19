import _ from 'lodash';
import jadwalShalat from '../apis/jadwalShalat';

export const getJadwalShalat = todayMonth => async (dispatch, getState) => {
    const latitude = getState().location.lat;
    const longitude = getState().location.long;

    const response = await jadwalShalat.get(`/calendar?latitude=${latitude}&longitude=${longitude}&method=2`);

    const jadwalShalatNow = response.data.data[todayMonth].timings;

    const respon = _.chain(jadwalShalatNow)
        .toPairs()
        .map(row => ({
            nama: row[0],
            waktu: row[1].substr(0, 5)
        }))
        .keyBy('nama')
        .mapValues('waktu')
        .value();

    console.log(respon);
};