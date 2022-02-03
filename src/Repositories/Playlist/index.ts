import { Database } from "beta.db"
import MusicEntity from "../../Contexts/Music/Entities/MusicEntity"
import IPlaylistRepository from "../../Contexts/Music/Repositories/IPlaylistRepository"

export default class PlaylistRepository implements IPlaylistRepository {

  private _playList: Database

  constructor() {
    this._playList = new Database("./src/Repositories/Playlist/Playlist.json")
  }

  public getPlaylist(): MusicEntity[] {
    return this._playList.fetch("playlist") as MusicEntity[]
  }
  public addMusic(music: MusicEntity): boolean {
    this._playList.push("playlist", music);
    return true;
  }
  public removeMusic(id: number): boolean {
    this._playList.delete("playlist", id);
    return;
  }
}