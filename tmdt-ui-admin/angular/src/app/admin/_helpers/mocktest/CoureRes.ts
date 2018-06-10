import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/materialize';
import 'rxjs/add/operator/dematerialize';
import { filter } from 'rxjs/operator/filter';
import { Role } from '../../_models/index';
import { DataUser } from './DataUser';
@Injectable()
export class CourseRestInterceptor implements HttpInterceptor {
    constructor() { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
              return Observable.of(null).mergeMap(() => {
                // url /user/course/{ID_course}
                if (request.url.match(/.+\/user\/course\/([A-Za-z0-9]{0,255})$/) && request.method === 'DELETE') {
                    if (request.url.match(/.+\/user\/course\/([A-Za-z0-9]{0,255})$/)) {
                        console.log('Server delete course ID' + request.url.match(/.+\/user\/course\/([A-Za-z0-9]{0,255})$/)[0]);
                        return Observable.of(new HttpResponse({ status: 200, body: 'success' }));
                    } else {
                        return Observable.throw(new HttpErrorResponse({ status: 409, statusText: 'Xóa không thành công' }));
                    }
                }
                return next.handle(request);
            }).materialize()
                .delay(0)
                .dematerialize();
          }
    }
    export let   CourseRest = {
        // sử dụng phụ trợ giả để thay thế cho dịch vụ Http để phát triển phụ trợ
        provide: HTTP_INTERCEPTORS,
        useClass: CourseRestInterceptor,
        multi: true
    };
