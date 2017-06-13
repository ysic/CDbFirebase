//the Angular template compiler must read the external files from the file system
// before it can create a component instance. That's an asynchronous activity.
// in our case the templates are html and css files
import { async } from '@angular/core/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  // async beforeEach
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterComponent ] // declare the test component
    })
    .compileComponents();  // compile template and css
  }));

  // synchronous beforeEach
  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance; // FooterComponent test instance
    //fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should be owner Orane REULAND', () => {
    fixture.detectChanges();
    expect(component.owner).toBe('Orane REULAND');
  });

  it('should be copyright as © Copyright 2017 Concerts Database', () => {
    fixture.detectChanges();
    expect(component.copyright).toBe('© Copyright 2017 Concerts Database');
  });

  it('should render a text in a footer tag', async(() => {
    const fixture = TestBed.createComponent(FooterComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('footer').textContent).toContain('© Copyright 2017 Concerts Database');
  }));



});
