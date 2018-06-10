
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from './../../../_services/AuthenticationService';
import { Component, OnInit } from '@angular/core';
import { ConfigValue } from '../../../_helpers/config-value';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { error } from 'selenium-webdriver';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
    templateUrl: 'dang-nhap.component.html',
    styleUrls: ['dang-nhap.component.css']
})
export class DangNhapComponent implements OnInit {
    public sms: string; // hiển thị thông báo mã lỗi
    public isLogin = false; // ẩn hiện nút đăng nhập khi người dùng nhấn đăng nhập
    private userRemember: any = {}; // biến lưu thông tin nhớ mật khẩu
    private   returnUrl: string ; // biến chứa url chuyển từ một trang khác đén
    constructor(
        private http: HttpClient,
        private config: ConfigValue,
        private authen: AuthenticationService,
        private router: Router,
        private route: ActivatedRoute,
        private fb: FormBuilder
    ) { }
    loginFormGroup: FormGroup;

    ngOnInit() {
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        // localStorage.romeve(this.config.token);
        if (localStorage.getItem(this.config.remember)) { // kiểm tra có lưu đăng nhập cho người dùng không
            this.userRemember = JSON.parse(atob(localStorage.getItem(this.config.remember)));
        }
        if (!this.userRemember) { // trường hợp không có lưu thông tin đăng nhâp thì ta tạo mới
            this.userRemember = {};
            this.userRemember.email = '';
            this.userRemember.password = '';
            this.userRemember.forword = false;
        }
        this.loginFormGroup =   this.fb.group({
            email: new FormControl(this.userRemember.email, [
                Validators.required,
                // tslint:disable-next-line:max-line-length
                Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
            ]),
            password: new FormControl(this.userRemember.password, [
                Validators.minLength(8),
                Validators.required,
            ]),
            forword: new FormControl(this.userRemember.forword)
        });
    }
    public login(): void {
        console.log(this.loginFormGroup.value);
        if (!this.isLogin) { // chặn cick chuột nhiều lần
            this.isLogin = true; // disable nut đăng nhập
            this.sms = null; // hiển thi thông báo mã lổi từ server
            this.authen.login(this.loginFormGroup.value.email, this.loginFormGroup.value.password).subscribe(data => {
                this.isLogin = false; // enable lại nút đăng nhập
                if (this.loginFormGroup.value.forword) { // kiểm tra người dùng có ghi nhớ đăng nhập không có thì lưu lại không thì xóa đi
                    localStorage.setItem(this.config.remember, btoa(JSON.stringify(this.loginFormGroup.value)));
                } else {
                    localStorage.removeItem(this.config.remember);
                }
                console.log(this.returnUrl);
                this.router.navigate([ this.returnUrl ]);
            }, (err: HttpErrorResponse) => {
                console.log(err);
                if (err.status === 403) {
                    this.sms = 'Tài khoản hoặc mật khẩu không đúng!'; // hiển thị thông báo
                    this.isLogin = false; // hiển thị nút đăng nhập lại
                }
            });
        }
    }
}
