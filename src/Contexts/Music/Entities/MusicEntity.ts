export default class MusicEntity {
  constructor(
    private _id: string,
    private _title: string,
    private _url: string,
    private _thumbnail: string,
    private _duration: number,
    private _requester: string
  ) { }

  public get id(): string {
    return this._id;
  }

}
