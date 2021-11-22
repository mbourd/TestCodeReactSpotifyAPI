import axios from "axios"
import { api, services } from "../.."
import qs from "qs"
import { environnement } from "../../config/environnement/environnement"

export default class spotify {
  defaultHeaders = {
    headers: {
      "Accept": 'application/json',
      'Content-Type': 'application/json'
    }
  }

  getAccessToken = (client_id, client_secret, spotify_code, redirect_uri) => {
    return axios.post(
      "https://accounts.spotify.com/api/token",
      qs.stringify({ 'grant_type': 'authorization_code', 'code': spotify_code, 'redirect_uri': redirect_uri }),
      {
        headers: {
          'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')),
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );
  }

  refreshAccessToken = (client_id, client_secret, refresh_token) => {
    return axios.post(
      "https://accounts.spotify.com/api/token",
      qs.stringify({ 'grant_type': 'refresh_token', 'refresh_token': refresh_token }),
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

  search = (query = "", market = "FR", type = "album", offset = 0, limit = 20) => {
    return api.get(`search`,
      {
        params: { q: query, type, market, offset, limit },
        ...this.defaultHeaders
      }
    );
  }

  searchAlbum = (query = "", market = "FR", offset = 0, limit = 20) => {
    return this.search(query, market, "album", offset, limit);
  }

  getAlbumInfo = (id) => {
    return api.get("albums/" + id);
  }

  redirectToAuthorize = (client_id, scope = "playlist-read-private playlist-read-collaborative user-library-read") => {
    window.location.href = "https://accounts.spotify.com/authorize?" + qs.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: environnement.redirectUri,
      state: services.customMethod.makeID(15)
    });
  }
}
