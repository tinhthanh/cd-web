import { ConfirmationService } from './../../../../components/common/confirmationservice';
import { Router } from '@angular/router';
import { ConfigValue } from 'app/admin/_helpers/config-value';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Message } from 'app/components/common/api';
import { Component, OnInit } from '@angular/core';

@Component({
    templateUrl: 'khoa-hoc-da-dang.component.html'
})

export class KhoaHocDaDangComponent implements OnInit {
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
        message: 'Bạn có muốn xóa khóa học này không?',
        header: 'Xác nhận xóa',
        icon: 'fa fa-trash',
        accept: () => {
            this.http.delete(this.config.url_port + '/users/follow/' + $event.courseID ).subscribe( ( data: any ) => {
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
        this.roter.navigate(['/admin/khoa-hoc/khoa-hoc-cua-toi'], { queryParams: { id: $event.courseID }});
        }
    public loadingTopic() {
        this.loading = true;
        this.http.get(this.config.url_port + `/user/course?page=${ this.page + 1 }&size=${this.size}` ).subscribe( (data: any)  => {
            this.totalRow = data.numberOfRecord;
            this.danhSachKhoaHoc = data.listOfResult ;
            this.loading = false;
            console.log(this.danhSachKhoaHoc);
        });
    }
}
