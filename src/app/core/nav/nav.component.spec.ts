// //TestBed is the first and most important of the Angular testing utilities.
// //It creates an Angular testing module
//
// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import { NavComponent } from './nav.component';
//
// describe('NavComponent', () => {
//   let component: NavComponent;
//   let fixture: ComponentFixture<NavComponent>;
//
//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [ NavComponent ], // declare the test component
//     })
//     .compileComponents();
//   }));
//
//   beforeEach(() => {
//     fixture = TestBed.createComponent(NavComponent);
//     component = fixture.componentInstance; // NavComponent test instance
//     fixture.detectChanges();
//   });
//
//   it('should be created', () => {
//     expect(component).toBeTruthy();
//   });
//
//   it('should render a text in a navbar-brand class', async(() => {
//     const fixture = TestBed.createComponent(NavComponent);
//     fixture.detectChanges();
//     const compiled = fixture.debugElement.nativeElement;
//     expect(compiled.querySelector('.navbar-brand').textContent).toContain('CDb');
//   }));
//
//   it('should render a text in a AddConcert class', async(() => {
//     const fixture = TestBed.createComponent(NavComponent);
//     fixture.detectChanges();
//     const compiled = fixture.debugElement.nativeElement;
//     expect(compiled.querySelector('.AddConcert').textContent).toContain('Add a concert');
//   }));
//
// });
