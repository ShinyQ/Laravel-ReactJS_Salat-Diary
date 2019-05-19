//Load Presisted State From localstorage
export const loadState = () => {
    try {
        const auth = {
            isJustRegister: null,
            error: null,
        };

        const location = {
            error: null,
            provinsi: null,
            kabupaten: null
        };

        const state = {
            auth: auth,
            location: location
        };

        const token = localStorage.getItem('token');
        const lat = localStorage.getItem('lat');
        const long = localStorage.getItem('long');
        if (token == null) {
            return undefined
        }
        return {...state, auth: {...auth, token}, location: {...location, lat, long}};
    } catch (e) {
        console.log(e);
        return undefined;
    }
};

// Saving Presisted State to LocalStorage
export const saveState = (token, lat, long) => {
    try {
        localStorage.setItem('token', token);
        localStorage.setItem('lat', lat);
        localStorage.setItem('long', long);
    } catch {
        // ignore write errors
    }
};