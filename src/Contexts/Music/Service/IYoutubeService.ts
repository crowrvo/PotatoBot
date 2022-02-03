import { YoutubeSearchResult } from "../Entities";

export default interface IYoutubeService {
  Search(name: string): Promise<YoutubeSearchResult[]>
}