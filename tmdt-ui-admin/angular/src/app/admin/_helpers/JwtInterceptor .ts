import { AuthenticationService } from 'app/admin/_services/AuthenticationService';
import { Injectable, Injector } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ConfigValue } from '../_helpers/config-value';
@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor( private config: ConfigValue, private injector: Injector) {}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // làm mới token
        const auth = this.injector.get(AuthenticationService);
        if (  !(request.method === 'GET'  && request.url.endsWith(this.config.auth_refresh) )) {
            auth.refreshToken();
            console.log(request.url + ' ' + request.method ) ;
        }
        const currentUser = JSON.parse(localStorage.getItem(this.config.token));
        if (currentUser ) {
            request = request.clone({
                setHeaders: {
                    Authorization: `${currentUser}`
                }
            });
        }
        return next.handle(request);
    }
}
