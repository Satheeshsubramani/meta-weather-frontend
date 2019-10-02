import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-weather-light-box',
  templateUrl: './weather-light-box.component.html',
  styleUrls: ['./weather-light-box.component.scss']
})
export class WeatherLightBoxComponent implements OnInit {
  weatherCity: any;
  weatherReport: any;
  constructor(public modalService: NgbActiveModal) { }

  ngOnInit() {
    console.log(this.weatherCity, this.weatherReport);
  }

}
