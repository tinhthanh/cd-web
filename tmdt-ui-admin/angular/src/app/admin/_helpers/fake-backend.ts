// import { HttpErrorResponse } from '@angular/common/http';
// import { User } from './../_models/User';
// import { Injectable } from '@angular/core';
// import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/observable/of';
// import 'rxjs/add/observable/throw';
// import 'rxjs/add/operator/delay';
// import 'rxjs/add/operator/mergeMap';
// import 'rxjs/add/operator/materialize';
// import 'rxjs/add/operator/dematerialize';
// import { filter } from 'rxjs/operator/filter';
// @Injectable()
// export class FakeBackendInterceptor implements HttpInterceptor {
//     constructor() { }
//     intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//         // mang luu tru cho nguoi dang ky
//         const users: any[] = JSON.parse(localStorage.getItem('users')) || [];
//         console.log(users);
//         // quấn trong chậm trễ quan sát được để mô phỏng api máy chủ gọi
//         return Observable.of(null).mergeMap(() => {
//             //  đường dẫn và Method
//             if (request.url.endsWith('/auth/login') && request.method === 'POST') {
//                 //  tìm thấy nếu có bất kỳ người dùng phù hợp với thông tin đăng nhập
//                 const filteredUsers = users.filter((user: User) => {
//                     return user.email === request.body.email && user.password === request.body.password;
//                 });
//                 console.log(request.body);
//                 console.log(filteredUsers);
//                 if (filteredUsers.length) {
//                     // nếu chi tiết đăng nhập là hợp lệ trả lại 200 OK với các chi tiết người dùng và mã thông báo giả jwt
//                     const user = filteredUsers[0];
//                     const body = {
//                         access_token: 'fake-jwt-token',
//                         expires_in: 600
//                     };
//                     return Observable.of(new HttpResponse({ status: 200, body: body }));
//                 } else {
//                     // else return 400 bad request
//                     return Observable.throw(new HttpErrorResponse({status: 403, statusText: 'Tài khoản mật khẩu không đúng'}));
//                 }
//             }
//             //
//             // get all users
//             if (request.url.endsWith('/api/users') && request.method === 'GET') {
//                 if (request.headers.get('Authorization') === 'fake-jwt-token') {
//                     return Observable.of(new HttpResponse({ status: 200, body: users }));
//                 } else {
//                     // return 401 not authorised if token is null or invalid
//                     return Observable.throw(  new HttpErrorResponse({status: 403, statusText: 'erro Author'}));
//                 }
//             }

//             // get user by id
//             if (request.url.match(/\/api\/users\/\d+$/) && request.method === 'GET') {
//                 if (request.headers.get('Authorization') === 'fake-jwt-token') {
//                     // find user by id in users array
//                     const urlParts = request.url.split('/');
//                     const id = Number(urlParts[urlParts.length - 1]);
//                     const matchedUsers = users.filter(
//                         use => {
//                             return use.id === id;
//                         });
//                     const user = matchedUsers.length ? matchedUsers[0] : null;
//                     return Observable.of(new HttpResponse({ status: 200, body: user }));
//                 } else {
//                     // return 401 not authorised if token is null or invalid
//                     return Observable.throw('Unauthorised');
//                 }
//             }

//             // create user
//             if (request.url.endsWith('/api/users') && request.method === 'POST') {
//                 // get new user object from post body
//                 const newUser = request.body;
//                 // validation
//                 const duplicateUser = users.filter(user => {
//                     return user.email === newUser.email;
//                 }).length;
//                 if (duplicateUser) {
//                     return Observable.throw('Username "' + newUser.username + '" Tồn tại');
//                 }

//                 // save new user
//                 newUser.userID =  'ID' + users.length + 1;
//                 users.push(newUser);
//                 localStorage.setItem('users', JSON.stringify(users));

//                 // respond 200 OK
//                 return Observable.of(new HttpResponse({ status: 200 }));
//             }

//             // delete user
//             if (request.url.match(/\/api\/users\/\d+$/) && request.method === 'DELETE') {
//                 if (request.headers.get('Authorization') === 'fake-jwt-token') {
//                     const urlParts = request.url.split('/');
//                     const tr = urlParts[urlParts.length - 1];
//                     const id = Number(tr);
//                     for (let i = 0; i < users.length; i++) {
//                         const user = users[i];
//                         if (user.id === id) {
//                             // delete user
//                             users.splice(i, 1);
//                             localStorage.setItem('users', JSON.stringify(users));
//                             break;
//                         }
//                     }
//                     // respond 200 OK
//                     return Observable.of(new HttpResponse({ status: 200 }));
//                 } else {
//                     // 401
//                     return Observable.throw('Unauthorised');
//                 }
//             }
//             return next.handle(request);
//         }).materialize()
//             .delay(500)
//             .dematerialize();
//     }
// }
// export let fakeBackendProvider = {
//     // sử dụng phụ trợ giả để thay thế cho dịch vụ Http để phát triển phụ trợ
//     provide: HTTP_INTERCEPTORS,
//     useClass: FakeBackendInterceptor,
//     multi: true
// };
