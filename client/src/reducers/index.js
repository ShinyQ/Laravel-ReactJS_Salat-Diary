import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import locationReducer from "./locationReducer";
import authReducer from "./authReducer";
import widgetReducer from "./widgetReducer";

export default combineReducers({
    auth: authReducer,
    location: locationReducer,
    widget: widgetReducer,
    form: formReducer
})