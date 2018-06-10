import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from './../../../_services/AuthenticationService';
import { Component, OnInit } from '@angular/core';
import { ConfigValue } from '../../../_helpers/config-value';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { error } from 'selenium-webdriver';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    templateUrl: 'doi-mat-khau.component.html',
})

export class DoiMatKhauComponent implements OnInit {
    public sms: string; // hiển thị thông báo mã lỗi
    changePassword: FormGroup;
    constructor(
        private http: HttpClient,
        private config: ConfigValue,
        private authen: AuthenticationService,
        private router: Router,
        private route: ActivatedRoute,
        private fb: FormBuilder
     ) {
         this.changePassword = new FormGroup({ });
      }
    ngOnInit() {
    }
}
