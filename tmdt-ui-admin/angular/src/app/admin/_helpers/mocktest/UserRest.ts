import { DataUser } from './DataUser';
import { User } from './../../_models/User';
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
@Injectable()
export class UserRestInterceptor implements HttpInterceptor {
    constructor() { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const  datauser = new DataUser();
        const users: any[]  = datauser.users;
              return Observable.of(null).mergeMap(() => {
                //  đường dẫn và Method
                if (request.url.endsWith('/user/info') && request.method === 'GET') {
                    //  tìm thấy nếu có bất kỳ người dùng phù hợp với thông tin đăng nhập
                   // console.log(request.headers);
                    console.log(request.headers.get('Authorization') + 'hihi ');
                    if (datauser.checkToke(request.headers.get('Authorization'))) {
                        const filteredUsers = users.filter((user: User) => {
                            return user.email === request.headers.get('Authorization');
                        });
                       // console.log(filteredUsers);
                        if (filteredUsers.length) {
                            // nếu chi tiết đăng nhập là hợp lệ trả lại 200 OK với các chi tiết người dùng và mã thông báo giả jwt
                            const user = filteredUsers[0];
                        return Observable.of(new HttpResponse({ status: 200, body: user }));
                    } else {
                        // return 401 not authorised if token is null or invalid
                        return Observable.throw(  new HttpErrorResponse({status: 403, statusText: 'Tài khoản không tồn tại'}));
                    }
                } else {
                    return Observable.throw(  new HttpErrorResponse({status: 401, statusText: 'Token hết hạng '}));
                }
            }
            return next.handle(request);
        }).materialize()
                .delay(0)
                .dematerialize();
          }
    }
    export let  UserRest = {
        // sử dụng phụ trợ giả để thay thế cho dịch vụ Http để phát triển phụ trợ
        provide: HTTP_INTERCEPTORS,
        useClass: UserRestInterceptor,
        multi: true
    };
