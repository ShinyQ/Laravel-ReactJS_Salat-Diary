import _ from 'lodash';
import moment from 'moment'
import jadwalShalat from '../apis/jadwalShalat';
import {GET_INTERVAL_NEXT_SALAT, GET_NEXT_SALAT, SET_JADWAL_SALAT, SET_SALAT_NOW} from "../constant";

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

    const todayTime = await moment().format("HH:mm");

    const subuh = respon.Fajr;
    const duhur = respon.Dhuhr;
    const asar = respon.Asr;
    const magrib = respon.Maghrib;
    const isya = respon.Isha;

    dispatch({
        type: SET_JADWAL_SALAT,
        payload: [
            {nama: "subuh", waktu: subuh},
            {nama: "duhur", waktu: duhur},
            {nama: "asar", waktu: asar},
            {nama: "magrib", waktu: magrib},
            {nama: "isya", waktu: isya}
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
        console.log("Masuk Isya");
        dispatch({type: SET_SALAT_NOW, payload: 'isya'});
    }

};

export const countDownNextSalat = () => async (dispatch, getState) => {
    const jadwalSalat = getState().dataSalat.jadwalSalat;
    const salatNow = getState().dataSalat.salatNow;

    console.log(jadwalSalat);
    console.log(salatNow);

    if (jadwalSalat !== null && salatNow !== null) {
        console.log("Masuk Sini");
        const todayDate = moment().format("YYYY-MM-Do");
        const tsNow = moment().unix();
        let waktuSalatNext;
        let timestampNext;
        const nextSalat = await jadwalSalat.map(a => a.nama).indexOf(salatNow);

        if (nextSalat === 4) {
            dispatch({type: GET_NEXT_SALAT, payload: jadwalSalat[0].nama});
            waktuSalatNext = jadwalSalat[0].waktu;
            timestampNext = moment(`${todayDate} ${waktuSalatNext}`).unix()
        } else {
            dispatch({type: GET_NEXT_SALAT, payload: jadwalSalat[nextSalat + 1].nama});
            waktuSalatNext = jadwalSalat[nextSalat + 1].waktu;
            timestampNext = moment(`${todayDate} ${waktuSalatNext}`).unix()
        }

        const diffTime = timestampNext - tsNow;
        let duration = moment.duration(diffTime * 1000, 'milliseconds');
        const interval = 1000;
        setInterval(() => {
                duration = moment.duration(duration - interval, 'milliseconds');

                const intervalNext = `${duration.hours()} : ${duration.minutes()} : ${duration.seconds()}`;
                const parseMoment = moment(intervalNext, "H:m:s").format("HH:mm:ss");
                dispatch({type: GET_INTERVAL_NEXT_SALAT, payload: parseMoment});
            }, interval
        );
    }
};