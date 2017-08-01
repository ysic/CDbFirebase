export class Concert {
  constructor(
    public artistID: string,
    public date: Date,
    public name: string,
    public type: string,
    public venueID: string,
    // ? means it'is optional, so the constructor lets you omit it
    public comments?: {
      commentID?: boolean
    }
  ) {}
}

// export class Concert {
//   constructor(
//     public artistID: string,
//     public date: Date,
//     public name: string,
//     public ratings: {
//       1: number,
//       2: number,
//       3: number,
//       4: number,
//       5: number,
//       6: number,
//       7: number,
//       8: number,
//       9: number,
//       10: number,
//       ratingAvg: number,
//       ratingNum: number
//     },
//     public type: string,
//     public venueID: string,
//     // ? means it'is optional, so the constructor lets you omit it
//     public comments?: {
//       commentID?: boolean
//     }
//   ) {}
// }
