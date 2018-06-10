import { HttpErrorResponse } from '@angular/common/http';
import { ConfirmationService } from './../../../../components/common/confirmationservice';
import { Router } from '@angular/router';
import { MenuItem } from './../../../../components/common/menuitem';
import { ConfigValue } from './../../../_helpers/config-value';
import { HttpClient } from '@angular/common/http';
import { Message } from 'app/components/common/api';
import { LazyLoadEvent } from './../../../../components/common/lazyloadevent';
import { CarService } from './../../../../showcase/service/carservice';
import { Car } from './../../../../showcase/domain/car';

import {Component, OnInit} from '@angular/core';

@Component({
    templateUrl: 'quan-ly-khoa-hoc.component.html'
})
export class QuanLyKhoaHocKhoaHocComponent implements OnInit {
    splitMenuItems: MenuItem[];
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
        this.splitMenuItems = [
            {label: 'Update', icon: 'fa-refresh' },
            {label: 'Delete', icon: 'fa-close'},
        ];
}
thaoTacXoa($event) {
this.confirmationService.confirm({
    message: 'Do you want to delete this record?',
    header: 'Delete Confirmation',
    icon: 'fa fa-trash',
    accept: () => {
        const chan: any = {
            courseAvatar: null,
            courseDescription : null,
            courseDetail: null,
            courseID : $event.courseID  ,
            courseTitle : null,
            courseTypeID : null,
            price : null,
            status:  3 ,
            topicID: null
          } ;
        this.http.patch(this.config.url_port + '/user/course', chan ).subscribe( ( data: any ) => {
            console.log(data);
            const danhSachKhoaHoc   = [...this.danhSachKhoaHoc];
            for ( let i = 0  ; i < danhSachKhoaHoc.length ; i++  ) {
                if ( danhSachKhoaHoc[i].courseID === $event.courseID) {
                    danhSachKhoaHoc.splice(i, 1);
                }
            }
            this.danhSachKhoaHoc = danhSachKhoaHoc ;
        }, ( err: HttpErrorResponse) => {
            console.log('Xóa khôn  thành công ');
        });
    },
    reject: () => {
        this.msgs = [{severity: 'info', summary: 'Rejected', detail: 'You have rejected'}];
    }
});

}
thaoTacCapNhap($event) {
    console.log($event);
    this.roter.navigate(['/admin/khoa-hoc/khoa-hoc-cua-toi'], {queryParams: {id: $event.courseID , url: this.roter.url }}) ;
    }

paginate(event) { // sư kiện phân trang
    console.log(event);
    this.page = event.page; // thay đổi vị trí trang đang đứng
    this.size = event.rows;
    this.loadingTopic();
}

public loadingTopic() {
    this.loading = true;
    this.http.get(this.config.url_port + `/users/course?page=${ this.page + 1 }&size=${this.size}` ).subscribe( (data: any)  => {
        this.totalRow = data.numberOfRecord;
        this.danhSachKhoaHoc = data.listOfResult ;
        this.loading = false;
        console.log(this.danhSachKhoaHoc);
    });
}
// public suKienChon(event) {
//    console.log(event);
// }
}

