import MusicEntity from "../Contexts/Music/Entities/MusicEntity";
import PlaylistRepository from "../Repositories/Playlist";

const service = new PlaylistRepository();
const m = new MusicEntity(
  "isaudusaif",
  "um titulo qualquer",
  "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  "https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
  60,
  "544564564811704784"
);
test("Adiciona uma música na playlist", async () => {
  service.addMusic(m);
});
test("Recupera a playlist", async () => {
  const result = service.getPlaylist();
  console.log(result);
  expect(result).toBeDefined();
  expect(result.length).toBeGreaterThan(0);
});
test("Remove uma musica da playlist playlist", async () => {
  service.removeMusic(0);
});
