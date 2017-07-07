export class Comments {
  constructor(
    public concertId: string,
    public rating: Number,
    public comment: String,
    public author: String,
    public date: Date
  ) {}
}
