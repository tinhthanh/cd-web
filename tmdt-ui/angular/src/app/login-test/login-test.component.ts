import { ConfigValue } from './../_helpers/config-value';
import { AuthenticationService } from './../_services/AuthenticationService';
import { User } from './../_models/User';
import { UserService } from './../_services/user.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { error } from 'util';
import { TopicCreation } from '../_models/index';
@Component({
    templateUrl: 'login-test.component.html'
})

export class LoginTestComponent implements OnInit {
    constructor(private http: HttpClient,
         private userService: UserService,
         private authenticationService: AuthenticationService,
         private congig: ConfigValue
        ) { }

    ngOnInit() {
        // test phuong thuc truyen tham so  vd  /user/{id}
        // this.http.get(this.congig.url_port + '/user/ND0').subscribe(data => {
        // console.log(data);
        // });
        //
        // this.http.get(this.congig.url_port + '/user/token_reset_password?email=k40cntt@gmail.com&url=http://thanh.com').subscribe(data => {
        //     console.log(data);
        //     });
        this.http.get(this.congig + '/user/topic/id4/cours').subscribe( data => {
            console.log(data);
        });
        
        this.http.get(this.congig + '/users/topic/id4/cours?page=89&size=23323').subscribe( data => {
            console.log(data);
        });

        }
     login() {
       // this.loading = true;

        this.authenticationService.login('vanthang1996@gmail.com', 'Thang123')
            .subscribe(
                data => {
                 //   this.router.navigate([this.returnUrl]);
                 console.log(data);
                 this.info();
                },
                (err: HttpErrorResponse) => {
                  //  this.alertService.error(error);
                   // this.loading = false;
                   console.log(err);
                   if ( err.status === 403 ) {
                       console.log('Mật khẩu không đúng hihi ');
                   }
                });
    }
    info() {
        this.http.get(this.congig.url_port + '/user/info').subscribe(data => {
            console.log(data);
        }, (err: HttpErrorResponse ) => {
            console.log(err.statusText);
            console.log(err.error);
            if ( err.status === 401 ) {
                console.log('token het hang');
            }
        });
    }
    // createTopic() {
    //     const topic = new TopicCreation();
    //     topic.topicDescription = 'ỨNG DỤNG DA NỀN TẢNG';
    //     topic.topicName = 'React native mobile' ;
    //     topic.topicStatus = 1;
    //     this.http.post(this.congig.url_port + '/admin/topic', topic, {
    //         withCredentials: true,
    //         observe: 'response'
    //     } ).subscribe(
    //         data => {
    //             console.log(data);
    //         }, (err: HttpErrorResponse) => {
    //             console.log(err.error);
    //         }
    //     );
    // }
}
