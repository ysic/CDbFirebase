export class Concert {
  constructor(
    public artistId: string,
    public date: Date,
    public name: string,
    public place: string,
    public type: string,
    public city: string,
    public country: string,
    public ratingAvg: number = 0,
  ) {}

}
