import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import * as td from 'testdouble';

import { WeatherLightBoxComponent } from './weather-light-box.component';
import {NgbActiveModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';

fdescribe('WeatherLightBoxComponent', () => {
  let component: WeatherLightBoxComponent;
  let fixture: ComponentFixture<WeatherLightBoxComponent>;
  let mockNgbActiveModal: NgbActiveModal;
  let compiled: any;
  const expectedWeatherData  = {
    count: 1,
    data: [{
      rh: 83,
      pod: 'd',
      lon: 80.27847,
      pres: 1010.9,
      timezone: 'Asia/Kolkata',
      ob_time: '2019-10-03 02:00',
      country_code: 'IN',
      clouds: 2,
      ts: 1570068000,
      solar_rad: 323,
      state_code: '25',
      city_name: 'Chennai',
      wind_spd: 2.1,
      last_ob_time: '2019-10-03T02:00:00',
      wind_cdir_full: 'west-southwest',
      wind_cdir: 'WSW',
      slp: 1012,
      vis: 5,
      h_angle: -60,
      sunset: '12:28',
      dni: 689.08,
      dewpt: 25.8,
      snow: 0,
      uv: 3.03749,
      precip: 0,
      wind_dir: 250,
      sunrise: '00:28',
      ghi: 322.96,
      dhi: 79.76,
      aqi: 104,
      lat: 13.08784,
      weather: {
        icon: 'c01d',
        code: '800',
        description: 'Clear sky'
      },
      datetime: '2019-10-03:02',
      temp: 29,
      station: 'VOMM',
      elev_angle: 21.27,
      app_temp: 35.5
    }]
  };

  beforeEach(async(() => {
    mockNgbActiveModal = td.object(NgbActiveModal.prototype);
    TestBed.configureTestingModule({
      declarations: [ WeatherLightBoxComponent ],
      providers: [
        {provide: NgbActiveModal, useValue: mockNgbActiveModal}
      ],
      imports: [FormsModule, ReactiveFormsModule, CommonModule, NgbModule, HttpClientModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherLightBoxComponent);
    component = fixture.componentInstance;
    component.weatherCity = expectedWeatherData.data[0].city_name;
    component.weatherReport = expectedWeatherData;
    compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct Header and Helper text in weather light box', () => {
    const expectedHelperText = 'Weather information for Chennai City.';
    const expectedLightBoxHeader = 'Overall weather prediction is Clear sky.';

    expect(compiled.querySelector('#deleteEventsHeader').innerText).toEqual(expectedHelperText);
    expect(compiled.querySelector('#secondaryHeaderText').innerText).toEqual(expectedLightBoxHeader);
  });

  it('should have correct label values', () => {
    expect(compiled.querySelector('#city-label').innerText).toEqual('City');
    expect(compiled.querySelector('#date-label').innerText).toEqual('Date and Time');
    expect(compiled.querySelector('#timezone-label').innerText).toEqual('Time Zone');
    expect(compiled.querySelector('#sunrise-label').innerText).toEqual('Sun Rise');
    expect(compiled.querySelector('#sunset-label').innerText).toEqual('Sun set');
    expect(compiled.querySelector('#winddirection-speed').innerText).toEqual('Wind direction');
    expect(compiled.querySelector('#windspeed-label').innerText).toEqual('Wind Speed');
    expect(compiled.querySelector('#lastobservation-label').innerText).toEqual('Last Observation');
    expect(compiled.querySelector('#temperature-label').innerText).toEqual('Temperature');
    expect(compiled.querySelector('#snowfall-label').innerText).toEqual('Snowfall');
    expect(compiled.querySelector('#visibility-label').innerText).toEqual('Visibility(KM)');
    expect(compiled.querySelector('#clouds-label').innerText).toEqual('Cloud coverage (%)');
    expect(compiled.querySelector('#rh-label').innerText).toEqual('Relative humidity (%)');

  });
  it('should have coorect data bondings', () => {
    expect(compiled.querySelector('#city-value').innerText).toEqual(expectedWeatherData.data[0].city_name);
    expect(compiled.querySelector('#date-value').innerText).toEqual(expectedWeatherData.data[0].datetime);
    expect(compiled.querySelector('#timezone-value').innerText).toEqual(expectedWeatherData.data[0].timezone);
  });
});
