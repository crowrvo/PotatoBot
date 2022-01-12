import * as yt from "youtube-search-without-api-key";

jest.setTimeout(900000);
test("Testa busca no Yt", async () => {
  const videos = await yt.search("bmth kingslayer");
  console.log(videos[0].snippet.thumbnails.url);
  expect(true).toBe(true);
});
