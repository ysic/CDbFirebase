import { Venue } from './venue';

export class Concert {
  constructor(
    public artistID: string,
    public comments: [{"commentID": boolean}],
    public date: Date,
    public name: string,
    public ratingAvg: number,
    public type: string,
    public venue: Venue,
    //public venueID: string
  ) {}
}
