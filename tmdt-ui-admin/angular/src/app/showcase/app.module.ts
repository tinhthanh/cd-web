import { AdminDirectComponent } from './../admin/components/admin-direct/admin-direct.component';
import { AuthenticationService } from './../admin/_services/AuthenticationService';
import { AuthGuard } from './../admin/_guards/AuthGuard';
import { JwtInterceptor } from './../admin/_helpers/JwtInterceptor ';
import { ConfigValue } from './../admin/_helpers/config-value';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';

import { CarService } from './service/carservice';
import { CountryService } from './service/countryservice';
import { EventService } from './service/eventservice';
import { NodeService } from './service/nodeservice';
import { AdminComponent } from 'app/admin/admin.component';
import { AuthenticationRest, UserRest } from '../admin/_helpers';
import { CommonModule } from '@angular/common';
import { ChapterRest } from 'app/admin/_helpers/mocktest/ChapterRest';
import { LessonRest } from 'app/admin/_helpers/mocktest/LessonRest';
import { FileOfLessonRest } from 'app/admin/_helpers/mocktest/FileOfLessonRes';
import { CourseRest } from 'app/admin/_helpers/mocktest/CoureRes';
import { FollowRest } from 'app/admin/_helpers/mocktest/FollowRes';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http , './assets/i18n/', '.json');
}
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminComponent,
    AdminDirectComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    BrowserAnimationsModule
  ],
  providers: [
    AuthenticationService,
      { provide: LocationStrategy, useClass: HashLocationStrategy },
      CarService, CountryService, EventService, NodeService,  ConfigValue,
      {
        provide: HTTP_INTERCEPTORS,
        useClass: JwtInterceptor,
        multi: true
      },
      AuthGuard, // chặn không cho truy cập vào trang admin
      // mocktest
  //    AuthenticationRest,
    //  UserRest,
    ChapterRest,
    LessonRest,
    // FileOfLessonRest,
    // CourseRest,
    FollowRest

  ],
  exports: [
    TranslateModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
