import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import locationReducer from "./locationReducer";
import authReducer from "./authReducer";
import widgetReducer from "./widgetReducer";
import globalReducer from "./globalReducer";
import dataSalatReducer from "./dataSalatReducer";

export default combineReducers({
    auth: authReducer,
    location: locationReducer,
    widget: widgetReducer,
    global: globalReducer,
    dataSalat: dataSalatReducer,
    form: formReducer
})