import { Message } from './../../../../../../components/common/message';
import { ConfirmationService } from './../../../../../../components/common/confirmationservice';
import { UserInfo } from './../../../../../_models/json/UserInfo';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ConfigValue } from 'app/admin/_helpers/config-value';
import { Router } from '@angular/router';


@Component({
    templateUrl: 'quan-ly-tai-khoan-bi-khoa.component.html'
})
export class QuanLyTaiKhoanBiKhoaComponent implements OnInit {
    page = 0 ;
    size = 1;
    total = 0 ;
    listUser: UserInfo[];
    msgs: Message[] = [];
    constructor(
        private config: ConfigValue ,
        private http: HttpClient,
        private router: Router,
        private confirmationService: ConfirmationService
    ) { }
    ngOnInit() {
        this.loadingListUser();
    }
    public loadingListUser(): void {
        this.http.get( `${this.config.url_port}/admin/user_info?page=${this.page + 1}&size=${this.size}`).subscribe( (data: any) => {
            this.total = data.numberOfRecord;
            this.listUser = data.listOfResult ;
            console.log(this.listUser);
        });
    }
    thaoTacMoKhoa($event) {
        this.confirmationService.confirm({
            message: 'Bạn có muốn mỡ khóa tài khoản này',
            header: 'Xác nhận mở khóa',
            icon: 'fa fa-lock',
            accept: () => {
                this.http.delete(this.config.url_port + '/users/follow/' + $event.courseID ).subscribe( ( data: any ) => {
                    console.log(data);
                    const listUser   = [...this.listUser];
                    for ( let i = 0  ; i < listUser.length ; i++  ) {
                        if ( listUser[i].userID === $event.userID) {
                            listUser.splice(i, 1);
                        }
                    }
                    this.listUser = listUser ;
                }, ( err: HttpErrorResponse) => {
                    console.log(' mỡ khóa không thành công');
                });
            },
            reject: () => {
                this.msgs = [{severity: 'info', summary: 'success', detail: 'Thành công'}];
            }
        });
        }
    paginate(event) { // sư kiện phân trang
        console.log(event);
        this.page = event.page; // thay đổi vị trí trang đang đứng
        this.size = event.rows;
        this.loadingListUser();
    }
}
