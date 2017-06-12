
//the BrowserModule that this and every application needs to run in a browser.
import { BrowserModule } from '@angular/platform-browser';

import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';

//The @NgModule decorator identifies AppModule as an Angular module class
@NgModule({

  //Specifies a list of directives/pipes that belong to this module.
  declarations: [AppComponent, FooterComponent],

  //Specifies a list of modules whose exported directives/pipes should be
  //available to templates in this module
  imports: [BrowserModule],

  //Defines the set of injectable objects that are available in the injector of
  //this module.
  providers: [],

  //the root component that Angular creates and inserts into the index.html
  //host web page.
  bootstrap: [AppComponent]
})

//The module declares some objects to be public by marking them with the export
//key word
export class AppModule { }
