import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherLightBoxComponent } from './weather-light-box.component';

describe('WeatherLightBoxComponent', () => {
  let component: WeatherLightBoxComponent;
  let fixture: ComponentFixture<WeatherLightBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeatherLightBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherLightBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
