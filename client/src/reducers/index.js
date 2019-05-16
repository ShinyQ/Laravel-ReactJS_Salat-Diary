import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import locationReducer from "./locationReducer";
import authReducer from "./authReducer";

export default combineReducers({
    auth: authReducer,
    location: locationReducer,
    form: formReducer
})