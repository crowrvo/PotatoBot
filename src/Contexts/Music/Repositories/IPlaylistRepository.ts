import MusicEntity from "../Entities/MusicEntity";

export default interface IPlaylistRepository {
  getPlaylist(): MusicEntity[];
  addMusic(music: MusicEntity): boolean;
  removeMusic(id: number): boolean;
}