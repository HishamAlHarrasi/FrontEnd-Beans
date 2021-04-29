import axios from "axios";
import jwt_decode from "jwt-decode";

const checkJWT = async () => {
    const token = window.localStorage.getItem('access_token');
    
    if (token) {

    const config = {
      headers: { Authorization: `Bearer ${token}`, withCredentials: true }
    }

    let decoded = {}
    let currentTime = 0;

    try {
      decoded = jwt_decode(token);
      currentTime = (new Date().getTime() + 1) / 1000;
    } catch (err) {
      console.log(err);
      window.localStorage.clear();
      window.location = "/login";
      return false;
    }
    

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
      window.localStorage.clear();
      window.location = "/login";
    }

} 

export default checkJWT;