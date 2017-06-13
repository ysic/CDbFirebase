
//the BrowserModule that this and every application needs to run in a browser.
import { BrowserModule } from '@angular/platform-browser';

import { NgModule } from '@angular/core';

//The Angular Router is an optional service that presents a particular
//component view for a given URL
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { FooterComponent } from './core/footer/footer.component';
import { NavComponent } from './core/nav/nav.component';
import { HomeComponent } from './core/home/home.component';
import { PagenotfoundComponent } from './shared/pagenotfound/pagenotfound.component';


const appRoutes: Routes = [
  //{ path: 'crisis-center', component: CrisisListComponent },
  //{ path: 'hero/:id',      component: HeroDetailComponent },
  //{path: 'heroes', component: HeroListComponent, data: { title: 'Heroes List' }},
  //{ path: '', redirectTo: '/heroes', pathMatch: 'full'},
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: '**', component: PagenotfoundComponent }
];



//The @NgModule decorator identifies AppModule as an Angular module class
@NgModule({

  //Specifies a list of directives/pipes that belong to this module. (components)
  declarations: [AppComponent, FooterComponent, NavComponent, HomeComponent, PagenotfoundComponent],

  //Specifies a list of modules whose exported directives/pipes should be
  //available to templates in this module (Modules)
  imports: [BrowserModule, RouterModule.forRoot(appRoutes)],

  //Defines the set of injectable objects that are available in the injector of
  //this module. (services)
  providers: [],

  //the root component that Angular creates and inserts into the index.html
  //host web page.
  bootstrap: [AppComponent]
})

//The module declares some objects to be public by marking them with the export
//key word
export class AppModule { }
