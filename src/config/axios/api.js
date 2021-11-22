
import Axios from "axios";
import { services } from "../..";
import { environnement } from "../environnement/environnement";

export const api = () => {
  const axios = Axios.create(
    {
      baseURL: environnement.baseURL,
      // withCredentials: true
    }
  )

  //Request interceptor
  axios.interceptors.request.use(request => {
    let _request = {
      ...request, headers: {
        ...request.headers,
        Authorization: `Bearer ${sessionStorage.getItem('access_token')}`
      }
    }

    return _request;
  });

  //Response interceptor
  axios.interceptors.response.use((response) => response, error => {
    if (error.response.status === 401) {
      services.spotify
        .getAccessToken(
          environnement.clientId,
          environnement.clientSecret,
          sessionStorage.getItem("spotify_code"),
          environnement.redirectUri
        )
        .then((response) => {
          sessionStorage.setItem("access_token", response.data.access_token);
        })
        .catch((error) => console.log(error));
    }
  });

  return axios;
}
