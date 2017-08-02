import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { APP_BASE_HREF } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FooterComponent } from './core/footer/footer.component';
import { NavComponent } from './core/nav/nav.component';
import { HomeComponent } from './core/home/home.component';
import { ConcertFormComponent } from './core/concert/concert-form.component';
import { ArtistComponent } from './core/artist/artist.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';

import { environment } from '../environments/environment';

import { AuthService } from './shared/services/auth.service';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: '**', redirectTo: 'home' }
];

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        FooterComponent,
        NavComponent,
        HomeComponent,
        ConcertFormComponent,
        ArtistComponent,
        PageNotFoundComponent
      ],
      imports: [
        BrowserModule,
        AngularFireModule.initializeApp(environment.firebase),  // imports firebase/app needed for everything
        RouterModule.forRoot(appRoutes)
      ],
      providers: [{provide: APP_BASE_HREF, useValue: '/'}, AngularFireAuth, AuthService]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  // it('navigate to "" redirects you to /home', fakeAsync(() => {
  //   router.navigate(['']);
  //   tick();
  //   expect(location.path()).toBe('/home');
  // }));

});
