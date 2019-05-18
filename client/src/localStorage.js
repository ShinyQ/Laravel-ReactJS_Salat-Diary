//Load Presisted State From localstorage
export const loadState = () => {
    try {
        const auth = {
            isJustRegister: null,
            error: null,
        };

        const state = {
            auth: auth
        };

        const serializedState = localStorage.getItem('token');
        if (serializedState == null) {
            return undefined
        }
        return {...state, auth: {...auth, token: serializedState}};
    } catch (e) {
        console.log(e);
        return undefined;
    }
};

// Saving Presisted State to LocalStorage
export const saveState = (token) => {
    try {
        localStorage.setItem('token', token);
    } catch {
        // ignore write errors
    }
};