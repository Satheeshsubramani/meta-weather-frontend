import {Component, ChangeDetectionStrategy, OnInit, Injector} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Subject, BehaviorSubject} from 'rxjs';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {NgxSpinnerService} from 'ngx-spinner';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import {WeatherLightBoxComponent} from '../weather-light-box/weather-light-box.component';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})

export class HomepageComponent implements OnInit {
  public searchKey = 'Chennai';
  public searchKeyDebouncedValue = this.searchKey;
  public weatherReport: any;
  private searchKeyDebouncers: Subject<string> = new Subject();

  constructor(private http: HttpClient, public spinner: NgxSpinnerService, public ngbModal: NgbModal) {
  }

  public ngOnInit(): void {
    this.setWeatherDebouncers();

    this.fetchWeatherReports(this.searchKey);
  }

  public onSearchInputChange(searchParameter: string): void {
    this.searchKeyDebouncers.next(searchParameter);
  }

  private setWeatherDebouncers(): void {
    this.searchKeyDebouncers.pipe(
      debounceTime(3000),
      distinctUntilChanged(),
    ).subscribe((searchParameter: string) => {
      this.searchKeyDebouncedValue = searchParameter;
      this.fetchWeatherReports(searchParameter);
    });
  }

  private getHttpOptions() {
    return {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
  }

  private fetchWeatherReports(searchParameter: string): void {
    if (searchParameter) {
      this.spinner.show();
      const queryString = searchParameter.toLowerCase().trim();
      const url = 'https://api.weatherbit.io/v2.0/current?city=' + queryString + '&key=779b066a0a514a508f513a773a2a4170';
      console.log(url);
      this.http.get(url, this.getHttpOptions()).subscribe((results) => {
        this.weatherReport = results;
        this.spinner.hide();
      });
    }
  }

  openWeatherDetailsModal() {
    console.log('openWeatherDetailsModal');
    const modal = this.ngbModal.open(WeatherLightBoxComponent, {
      centered: true,
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
      windowClass: 'modal-xxl',
    });
    modal.componentInstance.weatherCity = this.weatherReport.data[0].city_name;
    modal.componentInstance.weatherReport = this.weatherReport;
  }
}
