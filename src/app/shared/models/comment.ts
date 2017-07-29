export class Comment {
  constructor(
    public artistID: string,
    public comment: String,
    public concertID: string,
    public date: Date,
    public rating: Number,
    public userID: string
  ) {}
}
