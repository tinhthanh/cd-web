import { ConfigValue } from './../../../_helpers/config-value';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { HomePagesService } from './../../../_services/HomePagesService';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, HostBinding } from '@angular/core';


@Component({
    templateUrl: 'quen-mat-khau.component.html',
})

export class QuenMatKhauComponent implements OnInit {
     public isLoading =  false;
       ms: string;
       forgetGroup: FormGroup;
        successs = false;
    constructor( private serviceHome: HomePagesService ,
    private http: HttpClient,
    private config: ConfigValue ) {
        this.forgetGroup = new FormGroup({
            email: new FormControl('', [
                Validators.required,
                // tslint:disable-next-line:max-line-length
                Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
            ])
        });

    }

    public forgetSubmit() {
        this.successs = false;
        this.isLoading = true;
        this.ms = null;
            if ( this.forgetGroup.valid ) {
            // tslint:disable-next-line:max-line-length
            this.serviceHome.checkforget(this.forgetGroup.value.email , 'http://localhost:4200/pages/kich-hoat?key-change=').subscribe(
                data => {
                     console.log(data);
                     this.isLoading = false;
                     this.successs = true;
                     this.ms = data;
                } , (
                    err: HttpErrorResponse) => {
                        if ( err.error instanceof Error ) {
                        } else {
                            if ( err.status === 404 ) {
                                console.log(' email không tồn tại trong hệ thống ')
                            this.ms = 'Email không tồn tại trong hệ thống ';
                             }
                             if ( err.status === 0 ) {
                                  this.ms = 'không có internet ';
                             }
                        }
                        this.isLoading = false;
              } );
        } else {
            console.log('hieu du dieu');
        }
    }
    ngOnInit() { }
}