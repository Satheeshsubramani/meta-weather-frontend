import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';
import { GridModule } from '@progress/kendo-angular-grid';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { HeaderBarComponent } from './components/header-bar/header-bar.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';

import { AgmCoreModule } from '@agm/core';
import {NgxSpinnerModule} from 'ngx-spinner';
import {FormsModule} from '@angular/forms';
import { WeatherLightBoxComponent } from './components/weather-light-box/weather-light-box.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    HeaderBarComponent,
    NavigationBarComponent,
    WeatherLightBoxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDotkEs6d-aqIEjTvITnTImFuf5Riu01lE'
    }),
    NgxSpinnerModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    NgSelectModule,
    GridModule
  ],
  entryComponents: [
    WeatherLightBoxComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
