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
import { DataUser } from './DataUser';
@Injectable()
export class AuthenticationRestInterceptor implements HttpInterceptor {
    constructor() { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const data =  new DataUser();  // tạo ra danh sách dữ liệu mẩu
        const users: User[]  = data.users;
        console.log(users);
              return Observable.of(null).mergeMap(() => {
                //  đường dẫn và Method
                if (request.url.endsWith('/auth/login') && request.method === 'POST') {
                    //  tìm thấy nếu có bất kỳ người dùng phù hợp với thông tin đăng nhập
                    const filteredUsers = users.filter((user: User) => {
                        return user.email === request.body.email && user.password === request.body.password;
                    });
                    console.log(request.body);
                    console.log(filteredUsers);
                    if (filteredUsers.length) {
                        // nếu chi tiết đăng nhập là hợp lệ trả lại 200 OK với các chi tiết người dùng và mã thông báo giả jwt
                        const user = filteredUsers[0];
                        // trả về 1 đoạn token giả
                        const body = {
                            access_token: request.body.email ,
                            expires_in: 600
                        };
                        return Observable.of(new HttpResponse({ status: 200, body: body }));
                    } else {
                        // nếu tài khoản không tồn tại trả về mã lỗi 403
                        return Observable.throw(new HttpErrorResponse({status: 403, statusText: 'Tài khoản mật khẩu không đúng'}));
                    }
                }
                return next.handle(request);
            }).materialize()
                .delay(0)
                .dematerialize();
          }
    }
    export let  AuthenticationRest = {
        // sử dụng phụ trợ giả để thay thế cho dịch vụ Http để phát triển phụ trợ
        provide: HTTP_INTERCEPTORS,
        useClass: AuthenticationRestInterceptor,
        multi: true
    };
