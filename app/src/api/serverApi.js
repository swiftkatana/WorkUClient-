import axios from 'axios';

import ip from './serverIP'
var config = {
    headers: { 'Access-Control-Allow-Origin': '*' }
};
export default axios.create({ baseURL: ip }, config);