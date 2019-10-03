import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageComponent } from './homepage.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {NgbActiveModal, NgbModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import * as td from 'testdouble';
import { NgxSpinnerService } from 'ngx-spinner';
import {SecureHttpClientService} from '../../services/secure-http-client/secure-http-client.service';
import {ConfigurationService} from '../../services/configuration.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {Subject} from 'rxjs';

describe('HomepageComponent', () => {
  let component: HomepageComponent;
  let fixture: ComponentFixture<HomepageComponent>;
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
  let mockActiveModal: NgbActiveModal;
  let mockModalService: NgbModal;
  let mockSpinnerService: NgxSpinnerService;
  let mockHttpClient: SecureHttpClientService;
  let mockConfiguration: ConfigurationService;

  beforeEach(async(() => {
    mockActiveModal = td.object(NgbActiveModal.prototype);
    mockModalService = td.object(NgbModal.prototype);
    mockSpinnerService = td.object(NgxSpinnerService.prototype);
    mockHttpClient = td.object(SecureHttpClientService.prototype);
    mockConfiguration = td.object(ConfigurationService.prototype);
    TestBed.configureTestingModule({
      declarations: [ HomepageComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {provide: NgxSpinnerService, useValue: mockSpinnerService},
        {provide: NgbModal, useValue: mockModalService},
        {provide: ConfigurationService, useValue: mockConfiguration},
        {provide: SecureHttpClientService, useValue: mockHttpClient},
      ],
      imports: [FormsModule, ReactiveFormsModule, CommonModule, NgbModule, HttpClientTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepageComponent);
    component = fixture.componentInstance;
    component.weatherReport = expectedWeatherData;
    compiled = fixture.debugElement.nativeElement;
    component.searchKey = 'Chennai';
    component.searchKeyDebouncedValue = 'Chennai';
    component.searchKeyDebouncers = new Subject();
    fixture.detectChanges();
  });
});
