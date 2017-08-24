import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapFestivalsComponent } from './map-festivals.component';

describe('MapFestivalsComponent', () => {
  let component: MapFestivalsComponent;
  let fixture: ComponentFixture<MapFestivalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapFestivalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapFestivalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
