import axios from 'axios';

export default axios.create({
    baseURL: `http://api.aladhan.com/v1/`
})