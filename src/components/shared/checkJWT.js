import axios from "axios";
import jwt_decode from "jwt-decode";

const checkJWT = async () => {
  const token = window.localStorage.getItem("access_token");

  if (token) {
    const config = {
      headers: { Authorization: `Bearer ${token}`, withCredentials: true },
    };

    let decoded = {};
    let currentTime = 0;

    // Decodes the access token and checks if it has expired
    try {
      decoded = jwt_decode(token);
      currentTime = (new Date().getTime() + 1) / 1000;
    } catch (err) {
      console.log(err);
      window.localStorage.clear();
      window.location = "/login";
      return false;
    }

    // Attempts to refresh the access token using the refresh token, if it fails (meaning refresh token has expired), redirect user to login page
    if (currentTime >= decoded.exp) {
      try {
        const resp = await axios.post(
          process.env.REACT_APP_SERVER_PROTO +
            process.env.REACT_APP_SERVER_ADDR +
            "/auth/refresh",
          {},
          { withCredentials: "include" }
        );
        window.localStorage.setItem("access_token", resp.data.access_token);
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
};

export default checkJWT;
