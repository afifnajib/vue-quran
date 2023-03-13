import axios from "axios";

export default axios.get({
  baseURL: "http://api.alquran.cloud/v1/",
  headers: {
    "Content-type": "application/json"
  }
});