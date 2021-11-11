import spotify from "./spotify/spotify";
import customMethod from "./customMethod";

export class services {
  constructor() {
    this.customMethod = new customMethod();
    this.spotify = new spotify();
  }
}
