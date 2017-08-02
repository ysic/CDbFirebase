import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcertFormComponent } from './concert-form.component';

describe('ConcertformComponent', () => {
  let component: ConcertFormComponent;
  let fixture: ComponentFixture<ConcertFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConcertFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConcertFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should render a text in a h3 tag title', async(() => {
    const fixture = TestBed.createComponent(ConcertFormComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h3').textContent).toContain('Add a new concert');
  }));

});
