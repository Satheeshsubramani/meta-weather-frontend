import {Component, ChangeDetectionStrategy, OnInit, Injector} from '@angular/core';
import {Subject} from 'rxjs';
import * as _ from 'lodash';
import {count, debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {NgxSpinnerService} from 'ngx-spinner';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {WeatherLightBoxComponent} from '../weather-light-box/weather-light-box.component';
import {ConfigurationService} from '../../services/configuration.service';
import {SecureHttpClientService} from '../../services/secure-http-client/secure-http-client.service';
import {SortDescriptor} from '@progress/kendo-data-query';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})

export class HomepageComponent implements OnInit {
  public searchKey = 'New York';
  public searchKeyDebouncedValue = this.searchKey;
  public weatherReport: any;
  public searchKeyDebouncers: Subject<string> = new Subject();
  public weatherReportData: any = [];
  public sort: SortDescriptor[] = [{ field: 'city_name', dir: 'asc' }];
  public filterByLocation = [{
    name: 'USA Cities',
    pk_id: 'usa',
    disabled: true
  }, {
    name: 'New York',
    pk_id: 'New York',
    disabled: false
  }, {
    name: 'chicago',
    pk_id: 'chicago',
    disabled: false
  }, {
    name: 'California',
    pk_id: 'California',
    disabled: false
  }, {
    name: 'Brooklyn',
    pk_id: 'Brooklyn',
    disabled: false
  }, {
    name: 'Houston',
    pk_id: 'Houston',
    disabled: false
  }, {
    name: 'Texas',
    pk_id: 'Texas',
    disabled: false
  }, {
    name: 'Philadelphia',
    pk_id: 'Philadelphia',
    disabled: false
  }, {
    name: 'Pennsylvania',
    pk_id: 'Pennsylvania',
    disabled: false
  }, {
    name: 'Phoenix',
    pk_id: 'Phoenix',
    disabled: false
  }, {
    name: 'San Antonio',
    pk_id: 'San Antonio',
    disabled: false
  }, {
    name: '=========',
    pk_id: '==1',
    disabled: true
  },
    {
      name: 'Canada Cities',
      pk_id: 'usa',
      disabled: true
    }, {
      name: 'Toronto',
      pk_id: 'Toronto',
      disabled: false
    }, {
      name: 'Montreal',
      pk_id: 'Montreal',
      disabled: false
    }, {
      name: 'Vancouver',
      pk_id: 'Vancouver',
      disabled: false
    }, {
      name: 'Calgary',
      pk_id: 'Calgary',
      disabled: false
    }, {
      name: 'Edmonton',
      pk_id: 'Edmonton',
      disabled: false
    }, {
      name: 'Hamilton',
      pk_id: 'Hamilton',
      disabled: false
    }, {
      name: '=========',
      pk_id: '========222',
      disabled: true
    }, {
      name: 'UK Cities',
      pk_id: 'UK Cities',
      disabled: true
    }, {
      name: 'London',
      pk_id: 'London',
      disabled: false
    }, {
      name: 'Edinburgh',
      pk_id: 'Edinburgh',
      disabled: false
    }, {
      name: 'Manchester',
      pk_id: 'Manchester',
      disabled: false
    }, {
      name: 'Birmingham',
      pk_id: 'Birmingham',
      disabled: false
    }, {
      name: 'Glasgow',
      pk_id: 'Glasgow',
      disabled: false
    }, {
      name: 'Bristol',
      pk_id: 'Bristol',
      disabled: false
    }, {
      name: '=========',
      pk_id: '=====33333',
      disabled: true
    }, {
      name: 'Austrialia',
      pk_id: 'Austrialia',
      disabled: true
    }, {
      name: 'Canberra',
      pk_id: 'Canberra',
      disabled: false
    }, {
      name: 'Brisbane',
      pk_id: 'Brisbane',
      disabled: false
    }, {
      name: 'Darwin',
      pk_id: 'Darwin',
      disabled: false
    }, {
      name: 'Gold coast',
      pk_id: 'Gold coast',
      disabled: false
    }, {
      name: 'Hobart',
      pk_id: 'Hobart',
      disabled: false
    }, {
      name: 'Perth',
      pk_id: 'Perth',
      disabled: false
    }, {
      name: 'India Cities',
      pk_id: 'Delhi',
      disabled: true
    }, {
      name: '=========',
      pk_id: '======4444',
      disabled: true
    }, {
      name: 'Delhi',
      pk_id: 'Delhi',
      disabled: false
    }, {
      name: 'Mumbai',
      pk_id: 'Mumbai',
      disabled: false
    }, {
      name: 'Chennai',
      pk_id: 'Chennai',
      disabled: false

    }, {
      name: 'Bangalore',
      pk_id: 'Bangalore',
      disabled: false
    }, {
      name: 'Coimbatore',
      pk_id: 'Coimbatore',
      disabled: false
    }, {
      name: 'Salem',
      pk_id: 'Salem',
      disabled: false
    }, {
      name: 'Madurai',
      pk_id: 'Madurai',
      disabled: false
    }, {
      name: 'Hyderabad',
      pk_id: 'Hyderabad',
      disabled: false
    }, {
      name: 'Cochin',
      pk_id: 'Cochin',
      disabled: false
    }, {
      name: 'Thiruvananthapuram',
      pk_id: 'Thiruvananthapuram',
      disabled: false
    },
  ];

  constructor(public spinner: NgxSpinnerService,
              public ngbModal: NgbModal,
              public configurationService: ConfigurationService,
              public httpClient: SecureHttpClientService) {
  }

  public ngOnInit() {
    this.setWeatherDebouncers();

    this.fetchWeatherReports(this.searchKey);
  }

  public onSearchInputChange(searchParameter: string): void {
    this.searchKeyDebouncers.next(searchParameter);
  }

  private setWeatherDebouncers(): void {
    this.searchKeyDebouncers.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
    ).subscribe((searchParameter: string) => {
      this.searchKeyDebouncedValue = searchParameter;
      this.fetchWeatherReports(searchParameter);
    });
  }

  private fetchWeatherReports(searchParameter: string): void {
    if (searchParameter) {
      this.spinner.show();
      const queryString = searchParameter.toLowerCase().trim();
      const url = this.configurationService.getApiUrl() + '?city=' + queryString + '&key=779b066a0a514a508f513a773a2a4170';
      this.httpClient.getSearchResult(url).subscribe((results) => {
        this.weatherReport = results;
        // tslint:disable-next-line:only-arrow-functions
        const lastObservationData = _.remove(this.weatherReportData, function(data) {
           // @ts-ignore
          return data.city_name === results.data[0].city_name;
        });
        console.log(lastObservationData);
        // Simple logic to avoid duplicate data in Grid and fetech latestmobservation from back end.
        this.weatherReportData.push(results.data[0]);
        this.spinner.hide();
      });
    }
  }

  openWeatherDetailsModal(dataItem) {
    console.log('dataItem', dataItem);
    const modal = this.ngbModal.open(WeatherLightBoxComponent, {
      centered: true,
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
      windowClass: 'modal-xxl',
    });
    modal.componentInstance.weatherCity = dataItem.city_name;
    modal.componentInstance.weatherReport = dataItem;
  }
}

