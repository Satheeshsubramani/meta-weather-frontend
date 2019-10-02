import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomepageComponent } from './components/homepage/homepage.component';

export const routes: Routes = [
  {
    path: '',
    component: HomepageComponent,
    resolve: {  }
  },
  {
    path: 'metaWeather',
    redirectTo: '/'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule {
}

