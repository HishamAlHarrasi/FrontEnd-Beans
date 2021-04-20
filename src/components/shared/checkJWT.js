import axios from "axios";
import jwt_decode from "jwt-decode";

const checkJWT = async () => {
    const token = window.localStorage.getItem('access_token');
    
    if (token) {

    const config = {
      headers: { Authorization: `Bearer ${token}`, withCredentials: true }
    }

    let decoded = jwt_decode(token);
    let currentTime = (new Date().getTime() + 1) / 1000;

      if (currentTime >= decoded.exp) {
        try {
          const resp = await axios.post("http://" + process.env.REACT_APP_server + "/auth/refresh", {}, { withCredentials: "include" });
          window.localStorage.setItem('access_token', resp.data.access_token);
          return resp;
        } catch (err) {
          console.error(err);
          window.localStorage.clear();
          window.location = "/login";
          return false;
        }      
      }

    } else {
      window.location = "/login";
      window.localStorage.clear()
    }

} 

export default checkJWT;