import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcertformComponent } from './concertform.component';

describe('ConcertformComponent', () => {
  let component: ConcertformComponent;
  let fixture: ComponentFixture<ConcertformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConcertformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConcertformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should render a text in a h3 tag title', async(() => {
    const fixture = TestBed.createComponent(ConcertformComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h3').textContent).toContain('Add a new concert');
  }));

});
