import { Injectable } from '@angular/core';

@Injectable()
export class ConfigValue {
     cart = 'cart';
     role_admin = 'ROLE_ADMIN';
     role_user = 'ROLE_USER';
     token = 'token';
     url_port =  'http://127.0.0.1:8087/api-service';
    // url_port = 'http://192.168.1.103';
     remember = 'remember';

    // dường link res
    // AuthenticationRest.class
     auth_login = '/auth/login';
     auth_refresh = '/auth/refresh';
}
