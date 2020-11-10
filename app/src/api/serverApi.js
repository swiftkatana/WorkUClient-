import axios from "axios";

import ip from "./serverIP";
var config = {
  baseURL: ip,
  timeout: 1000,
  headers: { "Access-Control-Allow-Origin": "*" },
};
export default axios.create(config);
