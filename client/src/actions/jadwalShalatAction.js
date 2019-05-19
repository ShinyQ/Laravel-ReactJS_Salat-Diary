import _ from 'lodash';
import jadwalShalat from '../apis/jadwalShalat';
import {SET_JADWAL_SALAT, SET_SALAT_NOW} from "../constant";

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

    const dateInstance = new Date();
    const hour = dateInstance.getHours();
    const minute = dateInstance.getMinutes();
    const todayTime = await `${hour}:${minute}`;

    const subuh = respon.Fajr;
    const duhur = respon.Dhuhr;
    const asar = respon.Asr;
    const magrib = respon.Maghrib;
    const isya = respon.Isha;

    dispatch({
        type: SET_JADWAL_SALAT,
        payload: [
            {nama: "Subuh", waktu: subuh},
            {nama: "Duhur", waktu: duhur},
            {nama: "Asar", waktu: asar},
            {nama: "Magrib", waktu: magrib},
            {nama: "Isya", waktu: isya}
        ]
    });

    if (todayTime > subuh && todayTime < duhur) {
        // Waktu Subuh
        dispatch({type: SET_SALAT_NOW, payload: 'subuh'});
    } else if (todayTime > duhur && todayTime < asar) {
        // Waktu Duhur
        dispatch({type: SET_SALAT_NOW, payload: 'duhur'});
    } else if (todayTime > asar && todayTime < magrib) {
        // Waktu Asar
        dispatch({type: SET_SALAT_NOW, payload: 'asar'});
    } else if (todayTime > magrib && todayTime < isya) {
        // Waktu Maghrib
        dispatch({type: SET_SALAT_NOW, payload: 'magrib'});
    } else if (todayTime > isya && todayTime < "23:59") {
        //Waktu Isya
        dispatch({type: SET_SALAT_NOW, payload: 'isya'});
    } else if (todayTime > "00:00" && todayTime < subuh) {
        //Waktu Isya Kemarin
        dispatch({type: SET_SALAT_NOW, payload: 'isya'});
    }

};