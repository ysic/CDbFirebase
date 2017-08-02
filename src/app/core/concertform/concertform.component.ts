import { Component } from '@angular/core';
import { Concert } from '../../shared/models/concert';
import { AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';

@Component({
  selector: 'app-concertform',
  templateUrl: './concertform.component.html',
  styleUrls: ['./concertform.component.css']
})

export class ConcertformComponent {

  types = ["concert", "festival"];

  countries = ["Choose a Country", "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Anguilla", "Antigua &amp; Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas"
    , "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia &amp; Herzegovina", "Botswana", "Brazil", "British Virgin Islands"
    , "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Chad", "Chile", "China", "Colombia", "Congo", "Cook Islands", "Costa Rica"
    , "Cote D Ivoire", "Croatia", "Cruise Ship", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea"
    , "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Polynesia", "French West Indies", "Gabon", "Gambia", "Georgia", "Germany", "Ghana"
    , "Gibraltar", "Greece", "Greenland", "Grenada", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India"
    , "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kuwait", "Kyrgyz Republic", "Laos", "Latvia"
    , "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Mauritania"
    , "Mauritius", "Mexico", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Namibia", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia"
    , "New Zealand", "Nicaragua", "Niger", "Nigeria", "Norway", "Oman", "Pakistan", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal"
    , "Puerto Rico", "Qatar", "Reunion", "Romania", "Russia", "Rwanda", "Saint Pierre &amp; Miquelon", "Samoa", "San Marino", "Satellite", "Saudi Arabia", "Senegal", "Serbia", "Seychelles"
    , "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "South Africa", "South Korea", "Spain", "Sri Lanka", "St Kitts &amp; Nevis", "St Lucia", "St Vincent", "St. Lucia", "Sudan"
    , "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor L'Este", "Togo", "Tonga", "Trinidad &amp; Tobago", "Tunisia"
    , "Turkey", "Turkmenistan", "Turks &amp; Caicos", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "United States Minor Outlying Islands", "Uruguay", "Uzbekistan", "Venezuela", "Vietnam", "Virgin Islands (US)"
    , "Yemen", "Zambia", "Zimbabwe"];

  modelConcert = new Concert('', new Date(), '', '', '');
  public artists: FirebaseListObservable<any[]>;
  public venues: FirebaseListObservable<any[]>;

  constructor(private db: AngularFireDatabase) {
    //-KqOq9NrEvzw_RK2LlMH Arcade Fire
    this.artists = this.db.list('/artists', {
      query: { orderByChild: 'name', equalTo: "Arcade Fire" }
    });

  }

  selectCountry(country) {
    this.venues = this.db.list('/venues', {
      query: { orderByChild: 'country', equalTo: country }
    });
  }
  // need to check if the concert already existe!!!!!!!

  //method
  //hen we refer to one of the members of the class we prepend this.. This denotes that it’s a member access.
  onSubmit(artistID, date, name, type, venueID) {

    const ratings = {"1":0, "2":0, "3":0, "4":0, "5":0, "6":0, "7":0, "8":0, "9":0, "10":0, "ratingAvg":0, "ratingNum":0};
    const concertID = this.db.list('/concerts').push({ artistID: artistID, name: name, date: date, type: type, venueID: venueID, ratings: ratings }).key;
    this.db.object('/artists/' + artistID + '/concerts').update({[concertID]: true});
    this.db.object('/artists/' + artistID + '/ratingAvg').take(1).subscribe(ratingAvg =>{
      console.log(ratingAvg.$value);
      if(!ratingAvg.$value) {
        console.log("no ratingAvg was existing before for this artist");
        this.db.object('/artists/' + artistID).update({"ratingAvg": 0});
      }
    });

    // this.db.list('/artists/'  + artistID + '/concerts').remove();
    // this.db.list('/artists/'  + artistID + '/ratingAvg').remove();

    this.db.object('/artists/' + artistID).subscribe(artistSnapshot => {
      console.log(artistSnapshot);
    })
  }
}
