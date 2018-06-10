import { User } from "./../_models/User";
import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import { ConfigValue } from "../_helpers/config-value";
@Injectable()
export class AuthenticationService {
  constructor(private http: HttpClient, private config: ConfigValue) {}
  login(username: string, password: string) {
    console.log(this.config.url_port);
    return this.http
      .post<any>(this.config.url_port + "/auth/login", {
        email: username,
        password: password
      })
      .map(user => {
        console.log(user);
        if (user && user.access_token) {
          localStorage.setItem(
            this.config.token,
            JSON.stringify(user.access_token)
          );
        }
        return user;
      });
  }
  logout() {
    localStorage.removeItem(this.config.token);
  }
  public refreshToken(): any {
    // lam mới token khi token còn thời hạng
    return this.http.get(this.config.url_port + this.config.auth_refresh).map(
      data => {
        let user: any = {};
        user = data;
        if (user && user.access_token) {
          localStorage.setItem(
            this.config.token,
            JSON.stringify(user.access_token)
          );
          console.log("làm mới token ");
        }
        return user;
      },
      (err: HttpErrorResponse) => {
        if (err.status === 403) {
          console.log('Chưa đăng nhập!');
        }
      }
    );
  }
  public getInformation(): any {
    return this.http
      .get(this.config.url_port + "/user/info")
      .map((user: User) => {
        return user;
      });
  }
}
