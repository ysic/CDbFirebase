export class Concert {
  constructor(
    public artistID: string,
    public date: Date,
    public name: string,
    public ratingAvg: number,
    public type: string,
    public venueID: string,
    // ? means it'is optional, so the constructor lets you omit it
    public comments?: {
      commentID?: boolean
    }
  ) {}
}
