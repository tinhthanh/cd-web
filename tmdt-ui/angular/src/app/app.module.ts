import { CommentFbComponent } from './view/home/home-bai-hoc/comment-fb/comment-fb.component';
import { ShoppingCartService } from './_services/shopping-cart/shopping-cart.service';
import { Router } from '@angular/router';
import { AuthenticationService } from './_services/AuthenticationService';
import { UserService } from './_services/user.service';
import { ConfigValue } from './_helpers/config-value';
import {
  HTTP_INTERCEPTORS, HttpClientModule, HttpClientXsrfModule, HttpInterceptor,
  HttpXsrfTokenExtractor, HttpRequest, HttpHandler, HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

// mocktest

// end mocktest
import { JwtInterceptor } from './_helpers/JwtInterceptor ';
import { LoginTestComponent } from './login-test/login-test.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injectable, Inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import {
  SimpleLayoutComponent,
  HomeLayoutComponent
} from './containers';

@Injectable()
export class HttpXsrfInterceptor implements HttpInterceptor {
  readonly headerName = 'X-XSRF-TOKEN';
  constructor(
      private tokenService: HttpXsrfTokenExtractor) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const lcUrl = req.url.toLowerCase();
    // Skip both non-mutating requests and absolute URLs.
    // Non-mutating requests don't require a token, and absolute URLs require special handling
    // anyway as the cookie set
    // on our origin is not the same as the token expected by another origin.
    // if (req.method === 'GET' || req.method === 'HEAD' || lcUrl.startsWith('http://') ||
    //    lcUrl.startsWith('https://')) {
    //  return next.handle(req);
    // }
    const token = this.tokenService.getToken();
    console.log(token);
    console.log('sss');

    // Be careful not to overwrite an existing header of the same name.
    if (token !== null && !req.headers.has(this.headerName)) {
      req = req.clone({headers: req.headers.set(this.headerName, token)});
    }
    return next.handle(req);
  }
}

// chứa các layout chính
const APP_CONTAINERS = [
  SimpleLayoutComponent,
  HomeLayoutComponent,
  LoginTestComponent // test
] ;

import {
 HomeHeaderComponent,
 HomeFooterComponent,
} from './components';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';


// là những thành phần được include
const APP_COMPONENTS = [
  HomeHeaderComponent,
  HomeFooterComponent
];
// import mocktest
import { UserRest, TopicRest , AuthenticationRest} from './_helpers';
import { CommonModule } from '@angular/common';
import { DataUser } from './_helpers/mocktest/DataUser';
import { Error404Component } from './error-404/error-404.component';
// mocktest
const APP_MOCKTEST = [
  UserRest,
  AuthenticationRest
];


@NgModule({
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    ...APP_COMPONENTS,
    CommentFbComponent,
    Error404Component
  ],
  imports: [
  AppRoutingModule ,
    BrowserModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot()
  ],
  providers: [
    ShoppingCartService,
    AuthenticationService,
    ConfigValue,
    UserService,
    {
        provide: HTTP_INTERCEPTORS,
        useClass: JwtInterceptor,
        multi: true
    },
  //  { provide: HTTP_INTERCEPTORS, useClass: HttpXsrfInterceptor, multi: true },
    // HttpClientXsrfModule
    // provider used to create fake backend
    // AuthenticationRest,
    // UserRest,
  //  TopicRest
    // APP_MOCKTEST
    // Datatest
    DataUser
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
 }
