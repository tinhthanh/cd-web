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
export class LessonRestInterceptor implements HttpInterceptor {
    constructor() { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
              return Observable.of(null).mergeMap(() => {
                // thêm chapter
                // url /admin/lesson
                // body gởi lên
                // private String lessonTitle;
                // private String lessonContent;
                // private String chapterID;
            // trả về chapter vừa thêm vào
                console.log(request);
                if (request.url.endsWith('/admin/lesson') && request.method === 'POST') {
                    if (request.body) {
                       const lesson = request.body ;
                       lesson.lessonID = Math.floor(Math.random() * 999999 ) + 1 ;
                        return Observable.of(new HttpResponse({ status: 200, body: lesson }));
                    } else {
                        return Observable.throw(new HttpErrorResponse({status: 400, statusText: 'Bad request'}));
                    }
                }
                // chỉnh sửa lesson
                // url /admin/lesson

                    // body gởi lên
                    // private String lessonID;
                    // private String lessonTitle;
                    // private String lessonContent;
                    // private String chapterID;
            // trả về chapter vừa chỉnh sửa
                if (request.url.endsWith('/admin/lesson') && request.method === 'PATCH') {
                    if (request.body) {
                       const chapter = request.body ;
                        return Observable.of(new HttpResponse({ status: 200, body: chapter }));
                    } else {
                        // nếu tài khoản không tồn tại trả về mã lỗi 403
                        return Observable.throw(new HttpErrorResponse({status: 400, statusText: 'Bad request'}));
                    }
                }
                // xóa lesson
                // url /admin/lesson/{ID_LESSON}
                if (request.url.match(/.+\/admin\/lesson\/([A-Za-z0-9]{0,255})$/) && request.method === 'DELETE') {
                    if (request.url.match(/.+\/admin\/lesson\/([A-Za-z0-9]{0,255})$/)) {
                        console.log('Server delete Chapter ID' + request.url.match(/.+\/admin\/lesson\/([A-Za-z0-9]{0,255})$/)[0]);
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
    export let  LessonRest = {
        // sử dụng phụ trợ giả để thay thế cho dịch vụ Http để phát triển phụ trợ
        provide: HTTP_INTERCEPTORS,
        useClass: LessonRestInterceptor,
        multi: true
    };
