import { HttpErrorResponse } from "@angular/common/http";
import { Topic } from "./../../_models/Topic";
import { DataTopic } from "./DataTopic";
import { Observable } from "rxjs/Observable";
import { ConfigValue } from "./../config-value";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HTTP_INTERCEPTORS
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DataCourse } from "./DataCourse";

@Injectable()
export class TopicRestInterceptor implements HttpInterceptor {
  constructor(private config: ConfigValue) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return Observable.of(null)
      .mergeMap(() => {
        if (request.url.match(/\/users\/topic\?page=([0-9]{1,9})&size=([0-9]{1,9})/) && request.method === 'GET') {
          return Observable.of(
            new HttpResponse({
              status: 200,
              body: {
                listOfResult: new DataTopic().getAllTopic(),
                numberOfPage: 5
              }
            })
          );
        } else if (
          request.url.endsWith('/admin/topic') &&
          request.method === 'PATCH'
        ) {
          // tslint:disable-next-line:label-position
          const tmp_topic = new DataTopic().updateTopic(
            new Topic(
              request.body.topicID,
              request.body.topicName,
              request.body.topicDescription,
              request.body.topicStatus
            )
          );
          return Observable.of(
            new HttpResponse({
              status: 200,
              body: tmp_topic
            })
          );
        }
        if (
          request.url.match(/\/users\/topic\/\w+$/) &&
          request.method === 'GET'
        ) {
          const urlParts = request.url.split('/');
          const idTopic = urlParts[urlParts.length - 1];
          const matchedTopics = new DataTopic()
            .getAllTopic()
            .filter((topic: Topic) => {
              return topic.$topicID === idTopic;
            });
          const topicBody = matchedTopics.length ? matchedTopics[0] : null;
          if (topicBody === null) {
            return Observable.throw(
              new HttpErrorResponse({
                status: 403,
                statusText: 'Topic không tồn tại!'
              })
            );
          } else {
            return Observable.of(
              new HttpResponse({
                status: 200,
                body: topicBody
              })
            );
          }
        }
        if (request.url.endsWith('/admin/topic') && request.method === 'POST') {
          const user = request.body;
          return Observable.of(
            new HttpResponse({
              status: 200,
              body: user
            })
          );
        }
         if (  request.url.match(/\/users\/topic\/\w{2,255}\/course\?page=([0-9]{0,9})&size=([0-9]{0,9})/) && request.method === 'GET' ) {
          return Observable.of(
            new HttpResponse({
              status: 200,
              body: { listOfResult:  1234,
              numberOfPage: 1 }
            })
          );
         }
         // tslint:disable-next-line:max-line-length
         if (  request.url.match(/.+\/users\/topic\/([a-zA-Z0-9]{2,255})\/course\?page=([0-9]{0,9})&size=([0-9]{0,9})&search_key=(\w{2,255})/) && request.method === 'GET' ) {
          return Observable.of(
            new HttpResponse({
              status: 200,
              body: { listOfResult: 1234,
              numberOfPage: 1 }
            })
          );
         }

        return next.handle(request);
      })
      .materialize()
      .delay(0)
      .dematerialize();
  }
}
export let TopicRest = {
  // sử dụng phụ trợ giả để thay thế cho dịch vụ Http để phát triển phụ trợ
  provide: HTTP_INTERCEPTORS,
  useClass: TopicRestInterceptor,
  multi: true
};
