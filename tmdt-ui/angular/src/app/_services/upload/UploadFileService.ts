import {Injectable} from '@angular/core';
import {HttpClient, HttpRequest, HttpEvent} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { HttpHeaders } from '@angular/common/http';
import { ConfigValue } from '../../_helpers/config-value';

@Injectable()
export class UploadFileService {

  constructor(private http: HttpClient ,
    private config: ConfigValue
  ) {}

  pushFileToStorage(file: File): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();
    formdata.append('file', file);
    const req = new HttpRequest('POST', this.config.url_port + '/upload', formdata, {
      headers: new HttpHeaders().set('Authorization', JSON.parse(localStorage.getItem('token'))),
      reportProgress: true,
      responseType: 'text'
    });
    return this.http.request(req);
  }
}
