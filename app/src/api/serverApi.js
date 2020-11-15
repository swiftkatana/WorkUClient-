import axios from "axios";

import ip from "./serverIP";
var config = {
  baseURL: ip,
  timeout: 9000,
  headers: { "Access-Control-Allow-Origin": "*" },
};
export default axios.create(config);
