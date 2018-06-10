import { ConfigValue } from './../config-value';
import { DataUser } from './DataUser';
import { User } from './../../_models/User';
import { Injectable } from '@angular/core';
import { HttpRequest,
        HttpResponse,
        HttpHandler,
        HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/materialize';
import 'rxjs/add/operator/dematerialize';
import { filter } from 'rxjs/operator/filter';
import { Role, UserCustomCreate } from '../../_models/index';
@Injectable()
export class UserRestInterceptor implements HttpInterceptor {
    constructor(private config: ConfigValue,
     public data: DataUser) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.data.load();
        const users: User[] = this.data.users;
        console.log(users);
        return Observable.of(null).mergeMap(() => {
            //  đường dẫn và Method
            if (request.url.endsWith('/user/info') && request.method === 'GET') {
                //  tìm thấy nếu có bất kỳ người dùng phù hợp với thông tin đăng nhập
                //    console.log(request.headers);
                console.log(request.headers.get('Authorization') + 'hihi ');
                if (this.data.checkToken(request.headers.get('Authorization'))) {
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
                        return Observable.throw(new HttpErrorResponse({ status: 403, statusText: 'Tài khoản không tồn tại' }));
                    }
                } else {
                    return Observable.throw(new HttpErrorResponse({ status: 401, statusText: 'Token hết hạng ' }));
                }
            }
            if ( request.url.match(/.+\/user\/([a-zA-Z0-9]{0,255})$/) && request.method === 'GET') {
                // console.log(request.url.match(/.+\/user\/([a-zA-Z0-9]{0,255})$/)[1] );
                if (this.data.checkToken(request.headers.get('Authorization'))) {
                    const filte = users.filter((user: User) => {
                        return user.email === request.headers.get('Authorization') ;
                    });
                     if ( filte.length ) {
                         const user: User = filte[0];
                         let flat = false;
                         const role: Role[] = user.permission;
                         for ( let i = 0; i < role.length ; i ++ ) {
                            if ( role[i].roleName === 'ROLE_ADMIN') {
                                flat = true;
                            }
                          }
                          if (flat) {
                            const filte_1 = users.filter((user_1: User) => {
                                return user_1.userID === request.url.match(/.+\/user\/([a-zA-Z0-9]{0,255})$/)[1];
                             });
                             if ( filte_1[0] ) {
                                return Observable.of( new HttpResponse({status: 200, body: filte_1[0]}));
                             } else {
                                 return Observable.throw( new HttpResponse( {status: 400 , statusText: 'Không tìm thấy tài nguyên'}));
                             }
                          } else {
                            return Observable.throw( new HttpResponse( { status : 403 , statusText: 'Không đủ quyền truy cập' })) ;
                          }
                         }
                } else {
                    return Observable.throw( new HttpResponse( { status : 401 , statusText: 'Token hết hạng' })) ;
                }
            }
            // quen mat khau phần gửi email
            // tslint:disable-next-line:max-line-length
            if ( ( request.url.match(/.+\/user\/token_reset_password\?email=([a-zA-Z0-9@.]{2,255})&url=([a-zA-z0-9:\/.]{3,225})/)) && request.method === 'GET') {
                    const email = request.url.match(/.+\/user\/token_reset_password\?email=([a-zA-Z0-9@.]{2,255})&url=([a-zA-z0-9:\/.]{3,225})/)[1];
                    // tslint:disable-next-line:max-line-length
                    const url = request.url.match(/.+\/user\/token_reset_password\?email=([a-zA-Z0-9@.]{2,255})&url=([a-zA-z0-9:\/.?=-]{3,225})/)[2];
                    if (this.data.checkToken(email)) {
                    return Observable.of(new HttpResponse({ status: 200, body: ` Server : Mocktest </br>
                        <a href='${url}${email}'> LINK KÍCH HOẠT</a> `  }));
                    } else {
                        return Observable.throw(new HttpResponse({ status: 404 , statusText: 'Tài khoãn không tồn tại' }));
                    }
            }
            // quên mặt khẩu phần tạo lại mặt khẩu
            if ( ( request.url.endsWith('/user/password_reset')) && request.method === 'PATCH' ) {
                 if ( request.body.key ) { // kiểm tra key còn hạng không
                      const temp = users.filter( (user: User) => {
                         return user.email === request.body.key ;
                     });
                     temp[0].password = request.body.newPassword;
                     console.log(users);
                     console.log(request.body.key);
                    return Observable.of( new HttpResponse({ status: 200 , body: 'Đổi mật khuẩu thành công '}) );
                 } else {
                     return Observable.throw( new HttpResponse({ status: 403 , statusText: ' key hết hạng' }) );
                 }
            }
            // chức năng đăng ký tài khoản
             if ( request.url.match(/.+\/user\?url=([a-zA-z0-9\/:.?=-]{1,255})/) && request.method === 'POST') {
                  const users_2 = users.filter((user: User) => {
                      return user.email === request.body.email;
                  });
                   if ( users_2.length > 0 ) {
                       return Observable.throw(new HttpResponse({ status: 409 , body: 'Email tồn tại trong hệ thống' }) );
                   }
                   const url = request.url.match(/.+\/user\?url=([a-zA-z0-9\/:.?=-]{1,255})/)[1];
                   const user3 = new UserCustomCreate();
                   user3.email = request.body.email;
                   user3.password =  request.body.password;
                   user3.userName =  request.body.userName ;
                   const role3: Role[] = [ new Role(2, 'ROLE_USER')];
                  this.data.createUser(user3 , 'https://www.w3schools.com/howto/img_avatar.png' , role3);
                  this.data.users  = users;
                  this.data.save();
                return Observable.of( new HttpResponse({ status: 200, body: url + request.body.email }));
             }
             // kich hoặt tài khoản
             if ( request.url.endsWith('/user/register_status') && request.method === 'PATCH') {
                const users_2 = users.filter((user: User) => {
                    return user.email === request.body.key;
                });
                 if ( users_2.length > 0 ) {
                    return Observable.of( new HttpResponse({ status: 200,  body: request.body }) );
                 } else {
                    return Observable.throw( new HttpResponse( { status: 400 , body: 'key không chinh sát' }));
                 }
             }
             // lấy ra toppic
            if ( ( request.url.match(/.+\/user\/topic\/([a-zA-Z0-9]{2,255})\/cours/)) && request.method === 'GET') {
                const id = request.url.match(/.+\/user\/topic\/([a-zA-Z0-9]{2,255})\/cours/)[1];
                console.log( 'console server  ' + id);
                return Observable.of(new HttpResponse({ status: 200, body: 'server reponse ' + id }));
        }
        // tslint:disable-next-line:max-line-length
        if ( ( request.url.match(/.+\/users\/topic\/([a-zA-Z0-9]{2,255})\/cours\?page=([0-9]{0,9})&size=([0-9]{0,9})/)) && request.method === 'GET') {
            const arr = request.url.match(/.+\/users\/topic\/([a-zA-Z0-9]{2,255})\/cours\?page=([0-9]{0,9})&size=([0-9]{0,9})/);
             console.log('id ' +  arr[1]);
             console.log('page ' + arr[2] );
             console.log('size ' + arr[3]);
            return Observable.of(new HttpResponse({ status: 200, body: 'server reponse ' + arr }));
    }
            return next.handle(request);
        }).materialize()
            .delay(1500)
            .dematerialize();

    }
}
export let UserRest = {
    // sử dụng phụ trợ giả để thay thế cho dịch vụ Http để phát triển phụ trợ
    provide: HTTP_INTERCEPTORS,
    useClass: UserRestInterceptor,
    multi: true
};
