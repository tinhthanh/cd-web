import { ConfirmationService } from './../../../../components/common/confirmationservice';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ConfigValue } from './../../../_helpers/config-value';
import { HttpClient } from '@angular/common/http';
import { Message } from 'app/components/common/api';
import {Component, OnInit} from '@angular/core';

@Component({
    templateUrl: 'dang-ky-xem-sau.component.html'
})

export class DangKyXemSauComponent implements OnInit {
    loading = false;
    msgs: Message[] = [];
    totalRow = 0 ; // tổng số row trong database
    page = 0 ; // vi tri trang đang đứng
    size  = 10 ; // số row muốn hiển thị
    khoahoc: any  = {};  // topic thêm vào
    public  danhSachKhoaHoc: any = [] ; // danh sách topic
    constructor( private http: HttpClient,
    private config: ConfigValue ,
    private roter: Router ,
    private confirmationService: ConfirmationService) {
     }
    ngOnInit() {
        this.loadingTopic();
}
paginate(event) { // sư kiện phân trang
    console.log(event);
    this.page = event.page; // thay đổi vị trí trang đang đứng
    this.size = event.rows;
    this.loadingTopic();
}


thaoTacXoa($event) {
    this.confirmationService.confirm({
        message: 'Bạn có muốn bỏ theo dõi không?',
        header: 'Xác nhận bỏ theo dõi',
        icon: 'fa fa-trash',
        accept: () => {
            this.http.delete(this.config.url_port + '/watch_later/' + $event.course.courseID ).subscribe( ( data: any ) => {
                console.log(data);
                const danhSachKhoaHoc   = [...this.danhSachKhoaHoc];
                for ( let i = 0  ; i < danhSachKhoaHoc.length ; i++  ) {
                    if ( danhSachKhoaHoc[i].courseID === $event.courseID) {
                        danhSachKhoaHoc.splice(i, 1);
                    }
                }
                this.danhSachKhoaHoc = danhSachKhoaHoc ;
            }, ( err: HttpErrorResponse) => {
                console.log(' bõ theo dõi không thành công');
            });
        },
        reject: () => {
            this.msgs = [{severity: 'info', summary: 'Rejected', detail: 'You have rejected'}];
        }
    });
    }
    thaoTacCapNhap($event) {
        console.log($event);
         alert('chưa gắn link chuyển sang khóa học này');
        }
public loadingTopic() {
    this.loading = true;
    this.http.get(this.config.url_port + `/watch_later` ).subscribe( (data: any)  => {
        this.danhSachKhoaHoc = data;
        console.log(this.danhSachKhoaHoc);
        this.loading = false;
        console.log(this.danhSachKhoaHoc);
    });
}
}

