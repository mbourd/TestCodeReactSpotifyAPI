
import Axios from "axios";
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
        // "Authorization": "Bearer BQAP-p4pDpLXQVWhwyGYYUvLYQmUzol2GfjJcl3nIRXtg0z84yp6a5MB9gqsEqRug-4LTVLw4INtv0YYDy0udrNCfg663fFV8vBKzsaC-Hm4SJI4h5HL-AuxqdjemO12HqSRLeSFbqWxQUmMFwAiInJ9Hu0",
      }
    }

    return _request;
  })

  return axios;
}
