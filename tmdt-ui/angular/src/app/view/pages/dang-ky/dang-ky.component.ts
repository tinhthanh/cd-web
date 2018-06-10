import { HomePagesService } from './../../../_services/HomePagesService';
import { Title } from '@angular/platform-browser';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Component, OnInit, HostBinding } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AbstractControl } from '@angular/forms';

@Component({
    templateUrl: 'dang-ky.component.html',
})

export class DangKyComponent implements OnInit {
    //  @HostBinding('style.position')  position = 'absolute';
    register: FormGroup;
    user: any = {};
    ms: string;
    success = false;
    loading = false;
    constructor(private serviceHome: HomePagesService,
        private router: Router,
        private title: Title) {
        this.register = new FormGroup({
            userName: new FormControl('', [
                Validators.required
            ]),
            email: new FormControl(
                '',
                [
                    Validators.required,
                    // tslint:disable-next-line:max-line-length
                    Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
                ]),
            passwordnew: new FormControl('', [
                Validators.required,
                Validators.minLength(8)
            ]),
            passwordold: new FormControl('', [
                Validators.required,
                Validators.minLength(8),
            ]),
            phone: new FormControl(null, [
                Validators.required,
                Validators.minLength(9),
                Validators.maxLength(12)
            ])
        },
            this.passwordMatchValidator
        );
    }
    ngOnInit() {
        this.title.setTitle('Đăng ký tài khoản');
    }
    public registerSubmit() {
        this.loading = true;
        if (this.register.valid) {
            // {
            //     "address": "",
            //     "avatar": "",
            //     "email": "",
            //     "password": "",
            //     "phoneNumber": "",
            //     "userName": ""
            //   }
            this.user.address = '';
            this.user.avatar = '';
            this.user.email = this.register.value.email;
            this.user.phoneNumber = this.register.value.phone;
            this.user.password = this.register.value.passwordnew;
            this.user.userName = this.register.value.userName;
            console.log(this.user);
            this.serviceHome.homeRegister(this.user, 'http://localhost:4200/pages/kich-hoat?key=').subscribe(data => {
                alert(data);
                this.success = true;
                this.loading = false;
            }, (err: HttpErrorResponse) => {
                if (err.error instanceof Error) {
                    console.log('erro cient side ');
                } else {
                    if (err.status === 0) {
                        console.log('khong co internet ')
                        this.ms = 'Không có internet  ';
                    }
                    if (err.status === 409) {
                        console.log(' Email đã tồn tại ')
                        this.ms = 'Email đã tồn tại ';
                    }
                }
                this.loading = false;
                // console( JSON.parse(err.error).Message);
            });
            //   this.user = {} ;
        } else {
            console.log('thieu du lieu ');
        }
    }
    passwordMatchValidator(g: FormGroup) {
        return g.get('passwordnew').value === g.get('passwordold').value
            ? null : { 'mismatch': true };
    }
}

