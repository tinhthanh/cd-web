import { ConfigValue } from './../_helpers/config-value';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class HomePagesService {
    constructor( private http: HttpClient,
       private  config: ConfigValue
     ) { }
    public homeRegister(user: any , url: string ): any {
     return this.http.post(this.config.url_port + '/user?url=' + url , user);
    }
    public homeActiveLink(link: string): any {
         return this.http.patch(this.config.url_port + '/user/register_status' , link);
    }
    public checkforget(email: string , url: string): any {
         return this.http.get(this.config.url_port + '/user/token_reset_password?email=' + email + '&url=' + url );
    }
    public forgetPass( obj: any ): any {
    return this.http.patch(this.config.url_port + '/user/password_reset', obj );
    }
}
