import { Injectable } from '@angular/core';
import {
    HttpRequest
    , HttpResponse,
    HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS, HttpErrorResponse
} from '@angular/common/http';
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
export class ChapterRestInterceptor implements HttpInterceptor {
    constructor() { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return Observable.of(null).mergeMap(() => {
            // thêm chapter
            // url /users/chapter
            // body gửi lên
            // private String courseID;
            // private String chapterTitle;
            // private String chapterContent;
            // private String chapterSummary;
            // trả về chapter vừa thêm
            if (request.url.endsWith('/users/chapter') && request.method === 'POST') {
                //  tìm thấy nếu có bất kỳ người dùng phù hợp với thông tin đăng nhập
                if (request.body) {
                    // phần body gửi lên
                    // "courseID": "KH1",
                    // "chapterTitle": "Tổng quan về Android",
                    // "chapterContent": "Cung cấp cái nhìn tổng quan về android",
                    // "chapterSummary": "Cung cấp cái nhìn tổng quan về android",
                    //
                    // trả về y chan vậy công với ID mới phát sinh
                    const chapter = request.body;
                    chapter.chapterID = Math.floor(Math.random() * 999999) + 1;
                    return Observable.of(new HttpResponse({ status: 200, body: chapter }));
                } else {
                    // nếu tài khoản không tồn tại trả về mã lỗi 403
                    return Observable.throw(new HttpErrorResponse({ status: 400, statusText: 'Bad request' }));
                }
            }
            // xoa chapter
            // users/chapter/{ID_CHAPTER}
            if (request.url.match(/.+\/users\/chapter\/([A-Za-z0-9]{0,255})$/) && request.method === 'DELETE' ) {
                console.log(request.method);
                if (request.url.match(/.+\/users\/chapter\/([A-Za-z0-9]{0,255})$/).length > 0 ) {
                    console.log('Server delete Chapter ID' + request.url.match(/.+\/users\/chapter\/([A-Za-z0-9]{0,255})$/)[0]);
                    return Observable.of(new HttpResponse({ status: 200, body: 'success' }));
                } else {
                    return Observable.throw(new HttpErrorResponse({ status: 409, statusText: 'Xóa không thành công' }));
                }
            }
            // chỉnh sửa chapter
            // url /users/chapter
            // body gửi lên 
            // private String chapterID;
            // private String courseID;
            // private String chapterTitle;
            // private String chapterContent;
            // private String chapterSummary;
            // trả về cái cái vừa thêm
            if (request.url.endsWith('/users/chapter') && request.method === 'PATCH') {
                //  tìm thấy nếu có bất kỳ người dùng phù hợp với thông tin đăng nhập
                if (request.body) {
                    // phần body gửi lên
                    // "chapterID": "KH1CH1",
                    // "courseID": "KH1",
                    // "chapterTitle": "Tổng quan về Android",
                    // "chapterContent": "Cung cấp cái nhìn tổng quan về android",
                    // "chapterSummary": "Cung cấp cái nhìn tổng quan về android",
                    // trả về y chan vậy công với ID mới phát sinh
                    const chapter = request.body;
                    return Observable.of(new HttpResponse({ status: 200, body: chapter }));
                } else {
                    // nếu tài khoản không tồn tại trả về mã lỗi 403
                    return Observable.throw(new HttpResponse({ status: 400, statusText: 'Bad request' }));
                }
            }
            return next.handle(request);
        }).materialize()
            .delay(0)
            .dematerialize();
    }
}
export let ChapterRest = {
    // sử dụng phụ trợ giả để thay thế cho dịch vụ Http để phát triển phụ trợ
    provide: HTTP_INTERCEPTORS,
    useClass: ChapterRestInterceptor,
    multi: true
};
