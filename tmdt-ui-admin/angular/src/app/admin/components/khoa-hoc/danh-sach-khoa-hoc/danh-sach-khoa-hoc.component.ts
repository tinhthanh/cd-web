import { ConfigValue } from './../../../_helpers/config-value';
import { HttpClient } from '@angular/common/http';
import { Message } from 'app/components/common/api';
import { LazyLoadEvent } from './../../../../components/common/lazyloadevent';
import { CarService } from './../../../../showcase/service/carservice';
import { Car } from './../../../../showcase/domain/car';

import {Component, OnInit} from '@angular/core';

@Component({
    templateUrl: 'danh-sach-khoa-hoc.component.html',
})
export class DanhSachKhoaHocComponent implements OnInit {
    loading = false;
    msgs: Message[] = [];
    totalRow = 0 ; // tổng số row trong database
    page = 0 ; // vi tri trang đang đứng
    size  = 10 ; // số row muốn hiển thị
    khoahoc: any  = {};  // topic thêm vào
    public  danhSachKhoaHoc: any = [] ; // danh sách topic
    constructor( private http: HttpClient,
    private config: ConfigValue) {
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

public loadingTopic() {
    this.loading = true;
    this.http.get(this.config.url_port + `/users/course?page=${ this.page + 1 }&size=${this.size}` ).subscribe( (data: any)  => {
        this.totalRow = data.numberOfRecord;
        this.danhSachKhoaHoc = data.listOfResult ;
        this.loading = false;
        console.log(this.danhSachKhoaHoc);
    });
}
public suKienChon(event) {
   console.log(event);
}
}

