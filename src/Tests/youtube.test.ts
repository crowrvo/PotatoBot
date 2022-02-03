import YoutubeService from "../Services/Youtube/SearchService";

jest.setTimeout(900000);
test("Testa busca no Yt", async () => {

  const service = new YoutubeService()
  const result = await service.Search("batata")

  console.log(result)

  expect(result).toBeDefined()
});
