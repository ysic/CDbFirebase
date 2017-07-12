export class Comment {
  constructor(
    public concertID: string,
    public artistID: string,
    public userID: string,
    public rating: Number,
    public comment: String,
    public date: Date
  ) {}
}
