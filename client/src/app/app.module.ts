import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpModule} from '@angular/http'
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';

// Services
import { DataService } from './services/data.service';

import {BusyModule} from 'angular2-busy';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
  ],
  imports: [
      BrowserModule,
      HttpModule,
      HttpClientModule,
      FormsModule,
      BrowserAnimationsModule,
      BusyModule
  ],
    providers: [
        DataService,
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
