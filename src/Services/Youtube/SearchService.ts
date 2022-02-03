import * as Youtube from "youtube-search-without-api-key";

export default class YoutubeService {
  async Search(name: string) {
    const result = await Youtube.search(name);
    return result[0];
  }
}
