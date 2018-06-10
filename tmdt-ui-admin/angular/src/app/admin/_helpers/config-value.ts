import { Injectable } from '@angular/core';

@Injectable()
export class ConfigValue {
     cart = 'cart';
     role_admin = 'ROLE_ADMIN';
     role_user = 'ROLE_USER';
     token = 'token';
      url_port =  'http://127.0.0.1:8080/tmdt'; // chế độ thật
      // url_port = 'http://env-6133274.kilatiron.com';

    // url_port = 'http://10.5.50.74:8080';
     remember = 'remember';
     auth_refresh = '/auth/refresh';
}
