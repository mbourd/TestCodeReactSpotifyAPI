import spotify from "./spotify/spotify";

export class services {
  constructor() {
    this.spotify = new spotify();
  }
}
