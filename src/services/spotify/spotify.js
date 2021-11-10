import axios from "axios"
import { api } from "../.."
import qs from "qs"

export default class spotify {
  defaultHeaders = {
    headers: {
      "Accept": 'application/json',
      'Content-Type': 'application/json'
    }
  }

  getAccessToken = (client_id, client_secret) => {
    return axios.post(
      "https://accounts.spotify.com/api/token",
      qs.stringify({ 'grant_type': 'client_credentials', 'scope': "playlist-read-private playlist-read-collaborative" }),
      {
        headers: {
          'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')),
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );
  }

  getMyPlaylists = () => {
    return api.get("me/playlists",
      {
        params: { limit: 50, offset: 0 },
        ...this.defaultHeaders
      }
    );
  }

  search = (query = "", market = "FR", type = "album") => {
    return api.get(`search`,
      {
        params: { q: query, type, market },
        ...this.defaultHeaders
      }
    );
  }

  searchAlbum = (query = "", market = "FR") => {
    return this.search(query, market, "album");
  }
}
