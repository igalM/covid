import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core.module';
import { HomepageComponent } from './homepage/homepage.component';
import { StatisticsEffects } from 'src/store/effects/statistics.effects';
import * as fromApp from '../store/index';
import { LoaderComponent } from './loader/loader.component';

const components = [
  AppComponent,
  HomepageComponent,
  LoaderComponent
]

const effects = [
  StatisticsEffects
]

@NgModule({
  declarations: [
    components
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot(effects),
    StoreDevtoolsModule.instrument({ maxAge: 25 })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
