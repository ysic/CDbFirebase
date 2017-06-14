import { Routes } from '@angular/router';
import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';
import { FooterComponent } from './core/footer/footer.component';
import { NavComponent } from './core/nav/nav.component';
import { HomeComponent } from './core/home/home.component';

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
        HomeComponent,
        NavComponent  // declare the test component
      ],
      imports: [RouterTestingModule.withRoutes(appRoutes)],
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
