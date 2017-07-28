
//the BrowserModule that this and every application needs to run in a browser.
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';

import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { FooterComponent } from './core/footer/footer.component';
import { NavComponent } from './core/nav/nav.component';
import { HomeComponent } from './core/home/home.component';
import { ConcertformComponent } from './core/concertform/concertform.component';
import { ArtistComponent } from './core/artist/artist.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { environment } from '../environments/environment';

import { AuthService } from './shared/services/auth.service';
import { SearchService } from './shared/services/search.service';
import { RatingService } from './shared/services/rating.service';
import { SearchComponent } from './core/search/search.component';

import { StarRatingModule } from 'angular-star-rating';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'concert', component: ConcertformComponent },
  { path: 'artist/:artistId', component: ArtistComponent },
  { path: 'search/:query', component: SearchComponent },
  { path: '**', component: PageNotFoundComponent }
];

//The @NgModule decorator identifies AppModule as an Angular module class
@NgModule({
  //Specifies a list of directives/pipes that belong to this module. (components)
  declarations: [
    AppComponent,
    FooterComponent,
    NavComponent,
    HomeComponent,
    ConcertformComponent,
    ArtistComponent,
    PageNotFoundComponent,
    SearchComponent
  ],

  //Specifies a list of modules whose exported directives/pipes should be
  //available to templates in this module (Modules)
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),  // imports firebase/app needed for everything
    RouterModule.forRoot(appRoutes),
    AngularFireDatabaseModule, // imports firebase/database, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    StarRatingModule.forRoot()
  ],

  //Defines the set of injectable objects that are available in the injector of
  //this module. (services)
  providers: [
    AuthService,  //auth sevice with AngularFire
    SearchService,  //search an artist service
    RatingService // rating concerts and artists service
  ],

  //the root component that Angular creates and inserts into the index.html
  //host web page.
  bootstrap: [AppComponent]
})

//The module declares some objects to be public by marking them with the export
//key word
export class AppModule { }
